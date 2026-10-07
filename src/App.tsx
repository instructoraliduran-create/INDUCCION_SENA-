/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { InductionTab, ApprenticeProfile, ModuleProgress } from './types/induction';
import { Navbar } from './components/Navbar';
import { ApprenticeProfileModal } from './components/ApprenticeProfileModal';
import { ModuleOverview } from './components/ModuleOverview';
import { ModuleIdentity } from './components/ModuleIdentity';
import { ModuleRegulation } from './components/ModuleRegulation';
import { ModuleTrainingStages } from './components/ModuleTrainingStages';
import { ModuleWellbeing } from './components/ModuleWellbeing';
import { ModuleSimulator } from './components/ModuleSimulator';
import { ModuleQuiz } from './components/ModuleQuiz';
import { CertificateView } from './components/CertificateView';
import { AdminPortalModal } from './components/AdminPortalModal';
import { initAuth } from './services/googleAuth';
import { isAdminSessionActive } from './services/submissionsStore';
import { RotateCcw, Lock, Shield } from 'lucide-react';

const DEFAULT_PROFILE: ApprenticeProfile = {
  fullName: "Laura Marcela Gómez Pérez",
  documentType: "CC",
  documentNumber: "1020304050",
  fichaNumber: "2824901",
  trainingProgram: "Análisis y Desarrollo de Software (ADSO)",
  trainingCenter: "Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)",
  regional: "Regional Distrito Capital",
  instructorName: "Ing. Carlos Alberto Rodríguez"
};

const DEFAULT_PROGRESS: ModuleProgress = {
  identity: false,
  regulations: false,
  stages: false,
  wellbeing: false,
  simulator: false,
  quiz: false,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<InductionTab>('overview');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isAdminModeActive, setIsAdminModeActive] = useState<boolean>(() => isAdminSessionActive());
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Dark Mode state with localStorage persistence
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sena_dark_mode');
      if (saved !== null) {
        return saved === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Animated Blue Effect state
  const [isBlueEffectActive, setIsBlueEffectActive] = useState<boolean>(false);

  // Synchronize 'dark' class on HTML root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('sena_dark_mode', String(darkMode));
  }, [darkMode]);

  // Listen to Google Auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => setCurrentUser(user),
      () => setCurrentUser(null)
    );
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  // Handler for toggle with blue blur effect
  const handleToggleDarkMode = () => {
    setIsBlueEffectActive(true);
    setDarkMode(prev => !prev);
    setTimeout(() => {
      setIsBlueEffectActive(false);
    }, 850);
  };

  // Initialize Apprentice Profile from LocalStorage
  const [profile, setProfile] = useState<ApprenticeProfile>(() => {
    try {
      const saved = localStorage.getItem('sena_apprentice_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Initialize Progress from LocalStorage
  const [progress, setProgress] = useState<ModuleProgress>(() => {
    try {
      const saved = localStorage.getItem('sena_module_progress');
      return saved ? JSON.parse(saved) : DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('sena_apprentice_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('sena_module_progress', JSON.stringify(progress));
  }, [progress]);

  const markModuleCompleted = (moduleKey: keyof ModuleProgress) => {
    setProgress((prev) => ({
      ...prev,
      [moduleKey]: true,
    }));
  };

  const handleResetProgress = () => {
    if (window.confirm('¿Deseas reiniciar tu progreso de inducción para realizar un nuevo recorrido de prueba?')) {
      setProgress(DEFAULT_PROGRESS);
    }
  };

  const completedCount = Object.values(progress).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 6) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070B14] text-slate-800 dark:text-slate-100 ambient-glow-bg transition-colors duration-200 relative selection:bg-[#39A900] selection:text-white">
      {/* Blue Glow & Blur Pulse Effect Overlay during theme change */}
      {isBlueEffectActive && (
        <div 
          className="fixed inset-0 z-50 pointer-events-none animate-blue-effect"
          aria-hidden="true"
        />
      )}

      {/* Institutional Top Navbar with Dark Mode Toggle & Conditional Instructor Badge */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        profile={profile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        progressPercent={progressPercent}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        isAdminModeActive={isAdminModeActive}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <ModuleOverview
            onNavigate={setActiveTab}
            profile={profile}
            progress={progress}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}

        {activeTab === 'identity' && (
          <ModuleIdentity
            onComplete={() => markModuleCompleted('identity')}
            isCompleted={progress.identity}
            onNextModule={() => setActiveTab('regulations')}
          />
        )}

        {activeTab === 'regulations' && (
          <ModuleRegulation
            onComplete={() => markModuleCompleted('regulations')}
            isCompleted={progress.regulations}
            onNextModule={() => setActiveTab('stages')}
          />
        )}

        {activeTab === 'stages' && (
          <ModuleTrainingStages
            onComplete={() => markModuleCompleted('stages')}
            isCompleted={progress.stages}
            onNextModule={() => setActiveTab('wellbeing')}
          />
        )}

        {activeTab === 'wellbeing' && (
          <ModuleWellbeing
            onComplete={() => markModuleCompleted('wellbeing')}
            isCompleted={progress.wellbeing}
            onNextModule={() => setActiveTab('simulator')}
          />
        )}

        {activeTab === 'simulator' && (
          <ModuleSimulator
            onComplete={() => markModuleCompleted('simulator')}
            isCompleted={progress.simulator}
            onNextModule={() => setActiveTab('quiz')}
          />
        )}

        {activeTab === 'quiz' && (
          <ModuleQuiz
            onComplete={() => markModuleCompleted('quiz')}
            isCompleted={progress.quiz}
            onGoToCertificate={() => setActiveTab('certificate')}
            profile={profile}
            onUpdateProfile={setProfile}
            progress={progress}
          />
        )}

        {activeTab === 'certificate' && (
          <CertificateView
            profile={profile}
            progress={progress}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}
      </main>

      {/* Institutional Clean Footer */}
      <footer className="no-print bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-16 py-8 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#39A900] text-white flex items-center justify-center shadow-xs shrink-0">
              <svg viewBox="0 0 64 64" className="w-4 h-4 fill-current" aria-hidden="true">
                <circle cx="32" cy="14" r="7" />
                <path d="M28 26h8v15h-8z" />
                <path d="M19 31l9-6v7l-9 5z" />
                <path d="M37 25l9 6l-4 5l-5-4z" />
                <path d="M27 41l-8 18h7l5-12z" />
                <path d="M37 41l8 18h-7l-5-12z" />
              </svg>
            </div>
            <span>
              Servicio Nacional de Aprendizaje (SENA) · Dirección de Formación Profesional
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
            <span>Formación Gratuita y Pública</span>
            <span aria-hidden="true">·</span>
            {/* Protected Instructor Access in footer */}
            <button
              onClick={() => setIsAdminPortalOpen(true)}
              className="hover:text-[#39A900] dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-slate-500 dark:text-slate-400 hover:font-medium"
              title="Acceso protegido para instructores y administración"
            >
              <Lock className="w-3.5 h-3.5 text-[#39A900]" />
              <span>Portal Instructor / Admin</span>
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={handleResetProgress}
              className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
              title="Reiniciar progreso para demostración"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reiniciar progreso</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Profile Edit Modal */}
      <ApprenticeProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSave={setProfile}
      />

      {/* Protected Administrator & Instructor Portal Modal */}
      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        currentUser={currentUser}
        onUserChange={setCurrentUser}
        onAdminStateChange={setIsAdminModeActive}
      />
    </div>
  );
}
