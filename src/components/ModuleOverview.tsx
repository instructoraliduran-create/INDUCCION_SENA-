import React from 'react';
import { InductionTab, ApprenticeProfile, ModuleProgress } from '../types/induction';
import { SENA_ASSETS } from '../data/assets';
import { 
  Compass, 
  BookOpen, 
  Briefcase, 
  Heart, 
  HelpCircle, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Users, 
  Shield, 
  Layers,
  QrCode,
  Flame,
  Clock,
  ChevronRight,
  FileSpreadsheet
} from 'lucide-react';

interface ModuleOverviewProps {
  onNavigate: (tab: InductionTab) => void;
  profile: ApprenticeProfile;
  progress: ModuleProgress;
  onOpenProfile: () => void;
  onOpenDriveRegistry?: () => void;
}

export const ModuleOverview: React.FC<ModuleOverviewProps> = ({
  onNavigate,
  profile,
  progress,
  onOpenProfile,
  onOpenDriveRegistry,
}) => {
  const completedCount = Object.values(progress).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 6) * 100);

  // SVG Circular Gauge calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const modules = [
    {
      id: 'identity' as InductionTab,
      number: '01',
      title: 'Identidad & Símbolos',
      subtitle: 'Historia de 1957, fundador, escudo, bandera, himno y valores',
      icon: Compass,
      completed: progress.identity,
      duration: '15 min',
      accentColor: 'from-emerald-500/20 to-[#39A900]/10',
      badge: 'Patrimonio'
    },
    {
      id: 'regulations' as InductionTab,
      number: '02',
      title: 'Reglamento del Aprendiz',
      subtitle: 'Acuerdo 0009 de 2024: definiciones, derechos, deberes, tipificación de faltas y debido proceso',
      icon: BookOpen,
      completed: progress.regulations,
      duration: '20 min',
      accentColor: 'from-blue-500/20 to-indigo-500/10',
      badge: 'Normativa'
    },
    {
      id: 'stages' as InductionTab,
      number: '03',
      title: 'Etapas de Formación FPI',
      subtitle: 'Etapa lectiva y las 6 alternativas oficiales de etapa productiva',
      icon: Briefcase,
      completed: progress.stages,
      duration: '15 min',
      accentColor: 'from-teal-500/20 to-emerald-500/10',
      badge: 'Ruta Laboral'
    },
    {
      id: 'wellbeing' as InductionTab,
      number: '04',
      title: 'Bienestar al Aprendiz',
      subtitle: 'Salud, cultura, deporte, apoyos socioeconómicos y ZAJUNA',
      icon: Heart,
      completed: progress.wellbeing,
      duration: '15 min',
      accentColor: 'from-rose-500/20 to-orange-500/10',
      badge: 'Comunidad'
    },
    {
      id: 'simulator' as InductionTab,
      number: '05',
      title: 'Simulador de Casos Reales',
      subtitle: 'Toma de decisiones éticas y resolución práctica de dilemas formativos',
      icon: HelpCircle,
      completed: progress.simulator,
      duration: '15 min',
      accentColor: 'from-amber-500/20 to-yellow-500/10',
      badge: 'Interactiva'
    },
    {
      id: 'quiz' as InductionTab,
      number: '06',
      title: 'Desafío del Reglamento',
      subtitle: '25 preguntas (5 por sección) con cronómetro en vivo, refuerzo pedagógico y ranking',
      icon: Award,
      completed: progress.quiz,
      duration: '15 min',
      accentColor: 'from-emerald-500/30 to-[#39A900]/20',
      badge: 'Gamificada'
    },
  ];

  return (
    <div className="space-y-10 py-2">
      {/* ============================================================== */}
      {/* BENTO GRID HERO & COMMAND CENTER (Magnific Inspired)          */}
      {/* ============================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Hero Card (lg:col-span-8) */}
        <div className="lg:col-span-8 relative overflow-hidden rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl flex flex-col justify-between p-8 sm:p-10 lg:p-12">
          {/* Background Ambient Layer & Real Campus Photo */}
          <div className="absolute inset-0 z-0">
            <img
              src={SENA_ASSETS.campusModern}
              alt="Campus Tecnológico SENA"
              className="w-full h-full object-cover opacity-20 filter saturate-150 contrast-125"
              referrerPolicy="no-referrer"
            />
            {/* Ambient Multi-Layer Scrim & Radial Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/85 to-slate-900/60" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#39A900]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Top Tagline Pill */}
          <div className="relative z-10 flex items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-semibold text-emerald-300 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#39A900] animate-pulse" />
              <span>INDUCCIÓN INSTITUCIONAL SENA · 2026</span>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
              Formación Profesional Integral
            </span>
          </div>

          {/* Headline and Intro */}
          <div className="relative z-10 space-y-4 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
              Construye tu Futuro en la Entidad de Todos los Colombianos
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Bienvenido(a), <strong className="text-white font-semibold">{profile.fullName || 'Aprendiz'}</strong>. 
              Inicia tu viaje por la identidad institucional, domina el reglamento, explora las alternativas de etapa productiva y certifícate.
            </p>
          </div>

          {/* Action Row */}
          <div className="relative z-10 mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('identity')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#39A900] hover:bg-[#319200] text-white font-semibold text-sm shadow-[0_0_20px_rgba(57,169,0,0.35)] hover:shadow-[0_0_28px_rgba(57,169,0,0.5)] transition-all cursor-pointer group"
              >
                <span>Iniciar Inducción</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('simulator')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-sm font-semibold border border-slate-700/80 hover:border-slate-500 backdrop-blur-md transition-all cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Simulador de Casos</span>
              </button>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#39A900]" />
              <span>Tiempo estimado: ~1h 30m</span>
            </div>
          </div>
        </div>

        {/* Bento Side Card: Holographic Apprentice ID & Circular Gauge (lg:col-span-4) */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Header of Apprentice Card */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#39A900] text-white flex items-center justify-center font-black text-xs shadow-sm">
                SENA
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Ficha Digital
                </h3>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  {profile.documentType} {profile.documentNumber}
                </span>
              </div>
            </div>
            <button
              onClick={onOpenProfile}
              className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              Editar
            </button>
          </div>

          {/* Radial Progress Gauge Section */}
          <div className="flex items-center justify-center gap-6 py-2">
            {/* SVG Circular Progress Meter */}
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-100 dark:text-slate-800"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  stroke="#39A900"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-slate-900 dark:text-white font-mono tabular-nums leading-none">
                  {progressPercent}%
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-0.5">
                  Avance
                </span>
              </div>
            </div>

            {/* Gauge Subtext Details */}
            <div className="space-y-1 text-xs">
              <span className="block font-bold text-slate-900 dark:text-white">
                {completedCount} de 6 Estaciones
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {progressPercent === 100
                  ? '¡Excelente! Has alcanzado la acreditación total.'
                  : 'Completa cada módulo para habilitar tu certificado digital.'}
              </p>
              <button
                onClick={() => onNavigate('certificate')}
                className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-[#39A900] hover:text-[#319200] cursor-pointer"
              >
                <span>Reclamar Certificado</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Apprentice Metadata Chips */}
          <div className="bg-slate-100/70 dark:bg-slate-800/60 rounded-2xl p-4 space-y-2 border border-slate-200/60 dark:border-slate-700/60 text-xs">
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span className="text-slate-400">Ficha:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{profile.fichaNumber}</span>
            </div>
            <div className="flex justify-between items-start text-slate-600 dark:text-slate-300 gap-2">
              <span className="text-slate-400 shrink-0">Programa:</span>
              <span className="font-semibold text-right text-slate-900 dark:text-white line-clamp-1">
                {profile.trainingProgram}
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span className="text-slate-400">Regional:</span>
              <span className="font-medium">{profile.regional}</span>
            </div>

            <div className="w-full mt-2 pt-2 border-t border-slate-200 dark:border-slate-700/80 flex items-center justify-between text-slate-500 dark:text-slate-400 text-[11px]">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#39A900]" />
                <span>Estado Institucional:</span>
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {progressPercent === 100 ? 'Acreditación Completa' : 'Formación en Proceso'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* BENTO MODULES ROADMAP (Modular Tiles)                           */}
      {/* ============================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#39A900]">
              Mapa Curricular
            </span>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Las 6 Estaciones de la Inducción
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Paso a Paso
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                onClick={() => onNavigate(m.id)}
                className={`group relative rounded-3xl p-6 glass-panel glass-card-hover cursor-pointer flex flex-col justify-between transition-all ${
                  m.completed 
                    ? 'border-emerald-500/40 dark:border-emerald-500/30' 
                    : ''
                }`}
              >
                {/* Background Subtle Gradient Glow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${m.accentColor} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />

                <div className="relative z-10">
                  {/* Card Header: Module Number & Status Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 group-hover:text-[#39A900] transition-colors">
                      MÓDULO {m.number}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      m.completed 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}>
                      {m.completed ? 'Aprobado' : m.badge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                      m.completed
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 text-[#39A900]'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:bg-[#39A900] group-hover:text-white'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#39A900] transition-colors leading-snug">
                        {m.title}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {m.duration}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {m.subtitle}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="relative z-10 mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-[#39A900]">
                  <span>{m.completed ? 'Repasar contenido' : 'Entrar a la estación'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* INSTITUTIONAL PILLARS (Modern Bento Quartet)                   */}
      {/* ============================================================== */}
      <section className="glass-panel rounded-3xl p-8 sm:p-10 space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#39A900]">
            Cultura & ADN SENA
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            Los 4 Pilares del Valor Institucional
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            La experiencia formativa del SENA transforma vidas uniendo el rigor técnico con la ética ciudadana y el espíritu de liderazgo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-white/60 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Pertenencia Orgullosa</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Portar con dignidad el carné y representar los valores del SENA en cada ambiente.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/60 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Excelencia Técnica</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Aprender haciendo con metodologías activas y tecnologías aplicadas de vanguardia.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/60 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Ética y Debido Proceso</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Respeto estricto del reglamento, honestidad académica y resolución pacífica.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/60 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Proyección e Innovación</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Inserción directa en empresas, semilleros SENNOVA y Fondo Emprender.
              </p>
            </div>
          </div>
        </div>

        {/* Founder Stature Banner */}
        <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border-l-4 border-l-[#39A900] border-y border-r border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <blockquote className="text-sm italic text-slate-700 dark:text-slate-200">
            "El SENA es el milagro de Colombia, porque convierte la esperanza en progreso real a través de la educación técnica, el trabajo digno y la solidaridad social."
          </blockquote>
          <div className="shrink-0 text-xs text-right">
            <strong className="block text-slate-900 dark:text-white font-semibold">Rodolfo Martínez Tono</strong>
            <span className="text-slate-500 dark:text-slate-400">Fundador del SENA (1957)</span>
          </div>
        </div>
      </section>
    </div>
  );
};
