import { ApprenticeProfile, ModuleProgress, ApprenticeSubmission, QuizAnswerRecord, LeaderboardEntry } from '../types/induction';

const STORAGE_KEY = 'sena_apprentice_submissions';
const LEADERBOARD_KEY = 'sena_gamified_leaderboard';
const PIN_KEY = 'sena_admin_pin';
const ADMIN_SESSION_KEY = 'sena_admin_session_active';
const DEFAULT_PIN = 'sena2024';

const INITIAL_MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lead-1',
    fullName: 'Laura Marcela Gómez Pérez',
    fichaNumber: '2824901',
    trainingProgram: 'ADSO',
    regional: 'Distrito Capital',
    points: 3450,
    correctCount: 25,
    totalQuestions: 25,
    scorePercent: 100,
    timeElapsedSeconds: 154,
    timeFormatted: '02:34',
    streakMax: 25,
    badges: ['🎯 Precisión 100%', '⚡ Relámpago SENA', '🔥 Racha Legendaria'],
    date: '07/10/2026'
  },
  {
    id: 'lead-2',
    fullName: 'Mateo Alejandro Ríos',
    fichaNumber: '2751890',
    trainingProgram: 'Gestión Redes de Datos',
    regional: 'Antioquia',
    points: 3180,
    correctCount: 24,
    totalQuestions: 25,
    scorePercent: 96,
    timeElapsedSeconds: 182,
    timeFormatted: '03:02',
    streakMax: 18,
    badges: ['🎯 Precisión Élite', '🛡️ Experto en Reglamento'],
    date: '07/10/2026'
  },
  {
    id: 'lead-3',
    fullName: 'Valentina Restrepo Henao',
    fichaNumber: '2893201',
    trainingProgram: 'Biotecnología',
    regional: 'Caldas',
    points: 2940,
    correctCount: 23,
    totalQuestions: 25,
    scorePercent: 92,
    timeElapsedSeconds: 215,
    timeFormatted: '03:35',
    streakMax: 14,
    badges: ['🔥 Racha de Fuego', '🛡️ Defensor del Debido Proceso'],
    date: '07/10/2026'
  },
  {
    id: 'lead-4',
    fullName: 'Andrés Felipe Morales Castro',
    fichaNumber: '2824901',
    trainingProgram: 'ADSO',
    regional: 'Distrito Capital',
    points: 2750,
    correctCount: 22,
    totalQuestions: 25,
    scorePercent: 88,
    timeElapsedSeconds: 248,
    timeFormatted: '04:08',
    streakMax: 11,
    badges: ['🛡️ Normatividad SENA'],
    date: '07/10/2026'
  }
];

