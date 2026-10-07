import React from 'react';
import { WELLBEING_DIMENSIONS, DIGITAL_ECOSYSTEM } from '../data/senaData';
import { 
  CheckCircle2, 
  ArrowRight, 
  Laptop, 
  DollarSign, 
  Activity
} from 'lucide-react';

interface ModuleWellbeingProps {
  onComplete: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

export const ModuleWellbeing: React.FC<ModuleWellbeingProps> = ({
  onComplete,
  isCompleted,
  onNextModule,
}) => {
  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] uppercase tracking-wide">
            <span>Módulo 04</span>
            <span aria-hidden="true">·</span>
            <span>Comunidad & Servicios</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Bienestar al Aprendiz & Ecosistema Digital
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Descubre los programas de apoyo socioeconómico, salud, cultura, deportes y las plataformas tecnológicas oficiales que acompañan tu formación.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onComplete}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              isCompleted
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'bg-[#39A900] text-white hover:bg-[#319200] shadow-sm'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Módulo Completado' : 'Marcar como Leído'}</span>
          </button>
        </div>
      </div>

      {/* 6 Dimensiones de Bienestar */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wide">
            Desarrollo Integral
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Las 6 Dimensiones del Plan de Bienestar
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            El Plan Nacional Integral de Bienestar al Aprendiz fortalece tus competencias humanas, emocionales y físicas:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {WELLBEING_DIMENSIONS.map((dim, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200/90 dark:border-slate-800 hover:border-[#39A900] dark:hover:border-[#39A900] transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center font-bold text-xs shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{dim.title}</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {dim.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                Dimensión Institucional 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Apoyos Socioeconómicos Spotlight */}
      <div className="bg-emerald-950 text-white p-6 sm:p-8 rounded-2xl relative overflow-hidden border border-emerald-900">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wide">
            <DollarSign className="w-4 h-4" />
            <span>Oportunidades de Inclusión</span>
          </div>

          <h3 className="text-2xl font-bold text-white">
            Apoyos de Sostenimiento (Regular y FIC)
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            Si te encuentras en situación de vulnerabilidad económica (estratos 1 y 2, SISBÉN o población víctima), 
            puedes postularte a las convocatorias institucionales semestrales que realiza la Coordinación de Bienestar:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-white/10 dark:bg-slate-900/50 rounded-xl p-4 border border-white/15 dark:border-emerald-800/40">
              <strong className="block text-emerald-300 text-xs mb-1 font-semibold">
                Apoyo de Sostenimiento Regular
              </strong>
              <p className="text-xs text-slate-200">
                Aporte monetario mensual equivalente al 50% de un SMLMV para cubrir gastos de alimentación y transporte durante la etapa lectiva.
              </p>
            </div>

            <div className="bg-white/10 dark:bg-slate-900/50 rounded-xl p-4 border border-white/15 dark:border-emerald-800/40">
              <strong className="block text-emerald-300 text-xs mb-1 font-semibold">
                Fondo FIC (Sector Construcción)
              </strong>
              <p className="text-xs text-slate-200">
                Dirigido exclusivamente a aprendices de programas de formación del sector de la construcción, obras civiles y edificaciones.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ecosistema Digital SENA */}
      <div className="space-y-4 pt-2">
        <div>
          <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wide">
            Herramientas Tecnológicas
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Ecosistema de Plataformas Digitales
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Durante tu permanencia en el SENA interactuarás a diario con estos sistemas oficiales:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DIGITAL_ECOSYSTEM.map((tool, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                    {tool.badge}
                  </span>
                  <Laptop className="w-4 h-4 text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">{tool.name}</h3>
                <span className="block text-xs text-slate-500 dark:text-slate-400 font-medium">{tool.tagline}</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Acceso con documento de identidad</span>
                <span className="font-semibold text-[#39A900]">Uso Obligatorio</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Siguiente: Módulo 05 · Simulador de Casos Reales
        </span>
        <button
          onClick={() => {
            onComplete();
            onNextModule();
          }}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#319200] rounded-xl shadow-sm transition-colors cursor-pointer"
        >
          <span>Continuar al Simulador</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
