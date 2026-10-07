import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { ApprenticeProfile, ModuleProgress } from '../types/induction';
import { 
  googleSignIn, 
  logout, 
  getAccessToken 
} from '../services/googleAuth';
import { 
  findOrCreateInductionSheet, 
  appendApprenticeRecord, 
  fetchApprenticeRecords,
  ApprenticeInductionRecord,
  SpreadsheetInfo,
  SPREADSHEET_DEFAULT_NAME
} from '../services/sheetsService';
import { DriveConfirmationDialog } from './DriveConfirmationDialog';
import { 
  FileSpreadsheet, 
  ExternalLink, 
  RefreshCw, 
  UserPlus, 
  Search, 
  X, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  FolderOpen,
  Building,
  User as UserIcon,
  Sparkles
} from 'lucide-react';

interface DriveRegistryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onUserChange: (user: User | null) => void;
  currentProfile: ApprenticeProfile;
  currentProgress: ModuleProgress;
}

export const DriveRegistryModal: React.FC<DriveRegistryModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChange,
  currentProfile,
  currentProgress,
}) => {
  const [spreadsheetInfo, setSpreadsheetInfo] = useState<SpreadsheetInfo | null>(null);
  const [records, setRecords] = useState<ApprenticeInductionRecord[]>([]);
  const [isLoadingSpreadsheet, setIsLoadingSpreadsheet] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isAppending, setIsAppending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Compute current apprentice record payload
  const completedCount = Object.values(currentProgress).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 6) * 100);
  const currentVerificationCode = `SENA-IND-${currentProfile.fichaNumber || '7789'}-${(currentProfile.documentNumber || '1020').slice(-4)}`;

  const currentRecordToAppend: ApprenticeInductionRecord = {
    timestamp: new Date().toLocaleString('es-CO', {
      dateStyle: 'short',
      timeStyle: 'short',
    }),
    fullName: currentProfile.fullName || 'Aprendiz SENA',
    documentType: currentProfile.documentType || 'CC',
    documentNumber: currentProfile.documentNumber || '',
    fichaNumber: currentProfile.fichaNumber || '',
    trainingProgram: currentProfile.trainingProgram || '',
    trainingCenter: currentProfile.trainingCenter || '',
    regional: currentProfile.regional || '',
    instructorName: currentProfile.instructorName || '',
    progressPercent,
    status: progressPercent >= 100 ? 'Completada' : 'En Curso',
    certificateCode: currentVerificationCode,
  };

  // Load or create spreadsheet when user is available
  useEffect(() => {
    if (currentUser && isOpen) {
      loadSpreadsheetAndRecords();
    }
  }, [currentUser, isOpen]);

  const loadSpreadsheetAndRecords = async () => {
    setIsLoadingSpreadsheet(true);
    setStatusMessage(null);
    try {
      const token = await getAccessToken();
      if (!token) {
        throw new Error('Sesión no disponible. Por favor ingresa con Google nuevamente.');
      }

      const sheetInfo = await findOrCreateInductionSheet(token, SPREADSHEET_DEFAULT_NAME);
      setSpreadsheetInfo(sheetInfo);

      const items = await fetchApprenticeRecords(token, sheetInfo.id, sheetInfo.sheetTitle);
      setRecords(items);

      if (sheetInfo.isNewlyCreated) {
        setStatusMessage({
          type: 'success',
          text: `Se creó una nueva hoja de cálculo "${sheetInfo.name}" en tu Google Drive con el formato institucional SENA.`
        });
      }
    } catch (err: any) {
      console.error(err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Error al conectar con Google Sheets y Google Drive.'
      });
    } finally {
      setIsLoadingSpreadsheet(false);
    }
  };

  const handleSignIn = async () => {
    setIsLoggingIn(true);
    setStatusMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        onUserChange(result.user);
      }
    } catch (err: any) {
      console.error(err);
      setStatusMessage({
        type: 'error',
        text: 'Error de autenticación con Google. Verifica tu conexión e intenta de nuevo.'
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      onUserChange(null);
      setSpreadsheetInfo(null);
      setRecords([]);
      setStatusMessage(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmAppend = async () => {
    if (!spreadsheetInfo) return;
    setIsAppending(true);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error('Token expirado. Inicia sesión de nuevo.');

      await appendApprenticeRecord(
        token,
        spreadsheetInfo.id,
        spreadsheetInfo.sheetTitle,
        currentRecordToAppend
      );

      setStatusMessage({
        type: 'success',
        text: `¡Aprendiz ${currentRecordToAppend.fullName} registrado con éxito en tu Google Drive!`
      });
      setIsConfirmOpen(false);

      // Refresh records from sheet
      const updated = await fetchApprenticeRecords(token, spreadsheetInfo.id, spreadsheetInfo.sheetTitle);
      setRecords(updated);
    } catch (err: any) {
      console.error(err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Error al guardar el aprendiz en la hoja de cálculo.'
      });
    } finally {
      setIsAppending(false);
    }
  };

  if (!isOpen) return null;

  const filteredRecords = records.filter(r => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      r.fullName.toLowerCase().includes(term) ||
      r.documentNumber.includes(term) ||
      r.fichaNumber.includes(term) ||
      r.trainingProgram.toLowerCase().includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="glass-panel w-full max-w-5xl max-h-[92vh] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-[#39A900] flex items-center justify-center border border-emerald-500/20">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Registro de Inducción en Google Drive & Sheets
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold">
                  Workspace
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Almacenamiento oficial y trazabilidad de aprendices inductados en tu unidad personal de Google Drive.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Status Alert */}
          {statusMessage && (
            <div
              className={`p-3.5 rounded-xl text-xs flex items-center justify-between gap-3 animate-fade-in ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60'
              }`}
            >
              <div className="flex items-center gap-2">
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </div>
              <button
                onClick={() => setStatusMessage(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {/* Section 1: Authentication Card */}
          {!currentUser ? (
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/40 dark:from-slate-800/50 dark:to-emerald-950/20 border border-slate-200 dark:border-slate-700/80 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center border border-slate-200 dark:border-slate-700">
                <svg viewBox="0 0 48 48" className="w-8 h-8">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
              </div>

              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Conecta tu cuenta de Google para registrar aprendices
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  La plataforma creará de forma segura un archivo de hoja de cálculo denominado <strong>"{SPREADSHEET_DEFAULT_NAME}"</strong> en tu Google Drive para registrar cada constancia de inducción.
                </p>
              </div>

              {/* Official Google Sign In Button */}
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={handleSignIn}
                  disabled={isLoggingIn}
                  className="inline-flex items-center gap-3 px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-sm hover:shadow hover:bg-slate-50 dark:hover:bg-slate-700 transition-all cursor-pointer disabled:opacity-50"
                >
                  <svg viewBox="0 0 48 48" className="w-4 h-4">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                  <span>{isLoggingIn ? 'Conectando con Google...' : 'Iniciar Sesión con Google'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Account Pill */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt=""
                      className="w-10 h-10 rounded-full border border-emerald-500/40"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#39A900] text-white flex items-center justify-center font-bold text-sm">
                      {currentUser.displayName?.[0] || 'U'}
                    </div>
                  )}
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-400">Usuario Conectado</span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {currentUser.displayName || 'Usuario de Google'}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0 ml-2"
                  title="Cerrar sesión de Google"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Connected Spreadsheet Info */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#39A900] animate-pulse" />
                    <span className="text-[10px] uppercase font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      Hoja en Google Drive Conectada
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5">
                    {spreadsheetInfo?.name || SPREADSHEET_DEFAULT_NAME}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {records.length} aprendices registrados en la hoja
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={loadSpreadsheetAndRecords}
                    disabled={isLoadingSpreadsheet}
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                    title="Actualizar registros desde Drive"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSpreadsheet ? 'animate-spin' : ''}`} />
                  </button>

                  {spreadsheetInfo && (
                    <a
                      href={spreadsheetInfo.webViewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/70 text-[#39A900] border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                    >
                      <span>Abrir en Drive</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Action to Append Current Apprentice */}
          {currentUser && (
            <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 dark:border-emerald-500/20 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#39A900]" />
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Registrar Aprendiz Activo
                  </h4>
                </div>
                <div className="flex items-center gap-2 flex-wrap text-xs text-slate-600 dark:text-slate-300">
                  <span><strong>{currentProfile.fullName}</strong></span>
                  <span className="text-slate-400">·</span>
                  <span>Ficha {currentProfile.fichaNumber}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-[#39A900] font-semibold">{progressPercent}% completado</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsConfirmOpen(true)}
                disabled={isAppending || !spreadsheetInfo}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg text-white bg-[#39A900] hover:bg-[#319200] shadow-sm transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                <UserPlus className="w-4 h-4" />
                <span>Guardar este Aprendiz en Drive</span>
              </button>
            </div>
          )}

          {/* Section 3: Registered Apprentices Table */}
          {currentUser && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-slate-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Historial de Aprendices en la Hoja de Drive
                  </h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {records.length}
                  </span>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Filtrar por nombre, documento o ficha..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                  />
                </div>
              </div>

              {isLoadingSpreadsheet ? (
                <div className="p-8 text-center text-xs text-slate-400 space-y-2">
                  <div className="inline-block animate-spin w-5 h-5 border-2 border-[#39A900] border-t-transparent rounded-full" />
                  <p>Cargando registros desde Google Drive...</p>
                </div>
              ) : filteredRecords.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-2">
                  <FileSpreadsheet className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
                  <p>Aún no hay aprendices registrados en la hoja de cálculo.</p>
                  <p className="text-[11px] text-slate-400">
                    Haz clic en "Guardar este Aprendiz en Drive" arriba para agregar el primer registro.
                  </p>
                </div>
              ) : (
                <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-800/90 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="p-3">Fecha</th>
                        <th className="p-3">Aprendiz</th>
                        <th className="p-3">Documento</th>
                        <th className="p-3">Ficha</th>
                        <th className="p-3">Programa</th>
                        <th className="p-3 text-center">Progreso</th>
                        <th className="p-3">Estado</th>
                        <th className="p-3">Folio Certificado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {filteredRecords.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="p-3 font-mono text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                            {item.timestamp}
                          </td>
                          <td className="p-3 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                            {item.fullName}
                          </td>
                          <td className="p-3 font-mono text-[11px] text-slate-600 dark:text-slate-300 whitespace-nowrap">
                            {item.documentType} {item.documentNumber}
                          </td>
                          <td className="p-3 font-mono text-[11px] text-slate-700 dark:text-slate-200 whitespace-nowrap">
                            {item.fichaNumber}
                          </td>
                          <td className="p-3 text-slate-600 dark:text-slate-300 truncate max-w-[200px]" title={item.trainingProgram}>
                            {item.trainingProgram}
                          </td>
                          <td className="p-3 text-center">
                            <span className="font-bold text-[#39A900] font-mono text-[11px]">
                              {item.progressPercent}%
                            </span>
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                item.status === 'Completada'
                                  ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                                  : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-[10px] text-slate-400 whitespace-nowrap">
                            {item.certificateCode}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#39A900]" />
            <span>Los datos se guardan directamente en tu cuenta de Google Drive personal sin intermediarios.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* Confirmation Dialog for Destructive / Mutating Operation */}
      <DriveConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmAppend}
        record={currentRecordToAppend}
        spreadsheetName={spreadsheetInfo?.name || SPREADSHEET_DEFAULT_NAME}
        userEmail={currentUser?.email}
        isLoading={isAppending}
      />
    </div>
  );
};