const INITIAL_MOCK_SUBMISSIONS: ApprenticeSubmission[] = [
  {
    id: 'sub-2824901-1020304050',
    timestamp: '07/10/2026, 08:30 a. m.',
    profile: {
      fullName: 'Laura Marcela Gómez Pérez',
      documentType: 'CC',
      documentNumber: '1020304050',
      fichaNumber: '2824901',
      trainingProgram: 'Análisis y Desarrollo de Software (ADSO)',
      trainingCenter: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
      regional: 'Regional Distrito Capital',
      instructorName: 'Ing. Carlos Alberto Rodríguez'
    },
    progress: {
      identity: true,
      regulations: true,
      stages: true,
      wellbeing: true,
      simulator: true,
      quiz: true
    },
    progressPercent: 100,
    quizScorePercent: 90,
    quizCorrectCount: 9,
    quizTotalQuestions: 10,
    quizPassed: true,
    certificateCode: 'SENA-IND-2824901-4050',
    syncedToSheets: true,
    syncedAt: '07/10/2026, 08:35 a. m.',
    quizAnswers: [
      {
        questionId: 1,
        questionText: '¿Cuál es el significado del color verde en la bandera del SENA?',
        selectedOptionIndex: 0,
        selectedOptionText: 'La tranquilidad, la esperanza en el futuro y la naturaleza de Colombia',
        isCorrect: true,
        correctAnswerText: 'La tranquilidad, la esperanza en el futuro y la naturaleza de Colombia',
        category: 'identidad'
      },
      {
        questionId: 2,
        questionText: '¿Qué norma rige el actual Reglamento del Aprendiz SENA?',
        selectedOptionIndex: 0,
        selectedOptionText: 'Acuerdo No. 0009 de 2024',
        isCorrect: true,
        correctAnswerText: 'Acuerdo No. 0009 de 2024',
        category: 'reglamento'
      }
    ]
  },
  {
    id: 'sub-2824901-1033445566',
    timestamp: '07/10/2026, 09:15 a. m.',
    profile: {
      fullName: 'Andrés Felipe Morales Castro',
      documentType: 'CC',
      documentNumber: '1033445566',
      fichaNumber: '2824901',
      trainingProgram: 'Análisis y Desarrollo de Software (ADSO)',
      trainingCenter: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
      regional: 'Regional Distrito Capital',
      instructorName: 'Ing. Carlos Alberto Rodríguez'
    },
    progress: {
      identity: true,
      regulations: true,
      stages: true,
      wellbeing: true,
      simulator: true,
      quiz: true
    },
    progressPercent: 100,
    quizScorePercent: 80,
    quizCorrectCount: 8,
    quizTotalQuestions: 10,
    quizPassed: true,
    certificateCode: 'SENA-IND-2824901-5566',
    syncedToSheets: false,
    quizAnswers: [
      {
        questionId: 1,
        questionText: '¿Cuál es el significado del color verde en la bandera del SENA?',
        selectedOptionIndex: 0,
        selectedOptionText: 'La tranquilidad, la esperanza en el futuro y la naturaleza de Colombia',
        isCorrect: true,
        correctAnswerText: 'La tranquilidad, la esperanza en el futuro y la naturaleza de Colombia',
        category: 'identidad'
      }
    ]
  },
  {
    id: 'sub-2751890-1098765432',
    timestamp: '07/10/2026, 10:05 a. m.',
    profile: {
      fullName: 'Valentina Restrepo Henao',
      documentType: 'TI',
      documentNumber: '1098765432',
      fichaNumber: '2751890',
      trainingProgram: 'Gestión Redes de Datos',
      trainingCenter: 'Centro de Tecnologías de la Información (CTI)',
      regional: 'Regional Antioquia',
      instructorName: 'Lic. Fernando Ospina'
    },
    progress: {
      identity: true,
      regulations: true,
      stages: true,
      wellbeing: true,
      simulator: true,
      quiz: true
    },
    progressPercent: 100,
    quizScorePercent: 100,
    quizCorrectCount: 10,
    quizTotalQuestions: 10,
    quizPassed: true,
    certificateCode: 'SENA-IND-2751890-5432',
    syncedToSheets: false,
    quizAnswers: []
  }
];

export const getSubmissions = (): ApprenticeSubmission[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_SUBMISSIONS));
      return INITIAL_MOCK_SUBMISSIONS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading submissions from localStorage', err);
    return INITIAL_MOCK_SUBMISSIONS;
  }
};

export const saveSubmission = (submission: ApprenticeSubmission): void => {
  try {
    const current = getSubmissions();
    const existingIndex = current.findIndex(s => 
      s.id === submission.id || 
      (s.profile.documentNumber === submission.profile.documentNumber && s.profile.fichaNumber === submission.profile.fichaNumber)
    );

    let updated: ApprenticeSubmission[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = {
        ...submission,
        // preserve previous sync status if it was already synced and nothing fundamental changed
        syncedToSheets: current[existingIndex].syncedToSheets ? false : submission.syncedToSheets,
      };
    } else {
      updated = [submission, ...current];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving submission to localStorage', err);
  }
};

export const updateSubmissionSyncStatus = (id: string, synced: boolean): void => {
  try {
    const current = getSubmissions();
    const updated = current.map(item => {
      if (item.id === id) {
        return {
          ...item,
          syncedToSheets: synced,
          syncedAt: synced ? new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }) : item.syncedAt,
        };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error updating submission sync status', err);
  }
};

export const deleteSubmission = (id: string): void => {
  try {
    const current = getSubmissions();
    const updated = current.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error deleting submission', err);
  }
};

export const clearAllSubmissions = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } catch (err) {
    console.error('Error clearing submissions', err);
  }
};

