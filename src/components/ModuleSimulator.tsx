import React, { useState } from 'react';
import { SIMULATION_CASES } from '../data/senaData';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Award, 
  ShieldAlert,
  BookOpen
} from 'lucide-react';

interface ModuleSimulatorProps {
  onComplete: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

export const ModuleSimulator: React.FC<ModuleSimulatorProps> = ({
  onComplete,
  isCompleted,
  onNextModule,
}) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [solvedCases, setSolvedCases] = useState<Record<string, boolean>>({});

  const currentCase = SIMULATION_CASES[currentCaseIndex];
  const isLastCase = currentCaseIndex === SIMULATION_CASES.length - 1;

  const handleSelectOption = (optionId: string) => {
    if (selectedOptionId) return;

    setSelectedOptionId(optionId);
    const chosen = currentCase.options.find(o => o.id === optionId);
    if (chosen && chosen.isCorrect) {
      setTotalScore(prev => prev + chosen.points);
      setSolvedCases(prev => ({ ...prev, [currentCase.id]: true }));
    }
  };

  const handleNextCase = () => {
    if (isLastCase) {
      onComplete();
    } else {
      setCurrentCaseIndex(prev => prev + 1);
      setSelectedOptionId(null);
    }
  };

  const handleResetSimulation = () => {
    setCurrentCaseIndex(0);
    setSelectedOptionId(null);
    setTotalScore(0);
    setSolvedCases({});
  };

  const selectedOption = currentCase.options.find(o => o.id === selectedOptionId);
  const solvedCount = Object.keys(solvedCases).length;

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] uppercase tracking-wide">
            <span>Módulo 05</span>
            <span aria-hidden="true">·</span>
            <span>Toma de Decisiones Éticas</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Simulador de Casos del Reglamento
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Ponte en los zapatos de un aprendiz frente a situaciones de la vida real. Analiza el dilema, toma la decisión correcta y fundamenta tu actuar según la normativa SENA.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <Award className="w-4 h-4 text-[#39A900]" />
            <span>Puntaje Ético: {totalScore} pts</span>
          </div>
        </div>
      </div>

      {/* Simulator Stage */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        {/* Case Progression Indicator */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 font-mono">
              Caso {currentCaseIndex + 1} de {SIMULATION_CASES.length}
            </span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
              {currentCase.title}
            </span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Casos resueltos: <span className="font-bold text-[#39A900]">{solvedCount}/{SIMULATION_CASES.length}</span>
          </div>
        </div>

        {/* Case Context Box */}
        <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
            <BookOpen className="w-4 h-4 text-[#39A900]" />
            <span>Situación / Contexto</span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {currentCase.context}
          </p>
          <div className="pt-2 text-xs font-bold text-slate-900 dark:text-white border-t border-slate-200/60 dark:border-slate-700 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <span>Dilema: {currentCase.dilemma}</span>
          </div>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            ¿Qué decisión tomarías tú?
          </span>

          <div className="space-y-2.5">
            {currentCase.options.map((option, idx) => {
              const isSelected = selectedOptionId === option.id;
              let optionStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200';

              if (selectedOptionId) {
                if (option.isCorrect) {
                  optionStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-[#39A900] text-emerald-950 dark:text-emerald-200 ring-1 ring-emerald-500 font-medium';
                } else if (isSelected && !option.isCorrect) {
                  optionStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 text-rose-950 dark:text-rose-200 font-medium';
                } else {
                  optionStyle = 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  disabled={!!selectedOptionId}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-3 ${optionStyle}`}
                >
                  <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-xs shrink-0 text-slate-600 dark:text-slate-300 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <div className="flex-1">
                    <p>{option.text}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback Section (Visible after choice) */}
        {selectedOption && (
          <div className={`p-5 rounded-xl border animate-fade-in ${
            selectedOption.isCorrect 
              ? 'bg-emerald-50/80 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200' 
              : 'bg-rose-50/80 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {selectedOption.isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
                    ¡Decisión Ética Correcta! (+{selectedOption.points} pts)
                  </h4>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                  <h4 className="text-sm font-bold text-rose-900 dark:text-rose-300">
                    Conducta no conforme con el Reglamento
                  </h4>
                </>
              )}
            </div>

            <p className="text-xs sm:text-sm leading-relaxed mb-3">
              {selectedOption.explanation}
            </p>

            <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-700 inline-flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>Fundamento Normativo: {selectedOption.articleReference}</span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-end">
              <button
                onClick={handleNextCase}
                className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#319200] rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <span>{isLastCase ? 'Finalizar Simulador' : 'Siguiente Caso'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Completion Card if finished */}
        {isLastCase && selectedOptionId && (
          <div className="bg-emerald-900 text-white p-6 rounded-xl text-center space-y-3 border border-emerald-800">
            <Sparkles className="w-8 h-8 text-emerald-300 mx-auto" />
            <h4 className="text-lg font-bold">¡Simulador Concluido con Éxito!</h4>
            <p className="text-xs text-slate-200 max-w-lg mx-auto">
              Has demostrado un alto sentido de responsabilidad ética y comprensión del debido proceso del SENA.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={handleResetSimulation}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-200 hover:text-white bg-slate-800 rounded-lg cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar Casos</span>
              </button>
              <button
                onClick={() => {
                  onComplete();
                  onNextModule();
                }}
                className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg shadow-sm cursor-pointer"
              >
                <span>Ir al Desafío Institucional</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Siguiente: Módulo 06 · Desafío Institucional (Evaluación Diagnóstica)
        </span>
        <button
          onClick={() => {
            onComplete();
            onNextModule();
          }}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#319200] rounded-xl shadow-sm transition-colors cursor-pointer"
        >
          <span>Continuar al Desafío</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
