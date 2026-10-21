/**
 * Backup copy of the collector list (/collect) in a Google Sheet.
 *
 * Every sign-up on the site is also sent here, so the list stays available in
 * Nicky's own Google account even if the website or Cloudflare is down.
 * Setup: see docs/collector-list.md.
 */

// Must match the SHEET_WEBHOOK_SECRET secret on Cloudflare.
const SECRET = "PASTE-THE-SAME-SECRET-HERE";
const SHEET_NAME = "Sign-ups";
const HEADER = ["Date", "First name", "Last name", "Company", "Email", "Event invites", "Source"];
const EMAIL_COLUMN = HEADER.indexOf("Email") + 1;

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  if (data.secret !== SECRET) return reply({ ok: false });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet();
    if (data.action === "delete") {
      const emails = sheet.getRange(1, EMAIL_COLUMN, sheet.getLastRow(), 1).getValues();
      for (let i = emails.length - 1; i >= 1; i--) {
        if (String(emails[i][0]).toLowerCase() === data.email) sheet.deleteRow(i + 1);
      }
    } else {
      sheet.appendRow([
        new Date(data.createdAt),
        data.firstName,
        data.lastName,
        data.company,
        data.email,
        data.invites,
        data.source,
      ]);
    }
  } finally {
    lock.releaseLock();
  }
  return reply({ ok: true });
}

function getSheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
    sheet.setFrozenRows(1);
  }
  // Keep the header in step with the columns (e.g. after adding a field).
  sheet.getRange(1, 1, 1, HEADER.length).setValues([HEADER]);
  return sheet;
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
