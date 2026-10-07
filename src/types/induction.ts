export interface ApprenticeProfile {
  fullName: string;
  documentType: 'CC' | 'TI' | 'PPT' | 'CE';
  documentNumber: string;
  fichaNumber: string;
  trainingProgram: string;
  trainingCenter: string;
  regional: string;
  instructorName: string;
}

export type InductionTab = 
  | 'overview'
  | 'identity'
  | 'regulations'
  | 'stages'
  | 'wellbeing'
  | 'simulator'
  | 'quiz'
  | 'certificate';

export interface ModuleProgress {
  identity: boolean;
  regulations: boolean;
  stages: boolean;
  wellbeing: boolean;
  simulator: boolean;
  quiz: boolean;
}

export interface SimulationCase {
  id: string;
  title: string;
  context: string;
  dilemma: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
    articleReference: string;
    points: number;
  }[];
}

export type RegulationSectionKey = 
  | 'cap1_definiciones'
  | 'cap2_derechos'
  | 'cap3_deberes'
  | 'cap4_tramites'
  | 'cap5_disciplinario';

export interface RegulationQuizQuestion {
  id: number;
  sectionKey: RegulationSectionKey;
  sectionTitle: string;
  articleReference: string;
  question: string;
  options: string[];
  correctAnswer: number;
  positiveReinforcement: string;
  errorDiagnosis: string;
  officialRule: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'identidad' | 'reglamento' | 'etapas' | 'bienestar';
}

export interface SenaValue {
  name: string;
  description: string;
  application: string;
}

export interface ProductiveAlternative {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  keyBenefit: string;
  supportType: string;
}

export interface QuizAnswerRecord {
  questionId: number;
  questionText: string;
  selectedOptionIndex: number;
  selectedOptionText: string;
  isCorrect: boolean;
  correctAnswerText: string;
  category?: string;
  sectionTitle?: string;
  articleReference?: string;
  timeSpentSeconds?: number;
  pointsEarned?: number;
}

export interface LeaderboardEntry {
  id: string;
  fullName: string;
  fichaNumber: string;
  trainingProgram: string;
  regional: string;
  points: number;
  correctCount: number;
  totalQuestions: number;
  scorePercent: number;
  timeElapsedSeconds: number;
  timeFormatted: string;
  streakMax: number;
  badges: string[];
  date: string;
  isCurrentApprentice?: boolean;
}

export interface ApprenticeSubmission {
  id: string;
  timestamp: string;
  profile: ApprenticeProfile;
  progress: ModuleProgress;
  progressPercent: number;
  quizScorePercent: number;
  quizCorrectCount: number;
  quizTotalQuestions: number;
  quizPassed: boolean;
  quizAnswers: QuizAnswerRecord[];
  certificateCode: string;
  gamifiedPoints?: number;
  timeElapsedSeconds?: number;
  timeFormatted?: string;
  streakMax?: number;
  badges?: string[];
  syncedToSheets: boolean;
  syncedAt?: string;
}
