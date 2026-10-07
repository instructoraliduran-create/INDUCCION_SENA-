import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  ApprenticeSubmission, 
  QuizAnswerRecord,
  ApprenticeProfile 
} from '../types/induction';
import { 
  getSubmissions, 
  saveSubmission,
  updateSubmissionSyncStatus, 
  deleteSubmission, 
  clearAllSubmissions,
  validateAdminPin,
  getAdminPin,
  setAdminPin,
  isAdminSessionActive,
  setAdminSessionActive,
  exportSubmissionsToCSV,
  exportSubmissionsToJSON
} from '../services/submissionsStore';
import { 
  googleSignIn, 
  logout, 
  getAccessToken 
} from '../services/googleAuth';
import { 
  findOrCreateInductionSheet, 
  appendApprenticeRecord, 
  syncSubmissionsToSheet,
  linkExistingSpreadsheet,
  SpreadsheetInfo,
  SPREADSHEET_DEFAULT_NAME
} from '../services/sheetsService';
import { 
  Shield, 
  Lock, 
  Unlock, 
  FileSpreadsheet, 
  ExternalLink, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Trash2, 
  Key, 
  Eye, 
  AlertTriangle, 
  LogOut, 
  X, 
  Users, 
  Trophy, 
  Clock, 
  Check, 
  ChevronRight,
  Filter,
  Layers,
  Sparkles
} from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onUserChange: (user: User | null) => void;
  onAdminStateChange?: (isAdmin: boolean) => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChange,
  onAdminStateChange,
}) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => isAdminSessionActive());
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [submissions, setSubmissions] = useState<ApprenticeSubmission[]>([]);
  const [activeTab, setActiveTab] = useState<'submissions' | 'drive' | 'security'>('submissions');
  
  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'passed' | 'pendingSync'>('all');
  
  // Selected submission for viewing answers
  const [selectedSubmission, setSelectedSubmission] = useState<ApprenticeSubmission | null>(null);

  // Sheets sync state
  const [spreadsheetInfo, setSpreadsheetInfo] = useState<SpreadsheetInfo | null>(() => {
    try {
      const saved = localStorage.getItem('sena_admin_linked_sheet');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoggingInGoogle, setIsLoggingInGoogle] = useState(false);
  const [syncMessage, setSyncMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Custom sheet linking state
  const [customSheetInput, setCustomSheetInput] = useState('');
  const [isLinkingCustomSheet, setIsLinkingCustomSheet] = useState(false);

  // Change PIN state
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [pinChangeMessage, setPinChangeMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Reload submissions when opening or logging in
  useEffect(() => {
    if (isOpen) {
      setSubmissions(getSubmissions());
      const active = isAdminSessionActive();
      setIsAdminLoggedIn(active);
      if (onAdminStateChange) onAdminStateChange(active);
    }
  }, [isOpen]);

  // Load spreadsheet info if Google user is already logged in
  useEffect(() => {
    if (currentUser && isAdminLoggedIn && isOpen && !spreadsheetInfo) {
      loadSheetInfo();
    }
  }, [currentUser, isAdminLoggedIn, isOpen]);

  const loadSheetInfo = async () => {
    try {
      const token = await getAccessToken();
      if (!token) return;
      const info = await findOrCreateInductionSheet(token, SPREADSHEET_DEFAULT_NAME);
      setSpreadsheetInfo(info);
      localStorage.setItem('sena_admin_linked_sheet', JSON.stringify(info));
    } catch (err) {
      console.error('Error fetching sheet info', err);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAdminPin(pinInput)) {
      setIsAdminLoggedIn(true);
      setAdminSessionActive(true);
      setPinError(false);
      setPinInput('');
      setSubmissions(getSubmissions());
      if (onAdminStateChange) onAdminStateChange(true);
    } else {
      setPinError(true);
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminSessionActive(false);
    setPinInput('');
    setSelectedSubmission(null);
    if (onAdminStateChange) onAdminStateChange(false);
  };

  const handleGoogleConnect = async (forceConsent = true) => {
    setIsLoggingInGoogle(true);
    setSyncMessage(null);
    try {
      const result = await googleSignIn(forceConsent);
      if (result) {
        onUserChange(result.user);
        const token = await getAccessToken();
        if (token) {
          try {
            const info = await findOrCreateInductionSheet(token, SPREADSHEET_DEFAULT_NAME);
            setSpreadsheetInfo(info);
            localStorage.setItem('sena_admin_linked_sheet', JSON.stringify(info));
            setSyncMessage({
              type: 'success',
              text: `¡Conexión exitosa con Google Drive (${result.user.email})! Hoja de cálculo vinculada: "${info.name}".`,
            });
          } catch (sheetErr: any) {
            console.error('Error al preparar la hoja en Drive:', sheetErr);
            const msg = sheetErr?.message || String(sheetErr);
            if (msg.includes('ACCESS_TOKEN_SCOPE_INSUFFICIENT') || msg.includes('insufficient authentication scopes') || msg.includes('Permisos insuficientes')) {
              setSyncMessage({
                type: 'error',
                text: `Sesión de Google iniciada (${result.user.email}), pero se requiere conceder acceso a Google Sheets. Haz clic en "Autorizar Permisos de Google Sheets" abajo y asegúrate de marcar las casillas de verificación en la ventana de Google.`,
              });
            } else {
              setSyncMessage({
                type: 'error',
                text: `Sesión de Google iniciada (${result.user.email}), pero ocurrió un detalle con la hoja: ${msg}. Puedes crearla o vincular una hoja existente abajo.`,
              });
            }
          }
        }
      }
    } catch (err: any) {
      console.error('Error al conectar con Google:', err);
      let errorText = 'No se pudo conectar con Google. Verifica tu conexión e intenta de nuevo.';
      if (err?.code === 'auth/popup-blocked') {
        errorText = 'El navegador bloqueó la ventana emergente de inicio de sesión de Google. Por favor permite las ventanas emergentes (pop-ups) en tu navegador e intenta de nuevo.';
      } else if (err?.code === 'auth/popup-closed-by-user') {
        errorText = 'La ventana de inicio de sesión de Google se cerró antes de completar la autorización. Haz clic de nuevo en Conectar.';
      } else if (err?.code === 'auth/cancelled-popup-request') {
        errorText = 'Se canceló la ventana de autorización anterior. Por favor intenta de nuevo.';
      } else if (err?.code === 'auth/unauthorized-domain') {
        errorText = 'El dominio de la aplicación está actualizando permisos con Google Cloud. Acabamos de configurar la autorización de OAuth. Por favor reintenta en unos instantes.';
      } else if (err?.message) {
        errorText = `Error al conectar con Google: ${err.message}`;
      }
      setSyncMessage({
        type: 'error',
        text: errorText,
      });
    } finally {
      setIsLoggingInGoogle(false);
    }
  };

  const handleLinkCustomSheet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSheetInput.trim()) return;
    setIsLinkingCustomSheet(true);
    setSyncMessage(null);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error('Debes conectar tu cuenta de Google primero.');
      const info = await linkExistingSpreadsheet(token, customSheetInput.trim());
      setSpreadsheetInfo(info);
      localStorage.setItem('sena_admin_linked_sheet', JSON.stringify(info));
      setCustomSheetInput('');
      setSyncMessage({
        type: 'success',
        text: `Hoja vinculada exitosamente: "${info.name}". Los registros se sincronizarán con esta hoja.`,
      });
    } catch (err: any) {
      console.error(err);
      setSyncMessage({
        type: 'error',
        text: err?.message || 'No se pudo vincular la hoja. Verifica que tengas permisos de edición en ese archivo.',
      });
    } finally {
      setIsLinkingCustomSheet(false);
    }
  };

  const handleGoogleDisconnect = async () => {
    try {
      await logout();
      onUserChange(null);
      setSpreadsheetInfo(null);
      localStorage.removeItem('sena_admin_linked_sheet');
      setSyncMessage({
        type: 'success',
        text: 'Sesión de Google cerrada correctamente.',
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSyncAllPending = async () => {
    if (!currentUser) {
      setSyncMessage({
        type: 'error',
        text: 'Primero debes conectar tu cuenta de Google como instructor.',
      });
      return;
    }

    const pending = submissions.filter(s => !s.syncedToSheets);
    if (pending.length === 0) {
      setSyncMessage({
        type: 'success',
        text: 'Todos los aprendices ya se encuentran sincronizados con la hoja de cálculo.',
      });
      return;
    }

    setIsSyncing(true);
    setSyncMessage(null);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error('Token de Google no disponible. Vuelve a iniciar sesión.');

      const info = spreadsheetInfo || (await findOrCreateInductionSheet(token, SPREADSHEET_DEFAULT_NAME));
      setSpreadsheetInfo(info);

      await syncSubmissionsToSheet(token, info.id, info.sheetTitle, pending);

      // Update local status
      pending.forEach(p => updateSubmissionSyncStatus(p.id, true));
      setSubmissions(getSubmissions());

      setSyncMessage({
        type: 'success',
        text: `¡Sincronización exitosa! Se enviaron ${pending.length} registros a la hoja de Google Drive.`,
      });
    } catch (err: any) {
      console.error(err);
      setSyncMessage({
        type: 'error',
        text: err.message || 'Error al sincronizar con Google Sheets.',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSyncSingle = async (sub: ApprenticeSubmission) => {
    if (!currentUser) {
      setActiveTab('drive');
      setSyncMessage({
        type: 'error',
        text: 'Conecta tu cuenta de Google para sincronizar este registro con la hoja de cálculo.',
      });
      return;
    }

    setIsSyncing(true);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error('Sesión de Google expirada.');

      const info = spreadsheetInfo || (await findOrCreateInductionSheet(token, SPREADSHEET_DEFAULT_NAME));
      setSpreadsheetInfo(info);

      await appendApprenticeRecord(token, info.id, info.sheetTitle, {
        timestamp: sub.timestamp,
        fullName: sub.profile.fullName,
        documentType: sub.profile.documentType,
        documentNumber: sub.profile.documentNumber,
        fichaNumber: sub.profile.fichaNumber,
        trainingProgram: sub.profile.trainingProgram,
        trainingCenter: sub.profile.trainingCenter,
        regional: sub.profile.regional,
        instructorName: sub.profile.instructorName,
        progressPercent: sub.progressPercent,
        quizScorePercent: sub.quizScorePercent,
        gamifiedPoints: sub.gamifiedPoints,
        timeFormatted: sub.timeFormatted,
        status: sub.progressPercent >= 100 || sub.quizPassed ? 'Completada' : 'En Curso',
        certificateCode: sub.certificateCode,
      });

      updateSubmissionSyncStatus(sub.id, true);
      setSubmissions(getSubmissions());

      setSyncMessage({
        type: 'success',
        text: `Aprendiz "${sub.profile.fullName}" sincronizado en Google Sheets.`,
      });
    } catch (err: any) {
      console.error(err);
      setSyncMessage({
        type: 'error',
        text: err.message || 'Error al sincronizar aprendiz.',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`¿Estás seguro de eliminar el registro de ${name}?`)) {
      deleteSubmission(id);
      setSubmissions(getSubmissions());
      if (selectedSubmission?.id === id) setSelectedSubmission(null);
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinChangeMessage(null);

    if (!validateAdminPin(currentPinInput)) {
      setPinChangeMessage({ type: 'error', text: 'El PIN actual ingresado es incorrecto.' });
      return;
    }

    if (newPinInput.length < 4) {
      setPinChangeMessage({ type: 'error', text: 'El nuevo PIN debe tener al menos 4 caracteres.' });
      return;
    }

    if (newPinInput !== confirmPinInput) {
      setPinChangeMessage({ type: 'error', text: 'El nuevo PIN y su confirmación no coinciden.' });
      return;
    }

    const ok = setAdminPin(newPinInput);
    if (ok) {
      setPinChangeMessage({ type: 'success', text: '¡PIN administrativo actualizado exitosamente!' });
      setCurrentPinInput('');
      setNewPinInput('');
      setConfirmPinInput('');
    }
  };

  if (!isOpen) return null;

  // Filtered submissions
  const filteredSubmissions = submissions.filter(s => {
    const term = searchTerm.toLowerCase();
    const matchSearch = 
      s.profile.fullName.toLowerCase().includes(term) ||
      s.profile.documentNumber.includes(term) ||
      s.profile.fichaNumber.includes(term) ||
      s.profile.trainingProgram.toLowerCase().includes(term);

    if (!matchSearch) return false;
    if (statusFilter === 'passed') return s.quizPassed;
    if (statusFilter === 'pendingSync') return !s.syncedToSheets;
    return true;
  });

  const totalCount = submissions.length;
  const passedCount = submissions.filter(s => s.quizPassed).length;
  const pendingSyncCount = submissions.filter(s => !s.syncedToSheets).length;
  const avgScore = totalCount > 0 
    ? Math.round(submissions.reduce((acc, curr) => acc + curr.quizScorePercent, 0) / totalCount)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="glass-panel w-full max-w-5xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-[#0b1220] text-slate-900 dark:text-white overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* ============================================================== */}
        {/* SCREEN 1: PIN AUTHENTICATION REQUIRED (PROTECTED ACCESS)        */}
        {/* ============================================================== */}
        {!isAdminLoggedIn ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#39A900]/15 text-[#39A900] border border-[#39A900]/30 flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#39A900]">
                Área Restringida
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                Portal del Instructor
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Por seguridad de la información, el acceso a las hojas de cálculo y resultados de aprendices está protegido. Ingresa tu clave o PIN de instructor.
              </p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  PIN de Acceso Administrativo
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError(false);
                    }}
                    placeholder="Ingresa el PIN de instructor"
                    autoFocus
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-mono tracking-widest bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all ${
                      pinError 
                        ? 'border-red-500 ring-2 ring-red-500/20' 
                        : 'border-slate-300 dark:border-slate-700 focus:border-[#39A900] focus:ring-2 focus:ring-[#39A900]/20'
                    }`}
                  />
                  <Key className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                </div>
                {pinError && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 flex items-center gap-1 font-medium">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>PIN incorrecto. Verifica e intenta de nuevo.</span>
                  </p>
                )}
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
                  PIN inicial por defecto: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono font-bold text-[#39A900]">sena2024</code>
                </p>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#39A900] hover:bg-[#319200] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Desbloquear</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* ============================================================== */
          /* SCREEN 2: AUTHENTICATED INSTRUCTOR ADMIN DASHBOARD             */
          /* ============================================================== */
          <>
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/60 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#39A900] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                      Portal Administrativo del Instructor
                    </h2>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#39A900]" />
                      Sesión Activa
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Control seguro de evaluaciones, sincronización a Drive y privacidad para aprendices
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAdminLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 hover:border-red-300 dark:hover:border-red-800 transition-colors cursor-pointer"
                  title="Bloquear y volver al modo aprendiz"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cerrar Sesión</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-6 pt-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 overflow-x-auto bg-white dark:bg-[#0b1220]">
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => setActiveTab('submissions')}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'submissions'
                      ? 'border-[#39A900] text-[#39A900]'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Aprendices & Evaluaciones</span>
                  <span className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px] font-mono">
                    {submissions.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('drive')}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'drive'
                      ? 'border-[#39A900] text-[#39A900]'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Google Sheets & Drive</span>
                  {currentUser && (
                    <span className="w-2 h-2 rounded-full bg-[#39A900]" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'security'
                      ? 'border-[#39A900] text-[#39A900]'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>Seguridad & PIN</span>
                </button>
              </div>
            </div>

            {/* Prominent Dismissable Sync & Status Banner */}
            {syncMessage && (
              <div className={`mx-6 mt-4 p-3.5 rounded-2xl flex items-start justify-between gap-3 text-xs font-medium transition-all ${
                syncMessage.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800'
                  : 'bg-red-50 dark:bg-red-950/70 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-800'
              }`}>
                <div className="flex items-start gap-2.5">
                  {syncMessage.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <span className="leading-relaxed">{syncMessage.text}</span>
                </div>
                <button
                  onClick={() => setSyncMessage(null)}
                  className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-current cursor-pointer shrink-0"
                  title="Cerrar notificación"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Main Tabs Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">

              {/* -------------------------------------------------------- */}
              {/* TAB 1: APPRENTICE SUBMISSIONS & TEST REVIEWS            */}
              {/* -------------------------------------------------------- */}
              {activeTab === 'submissions' && (
                <div className="space-y-6">
                  {/* Stats Overview Bento */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
                        <span>Total Aprendices</span>
                        <Users className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                        {totalCount}
                      </div>
                      <span className="text-[10px] text-slate-400">Registrados en plataforma</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
                        <span>Aprobados (≥70%)</span>
                        <Trophy className="w-4 h-4 text-[#39A900]" />
                      </div>
                      <div className="text-2xl font-black text-[#39A900] font-mono">
                        {passedCount}
                      </div>
                      <span className="text-[10px] text-slate-400">Evaluación superada</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
                        <span>Promedio Puntaje</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                        {avgScore}%
                      </div>
                      <span className="text-[10px] text-slate-400">En prueba formativa</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
                        <span>Por Sincronizar</span>
                        <FileSpreadsheet className="w-4 h-4 text-[#39A900]" />
                      </div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                        {pendingSyncCount}
                      </div>
                      <span className="text-[10px] text-slate-400">Listos en almacén local</span>
                    </div>
                  </div>

                  {/* Search, Filter & Export Toolbar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar por aprendiz, cédula, ficha o programa..."
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-[#39A900]"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 text-xs font-semibold">
                        <button
                          onClick={() => setStatusFilter('all')}
                          className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                            statusFilter === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          Todos ({totalCount})
                        </button>
                        <button
                          onClick={() => setStatusFilter('passed')}
                          className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                            statusFilter === 'passed' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs' : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          Aprobados ({passedCount})
                        </button>
                        <button
                          onClick={() => setStatusFilter('pendingSync')}
                          className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                            statusFilter === 'pendingSync' ? 'bg-white dark:bg-slate-700 text-[#39A900] dark:text-emerald-400 shadow-xs' : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          Por Sincronizar ({pendingSyncCount})
                        </button>
                      </div>

                      <button
                        onClick={() => exportSubmissionsToCSV(submissions)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Exportar archivo CSV compatible con Excel"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-500" />
                        <span>CSV</span>
                      </button>

                      <button
                        onClick={() => exportSubmissionsToJSON(submissions)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Exportar archivo JSON completo"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-500" />
                        <span>JSON</span>
                      </button>

                      <button
                        onClick={handleSyncAllPending}
                        disabled={isSyncing || pendingSyncCount === 0}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#39A900] hover:bg-[#319200] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                        title="Sincronizar todos los aprendices pendientes con Google Sheets"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                        <span>Sincronizar ({pendingSyncCount})</span>
                      </button>
                    </div>
                  </div>

                  {/* Submissions Table */}
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/40">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                          <tr>
                            <th className="py-3 px-4">Aprendiz</th>
                            <th className="py-3 px-4">Ficha & Programa</th>
                            <th className="py-3 px-4 text-center">Evaluación</th>
                            <th className="py-3 px-4 text-center">Avance</th>
                            <th className="py-3 px-4 text-center">Drive / Sheets</th>
                            <th className="py-3 px-4">Fecha</th>
                            <th className="py-3 px-4 text-right">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                          {filteredSubmissions.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="py-8 text-center text-slate-400">
                                No se encontraron registros de aprendices con los filtros aplicados.
                              </td>
                            </tr>
                          ) : (
                            filteredSubmissions.map((sub) => (
                              <tr key={sub.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                                  <div>{sub.profile.fullName}</div>
                                  <div className="text-[11px] text-slate-400 font-mono font-normal">
                                    {sub.profile.documentType} {sub.profile.documentNumber}
                                  </div>
                                </td>

                                <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                                  <div className="font-mono font-semibold text-[#39A900]">
                                    Ficha {sub.profile.fichaNumber}
                                  </div>
                                  <div className="text-[11px] text-slate-400 truncate max-w-[200px]" title={sub.profile.trainingProgram}>
                                    {sub.profile.trainingProgram}
                                  </div>
                                </td>

                                <td className="py-3.5 px-4 text-center">
                                  <div className="inline-flex flex-col items-center">
                                    <div className="flex items-center gap-1.5 font-mono">
                                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                                        {sub.quizScorePercent}%
                                      </span>
                                      {sub.gamifiedPoints !== undefined && (
                                        <span className="text-[11px] text-[#39A900] font-bold">
                                          ({sub.gamifiedPoints} pts)
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-1 mt-0.5">
                                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                                        sub.quizPassed 
                                          ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                                          : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
                                      }`}>
                                        {sub.quizPassed ? 'Aprobado' : 'Por Repetir'}
                                      </span>
                                      {sub.timeFormatted && (
                                        <span className="text-[10px] font-mono text-slate-400">
                                          ⏱️ {sub.timeFormatted}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </td>

                                <td className="py-3.5 px-4 text-center">
                                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                                    {sub.progressPercent}%
                                  </span>
                                </td>

                                <td className="py-3.5 px-4 text-center">
                                  {sub.syncedToSheets ? (
                                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                      <span>Sincronizado</span>
                                    </span>
                                  ) : (
                                    <button
                                      onClick={() => handleSyncSingle(sub)}
                                      disabled={isSyncing}
                                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                                      title="Haz clic para enviar a Google Sheets"
                                    >
                                      <Clock className="w-3 h-3" />
                                      <span>Pendiente</span>
                                    </button>
                                  )}
                                </td>

                                <td className="py-3.5 px-4 text-slate-400 text-[11px] font-mono">
                                  {sub.timestamp.split(',')[0]}
                                </td>

                                <td className="py-3.5 px-4 text-right">
                                  <div className="inline-flex items-center gap-1.5">
                                    <button
                                      onClick={() => setSelectedSubmission(sub)}
                                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#39A900] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                                      title="Ver respuestas detalladas del aprendiz"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDelete(sub.id, sub.profile.fullName)}
                                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                                      title="Eliminar registro"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------- */}
              {/* TAB 2: GOOGLE SHEETS & DRIVE SETTINGS                   */}
              {/* -------------------------------------------------------- */}
              {activeTab === 'drive' && (
                <div className="space-y-6">
                  {/* Connection Card */}
                  <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-[#39A900] flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                          <FileSpreadsheet className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            Almacenamiento en Google Drive del Instructor
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Centraliza los registros sin que los aprendices tengan acceso al enlace ni a la hoja
                          </p>
                        </div>
                      </div>

                      {currentUser ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleGoogleDisconnect}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400 hover:border-red-200 transition-colors cursor-pointer"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Desconectar Cuenta</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleGoogleConnect(true)}
                          disabled={isLoggingInGoogle}
                          className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-600 font-semibold text-xs transition-all shadow-xs hover:shadow-md cursor-pointer disabled:opacity-60"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                            />
                          </svg>
                          <span>{isLoggingInGoogle ? 'Conectando con Google...' : 'Acceder con Google Workspace'}</span>
                        </button>
                      )}
                    </div>

                    {currentUser ? (
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                            <span className="text-slate-400 block font-medium">Cuenta Google Conectada</span>
                            <span className="font-semibold text-slate-900 dark:text-white font-mono break-all">
                              {currentUser.email}
                            </span>
                          </div>

                          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400 font-medium">Hoja de Cálculo Activa</span>
                              <button
                                onClick={loadSheetInfo}
                                className="text-[10px] text-[#39A900] hover:underline cursor-pointer flex items-center gap-1"
                                title="Volver a verificar o crear la hoja"
                              >
                                <RefreshCw className="w-2.5 h-2.5" />
                                <span>Refrescar</span>
                              </button>
                            </div>
                            <span className="font-semibold text-[#39A900] font-mono truncate block" title={spreadsheetInfo?.name}>
                              {spreadsheetInfo?.name || SPREADSHEET_DEFAULT_NAME}
                            </span>
                          </div>
                        </div>

                        {/* Direct Instructor Access Link */}
                        {spreadsheetInfo?.webViewLink ? (
                          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/70 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <CheckCircle2 className="w-5 h-5 text-[#39A900] shrink-0" />
                              <span className="text-xs text-emerald-900 dark:text-emerald-200">
                                Tu hoja de cálculo está vinculada en tu Google Drive. Solo tú tienes acceso administrativo.
                              </span>
                            </div>
                            <a
                              href={spreadsheetInfo.webViewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#39A900] hover:bg-[#319200] text-white text-xs font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap"
                            >
                              <span>Abrir Hoja en Drive</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        ) : (
                          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div className="text-xs text-amber-900 dark:text-amber-200 space-y-0.5">
                              <span className="font-bold block">Permisos requeridos para Google Sheets:</span>
                              <span>Haz clic en el botón para otorgar permisos a la hoja de cálculo en tu cuenta.</span>
                            </div>
                            <button
                              onClick={() => handleGoogleConnect(true)}
                              disabled={isLoggingInGoogle}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#39A900] hover:bg-[#319200] text-white text-xs font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap"
                            >
                              <RefreshCw className={`w-3.5 h-3.5 ${isLoggingInGoogle ? 'animate-spin' : ''}`} />
                              <span>Autorizar Permisos de Google Sheets</span>
                            </button>
                          </div>
                        )}

                        {/* Custom Sheet Link Option */}
                        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                              Vincular otra Hoja de Cálculo Existente (Opcional)
                            </h4>
                            <span className="text-[10px] text-slate-400">Pega la URL o ID de Google Sheets</span>
                          </div>
                          <form onSubmit={handleLinkCustomSheet} className="flex gap-2">
                            <input
                              type="text"
                              value={customSheetInput}
                              onChange={(e) => setCustomSheetInput(e.target.value)}
                              placeholder="Ej: https://docs.google.com/spreadsheets/d/1BxiMVs0X... o el ID"
                              className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#39A900]"
                            />
                            <button
                              type="submit"
                              disabled={isLinkingCustomSheet || !customSheetInput.trim()}
                              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-xs font-semibold disabled:opacity-50 transition-colors cursor-pointer"
                            >
                              {isLinkingCustomSheet ? 'Vinculando...' : 'Vincular'}
                            </button>
                          </form>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                          <span className="text-xs text-slate-500">
                            <strong>{pendingSyncCount}</strong> registros de aprendices pendientes por sincronizar
                          </span>
                          <button
                            onClick={handleSyncAllPending}
                            disabled={isSyncing || pendingSyncCount === 0}
                            className="flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-[#39A900] hover:bg-[#319200] text-white text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-40"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                            <span>Sincronizar Todos los Pendientes</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                            <span>Estado: Cuenta de Google no vinculada en esta sesión</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400">
                            Presiona <strong>"Acceder con Google Workspace"</strong> arriba para sincronizar directamente con tu Google Drive institucional. La hoja oficial <strong>"{SPREADSHEET_DEFAULT_NAME}"</strong> se creará de forma automática en tu cuenta.
                          </p>
                        </div>

                        {/* Troubleshooting & instructions card */}
                        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2 text-slate-600 dark:text-slate-300">
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#39A900]" />
                            <span>¿Cómo funciona la conexión segura?</span>
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-slate-500 dark:text-slate-400">
                            <li>Se abrirá una ventana emergente de Google para iniciar sesión. Si tu navegador tiene un <strong>bloqueador de pop-ups</strong>, permite las ventanas emergentes para este sitio.</li>
                            <li>Solo el instructor tiene acceso a este panel y a la hoja de Google Drive; los aprendices nunca ven el enlace ni los datos.</li>
                            <li>Los permisos configurados son <strong>Google Sheets</strong> y <strong>Google Drive (archivos de la app)</strong> bajo el principio de menor privilegio.</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------- */}
              {/* TAB 3: SECURITY, PIN MANAGEMENT & DATA CONTROLS         */}
              {/* -------------------------------------------------------- */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  {/* Change PIN Card */}
                  <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                      <Key className="w-5 h-5 text-[#39A900]" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Cambiar PIN de Acceso del Instructor
                      </h3>
                    </div>

                    <form onSubmit={handleChangePin} className="max-w-md space-y-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                          PIN Actual
                        </label>
                        <input
                          type="password"
                          value={currentPinInput}
                          onChange={(e) => setCurrentPinInput(e.target.value)}
                          placeholder="Ingresa tu PIN actual"
                          className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#39A900]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                            Nuevo PIN
                          </label>
                          <input
                            type="password"
                            value={newPinInput}
                            onChange={(e) => setNewPinInput(e.target.value)}
                            placeholder="Mínimo 4 caracteres"
                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#39A900]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                            Confirmar Nuevo PIN
                          </label>
                          <input
                            type="password"
                            value={confirmPinInput}
                            onChange={(e) => setConfirmPinInput(e.target.value)}
                            placeholder="Repite el nuevo PIN"
                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#39A900]"
                          />
                        </div>
                      </div>

                      {pinChangeMessage && (
                        <p className={`text-xs font-semibold ${
                          pinChangeMessage.type === 'success' ? 'text-emerald-600' : 'text-red-500'
                        }`}>
                          {pinChangeMessage.text}
                        </p>
                      )}

                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#39A900] hover:bg-[#319200] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                      >
                        Actualizar PIN
                      </button>
                    </form>
                  </div>

                  {/* Architecture & Information Privacy Notice */}
                  <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-200 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <Shield className="w-4 h-4 text-[#39A900]" />
                      <span>Garantía de Privacidad y Seguridad para Aprendices</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                      <li>La interfaz pública de aprendices no expone enlaces ni botones hacia Google Drive.</li>
                      <li>Las respuestas de los aprendices se recopilan de manera aislada y solo el instructor las visualiza.</li>
                      <li>Al cerrar esta ventana o presionar "Cerrar Sesión", el prototipo queda en modo aprendiz estricto.</li>
                    </ul>
                  </div>

                  {/* Danger Zone: Clear Demo Records */}
                  <div className="p-5 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-red-900 dark:text-red-300">
                        Limpieza de Registros de Demostración
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Elimina todos los aprendices almacenados localmente para empezar un proceso en limpio.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm('¿Deseas vaciar todos los registros locales de aprendices? Esta acción no se puede deshacer.')) {
                          clearAllSubmissions();
                          setSubmissions([]);
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Vaciar Registros
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Detailed Answers Modal for an Apprentice */}
            {selectedSubmission && (
              <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
                <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-slate-900 dark:text-white space-y-5 max-h-[85vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#39A900]">
                        Detalle de Evaluación
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {selectedSubmission.profile.fullName}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono">
                        {selectedSubmission.profile.documentType} {selectedSubmission.profile.documentNumber} · Ficha {selectedSubmission.profile.fichaNumber}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedSubmission(null)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Score Highlight */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-center">
                    <div>
                      <span className="text-slate-400 block font-medium">Puntaje %</span>
                      <span className="text-xl font-black text-[#39A900] font-mono">
                        {selectedSubmission.quizScorePercent}%
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Puntos Gamificados</span>
                      <span className="text-xl font-black text-amber-500 font-mono">
                        {selectedSubmission.gamifiedPoints || 0} pts
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Tiempo Empleado</span>
                      <span className="text-xl font-black text-blue-500 font-mono">
                        {selectedSubmission.timeFormatted || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Estado Final</span>
                      <span className={`inline-block font-bold px-2 py-0.5 rounded text-[11px] mt-1 ${
                        selectedSubmission.quizPassed
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                      }`}>
                        {selectedSubmission.quizPassed ? 'Aprobado' : 'Requiere Refuerzo'}
                      </span>
                    </div>
                  </div>

                  {/* Answers Breakdown */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Respuestas Registradas
                    </h4>
                    {selectedSubmission.quizAnswers && selectedSubmission.quizAnswers.length > 0 ? (
                      <div className="space-y-2.5">
                        {selectedSubmission.quizAnswers.map((ans, idx) => (
                          <div 
                            key={idx}
                            className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                              ans.isCorrect 
                                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                                : 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900/60'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-semibold text-slate-900 dark:text-white">
                                {idx + 1}. {ans.questionText}
                              </span>
                              {ans.isCorrect ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                              )}
                            </div>
                            <div className="text-[11px] text-slate-600 dark:text-slate-300">
                              <span className="font-semibold">Respuesta del aprendiz: </span>
                              <span>{ans.selectedOptionText}</span>
                            </div>
                            {!ans.isCorrect && (
                              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                                <span className="font-semibold">Respuesta correcta: </span>
                                <span>{ans.correctAnswerText}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">
                        Detalle específico de opciones no disponible para este registro histórico.
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setSelectedSubmission(null)}
                      className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
                    >
                      Cerrar Detalle
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
