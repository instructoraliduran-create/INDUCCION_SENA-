import React from 'react';
import { ApprenticeInductionRecord } from '../services/sheetsService';
import { FileSpreadsheet, AlertCircle, Check, X } from 'lucide-react';

interface DriveConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  record: ApprenticeInductionRecord;
  spreadsheetName: string;
  userEmail?: string | null;
  isLoading?: boolean;
}

export const DriveConfirmationDialog: React.FC<DriveConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  record,
  spreadsheetName,
  userEmail,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="glass-panel w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-white space-y-5">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-[#39A900] flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Confirmar Registro en Google Drive
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Se agregará una nueva fila a tu hoja de cálculo oficial de seguimiento.
            </p>
          </div>
        </div>

        {/* Operation Details Card */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2.5 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
            <span className="text-slate-500 dark:text-slate-400">Archivo destino en Drive:</span>
            <span className="font-semibold text-slate-900 dark:text-white font-mono text-[11px] truncate max-w-[200px]" title={spreadsheetName}>
              {spreadsheetName}
            </span>
          </div>

          {userEmail && (
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400">Cuenta de Google:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                {userEmail}
              </span>
            </div>
          )}

          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Aprendiz:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{record.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Documento:</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">{record.documentType} {record.documentNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Ficha SENA:</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">{record.fichaNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Programa:</span>
              <span className="text-slate-700 dark:text-slate-300 text-right truncate max-w-[220px]">{record.trainingProgram}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Progreso registrado:</span>
              <span className="font-bold text-[#39A900]">{record.progressPercent}% ({record.status})</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-lg border border-amber-200/60 dark:border-amber-900/40">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Esta acción modificará la hoja de cálculo en tu Google Drive añadiendo el registro del aprendiz con fecha y hora actual.</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg text-white bg-[#39A900] hover:bg-[#319200] shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            <span>{isLoading ? 'Registrando en Drive...' : 'Confirmar y Guardar'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
