/**
 * Service to interact with Google Sheets and Google Drive APIs
 * for apprentice induction record management.
 */

export interface ApprenticeInductionRecord {
  timestamp: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  fichaNumber: string;
  trainingProgram: string;
  trainingCenter: string;
  regional: string;
  instructorName: string;
  progressPercent: number;
  quizScorePercent?: number;
  gamifiedPoints?: number;
  timeFormatted?: string;
  status: 'Completada' | 'En Curso';
  certificateCode: string;
}

export interface SpreadsheetInfo {
  id: string;
  name: string;
  webViewLink: string;
  sheetTitle: string;
  isNewlyCreated?: boolean;
}

export const SPREADSHEET_DEFAULT_NAME = 'Registro de Inducción SENA - Aprendices';
export const SHEET_DEFAULT_TAB_NAME = 'Aprendices Inducción';

const HEADER_COLUMNS = [
  'Fecha y Hora Registro',
  'Nombre Completo del Aprendiz',
  'Tipo Documento',
  'Número Documento',
  'Ficha SENA',
  'Programa de Formación',
  'Centro de Formación',
  'Regional SENA',
  'Instructor / Líder',
  'Progreso Inducción (%)',
  'Puntaje Evaluación (%)',
  'Puntos Gamificados',
  'Tiempo Empleado',
  'Estado Inducción',
  'Código de Certificado'
];

/**
 * Search Google Drive for an existing spreadsheet with the given name,
 * or create a new one if it does not exist.
 */
export const findOrCreateInductionSheet = async (
  accessToken: string,
  title: string = SPREADSHEET_DEFAULT_NAME
): Promise<SpreadsheetInfo> => {
  // 1. Search for existing spreadsheet in user's Drive
  try {
    const query = `name = '${title.replace(/'/g, "\\'")}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`;
    const searchRes = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,webViewLink)&pageSize=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (searchData.files && searchData.files.length > 0) {
        const file = searchData.files[0];
        // Fetch sheet title from metadata
        const metaRes = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${file.id}?fields=sheets.properties.title`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        let tabName = SHEET_DEFAULT_TAB_NAME;
        if (metaRes.ok) {
          const metaData = await metaRes.json();
          if (metaData.sheets && metaData.sheets.length > 0) {
            tabName = metaData.sheets[0].properties?.title || SHEET_DEFAULT_TAB_NAME;
          }
        }

        return {
          id: file.id,
          name: file.name,
          webViewLink: file.webViewLink || `https://docs.google.com/spreadsheets/d/${file.id}/edit`,
          sheetTitle: tabName,
          isNewlyCreated: false,
        };
      }
    }
  } catch (err) {
    console.warn('Error al buscar hoja existente en Drive, procediendo a crear nueva:', err);
  }

  // 2. If not found, create a new spreadsheet with standard configuration
  const createPayload = {
    properties: {
      title,
    },
    sheets: [
      {
        properties: {
          title: SHEET_DEFAULT_TAB_NAME,
          gridProperties: {
            frozenRowCount: 1,
            rowCount: 500,
            columnCount: HEADER_COLUMNS.length + 5,
          },
        },
      },
    ],
  };

  // 2. Create spreadsheet: Try Sheets API first, fallback to Drive API
  let spreadsheetId: string | null = null;
  let sheetId = 0;

  try {
    const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createPayload),
    });

    if (createRes.ok) {
      const createdData = await createRes.json();
      spreadsheetId = createdData.spreadsheetId;
      sheetId = createdData.sheets?.[0]?.properties?.sheetId || 0;
    } else {
      const errorText = await createRes.text();
      console.warn('Sheets API create returned error, attempting Drive API fallback:', errorText);
    }
  } catch (err) {
    console.warn('Sheets API request error, attempting Drive API fallback:', err);
  }

  // Fallback: If Sheets API had scope restrictions, create via Drive API
  if (!spreadsheetId) {
    const driveCreateRes = await fetch('https://www.googleapis.com/drive/v3/files?fields=id,name,webViewLink', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: title,
        mimeType: 'application/vnd.google-apps.spreadsheet',
      }),
    });

    if (driveCreateRes.ok) {
      const driveData = await driveCreateRes.json();
      spreadsheetId = driveData.id;
    } else {
      const driveErr = await driveCreateRes.text();
      let friendlyError = driveErr;
      try {
        const parsed = JSON.parse(driveErr);
        friendlyError = parsed.error?.message || driveErr;
      } catch {}
      throw new Error(`Permisos insuficientes de Google (ACCESS_TOKEN_SCOPE_INSUFFICIENT): Por favor haz clic en "Reconectar y Autorizar Permisos" para habilitar el acceso a Google Sheets y Google Drive.`);
    }
  }

  // 3. Write header row via values.update
  try {
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(SHEET_DEFAULT_TAB_NAME)}!A1:O1?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          range: `${SHEET_DEFAULT_TAB_NAME}!A1:O1`,
          majorDimension: 'ROWS',
          values: [HEADER_COLUMNS],
        }),
      }
    );
  } catch (valErr) {
    console.warn('No se pudieron escribir las cabeceras inmediatamente:', valErr);
  }

  // 4. Format header row with SENA Green background and bold white text
  try {
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            repeatCell: {
              range: {
                sheetId,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: HEADER_COLUMNS.length,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    red: 0.2235, // #39A900
                    green: 0.6627,
                    blue: 0.0,
                  },
                  textFormat: {
                    foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 },
                    bold: true,
                    fontSize: 10,
                  },
                  horizontalAlignment: 'CENTER',
                },
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)',
            },
          },
          {
            autoResizeDimensions: {
              dimensions: {
                sheetId,
                dimension: 'COLUMNS',
                startIndex: 0,
                endIndex: HEADER_COLUMNS.length,
              },
            },
          },
        ],
      }),
    });
  } catch (formatErr) {
    console.warn('No se pudo aplicar estilo a la cabecera, continuando:', formatErr);
  }

  if (!spreadsheetId) {
    throw new Error('No se pudo obtener el identificador de la hoja de cálculo creada.');
  }

  return {
    id: spreadsheetId,
    name: title,
    webViewLink: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
    sheetTitle: SHEET_DEFAULT_TAB_NAME,
    isNewlyCreated: true,
  };
};