// ==========================================
// ADMIN PIN AND AUTHENTICATION
// ==========================================
export const getAdminPin = (): string => {
  return localStorage.getItem(PIN_KEY) || DEFAULT_PIN;
};

export const setAdminPin = (newPin: string): boolean => {
  if (!newPin || newPin.trim().length < 4) return false;
  localStorage.setItem(PIN_KEY, newPin.trim());
  return true;
};

export const validateAdminPin = (inputPin: string): boolean => {
  const currentPin = getAdminPin();
  return inputPin.trim() === currentPin;
};

export const isAdminSessionActive = (): boolean => {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  } catch {
    return false;
  }
};

export const setAdminSessionActive = (active: boolean): void => {
  try {
    if (active) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
    } else {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    }
  } catch {
    // fallback
  }
};

// ==========================================
// GAMIFIED LEADERBOARD (RANKING)
// ==========================================
export const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(INITIAL_MOCK_LEADERBOARD));
      return INITIAL_MOCK_LEADERBOARD;
    }
    const list: LeaderboardEntry[] = JSON.parse(raw);
    return list.sort((a, b) => b.points - a.points || a.timeElapsedSeconds - b.timeElapsedSeconds);
  } catch (err) {
    console.error('Error reading leaderboard from localStorage', err);
    return INITIAL_MOCK_LEADERBOARD;
  }
};

export const saveLeaderboardEntry = (entry: LeaderboardEntry): LeaderboardEntry[] => {
  try {
    const current = getLeaderboard();
    // Check if apprentice with same ficha and name already exists
    const filtered = current.filter(e => 
      !(e.fichaNumber === entry.fichaNumber && e.fullName.toLowerCase() === entry.fullName.toLowerCase())
    );
    const updated = [...filtered, entry].sort((a, b) => 
      b.points - a.points || a.timeElapsedSeconds - b.timeElapsedSeconds
    );
    // Keep top 20
    const trimmed = updated.slice(0, 20);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmed));
    return trimmed;
  } catch (err) {
    console.error('Error saving to leaderboard', err);
    return getLeaderboard();
  }
};

// ==========================================
// EXPORT HELPERS (CSV & JSON)
// ==========================================
export const exportSubmissionsToCSV = (submissions: ApprenticeSubmission[]): void => {
  const headers = [
    'Fecha y Hora',
    'Nombre Completo',
    'Tipo Documento',
    'Documento',
    'Ficha SENA',
    'Programa',
    'Centro de Formacion',
    'Regional',
    'Instructor',
    'Avance (%)',
    'Puntaje Evaluacion (%)',
    'Puntos Gamificados',
    'Tiempo Empleado',
    'Aciertos',
    'Estado',
    'Codigo Certificado',
    'Sincronizado en Drive'
  ];

  const rows = submissions.map(s => [
    `"${s.timestamp}"`,
    `"${s.profile.fullName.replace(/"/g, '""')}"`,
    `"${s.profile.documentType}"`,
    `"${s.profile.documentNumber}"`,
    `"${s.profile.fichaNumber}"`,
    `"${s.profile.trainingProgram.replace(/"/g, '""')}"`,
    `"${s.profile.trainingCenter.replace(/"/g, '""')}"`,
    `"${s.profile.regional.replace(/"/g, '""')}"`,
    `"${s.profile.instructorName.replace(/"/g, '""')}"`,
    `"${s.progressPercent}%"`,
    `"${s.quizScorePercent}%"`,
    `"${s.gamifiedPoints || 0} pts"`,
    `"${s.timeFormatted || 'N/A'}"`,
    `"${s.quizCorrectCount}/${s.quizTotalQuestions}"`,
    `"${s.quizPassed ? 'Aprobado' : 'Pendiente'}"`,
    `"${s.certificateCode}"`,
    `"${s.syncedToSheets ? 'Sí' : 'No'}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `SENA_Induccion_Aprendices_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportSubmissionsToJSON = (submissions: ApprenticeSubmission[]): void => {
  const jsonString = JSON.stringify(submissions, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `SENA_Induccion_Reporte_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
