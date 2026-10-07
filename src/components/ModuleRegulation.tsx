import React, { useState } from 'react';
import { ACUERDO_0009_2024 } from '../data/senaData';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Search, 
  AlertTriangle, 
  Scale, 
  UserCheck, 
  ArrowRight, 
  BookOpenCheck,
  FileCheck2,
  Sparkles,
  Award,
  History,
  AlertOctagon,
  Building2,
  UserX,
  Code2,
  Copy,
  Check,
  BookOpen,
  HelpCircle,
  FileText,
  BadgeAlert
} from 'lucide-react';

interface ModuleRegulationProps {
  onComplete: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

export const ModuleRegulation: React.FC<ModuleRegulationProps> = ({
  onComplete,
  isCompleted,
  onNextModule,
}) => {
  const [activeCategory, setActiveCategory] = useState<
    'acuerdo' | 'definiciones' | 'derechos' | 'deberes' | 'novedades' | 'faltas' | 'instancias'
  >('definiciones');
  const [searchTerm, setSearchTerm] = useState('');
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const filterSearch = (text: string) => {
    if (!searchTerm.trim()) return true;
    return text.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const handleCopyJson = () => {
    const rawData = {
      documento: ACUERDO_0009_2024.documento,
      acuerdo_articulado: ACUERDO_0009_2024.acuerdo_articulado,
      reglamento_aprendiz: ACUERDO_0009_2024.reglamento_aprendiz
    };
    navigator.clipboard.writeText(JSON.stringify(rawData, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#39A900] uppercase tracking-wider">
            <span>Módulo 02</span>
            <span aria-hidden="true">·</span>
            <span>Normativa Oficial Vigente</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Reglamento del Aprendiz SENA
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
            Adoptado mediante el <strong>Acuerdo No. 0009 de 2024 (5 de noviembre de 2024)</strong> por el Consejo Directivo Nacional. 
            Deroga en su totalidad los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={() => setShowJsonModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
            title="Ver código y estructura JSON del acuerdo"
          >
            <Code2 className="w-4 h-4 text-[#39A900]" />
            <span>Ver Estructura JSON</span>
          </button>

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

      {/* Official Act Metadata Card (Acuerdo 0009 de 2024) */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-emerald-500/30 dark:border-emerald-500/20 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#39A900] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-md">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-md">
                  {ACUERDO_0009_2024.documento.titulo}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Expedición: <strong>{ACUERDO_0009_2024.documento.fecha_expedicion} (5 de Noviembre de 2024)</strong>
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mt-1">
                {ACUERDO_0009_2024.documento.descripcion}
              </p>
              <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                <span>Presidente Consejo Directivo: <strong>{ACUERDO_0009_2024.documento.firmantes.presidente_consejo_directivo}</strong></span>
                <span>Secretaria General (e): <strong>{ACUERDO_0009_2024.documento.firmantes.secretaria_general_e}</strong></span>
              </div>
            </div>
          </div>

          <div className="shrink-0 text-xs bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 p-3 rounded-xl text-rose-800 dark:text-rose-300 max-w-xs">
            <div className="flex items-center gap-1.5 font-bold mb-0.5">
              <History className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>Derogatoria Total (Art. 3)</span>
            </div>
            <p className="text-[11px] leading-tight">
              Quedan derogados los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024. Toda la comunidad de formación se rige por el nuevo Acuerdo 0009 de 2024.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/90 rounded-xl overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveCategory('definiciones')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'definiciones' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Cap. I: Definiciones & Principios (Art. 1-4)
          </button>
          <button
            onClick={() => setActiveCategory('derechos')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'derechos' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Cap. II: Derechos & Reconocimientos (Art. 5-6)
          </button>
          <button
            onClick={() => setActiveCategory('deberes')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'deberes' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Cap. III: Deberes & Prohibiciones (Art. 8-9)
          </button>
          <button
            onClick={() => setActiveCategory('novedades')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'novedades' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Cap. IV: Novedades & Deserción (Art. 18 & 30)
          </button>
          <button
            onClick={() => setActiveCategory('faltas')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'faltas' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Cap. V: Faltas & Medidas (Art. 41-46)
          </button>
          <button
            onClick={() => setActiveCategory('instancias')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'instancias' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sanciones & 2 Instancias (Art. 47-49)
          </button>
          <button
            onClick={() => setActiveCategory('acuerdo')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'acuerdo' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Articulado del Acuerdo (Art. 1-4)
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar término, artículo o falta..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900] bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400"
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. CAPÍTULO I: DEFINICIONES, ALCANCE Y PRINCIPIOS (Art. 1-4)  */}
      {/* ============================================================== */}
      {activeCategory === 'definiciones' && (
        <div className="space-y-6 animate-fade-in">
          {/* Banner de Introducción al Capítulo */}
          <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 p-4 rounded-xl text-xs text-emerald-900 dark:text-emerald-300 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold mb-0.5">Capítulo I - Definiciones, Alcance y Principios Orientadores:</strong>
              <p>
                Establece el marco conceptual fundamental del SENA, los sujetos de la comunidad educativa, el ámbito universal de aplicación y los principios éticos que rigen la formación.
              </p>
            </div>
          </div>

          {/* Artículo 1: Definiciones Fundamentales */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#39A900]" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Artículo 1. Definiciones Fundamentales
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                5 Conceptos Clave
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ACUERDO_0009_2024.reglamento_aprendiz.capitulo_I_definiciones.articulo_1_definiciones
                .filter(item => filterSearch(item.termino + ' ' + item.definicion))
                .map((def, idx) => (
                  <div key={idx} className="glass-panel p-5 rounded-2xl hover:border-[#39A900] transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold text-[#39A900] bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
                          TÉRMINO 0{idx + 1}
                        </span>
                        <div className="w-2 h-2 rounded-full bg-[#39A900]" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {def.termino}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                        {def.definicion}
                      </p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 font-mono">
                      Acuerdo 0009 de 2024 · Art. 1
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Artículo 2: Alcance & Artículo 4: Centro de Convivencia */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Alcance (Art. 2) */}
            <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-[#39A900] text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <ShieldCheck className="w-4 h-4 text-[#39A900]" />
                <span className="text-sm">Artículo 2. Alcance del Reglamento</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {ACUERDO_0009_2024.reglamento_aprendiz.capitulo_I_definiciones.articulo_2_alcance}
              </p>
              <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#39A900]" />
                <span>Cubre todas las modalidades: presencial, virtual y a distancia.</span>
              </div>
            </div>

            {/* Centro de Convivencia (Art. 4) */}
            <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-blue-500 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <Building2 className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Artículo 4. Centros de Convivencia</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {ACUERDO_0009_2024.reglamento_aprendiz.capitulo_I_definiciones.articulo_4_centro_de_convivencia}
              </p>
              <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Garantía de alojamiento y bienestar para aprendices de regiones apartadas.</span>
              </div>
            </div>
          </div>

          {/* Artículo 3: Principios Orientadores */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Artículo 3. Principios Orientadores de la Formación
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                8 Principios Éticos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ACUERDO_0009_2024.principios_orientadores
                .filter(p => filterSearch(p.nombre + ' ' + p.desc))
                .map((principio, idx) => (
                  <div key={idx} className="glass-panel p-4 sm:p-5 rounded-2xl hover:border-[#39A900] transition-colors flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400">PRINCIPIO 0{idx + 1}</span>
                        <span className="w-2 h-2 rounded-full bg-[#39A900]" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{principio.nombre}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                        {principio.desc}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. CAPÍTULO II: DERECHOS & RECONOCIMIENTOS (Art. 5 y 6)        */}
      {/* ============================================================== */}
      {activeCategory === 'derechos' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 p-4 rounded-xl text-xs text-emerald-900 dark:text-emerald-300 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold mb-0.5">Capítulo II - Derechos y Reconocimientos:</strong>
              <p>
                Consagra los 9 derechos sustanciales de las personas matriculadas en el SENA y los estímulos de excelencia académica, deportiva y técnica reconocidos por la institución.
              </p>
            </div>
          </div>

          {/* Los 9 Derechos Oficiales (Art. 5) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Artículo 5. Derechos del Aprendiz (9 Garantías Fundamentales)
              </h3>
              <span className="text-[11px] font-mono text-[#39A900] font-bold">
                Acuerdo 0009 de 2024
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ACUERDO_0009_2024.derechos
                .filter(d => filterSearch(d.title + ' ' + d.description))
                .map((right, idx) => (
                  <div key={idx} className="glass-panel p-5 rounded-2xl hover:border-[#39A900] transition-colors flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
                          DERECHO 0{idx + 1}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{right.articulo}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{right.title}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                        {right.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Garantía institucional exigible</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Reconocimientos (Art. 6) */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Artículo 6. Reconocimientos y Estímulos Institucionales
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Incentivos otorgados a los aprendices por su desempeño sobresaliente, liderazgo formativo y aportes a la comunidad educativa:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ACUERDO_0009_2024.reglamento_aprendiz.capitulo_II_derechos_y_reconocimientos.articulo_6_reconocimientos.map((rec, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">ESTÍMULO 0{idx + 1}</span>
                  <strong className="text-slate-900 dark:text-white block font-bold text-sm">{rec.titulo}</strong>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{rec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. CAPÍTULO III: DEBERES & PROHIBICIONES (Art. 8 y 9)          */}
      {/* ============================================================== */}
      {activeCategory === 'deberes' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Deberes (Art. 8) */}
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <UserCheck className="w-5 h-5" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Deberes del Aprendiz (Artículo 8)
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Compromisos formativos, cívicos y de convivencia suscritos en el acta de matrícula del SENA:
              </p>
              <div className="space-y-3">
                {ACUERDO_0009_2024.deberes
                  .filter(d => filterSearch(d.title + ' ' + d.description))
                  .map((duty, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">DEBER 0{idx + 1}</span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{duty.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {duty.description}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Prohibiciones (Art. 9) */}
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <AlertOctagon className="w-5 h-5" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Prohibiciones Expresas (Artículo 9)
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Actos no permitidos que vulneran la sana convivencia, la seguridad y la ética institucional:
              </p>
              <div className="space-y-3">
                {ACUERDO_0009_2024.prohibiciones
                  .filter(p => filterSearch(p.title + ' ' + p.description))
                  .map((proh, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/60">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">PROHIBICIÓN 0{idx + 1}</span>
                        <h4 className="text-xs font-bold text-rose-950 dark:text-rose-300">{proh.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {proh.description}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. CAPÍTULO IV: NOVEDADES & DESERCIÓN (Art. 18 y 30)           */}
      {/* ============================================================== */}
      {activeCategory === 'novedades' && (
        <div className="space-y-6 animate-fade-in">
          {/* Novedades de Formación (Art. 18) */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#39A900]">ARTÍCULO 18</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                Novedades del Proceso de Formación
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Trámites formales que el aprendiz puede radicar durante su permanencia en el programa formativo:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ACUERDO_0009_2024.novedades_formacion.map((nov, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-xs font-bold text-slate-900 dark:text-white">{nov.novedad}</strong>
                  </div>
                  <span className="inline-block text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
                    {nov.limite}
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {nov.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Deserción (Art. 30) */}
          <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-rose-500 space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <UserX className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Causales de Deserción (Artículo 30)
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              El aprendiz incurre en deserción del programa cuando se configure cualquiera de las siguientes causales:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ACUERDO_0009_2024.desercion.causales.map((causal, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 text-xs space-y-1">
                  <span className="font-mono font-bold text-rose-700 dark:text-rose-400">Causal 0{idx + 1}</span>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">{causal}</p>
                </div>
              ))}
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
              <strong>Procedimiento de Notificación y Descargos:</strong> {ACUERDO_0009_2024.desercion.procedimiento}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. CAPÍTULO V: FALTAS & MEDIDAS FORMATIVAS (Art. 41-46)        */}
      {/* ============================================================== */}
      {activeCategory === 'faltas' && (
        <div className="space-y-6 animate-fade-in">
          {/* Clasificación de Faltas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <BookOpenCheck className="w-5 h-5" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Faltas Académicas (Art. 41)</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Relacionadas con el incumplimiento injustificado en evidencias, bajo rendimiento formativo, inasistencia o plagio en actividades.
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs space-y-1 border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-800 dark:text-slate-200 block">Medidas Formativas Académicas (Art. 46):</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  <li>Llamado de atención escrito: <strong>hasta dos (2) por fase</strong> suscritos por el instructor con copia a la hoja de vida.</li>
                  <li>Plan de mejoramiento académico: término perentorio de <strong>máximo veinte (20) días</strong>.</li>
                </ul>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Faltas Disciplinarias (Art. 41)</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Relacionadas con el comportamiento individual y grupal, convivencia, agresión verbal o física, suplantación, armas o daño a bienes.
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs space-y-1 border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-800 dark:text-slate-200 block">Medidas Formativas Disciplinarias (Art. 46):</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  <li>Llamado de atención escrito con compromiso de comportamiento.</li>
                  <li>Plan de mejoramiento disciplinario enfocado en reparación y convivencia pacífica.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Calificación de Faltas (Art. 42) */}
          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Criterios de Calificación de las Faltas (Artículo 42)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <strong className="text-emerald-700 dark:text-emerald-400 block mb-1">Falta Leve</strong>
                <p className="text-slate-600 dark:text-slate-400">
                  Desatención menor que no altera gravemente la convivencia ni el proceso formativo; sujeta a llamado formativo de atención escrito.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <strong className="text-amber-700 dark:text-amber-400 block mb-1">Falta Grave</strong>
                <p className="text-slate-600 dark:text-slate-400">
                  Conducta reiterada o acto que afecta de forma notable el proceso de formación o la armonía de la comunidad; evaluable en Comité.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <strong className="text-rose-700 dark:text-rose-400 block mb-1">Falta Gravísima</strong>
                <p className="text-slate-600 dark:text-slate-400">
                  Actos dolosos como suplantación de identidad, agresión física, hurto comprobado, armas o fraude sistemático. Causa cancelación de matrícula.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. SANCIONES & 2 INSTANCIAS (Art. 47-49)                      */}
      {/* ============================================================== */}
      {activeCategory === 'instancias' && (
        <div className="space-y-6 animate-fade-in">
          {/* Sanciones (Art. 47) */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <Scale className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Medidas Sancionatorias (Artículo 47)
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACUERDO_0009_2024.medidas_sancionatorias.map((sancion, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 text-xs space-y-2">
                  <span className="font-mono text-rose-700 dark:text-rose-400 font-bold block">SANCIÓN 0{idx + 1}</span>
                  <strong className="text-sm text-slate-900 dark:text-white block">{sancion.sancion}</strong>
                  <p className="text-slate-700 dark:text-slate-300 font-semibold">{sancion.efecto}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] pt-1 border-t border-rose-200/60 dark:border-rose-900/40">
                    {sancion.origen}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Equipos Evaluadores e Instancias Decisorias (Art. 48 y 49) */}
          <div className="glass-panel p-6 rounded-2xl space-y-5">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Garantía del Debido Proceso y Doble Instancia (Artículos 48 y 49)
            </h4>

            {/* Equipos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <strong className="text-slate-900 dark:text-white block font-bold">
                  {ACUERDO_0009_2024.equipos_e_instancias.equipos_evaluadores[0].nombre}
                </strong>
                <p className="text-slate-600 dark:text-slate-400">
                  {ACUERDO_0009_2024.equipos_e_instancias.equipos_evaluadores[0].funcion}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <strong className="text-slate-900 dark:text-white block font-bold">
                  {ACUERDO_0009_2024.equipos_e_instancias.equipos_evaluadores[1].nombre}
                </strong>
                <p className="text-slate-600 dark:text-slate-400">
                  {ACUERDO_0009_2024.equipos_e_instancias.equipos_evaluadores[1].funcion}
                </p>
              </div>
            </div>

            {/* Dos Instancias */}
            <div className="p-5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs space-y-3">
              <strong className="text-emerald-900 dark:text-emerald-300 font-bold block text-sm">
                Instancias Decisorias Constitucionales (Artículo 49):
              </strong>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 bg-white dark:bg-slate-900 rounded-lg border border-emerald-200/80 dark:border-emerald-800/40">
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold block mb-1">PRIMERA INSTANCIA</span>
                  <p className="text-slate-800 dark:text-slate-200">
                    {ACUERDO_0009_2024.equipos_e_instancias.instancias_decisorias.primera_instancia}
                  </p>
                </div>
                <div className="p-3.5 bg-white dark:bg-slate-900 rounded-lg border border-emerald-200/80 dark:border-emerald-800/40">
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold block mb-1">SEGUNDA INSTANCIA</span>
                  <p className="text-slate-800 dark:text-slate-200">
                    {ACUERDO_0009_2024.equipos_e_instancias.instancias_decisorias.segunda_instancia}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 7. ACUERDO ARTICULADO (Artículos 1 al 4 de adopción oficial)   */}
      {/* ============================================================== */}
      {activeCategory === 'acuerdo' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 p-4 rounded-xl text-xs text-slate-800 dark:text-slate-300 flex items-start gap-3">
            <FileText className="w-5 h-5 text-[#39A900] shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold mb-0.5">Cuerpo Normativo del Acuerdo No. 0009 de 2024:</strong>
              <p>
                Articulado mediante el cual el Consejo Directivo Nacional del Servicio Nacional de Aprendizaje adopta formalmente el nuevo reglamento y deroga los acuerdos previos.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ACUERDO_0009_2024.acuerdo_articulado.map((art) => (
              <div key={art.articulo} className="glass-panel p-5 rounded-2xl border hover:border-[#39A900] transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#39A900] bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
                      ARTÍCULO {art.articulo}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Acuerdo 0009/2024</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {art.nombre}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {art.contenido}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Firmantes */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase mb-3">
              Firmantes Oficiales del Acto Administrativo
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Presidente del Consejo Directivo Nacional</span>
                <strong className="text-slate-900 dark:text-white text-sm">
                  {ACUERDO_0009_2024.documento.firmantes.presidente_consejo_directivo}
                </strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Secretaria General (e)</span>
                <strong className="text-slate-900 dark:text-white text-sm">
                  {ACUERDO_0009_2024.documento.firmantes.secretaria_general_e}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE ESTRUCTURA JSON OFICIAL */}
      {showJsonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel w-full max-w-4xl max-h-[85vh] rounded-3xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden bg-slate-950 text-slate-100">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#39A900] text-white flex items-center justify-center font-bold">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Estructura Oficial del Reglamento en JSON</h3>
                  <p className="text-[11px] text-slate-400">Acuerdo No. 0009 de 2024 · Modelo estructurado para aprendices e instructores</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyJson}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/40 transition-colors cursor-pointer"
                >
                  {copiedJson ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedJson ? 'Copiado' : 'Copiar JSON'}</span>
                </button>
                <button
                  onClick={() => setShowJsonModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-5 overflow-y-auto flex-1 font-mono text-xs text-emerald-400 bg-slate-900/90 leading-relaxed">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(
                  {
                    documento: ACUERDO_0009_2024.documento,
                    acuerdo_articulado: ACUERDO_0009_2024.acuerdo_articulado,
                    reglamento_aprendiz: ACUERDO_0009_2024.reglamento_aprendiz
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Siguiente: Módulo 03 · Etapas de la Formación Profesional Integral
        </span>
        <button
          onClick={() => {
            onComplete();
            onNextModule();
          }}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#319200] rounded-xl shadow-sm transition-colors cursor-pointer"
        >
          <span>Continuar a Etapas FPI</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
