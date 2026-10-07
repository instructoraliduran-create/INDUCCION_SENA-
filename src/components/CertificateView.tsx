import React, { useRef } from 'react';
import { ApprenticeProfile, ModuleProgress } from '../types/induction';
import { SENA_ASSETS } from '../data/assets';
import { 
  Printer, 
  Award, 
  Edit3, 
  QrCode,
  FileSpreadsheet
} from 'lucide-react';

interface CertificateViewProps {
  profile: ApprenticeProfile;
  progress: ModuleProgress;
  onOpenProfile: () => void;
  onOpenDriveRegistry?: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  profile,
  progress,
  onOpenProfile,
  onOpenDriveRegistry,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const completedCount = Object.values(progress).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 6) * 100);

  const today = new Date().toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const verificationCode = `SENA-IND-${profile.fichaNumber || '7789'}-${(profile.documentNumber || '1020').slice(-4)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 py-2">
      {/* Top Banner / Controls (hidden on print) */}
      <div className="no-print bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] uppercase tracking-wide">
            <Award className="w-4 h-4" />
            <span>Constancia de Acreditación</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Certificado Oficial de Inducción Institucional
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Progreso completado: <strong className="text-slate-800 dark:text-slate-200">{progressPercent}%</strong> ({completedCount}/6 módulos). Listo para imprimir o descargar en PDF.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editar Datos</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#319200] rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Descargar PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable Certificate Container */}
      <div className="flex justify-center">
        <div
          ref={certificateRef}
          className="w-full max-w-4xl bg-white text-slate-900 p-8 sm:p-12 md:p-16 rounded-3xl shadow-xl border-8 border-double border-emerald-800/80 relative overflow-hidden print:m-0 print:p-8 print:shadow-none print:border-4"
        >
          {/* Subtle Watermark Decorative Shield */}
          <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none">
            <img
              src={SENA_ASSETS.symbolsEmblem}
              alt=""
              className="w-96 h-96 object-contain filter grayscale"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Institutional Top Header */}
          <div className="text-center relative z-10 border-b-2 border-emerald-800/40 pb-6">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="w-[52px] h-[52px] min-w-[52px] min-h-[52px] rounded-xl bg-[#39A900] text-white flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 64 64" className="w-8 h-8 fill-current" aria-hidden="true">
                  <circle cx="32" cy="14" r="7" />
                  <path d="M28 26h8v15h-8z" />
                  <path d="M19 31l9-6v7l-9 5z" />
                  <path d="M37 25l9 6l-4 5l-5-4z" />
                  <path d="M27 41l-8 18h7l5-12z" />
                  <path d="M37 41l8 18h-7l-5-12z" />
                </svg>
              </div>
              <div className="text-left">
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-emerald-950 uppercase">
                  Servicio Nacional de Aprendizaje
                </h1>
                <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-widest">
                  Dirección de Formación Profesional Integral · República de Colombia
                </p>
              </div>
            </div>

            <div className="inline-block px-4 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold tracking-wider uppercase mt-2">
              Constancia de Inducción Institucional
            </div>
          </div>

          {/* Certificate Body Text */}
          <div className="py-8 sm:py-10 text-center space-y-6 relative z-10">
            <p className="text-sm uppercase tracking-widest text-slate-500 font-semibold">
              Hace constar que el (la) aprendiz:
            </p>

            {/* Apprentice Name in High Stature */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {profile.fullName || 'NOMBRE DEL APRENDIZ'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
              Identificado(a) con <strong>{profile.documentType} No. {profile.documentNumber || '0000000000'}</strong>,
              ha culminado satisfactoriamente el programa de:
            </p>

            {/* Program Name */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-2xl mx-auto">
              <h3 className="text-base sm:text-lg font-bold text-emerald-950">
                {profile.trainingProgram || 'Programa de Formación Técnica / Tecnológica'}
              </h3>
              <div className="mt-1 flex flex-wrap justify-center gap-4 text-xs text-slate-600">
                <span>Ficha: <strong className="font-mono text-slate-900">{profile.fichaNumber || '2824901'}</strong></span>
                <span aria-hidden="true">·</span>
                <span>{profile.trainingCenter || 'Centro de Formación'}</span>
                <span aria-hidden="true">·</span>
                <span>{profile.regional || 'Regional'}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
              Acreditando la apropiación integral de la identidad institucional, símbolos patrios y heráldicos, 
              el Reglamento del Aprendiz (Acuerdo No. 0009 de 2024), las etapas de formación profesional y los servicios 
              del Plan de Bienestar al Aprendiz.
            </p>
          </div>

          {/* Footer & Signatures */}
          <div className="pt-8 border-t-2 border-emerald-800/40 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end relative z-10 text-center">
            {/* Signature 1 */}
            <div className="space-y-1">
              <div className="h-10 flex items-center justify-center">
                <span className="font-serif italic text-base text-slate-700">
                  {profile.instructorName || 'Carlos Alberto Rodríguez'}
                </span>
              </div>
              <div className="w-40 mx-auto border-t border-slate-400" />
              <p className="text-xs font-bold text-slate-800">Instructor Líder de Inducción</p>
              <p className="text-[10px] text-slate-500">Equipo Pedagógico SENA</p>
            </div>

            {/* Official QR & Verification Code */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="w-16 h-16 bg-white p-1 rounded-lg border border-slate-300 shadow-xs flex items-center justify-center">
                <QrCode className="w-14 h-14 text-emerald-900" />
              </div>
              <span className="text-[10px] font-mono text-slate-500 font-semibold tracking-wider">
                {verificationCode}
              </span>
              <span className="text-[9px] text-slate-400">Verificable en plataforma</span>
            </div>

            {/* Signature 2 */}
            <div className="space-y-1">
              <div className="h-10 flex items-center justify-center">
                <span className="font-serif italic text-base text-slate-700">
                  Coordinación Académica
                </span>
              </div>
              <div className="w-40 mx-auto border-t border-slate-400" />
              <p className="text-xs font-bold text-slate-800">Coordinación de Formación</p>
              <p className="text-[10px] text-slate-500">{profile.trainingCenter}</p>
            </div>
          </div>

          {/* Bottom Timestamp */}
          <div className="mt-8 text-center text-[10px] text-slate-400 font-mono relative z-10">
            Expedido en Colombia a los {today} · Formación Profesional Integral Gratuita
          </div>
        </div>
      </div>
    </div>
  );
};
