/*
  GOOGLE SHEETS LEAD CAPTURE
  1. Create a Google Sheet named: Wealth With Sarode Leads
  2. Extensions -> Apps Script
  3. Paste this code.
  4. Change SHEET_NAME if needed.
  5. Deploy -> New deployment -> Web app
     Execute as: Me
     Who has access: Anyone
  6. Copy the /exec URL into script.js -> googleAppsScriptUrl
*/

const SHEET_NAME = 'Leads';

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME) ||
                SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp','Name','Mobile','Email','City','Age Group','Occupation',
      'Interest','Budget','Message','Consent','Source'
    ]);
  }

  const data = JSON.parse(e.postData.contents || '{}');
  sheet.appendRow([
    new Date(), data.name || '', data.mobile || '', data.email || '', data.city || '',
    data.age || '', data.occupation || '', data.interest || '', data.budget || '',
    data.message || '', data.consent || '', data.source || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