/**
 * Link an existing Google Spreadsheet by its ID or direct URL.
 */
export const linkExistingSpreadsheet = async (
  accessToken: string,
  urlOrId: string
): Promise<SpreadsheetInfo> => {
  let spreadsheetId = urlOrId.trim();
  const match = urlOrId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    spreadsheetId = match[1];
  }

  const metaRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=properties.title,sheets.properties.title`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!metaRes.ok) {
    const errorText = await metaRes.text();
    throw new Error(`No se pudo acceder a la hoja de cálculo: ${errorText}`);
  }

  const metaData = await metaRes.json();
  const name = metaData.properties?.title || 'Hoja de Cálculo SENA';
  const tabName = metaData.sheets?.[0]?.properties?.title || SHEET_DEFAULT_TAB_NAME;

  return {
    id: spreadsheetId,
    name,
    webViewLink: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
    sheetTitle: tabName,
    isNewlyCreated: false,
  };
};

/**
 * Append an apprentice record row to the Google Sheet.
 */
export const appendApprenticeRecord = async (
  accessToken: string,
  spreadsheetId: string,
  sheetTitle: string,
  record: ApprenticeInductionRecord
): Promise<boolean> => {
  const rowValues = [
    record.timestamp,
    record.fullName,
    record.documentType,
    record.documentNumber,
    record.fichaNumber,
    record.trainingProgram,
    record.trainingCenter,
    record.regional,
    record.instructorName,
    `${record.progressPercent}%`,
    record.quizScorePercent !== undefined ? `${record.quizScorePercent}%` : 'N/A',
    record.gamifiedPoints !== undefined ? `${record.gamifiedPoints} pts` : 'N/A',
    record.timeFormatted || 'N/A',
    record.status,
    record.certificateCode,
  ];

  const range = `${sheetTitle}!A:O`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
    range
  )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [rowValues],
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al registrar el aprendiz en la hoja de Google: ${errorText}`);
  }

  return true;
};

/**
 * Batch append multiple apprentice submissions to Google Sheet.
 */
export const syncSubmissionsToSheet = async (
  accessToken: string,
  spreadsheetId: string,
  sheetTitle: string,
  submissions: {
    timestamp: string;
    profile: {
      fullName: string;
      documentType: string;
      documentNumber: string;
      fichaNumber: string;
      trainingProgram: string;
      trainingCenter: string;
      regional: string;
      instructorName: string;
    };
    progressPercent: number;
    quizScorePercent: number;
    quizPassed: boolean;
    certificateCode: string;
    gamifiedPoints?: number;
    timeFormatted?: string;
  }[]
): Promise<number> => {
  if (!submissions || submissions.length === 0) return 0;

  const rows = submissions.map(s => [
    s.timestamp,
    s.profile.fullName,
    s.profile.documentType,
    s.profile.documentNumber,
    s.profile.fichaNumber,
    s.profile.trainingProgram,
    s.profile.trainingCenter,
    s.profile.regional,
    s.profile.instructorName,
    `${s.progressPercent}%`,
    `${s.quizScorePercent}%`,
    s.gamifiedPoints !== undefined ? `${s.gamifiedPoints} pts` : 'N/A',
    s.timeFormatted || 'N/A',
    s.progressPercent >= 100 || s.quizPassed ? 'Completada' : 'En Curso',
    s.certificateCode,
  ]);

  const range = `${sheetTitle}!A:O`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
    range
  )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: rows,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al sincronizar registros con Google Sheets: ${errorText}`);
  }

  return submissions.length;
};

/**
 * Fetch all registered apprentices from the Google Sheet.
 */
export const fetchApprenticeRecords = async (
  accessToken: string,
  spreadsheetId: string,
  sheetTitle: string
): Promise<ApprenticeInductionRecord[]> => {
  const range = `${sheetTitle}!A2:L`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  if (!data.values || !Array.isArray(data.values)) {
    return [];
  }

  return data.values.map((row: string[]) => {
    const progressVal = parseInt((row[9] || '0').replace('%', ''), 10);
    return {
      timestamp: row[0] || '',
      fullName: row[1] || '',
      documentType: row[2] || '',
      documentNumber: row[3] || '',
      fichaNumber: row[4] || '',
      trainingProgram: row[5] || '',
      trainingCenter: row[6] || '',
      regional: row[7] || '',
      instructorName: row[8] || '',
      progressPercent: isNaN(progressVal) ? 0 : progressVal,
      status: (row[10] as 'Completada' | 'En Curso') || 'En Curso',
      certificateCode: row[11] || '',
    };
  });
};
