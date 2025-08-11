"use server";

import { google } from "googleapis";

interface ValuesInput {
  name: string;
  email: string;
  phone: string;
  message: string;
}

function getJwtAuth() {
  const email = process.env.GOOGLE_CLIENT_EMAIL!;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY!;

  // Normalize the private key to handle various formatting issues
  const key = rawKey
    .replace(/\\n/g, "\n") // Convert escaped newlines
    .replace(/\\r/g, "\r") // Convert escaped carriage returns
    .replace(/\r/g, "") // Remove actual carriage returns
    .replace(/^\uFEFF/, "") // Remove BOM if present
    .replace(/^["']+|["']+$/g, "") // Remove surrounding quotes
    .trim(); // Remove leading/trailing whitespace

  return new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function getSheetData({
  valuesInput,
}: {
  valuesInput: ValuesInput;
}) {
  const auth = getJwtAuth();
  const sheets = google.sheets({ version: "v4", auth });

  // Get existing data to determine the next ID
  let nextId = 1;
  try {
    const existingData = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID!,
      range: "Formulario_contactos!A:A", // Only get column A (IDs)
    });

    const rows = existingData.data.values;
    if (rows && rows.length > 0) {
      // Find the highest ID and add 1
      const ids = rows
        .map((row) => parseInt(row[0]))
        .filter((id) => !isNaN(id));

      if (ids.length > 0) {
        nextId = Math.max(...ids) + 1;
      }
    }
  } catch (error) {
    // If there's an error reading (e.g., sheet is empty), start with ID 1
    console.log("No existing data found, starting with ID 1", error);
  }

  const date = new Date().toLocaleString("es-PR");
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID!,
    range: "Formulario_contactos!A:G",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          nextId,
          valuesInput.name,
          valuesInput.email,
          valuesInput.phone,
          valuesInput.message,
          date,
        ],
      ],
    },
  });

  return { data: res.data };
}
