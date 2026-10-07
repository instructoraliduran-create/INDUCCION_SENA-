import React from 'react';
import { InductionTab, ApprenticeProfile } from '../types/induction';
import { Award, UserCheck, Moon, Sun, Shield } from 'lucide-react';

interface NavbarProps {
  activeTab: InductionTab;
  onSelectTab: (tab: InductionTab) => void;
  profile: ApprenticeProfile;
  onOpenProfileModal: () => void;
  progressPercent: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  isAdminModeActive?: boolean;
  onOpenAdminPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  profile,
  onOpenProfileModal,
  progressPercent,
  darkMode,
  onToggleDarkMode,
  isAdminModeActive = false,
  onOpenAdminPortal,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-[#070B14]/85 border-b border-slate-200/70 dark:border-slate-800/70 transition-colors duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Single text element wordmark with brand identity */}
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => onSelectTab('overview')}
              className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
            >
              {/* SENA institutional emblem icon (52px - increased by 30% for high visibility) */}
              <div className="w-[52px] h-[52px] min-w-[52px] min-h-[52px] rounded-xl bg-white dark:bg-slate-800 p-1 border border-slate-200/90 dark:border-slate-700 shadow-sm flex items-center justify-center group-hover:scale-[1.03] transition-all duration-200">
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 1000 1000"
                  className="w-full h-full"
                  aria-hidden="true"
                >
                  <path
                    id="path47-5"
                    fill="#39a900"
                    d="M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6 c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6 c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3 c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1 l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4 c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2 c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1 l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z M280.6,268.9 l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z M557.5,269c0,0-51.9,0-77.9,0l0,137.7 l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7 l13.9,24.9l68.8,0L874,269.2L805.6,269.2z M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z M10.6,445.6l0.5,75l280.1-1 c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9 c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699 c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z"
                  />
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-[#39A900] transition-colors leading-tight">
                  SENA Inducción
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Servicio Nacional de Aprendizaje
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Clean 4-6 text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => onSelectTab('overview')}
              className={`transition-colors whitespace-nowrap pb-1 cursor-pointer ${
                activeTab === 'overview'
                  ? 'text-[#39A900] border-b-2 border-[#39A900] font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => onSelectTab('identity')}
              className={`transition-colors whitespace-nowrap pb-1 cursor-pointer ${
                activeTab === 'identity'
                  ? 'text-[#39A900] border-b-2 border-[#39A900] font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Identidad & Símbolos
            </button>
            <button
              onClick={() => onSelectTab('regulations')}
              className={`transition-colors whitespace-nowrap pb-1 cursor-pointer ${
                activeTab === 'regulations'
                  ? 'text-[#39A900] border-b-2 border-[#39A900] font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Reglamento
            </button>
            <button
              onClick={() => onSelectTab('stages')}
              className={`transition-colors whitespace-nowrap pb-1 cursor-pointer ${
                activeTab === 'stages'
                  ? 'text-[#39A900] border-b-2 border-[#39A900] font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Etapas FPI
            </button>
            <button
              onClick={() => onSelectTab('wellbeing')}
              className={`transition-colors whitespace-nowrap pb-1 cursor-pointer ${
                activeTab === 'wellbeing'
                  ? 'text-[#39A900] border-b-2 border-[#39A900] font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Bienestar
            </button>
            <button
              onClick={() => onSelectTab('simulator')}
              className={`transition-colors whitespace-nowrap pb-1 cursor-pointer ${
                activeTab === 'simulator'
                  ? 'text-[#39A900] border-b-2 border-[#39A900] font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Simulador
            </button>
            <button
              onClick={() => onSelectTab('quiz')}
              className={`transition-colors whitespace-nowrap pb-1 cursor-pointer ${
                activeTab === 'quiz'
                  ? 'text-[#39A900] border-b-2 border-[#39A900] font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Desafío
            </button>
          </nav>

          {/* Zone 3: Actions + Dark Mode Toggle on the upper right */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick Profile Pill / Action */}
            <button
              onClick={onOpenProfileModal}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200/80 dark:border-slate-700/80 cursor-pointer"
              title="Configurar datos del aprendiz"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#39A900]" />
              <span className="truncate max-w-[120px] font-semibold">{profile.fullName || 'Aprendiz'}</span>
              <span className="text-slate-400 dark:text-slate-500">·</span>
              <span className="text-slate-500 dark:text-slate-400 font-mono">Ficha {profile.fichaNumber || 'SENA'}</span>
            </button>

            {/* Instructor Access Badge (Protected by PIN) */}
            <button
              onClick={onOpenAdminPortal}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                isAdminModeActive
                  ? 'border border-[#39A900]/40 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#39A900] dark:hover:text-emerald-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700'
              }`}
              title={isAdminModeActive ? 'Abrir Panel del Instructor (Activo)' : 'Acceso de Instructor (Protegido por PIN)'}
            >
              <Shield className={`w-3.5 h-3.5 ${isAdminModeActive ? 'text-[#39A900]' : 'text-slate-500 dark:text-slate-400'}`} />
              <span className="hidden sm:inline">{isAdminModeActive ? 'Panel Instructor' : 'Instructor'}</span>
              {isAdminModeActive && (
                <span className="w-2 h-2 rounded-full bg-[#39A900] animate-pulse" />
              )}
            </button>

            {/* Certificate Action */}
            <button
              onClick={() => onSelectTab('certificate')}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#319200] rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Certificado</span>
              <span className="hidden md:inline-block font-mono bg-black/15 text-white/95 text-[10px] px-1.5 py-0.5 rounded">
                {progressPercent}%
              </span>
            </button>

            {/* Dark Mode Toggle with Blue Glow Effect Accent on rightmost position */}
            <button
              onClick={onToggleDarkMode}
              aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro (con efecto azul)'}
              className="relative p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center text-slate-700 dark:text-blue-300 bg-slate-100 dark:bg-slate-800/90 border-slate-200 dark:border-blue-900/60 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-[0_0_14px_rgba(59,130,246,0.4)] active:scale-95"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-blue-600 transition-transform rotate-0 hover:-rotate-12" />
              )}
              {/* Subtle Blue Indicator Dot */}
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-slate-900" />
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto py-2 border-t border-slate-100 dark:border-slate-800 text-xs no-scrollbar">
          <button
            onClick={() => onSelectTab('overview')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap cursor-pointer ${
              activeTab === 'overview' ? 'bg-[#39A900] text-white font-medium' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => onSelectTab('identity')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap cursor-pointer ${
              activeTab === 'identity' ? 'bg-[#39A900] text-white font-medium' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Identidad
          </button>
          <button
            onClick={() => onSelectTab('regulations')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap cursor-pointer ${
              activeTab === 'regulations' ? 'bg-[#39A900] text-white font-medium' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Reglamento
          </button>
          <button
            onClick={() => onSelectTab('stages')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap cursor-pointer ${
              activeTab === 'stages' ? 'bg-[#39A900] text-white font-medium' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Etapas
          </button>
          <button
            onClick={() => onSelectTab('wellbeing')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap cursor-pointer ${
              activeTab === 'wellbeing' ? 'bg-[#39A900] text-white font-medium' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Bienestar
          </button>
          <button
            onClick={() => onSelectTab('simulator')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap cursor-pointer ${
              activeTab === 'simulator' ? 'bg-[#39A900] text-white font-medium' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Simulador
          </button>
          <button
            onClick={() => onSelectTab('quiz')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap cursor-pointer ${
              activeTab === 'quiz' ? 'bg-[#39A900] text-white font-medium' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Desafío
          </button>
          <button
            onClick={onOpenProfileModal}
            className="px-2.5 py-1 rounded-md whitespace-nowrap text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 font-medium cursor-pointer"
          >
            Mi Ficha
          </button>
          <button
            onClick={onOpenAdminPortal}
            className="px-2.5 py-1 rounded-md whitespace-nowrap text-slate-700 dark:text-slate-200 bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] border border-[#39A900]/30 font-medium cursor-pointer"
          >
            Instructor
          </button>
        </div>
      </div>
    </header>
  );
};
