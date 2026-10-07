import React, { useState, useRef, useEffect } from 'react';
import { SENA_HISTORY, SENA_SYMBOLS, SENA_ANTHEM_STANZAS, SENA_VALUES } from '../data/senaData';
import { SENA_ASSETS } from '../data/assets';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Calendar,
  Volume2, 
  ArrowRight
} from 'lucide-react';

interface ModuleIdentityProps {
  onComplete: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

export const ModuleIdentity: React.FC<ModuleIdentityProps> = ({
  onComplete,
  isCompleted,
  onNextModule,
}) => {
  const [activeTab, setActiveTab] = useState<'historia' | 'simbolos' | 'himno' | 'valores'>('historia');
  const [selectedSymbolId, setSelectedSymbolId] = useState<string>('escudo');
  
  // Interactive Anthem Player State
  const [isPlayingHymn, setIsPlayingHymn] = useState(false);
  const [currentStanzaIndex, setCurrentStanzaIndex] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<any>(null);

  const playSolemnChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = audioContextRef.current || new AudioCtx();
      audioContextRef.current = ctx;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Play soft solemn brass/bell notes
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.4);
        gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.4);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.4 + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.4);
        osc.stop(ctx.currentTime + idx * 0.4 + 1.3);
      });
    } catch {
      // Audio fallback silent
    }
  };

  const handleTogglePlay = () => {
    if (isPlayingHymn) {
      setIsPlayingHymn(false);
      clearInterval(timerRef.current);
    } else {
      setIsPlayingHymn(true);
      playSolemnChime();
      timerRef.current = setInterval(() => {
        setCurrentStanzaIndex((prev) => (prev + 1) % SENA_ANTHEM_STANZAS.length);
      }, 4000);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const selectedSymbol = SENA_SYMBOLS.find(s => s.id === selectedSymbolId) || SENA_SYMBOLS[0];

  return (
    <div className="space-y-8 py-2">
      {/* Module Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] uppercase tracking-wide">
            <span>Módulo 01</span>
            <span aria-hidden="true">·</span>
            <span>Identidad Institucional</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Historia, Símbolos y Valores del SENA
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Comprende el origen y la misión del Servicio Nacional de Aprendizaje para cultivar un verdadero sentido de pertenencia como aprendiz.
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

      {/* Subtabs for Identity */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-md">
        <button
          onClick={() => setActiveTab('historia')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
            activeTab === 'historia' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Historia (1957)
        </button>
        <button
          onClick={() => setActiveTab('simbolos')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
            activeTab === 'simbolos' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Símbolos
        </button>
        <button
          onClick={() => setActiveTab('himno')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
            activeTab === 'himno' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Himno SENA
        </button>
        <button
          onClick={() => setActiveTab('valores')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
            activeTab === 'valores' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Valores Éticos
        </button>
      </div>

      {/* TAB 1: HISTORIA */}
      {activeTab === 'historia' && (
        <div className="space-y-8 animate-fade-in">
          {/* Founder Spotlight Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-[#39A900] to-emerald-700 flex flex-col items-center justify-center text-white shrink-0 shadow-md p-3 text-center">
              <Calendar className="w-8 h-8 mb-1" />
              <span className="text-[11px] font-mono font-bold tracking-tight">21 JUN 1957</span>
            </div>
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
                Génesis Institucional
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                La visión de Rodolfo Martínez Tono
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {SENA_HISTORY.originStory}
              </p>
              <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap gap-4 justify-center md:justify-start">
                <span>Fundador: <strong className="text-slate-700 dark:text-slate-200">{SENA_HISTORY.founder}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Norma: <strong className="text-slate-700 dark:text-slate-200">{SENA_HISTORY.decree}</strong></span>
              </div>
            </div>
          </div>

          {/* Timeline Milestones */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Línea del Tiempo Histórica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SENA_HISTORY.timeline.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200/90 dark:border-slate-800 relative flex flex-col justify-between">
                  <div className="mb-3">
                    <span className="text-xs font-mono font-bold text-[#39A900] bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                      {item.year}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                    Hito 0{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Misión y Visión */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-900 text-white p-6 sm:p-8 rounded-2xl relative overflow-hidden border border-emerald-800">
              <div className="relative z-10 space-y-3">
                <span className="text-xs uppercase font-semibold text-emerald-300 tracking-wider">
                  Razón de Ser
                </span>
                <h3 className="text-xl font-bold text-white">Misión del SENA</h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral para la incorporación y desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.
                </p>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl relative overflow-hidden border border-slate-800">
              <div className="relative z-10 space-y-3">
                <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
                  Hacia el Futuro
                </span>
                <h3 className="text-xl font-bold text-white">Visión Institucional</h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Ser una entidad de clase mundial en formación profesional integral, con enfoque en innovación, ciencia aplicada y tecnología, garantizando que cada aprendiz egresado cuente con competencias pertinentes que impulsen la productividad y el empleo decente.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SÍMBOLOS */}
      {activeTab === 'simbolos' && (
        <div className="space-y-6 animate-fade-in">
          {/* Symbol Selector Buttons */}
          <div className="flex flex-wrap gap-2">
            {SENA_SYMBOLS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSymbolId(s.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedSymbolId === s.id
                    ? 'bg-[#39A900] text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          {/* Symbol Detailed Breakdown Stage */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/60 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
              {selectedSymbol.id === 'escudo' ? (
                <div className="space-y-3 text-center">
                  <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white p-2 shadow-sm">
                    <img
                      src={SENA_ASSETS.symbolsEmblem}
                      alt="Escudo Institucional SENA"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Escudo oficial: Piñón, Caduceo y Café
                  </span>
                </div>
              ) : selectedSymbol.id === 'bandera' ? (
                <div className="w-full max-w-xs space-y-3 text-center">
                  <div className="aspect-video w-full rounded-xl bg-white border-4 border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center p-4 relative">
                    <div className="w-16 h-16 rounded-full bg-[#39A900] flex items-center justify-center text-white font-bold text-xs shadow-inner">
                      SENA
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Blanco (Paz y Transparencia) · Verde (Esperanza y Futuro)
                  </span>
                </div>
              ) : (
                <div className="w-full max-w-xs space-y-3 text-center">
                  <div className="w-36 h-36 mx-auto rounded-2xl bg-[#39A900] flex items-center justify-center text-white shadow-md p-6">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                      <circle cx="50" cy="20" r="12" />
                      <path d="M44 38 h12 v24 h-12 z" />
                      <path d="M30 46 l14 -8 v10 l-14 8 z" />
                      <path d="M56 38 l14 8 l-6 8 l-8 -6 z" />
                      <path d="M42 62 l-12 28 h10 l8 -20 z" />
                      <path d="M58 62 l12 28 h-10 l-8 -20 z" />
                    </svg>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    "El Caminante" · El ser humano proyectado al porvenir
                  </span>
                </div>
              )}
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wide">
                  Heráldica & Significado
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {selectedSymbol.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {selectedSymbol.meaning}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {selectedSymbol.details.map((detail, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#39A900] mt-1.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {detail.element} — <span className="text-[#39A900]">{detail.sector}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        {detail.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HIMNO SENA */}
      {activeTab === 'himno' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-8 animate-fade-in">
          {/* Header & Interactive Synthesizer Player */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
            <div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#39A900]" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Himno del SENA</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Letra: <strong className="text-slate-700 dark:text-slate-200">Luis Alfredo Sánchez</strong> · Música: <strong className="text-slate-700 dark:text-slate-200">Daniel Marlez</strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleTogglePlay}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#319200] rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                {isPlayingHymn ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlayingHymn ? 'Pausar Melodía' : 'Reproducir Tono'}</span>
              </button>
              <button
                onClick={() => {
                  setCurrentStanzaIndex(0);
                  playSolemnChime();
                }}
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer"
                title="Reiniciar"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Stanzas Display with Active Stanza Spotlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SENA_ANTHEM_STANZAS.map((stanza, idx) => {
              const isActive = currentStanzaIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setCurrentStanzaIndex(idx)}
                  className={`p-6 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-[#39A900] ring-2 ring-emerald-400/20 shadow-sm'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        isActive ? 'text-[#39A900]' : 'text-slate-400 dark:text-slate-500'
                      }`}>
                        {stanza.type}
                      </span>
                      {isActive && (
                        <span className="text-[10px] bg-[#39A900] text-white px-2 py-0.5 rounded font-mono">
                          Estrofa Activa
                        </span>
                      )}
                    </div>
                    <div className="space-y-1.5 text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic">
                      {stanza.lines.map((line, lIdx) => (
                        <p key={lIdx}>{line}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
                    <strong className="block text-slate-700 dark:text-slate-300 font-semibold mb-0.5">Mensaje pedagógico:</strong>
                    {stanza.reflection}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: VALORES */}
      {activeTab === 'valores' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Código de Integridad & Decálogo de Valores
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
              Todo aprendiz SENA asume el compromiso ético de actuar con transparencia y respeto en las aulas físicas, ambientes virtuales y escenarios empresariales.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SENA_VALUES.map((val, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 hover:bg-emerald-50/30 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#39A900]" />
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{val.name}</h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {val.description}
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">En el día a día: </span>
                    {val.application}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action to Next Module */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Siguiente: Módulo 02 · Reglamento del Aprendiz (Acuerdo 007)
        </span>
        <button
          onClick={() => {
            onComplete();
            onNextModule();
          }}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#319200] rounded-xl shadow-sm transition-colors cursor-pointer"
        >
          <span>Continuar al Reglamento</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
