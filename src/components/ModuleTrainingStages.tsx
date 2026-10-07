import React, { useState } from 'react';
import { PRODUCTIVE_ALTERNATIVES } from '../data/senaData';
import { SENA_ASSETS } from '../data/assets';
import { 
  Briefcase, 
  CheckCircle2, 
  GraduationCap, 
  ArrowRight, 
  Check, 
  Coins
} from 'lucide-react';

interface ModuleTrainingStagesProps {
  onComplete: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

export const ModuleTrainingStages: React.FC<ModuleTrainingStagesProps> = ({
  onComplete,
  isCompleted,
  onNextModule,
}) => {
  const [selectedAltId, setSelectedAltId] = useState<string>('contrato');

  const selectedAlt = PRODUCTIVE_ALTERNATIVES.find(a => a.id === selectedAltId) || PRODUCTIVE_ALTERNATIVES[0];

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] uppercase tracking-wide">
            <span>Módulo 03</span>
            <span aria-hidden="true">·</span>
            <span>Ruta Curricular</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Etapas de la Formación Profesional Integral (FPI)
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Comprende la articulación entre la Etapa Lectiva en ambientes de aprendizaje y las 6 alternativas oficiales de la Etapa Productiva para titularte con éxito.
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

      {/* Lectiva vs Productiva Stage Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Etapa Lectiva */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md">
                Fase Inicial · 50% a 70% de la Formación
              </span>
              <GraduationCap className="w-5 h-5 text-[#39A900]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              1. Etapa Lectiva
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Periodo en el que el aprendiz adquiere y apropia los conocimientos técnicos, tecnológicos, actitudinales y sociales en los ambientes de formación y talleres del SENA.
            </p>
            <div className="mt-5 space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                <span>Desarrollo de proyectos formativos guiados por instructores.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                <span>Entrega de evidencias de conocimiento, desempeño y producto en ZAJUNA.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                <span>Competencias transversales: Bilingüismo, TIC, Seguridad y Salud, Ética y Emprendimiento.</span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Ambiente SENA & ZAJUNA</span>
            <span>Evaluación Formativa</span>
          </div>
        </div>

        {/* Etapa Productiva */}
        <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-slate-800 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800 px-2.5 py-1 rounded-md">
                Fase de Aplicación · 6 Meses (864 Horas)
              </span>
              <Briefcase className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white">
              2. Etapa Productiva
            </h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Periodo donde el aprendiz aplica, complementa y consolida sus competencias en situaciones reales del sector empresarial, social o productivo de Colombia.
            </p>
            <div className="mt-5 space-y-2 text-xs text-slate-200">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Registro y seguimiento obligatorio de bitácoras quincenales.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Supervisión y visitas de concertación y evaluación por el instructor de seguimiento.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Requisito ineludible para la certificación técnica o tecnológica oficial.</span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono relative z-10">
            <span>Sector Empresarial / Real</span>
            <span>Juicio Evaluativo Definitivo</span>
          </div>
        </div>
      </div>

      {/* Apprentices Workshop Image Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="h-44 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={SENA_ASSETS.apprenticesWorkshop}
            alt="Aprendices en taller técnico SENA"
            className="w-full h-full object-cover object-center filter brightness-95"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800">
          <span>
            <strong>"Aprender Haciendo":</strong> Metodología activa que conecta la teoría aplicada con el entorno real de trabajo.
          </span>
          <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
            Formación Gratuita e Incluyente
          </span>
        </div>
      </div>

      {/* 6 Modalidades Oficiales de Etapa Productiva */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wide">
            Opciones de Graduación
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Las 6 Alternativas Oficiales para tu Etapa Productiva
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Selecciona cada opción para examinar sus beneficios, requisitos indispensables y modalidad económica:
          </p>
        </div>

        {/* Alternative Grid Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {PRODUCTIVE_ALTERNATIVES.map((alt) => (
            <button
              key={alt.id}
              onClick={() => setSelectedAltId(alt.id)}
              className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                selectedAltId === alt.id
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-[#39A900] text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/20'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750'
              }`}
            >
              <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-mono mb-1">{alt.supportType}</span>
              <span className="truncate block font-bold">{alt.title.split('.')[1] || alt.title}</span>
            </button>
          ))}
        </div>

        {/* Selected Alternative Detail Card */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-6 border border-slate-200 dark:border-slate-700/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {selectedAlt.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {selectedAlt.description}
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                <Coins className="w-3.5 h-3.5" />
                {selectedAlt.supportType}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide mb-2">
                Requisitos Clave
              </h5>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {selectedAlt.requirements.map((req, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39A900] mt-1.5 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <h5 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide mb-1">
                Beneficio Principal
              </h5>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                {selectedAlt.keyBenefit}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                Recuerda registrar cada avance en el aplicativo <strong>Caprendizaje (SGVA)</strong> y subir tus bitácoras a la plataforma <strong>ZAJUNA</strong>.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Siguiente: Módulo 04 · Bienestar al Aprendiz y Servicios
        </span>
        <button
          onClick={() => {
            onComplete();
            onNextModule();
          }}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#319200] rounded-xl shadow-sm transition-colors cursor-pointer"
        >
          <span>Continuar a Bienestar</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
