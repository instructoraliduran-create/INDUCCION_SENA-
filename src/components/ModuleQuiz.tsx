import React, { useState, useEffect, useRef } from 'react';
import { REGULATION_QUIZ_QUESTIONS, SENA_REGIONALES } from '../data/senaData';
import { 
  ApprenticeProfile, 
  ModuleProgress, 
  QuizAnswerRecord, 
  ApprenticeSubmission,
  LeaderboardEntry,
  RegulationQuizQuestion
} from '../types/induction';
import { 
  saveSubmission, 
  getLeaderboard, 
  saveLeaderboardEntry 
} from '../services/submissionsStore';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Trophy, 
  Clock, 
  Zap, 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  BookOpen, 
  User, 
  Compass, 
  Medal, 
  ChevronRight,
  TrendingUp,
  FileCheck2,
  Check,
  Search,
  Timer
} from 'lucide-react';

interface ModuleQuizProps {
  onComplete: () => void;
  isCompleted: boolean;
  onGoToCertificate: () => void;
  profile: ApprenticeProfile;
  onUpdateProfile?: (profile: ApprenticeProfile) => void;
  progress: ModuleProgress;
}

export const ModuleQuiz: React.FC<ModuleQuizProps> = ({
  onComplete,
  isCompleted,
  onGoToCertificate,
  profile,
  onUpdateProfile,
  progress,
}) => {
  // Navigation within evaluation module: 'profile_check' | 'quiz' | 'results' | 'leaderboard'
  const [stage, setStage] = useState<'profile_check' | 'quiz' | 'results' | 'leaderboard'>('profile_check');

  // Apprentice local form state for Step 1
  const [formData, setFormData] = useState<ApprenticeProfile>({ ...profile });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentQuestionTime, setCurrentQuestionTime] = useState(0);

  // Gamification & Scoring
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [bonusEarnedThisQuestion, setBonusEarnedThisQuestion] = useState<{ speed: number; streak: number } | null>(null);

  // Live Timer / Stopwatch (Total time in seconds)
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<any>(null);
  const questionStartTimeRef = useRef<number>(0);

  // Leaderboard state
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [currentRank, setCurrentRank] = useState<number | null>(null);

  // Answers breakdown history for submission
  const [answersHistory, setAnswersHistory] = useState<QuizAnswerRecord[]>([]);

  // Current question data
  const currentQ: RegulationQuizQuestion = REGULATION_QUIZ_QUESTIONS[currentQuestionIndex];
  const isAnswered = selectedAnswers[currentQ?.id] !== undefined;
  const isLastQuestion = currentQuestionIndex === REGULATION_QUIZ_QUESTIONS.length - 1;

  // Active section indicator
  const currentSectionNumber = Math.floor(currentQuestionIndex / 5) + 1;
  const currentQuestionInSection = (currentQuestionIndex % 5) + 1;

  // Sync profile when prop changes
  useEffect(() => {
    setFormData({ ...profile });
  }, [profile]);

  // Load leaderboard initially
  useEffect(() => {
    setLeaderboard(getLeaderboard());
  }, []);

  // Timer runner
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTotalSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  // Format seconds into mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  // -------------------------------------------------------------
  // STEP 1: VALIDATE AND START CHALLENGE
  // -------------------------------------------------------------
  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) errors.fullName = 'El nombre completo es obligatorio';
    if (!formData.documentNumber.trim()) errors.documentNumber = 'El documento es obligatorio';
    if (!formData.fichaNumber.trim()) errors.fichaNumber = 'La ficha SENA es obligatoria';
    if (!formData.trainingProgram.trim()) errors.trainingProgram = 'El programa de formación es obligatorio';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (onUpdateProfile) {
      onUpdateProfile(formData);
    }

    // Reset quiz state and start stopwatch
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setTotalPoints(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setTotalSeconds(0);
    setAnswersHistory([]);
    setIsTimerRunning(true);
    questionStartTimeRef.current = Date.now();
    setStage('quiz');
  };

  // -------------------------------------------------------------
  // STEP 2: ANSWER SELECTION & REINFORCEMENT CALCULATION
  // -------------------------------------------------------------
  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return;

    const timeSpentOnQ = Math.max(1, Math.round((Date.now() - questionStartTimeRef.current) / 1000));
    const isCorrect = optionIndex === currentQ.correctAnswer;

    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optionIndex }));
    setShowExplanation(true);

    let speedBonus = 0;
    let streakBonus = 0;
    let pointsThisQuestion = 0;

    if (isCorrect) {
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      // Streak Bonus
      if (newStreak >= 10) streakBonus = 100;
      else if (newStreak >= 5) streakBonus = 50;
      else if (newStreak >= 3) streakBonus = 25;

      // Speed Bonus (rewards quick correct decisions under 15 seconds)
      if (timeSpentOnQ <= 5) speedBonus = 50;
      else if (timeSpentOnQ <= 10) speedBonus = 30;
      else if (timeSpentOnQ <= 15) speedBonus = 15;

      pointsThisQuestion = 100 + speedBonus + streakBonus;
      setTotalPoints((prev) => prev + pointsThisQuestion);
      setBonusEarnedThisQuestion({ speed: speedBonus, streak: streakBonus });

      // Celebration micro-burst
      try {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.7 },
          colors: ['#39A900', '#10b981', '#ffffff']
        });
      } catch {
        // Fallback
      }
    } else {
      // Mistake: reset streak, zero points for this question
      setCurrentStreak(0);
      setBonusEarnedThisQuestion(null);
    }

    // Save answer record to breakdown history
    const answerRecord: QuizAnswerRecord = {
      questionId: currentQ.id,
      questionText: currentQ.question,
      selectedOptionIndex: optionIndex,
      selectedOptionText: currentQ.options[optionIndex],
      isCorrect,
      correctAnswerText: currentQ.options[currentQ.correctAnswer],
      sectionTitle: currentQ.sectionTitle,
      articleReference: currentQ.articleReference,
      timeSpentSeconds: timeSpentOnQ,
      pointsEarned: pointsThisQuestion,
    };

    setAnswersHistory((prev) => [...prev, answerRecord]);
  };

  // Next question or finish
  const handleNextQuestion = () => {
    if (isLastQuestion) {
      finishQuiz();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowExplanation(false);
      setBonusEarnedThisQuestion(null);
      questionStartTimeRef.current = Date.now();
    }
  };

  // -------------------------------------------------------------
  // STEP 3: FINISH & GAMIFIED LEADERBOARD SYNC
  // -------------------------------------------------------------
  const finishQuiz = () => {
    setIsTimerRunning(false);
    onComplete();

    // Calculate accuracy
    const correctCount = Object.entries(selectedAnswers).filter(([qId, ansIdx]) => {
      const q = REGULATION_QUIZ_QUESTIONS.find((item) => item.id === Number(qId));
      return q && q.correctAnswer === ansIdx;
    }).length;

    const totalQ = REGULATION_QUIZ_QUESTIONS.length;
    const scorePct = Math.round((correctCount / totalQ) * 100);
    const passed = scorePct >= 70;
    const formattedTime = formatTime(totalSeconds);

    // Compute Badges
    const earnedBadges: string[] = [];
    if (scorePct === 100) earnedBadges.push('🎯 Precisión Imbatible 100%');
    else if (scorePct >= 90) earnedBadges.push('🎯 Precisión Élite');

    if (totalSeconds < 180) earnedBadges.push('⚡ Relámpago SENA (< 3 min)');
    else if (totalSeconds < 300) earnedBadges.push('⏱️ Velocidad Ágil');

    if (maxStreak >= 15) earnedBadges.push('🔥 Racha Legendaria (+15)');
    else if (maxStreak >= 8) earnedBadges.push('🔥 Racha Imparable (+8)');

    earnedBadges.push('🛡️ Maestro Acuerdo 009 de 2024');

    // Create and save official submission (Spreadsheet logic)
    const verificationCode = `SENA-IND-${formData.fichaNumber || '7789'}-${(formData.documentNumber || '1020').slice(-4)}`;

    const submission: ApprenticeSubmission = {
      id: `sub-${formData.fichaNumber || '7789'}-${formData.documentNumber || Date.now()}`,
      timestamp: new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }),
      profile: formData,
      progress: { ...progress, quiz: true },
      progressPercent: 100,
      quizScorePercent: scorePct,
      quizCorrectCount: correctCount,
      quizTotalQuestions: totalQ,
      quizPassed: passed,
      quizAnswers: answersHistory,
      certificateCode: verificationCode,
      gamifiedPoints: totalPoints,
      timeElapsedSeconds: totalSeconds,
      timeFormatted: formattedTime,
      streakMax: maxStreak,
      badges: earnedBadges,
      syncedToSheets: false,
    };

    saveSubmission(submission);

    // Save entry to Gamified Leaderboard
    const leaderboardEntry: LeaderboardEntry = {
      id: `entry-${Date.now()}`,
      fullName: formData.fullName,
      fichaNumber: formData.fichaNumber,
      trainingProgram: formData.trainingProgram,
      regional: formData.regional,
      points: totalPoints,
      correctCount,
      totalQuestions: totalQ,
      scorePercent: scorePct,
      timeElapsedSeconds: totalSeconds,
      timeFormatted: formattedTime,
      streakMax: maxStreak,
      badges: earnedBadges,
      date: new Date().toLocaleDateString('es-CO'),
      isCurrentApprentice: true,
    };

    const updatedLeaderboard = saveLeaderboardEntry(leaderboardEntry);
    setLeaderboard(updatedLeaderboard);

    // Find ranking position (1-indexed)
    const rankIndex = updatedLeaderboard.findIndex((e) => e.id === leaderboardEntry.id);
    setCurrentRank(rankIndex >= 0 ? rankIndex + 1 : null);

    setStage('results');

    // Victory celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#39A900', '#10b981', '#f59e0b', '#3b82f6', '#ffffff']
      });
    } catch {
      // Fallback
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setTotalPoints(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setTotalSeconds(0);
    setAnswersHistory([]);
    setStage('profile_check');
  };

  // Stats calculation
  const correctCount = Object.entries(selectedAnswers).filter(([qId, ansIndex]) => {
    const q = REGULATION_QUIZ_QUESTIONS.find((item) => item.id === Number(qId));
    return q && q.correctAnswer === ansIndex;
  }).length;

  const scorePercent = Math.round((correctCount / REGULATION_QUIZ_QUESTIONS.length) * 100);
  const hasPassed = scorePercent >= 70;

  return (
    <div className="space-y-6 py-2 max-w-5xl mx-auto">
      {/* Top Header & Sub-Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#39A900] uppercase tracking-wide">
            <Trophy className="w-4 h-4" />
            <span>Módulo de Evaluación Unificada · Acuerdo No. 0009 de 2024</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Desafío Gamificado del Reglamento del Aprendiz
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            25 preguntas oficiales (5 por cada sección del reglamento) con cronómetro en vivo, refuerzo pedagógico inmediato y ranking institucional.
          </p>
        </div>

        {/* View Switcher: Evaluation vs. Leaderboard */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setStage(stage === 'leaderboard' ? (isAnswered ? 'quiz' : 'profile_check') : 'leaderboard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              stage === 'leaderboard'
                ? 'bg-amber-500 text-white border-amber-600 shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Medal className="w-4 h-4 text-amber-300" />
            <span>{stage === 'leaderboard' ? 'Volver a la Prueba' : 'Ver Ranking Gamificado'}</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* STAGE 1: APPRENTICE DATA REGISTRATION / CONFIRMATION           */}
      {/* ============================================================== */}
      {stage === 'profile_check' && (
        <div className="glass-panel bg-white dark:bg-[#0c1322] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl space-y-8 animate-fade-in">
          <div className="flex items-start gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-[#39A900]/15 text-[#39A900] flex items-center justify-center font-bold shrink-0 border border-[#39A900]/30 shadow-sm">
              <User className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#39A900]">
                Paso 1: Identificación del Aprendiz
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                Ingresa y Verifica tus Datos Institucionales
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Tus respuestas, puntaje gamificado y tiempo de resolución quedarán registrados con estos datos en el sistema institucional y en la hoja de cálculo del instructor.
              </p>
            </div>
          </div>

          <form onSubmit={handleStartQuiz} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Full Name */}
              <div className="md:col-span-2 space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Nombre Completo del Aprendiz *</span>
                  {formErrors.fullName && <span className="text-red-500 text-[11px]">{formErrors.fullName}</span>}
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Ej: Laura Marcela Gómez Pérez"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-[#39A900] focus:ring-2 focus:ring-[#39A900]/20"
                />
              </div>

              {/* Document Type & Number */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Tipo de Documento</label>
                <select
                  value={formData.documentType}
                  onChange={(e) => setFormData({ ...formData, documentType: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-[#39A900]"
                >
                  <option value="CC">Cédula de Ciudadanía (CC)</option>
                  <option value="TI">Tarjeta de Identidad (TI)</option>
                  <option value="PPT">Permiso por Protección Temporal (PPT)</option>
                  <option value="CE">Cédula de Extranjería (CE)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Número de Documento *</span>
                  {formErrors.documentNumber && <span className="text-red-500 text-[11px]">{formErrors.documentNumber}</span>}
                </label>
                <input
                  type="text"
                  value={formData.documentNumber}
                  onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                  placeholder="Ej: 1020304050"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-[#39A900]"
                />
              </div>

              {/* Ficha & Program */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Número de Ficha SENA *</span>
                  {formErrors.fichaNumber && <span className="text-red-500 text-[11px]">{formErrors.fichaNumber}</span>}
                </label>
                <input
                  type="text"
                  value={formData.fichaNumber}
                  onChange={(e) => setFormData({ ...formData, fichaNumber: e.target.value })}
                  placeholder="Ej: 2824901"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-[#39A900]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Programa de Formación *</span>
                  {formErrors.trainingProgram && <span className="text-red-500 text-[11px]">{formErrors.trainingProgram}</span>}
                </label>
                <input
                  type="text"
                  value={formData.trainingProgram}
                  onChange={(e) => setFormData({ ...formData, trainingProgram: e.target.value })}
                  placeholder="Ej: Análisis y Desarrollo de Software (ADSO)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-[#39A900]"
                />
              </div>

              {/* Center & Regional */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Centro de Formación</label>
                <input
                  type="text"
                  value={formData.trainingCenter}
                  onChange={(e) => setFormData({ ...formData, trainingCenter: e.target.value })}
                  placeholder="Ej: Centro de Electricidad, Electrónica y Telecomunicaciones"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-[#39A900]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Regional SENA</label>
                <select
                  value={formData.regional}
                  onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-[#39A900]"
                >
                  {SENA_REGIONALES.map((reg) => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>

              {/* Instructor Name */}
              <div className="md:col-span-2 space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Instructor Líder de Ficha</label>
                <input
                  type="text"
                  value={formData.instructorName}
                  onChange={(e) => setFormData({ ...formData, instructorName: e.target.value })}
                  placeholder="Ej: Ing. Carlos Alberto Rodríguez"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-[#39A900]"
                />
              </div>
            </div>

            {/* Gamification Explainer Pill */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-xs text-emerald-900 dark:text-emerald-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Zap className="w-4 h-4 text-[#39A900]" />
                <span>¿Cómo funciona el Desafío Gamificado?</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] pt-1">
                <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-emerald-200/60 dark:border-emerald-800/40">
                  <span className="font-bold block text-slate-900 dark:text-white">🎯 25 Preguntas</span>
                  <span className="text-slate-600 dark:text-slate-400">5 preguntas de cada una de las 5 secciones del reglamento.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-emerald-200/60 dark:border-emerald-800/40">
                  <span className="font-bold block text-slate-900 dark:text-white">⏱️ Cronómetro Activo</span>
                  <span className="text-slate-600 dark:text-slate-400">Responder rápido y bien suma puntos de agilidad para el podio.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-emerald-200/60 dark:border-emerald-800/40">
                  <span className="font-bold block text-slate-900 dark:text-white">🔥 Rachas & Refuerzo</span>
                  <span className="text-slate-600 dark:text-slate-400">Explicaciones claras en aciertos y retroalimentación pedagógica en errores.</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#39A900] hover:bg-[#319200] text-white text-sm font-extrabold transition-all shadow-lg hover:shadow-emerald-500/25 cursor-pointer transform hover:scale-[1.02]"
              >
                <span>Comenzar Desafío Gamificado</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ============================================================== */}
      {/* STAGE 2: GAMIFIED QUESTION PRESENTATION WITH LIVE CLOCK        */}
      {/* ============================================================== */}
      {stage === 'quiz' && currentQ && (
        <div className="space-y-5 animate-fade-in">
          {/* Gamified HUD: Clock, Points, Streak, Section badge */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {/* Live Clock / Stopwatch */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[10px] block font-semibold uppercase">Tiempo Empleado</span>
                <span className="text-lg font-black text-slate-900 dark:text-white font-mono tabular-nums">
                  {formatTime(totalSeconds)}
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-500 flex items-center justify-center animate-pulse">
                <Timer className="w-5 h-5" />
              </div>
            </div>

            {/* Total Points */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[10px] block font-semibold uppercase">Puntaje Gamificado</span>
                <span className="text-lg font-black text-[#39A900] font-mono tabular-nums">
                  {totalPoints} pts
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
            </div>

            {/* Streak Counter */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[10px] block font-semibold uppercase">Racha de Aciertos</span>
                <span className="text-lg font-black text-amber-500 font-mono tabular-nums">
                  {currentStreak} {currentStreak >= 3 ? '🔥' : ''}
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center">
                <Flame className={`w-5 h-5 ${currentStreak >= 3 ? 'animate-bounce' : ''}`} />
              </div>
            </div>

            {/* Section Progress Counter */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[10px] block font-semibold uppercase">Sección {currentSectionNumber} de 5</span>
                <span className="text-lg font-black text-slate-900 dark:text-white font-mono tabular-nums">
                  Pregunta {currentQuestionInSection}/5
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Overall 25-Question Progress Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#39A900]" />
                <span className="truncate max-w-[280px] sm:max-w-none text-[#39A900] font-extrabold">{currentQ.sectionTitle}</span>
              </span>
              <span className="font-mono text-slate-500">
                Pregunta {currentQuestionIndex + 1} de {REGULATION_QUIZ_QUESTIONS.length}
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-[#39A900] transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / REGULATION_QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* The Question Card */}
          <div className="glass-panel bg-white dark:bg-[#0c1322] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
            {/* Question Text */}
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono border border-slate-200 dark:border-slate-700">
                {currentQ.articleReference}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === idx;
                const isCorrectOption = idx === currentQ.correctAnswer;

                let btnStyles = 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200';

                if (isAnswered) {
                  if (isCorrectOption) {
                    btnStyles = 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-950 dark:text-emerald-100 shadow-md ring-2 ring-emerald-500/20';
                  } else if (isSelected && !isCorrectOption) {
                    btnStyles = 'bg-red-50 dark:bg-red-950/80 border-red-500 text-red-950 dark:text-red-100 ring-2 ring-red-500/20';
                  } else {
                    btnStyles = 'opacity-40 bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer disabled:cursor-default ${btnStyles}`}
                  >
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      isAnswered && isCorrectOption
                        ? 'bg-[#39A900] text-white'
                        : isAnswered && isSelected
                        ? 'bg-red-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm font-medium leading-snug flex-1">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ============================================================== */}
            {/* IMMEDIATE REINFORCEMENT: POSITIVE VS ERROR DIAGNOSIS           */}
            {/* ============================================================== */}
            {isAnswered && (
              <div className="pt-2 animate-fade-in space-y-4">
                {selectedAnswers[currentQ.id] === currentQ.correctAnswer ? (
                  /* POSITIVE REINFORCEMENT CARD */
                  <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border-2 border-emerald-500/80 shadow-md space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#39A900]" />
                        <span className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">
                          ¡Excelente Razonamiento Normativo!
                        </span>
                      </div>
                      {/* Gamification Floating Tags */}
                      <div className="flex items-center gap-1.5 font-mono text-xs">
                        <span className="px-2 py-0.5 rounded-full bg-[#39A900] text-white font-bold">
                          +100 Pts Base
                        </span>
                        {bonusEarnedThisQuestion?.speed ? (
                          <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white font-bold flex items-center gap-0.5">
                            <Zap className="w-3 h-3" />
                            +{bonusEarnedThisQuestion.speed} Vel.
                          </span>
                        ) : null}
                        {bonusEarnedThisQuestion?.streak ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold flex items-center gap-0.5">
                            <Flame className="w-3 h-3" />
                            +{bonusEarnedThisQuestion.streak} Racha
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed font-medium">
                      {currentQ.positiveReinforcement}
                    </p>
                    <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800/80 text-[11px] text-emerald-700 dark:text-emerald-400 font-mono">
                      <strong>Fundamento: </strong>{currentQ.officialRule}
                    </div>
                  </div>
                ) : (
                  /* CONSTRUCTIVE ERROR REINFORCEMENT & DIAGNOSIS CARD */
                  <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-500/80 shadow-md space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-rose-600" />
                        <span className="text-sm font-extrabold text-rose-900 dark:text-rose-200">
                          ¡Atención pedagógica! Análisis de tu respuesta
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white font-mono text-xs font-bold">
                        Racha reiniciada
                      </span>
                    </div>

                    {/* Detailed Diagnosis */}
                    <div className="space-y-1.5 text-xs text-rose-900 dark:text-rose-200">
                      <div>
                        <strong className="block text-rose-800 dark:text-rose-300 font-bold">
                          ¿En qué fallaste / Punto de confusión?
                        </strong>
                        <p className="text-rose-800 dark:text-rose-300/90 leading-relaxed">
                          {currentQ.errorDiagnosis}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-rose-200 dark:border-rose-900/60">
                        <strong className="block text-emerald-700 dark:text-emerald-400 font-bold">
                          Regla Oficial SENA (Acuerdo 0009 de 2024):
                        </strong>
                        <p className="text-emerald-800 dark:text-emerald-300 leading-relaxed font-medium">
                          {currentQ.officialRule}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Next Button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-2 px-7 py-3 rounded-xl bg-[#39A900] hover:bg-[#319200] text-white text-xs font-extrabold transition-all shadow-md cursor-pointer transform hover:scale-[1.02]"
                  >
                    <span>{isLastQuestion ? 'Finalizar y Ver Ranking' : 'Siguiente Pregunta'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* STAGE 3: RESULTS SCREEN & INSTITUTIONAL CONFIRMATION           */}
      {/* ============================================================== */}
      {stage === 'results' && (
        <div className="glass-panel bg-white dark:bg-[#0c1322] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center space-y-8 animate-fade-in shadow-2xl">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-[#39A900]/15 text-[#39A900] flex items-center justify-center border-2 border-[#39A900]/30 shadow-lg">
            <Trophy className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#39A900]">
              Resultado Oficial del Desafío
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {hasPassed ? '¡Felicitaciones, Acreditación Exitosa!' : 'Prueba Culminada'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
              {hasPassed
                ? `Has demostrado un alto dominio de las 5 secciones del Reglamento del Aprendiz (Acuerdo 0009 de 2024), ${formData.fullName}.`
                : 'Has completado la prueba de 25 preguntas. Revisa tus fallos y vuelve a intentar para mejorar tu posición en el ranking.'}
            </p>
          </div>

          {/* Bento Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-3xl mx-auto text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block font-semibold">Puntaje Gamificado</span>
              <span className="text-2xl font-black text-[#39A900] font-mono mt-1 block">
                {totalPoints} pts
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block font-semibold">Aciertos Totales</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
                {correctCount}/{REGULATION_QUIZ_QUESTIONS.length}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block font-semibold">Tiempo Empleado</span>
              <span className="text-2xl font-black text-blue-500 font-mono mt-1 block">
                {formatTime(totalSeconds)}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block font-semibold">Posición Ranking</span>
              <span className="text-2xl font-black text-amber-500 font-mono mt-1 block">
                #{currentRank || 1} {currentRank === 1 ? '🥇' : currentRank === 2 ? '🥈' : currentRank === 3 ? '🥉' : ''}
              </span>
            </div>
          </div>

          {/* Institutional Confirmation Card */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-xs text-emerald-900 dark:text-emerald-200 max-w-2xl mx-auto flex items-center justify-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#39A900] shrink-0" />
            <span className="text-left leading-relaxed">
              <strong>Registro Institucional Completado: </strong> Tus datos ({formData.fullName}, Ficha {formData.fichaNumber}), respuestas y tiempo ({formatTime(totalSeconds)}) fueron guardados conforme a la lógica de la hoja de cálculo del instructor.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setStage('leaderboard')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Medal className="w-4 h-4 text-white" />
              <span>Ver Tabla de Posiciones</span>
            </button>

            <button
              onClick={handleRestartQuiz}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Repetir Desafío</span>
            </button>

            <button
              onClick={onGoToCertificate}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#39A900] hover:bg-[#319200] text-white text-xs font-extrabold transition-all shadow-lg hover:shadow-emerald-500/25 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Ver mi Certificado Oficial</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* STAGE 4: GAMIFIED LEADERBOARD (TABLA DE POSICIONES SENA)       */}
      {/* ============================================================== */}
      {stage === 'leaderboard' && (
        <div className="glass-panel bg-white dark:bg-[#0c1322] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/30">
                <Medal className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                  Ranking Gamificado SENA
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Tabla de Posiciones de Inducción
                </h3>
                <p className="text-xs text-slate-400">
                  Clasificación por respuestas correctas, agilidad de tiempo y racha consecutiva
                </p>
              </div>
            </div>

            <button
              onClick={() => setStage(isAnswered ? 'results' : 'profile_check')}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Volver a la Evaluación
            </button>
          </div>

          {/* Podium Top 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
            {leaderboard.slice(0, 3).map((entry, idx) => {
              const medals = ['🥇 1.er Lugar', '🥈 2.º Lugar', '🥉 3.er Lugar'];
              const borders = [
                'border-amber-400 bg-amber-50/50 dark:bg-amber-950/20',
                'border-slate-300 bg-slate-50 dark:bg-slate-900/40',
                'border-amber-700/50 bg-amber-900/10'
              ];

              return (
                <div 
                  key={entry.id} 
                  className={`p-5 rounded-2xl border-2 ${borders[idx]} flex flex-col justify-between space-y-3 relative overflow-hidden`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase font-mono tracking-wider">
                      {medals[idx]}
                    </span>
                    <span className="font-mono font-black text-base text-[#39A900]">
                      {entry.points} pts
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white truncate" title={entry.fullName}>
                      {entry.fullName}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-mono">
                      Ficha {entry.fichaNumber} · {entry.regional}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60 dark:border-slate-800/80 font-mono text-slate-600 dark:text-slate-400">
                    <span>⏱️ {entry.timeFormatted}</span>
                    <span>🎯 {entry.correctCount}/{entry.totalQuestions} ({entry.scorePercent}%)</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full Table */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4 text-center">#</th>
                    <th className="py-3 px-4">Aprendiz</th>
                    <th className="py-3 px-4">Ficha & Regional</th>
                    <th className="py-3 px-4 text-center">Puntos Gamificados</th>
                    <th className="py-3 px-4 text-center">Aciertos</th>
                    <th className="py-3 px-4 text-center">Tiempo</th>
                    <th className="py-3 px-4">Insignias</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {leaderboard.map((item, index) => {
                    const isSelf = item.isCurrentApprentice || (item.fullName.toLowerCase() === formData.fullName.toLowerCase() && item.fichaNumber === formData.fichaNumber);

                    return (
                      <tr 
                        key={item.id} 
                        className={`transition-colors ${
                          isSelf 
                            ? 'bg-emerald-50/70 dark:bg-emerald-950/40 font-semibold' 
                            : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <td className="py-3.5 px-4 text-center font-bold font-mono">
                          {index === 0 ? '🥇 1' : index === 1 ? '🥈 2' : index === 2 ? '🥉 3' : `${index + 1}`}
                        </td>
                        <td className="py-3.5 px-4 text-slate-900 dark:text-white font-semibold">
                          <div className="flex items-center gap-1.5">
                            <span>{item.fullName}</span>
                            {isSelf && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#39A900] text-white font-bold">
                                Tú
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 font-mono">
                          Ficha {item.fichaNumber} · {item.regional}
                        </td>
                        <td className="py-3.5 px-4 text-center font-black font-mono text-[#39A900]">
                          {item.points} pts
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono">
                          {item.correctCount}/{item.totalQuestions} ({item.scorePercent}%)
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono text-blue-500">
                          {item.timeFormatted}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1">
                            {item.badges.slice(0, 2).map((badge, bIdx) => (
                              <span 
                                key={bIdx}
                                className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
