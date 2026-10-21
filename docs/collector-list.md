# Collector list (`/collect`)

The QR code on the business cards points to:

```
https://nickymyny.com/collect?source=card
```

**Never rename or remove `/collect`**: the URL is printed. Use another `source`
for other printed material (e.g. `?source=gallery88-flyer`) to see where people
came from.

## How it works

- Visitors fill in first name and email, and can tick an invite checkbox for
  each upcoming event. Events live in `INVITE_EVENTS` in `src/lib/collect.ts`;
  each checkbox hides itself after its `until` date. **For a new expo, add one
  entry there.** Nothing else changes. With no upcoming events, the form simply
  shows no checkboxes.
- Each sign-up is saved in **two places**:
  1. **Cloudflare D1** (database `nickymyny-collectors`), which is the main list
     and is what the admin page shows.
  2. **A Google Sheet in Nicky's Google account**, which is the backup. It is
     filled at the same moment, works if the website or Cloudflare is down, and
     can be downloaded as CSV/Excel from Google Sheets at any time.
  If D1 fails but the Sheet gets the sign-up, the visitor still sees "Thank you".
- Signing up twice with the same email updates the existing row in D1 and adds
  any new invites to the earlier ones (the Sheet keeps both rows).

## For Nicky

Go to **https://nickymyny.com/collect/admin** and sign in with the password.

- **Download for Excel** saves the list as a file that opens in Excel or Numbers.
- **Plain CSV** is for importing into other tools (Google Sheets, a mailing tool).
- **Remove** deletes someone from the list (and from the Google Sheet), e.g.
  when they ask to be taken off.

If the website is ever down, open the **Collector list** Google Sheet in Google
Drive instead: *File → Download → Microsoft Excel* or *CSV*.

## One-time setup (developer)

1. Create the database and apply the table:

   ```sh
   npx wrangler login
   npx wrangler d1 create nickymyny-collectors
   # paste the printed database_id into wrangler.jsonc
   npx wrangler d1 migrations apply nickymyny-collectors --remote
   ```

2. Set Nicky's admin password:

   ```sh
   npx wrangler secret put ADMIN_PASSWORD
   ```

3. Set up the Google Sheet backup, **logged in as Nicky's Google account**:
   1. Create a new Google Sheet called **Collector list**.
   2. *Extensions → Apps Script*, replace the code with
      `scripts/collect-google-sheet.gs`.
   3. Replace `PASTE-THE-SAME-SECRET-HERE` with a long random string.
   4. *Deploy → New deployment → Web app*. Set *Execute as*: **Me** and
      *Who has access*: **Anyone**. Authorize it and copy the web app URL.
      (If Google Workspace blocks "Anyone", allow it in the Workspace admin console.)
   5. Give the URL and the secret to the site:

      ```sh
      npx wrangler secret put SHEET_WEBHOOK_URL
      npx wrangler secret put SHEET_WEBHOOK_SECRET
      ```

4. Deploy with `pnpm deploy`, then test: sign up at `/collect?source=test`,
   check it appears in the admin page **and** the Sheet, then remove it.

Forgotten password: run `npx wrangler secret put ADMIN_PASSWORD` again. This also
signs out every open session.

## Local development

`.dev.vars` (gitignored) holds local secrets, e.g. `ADMIN_PASSWORD=local-test`.
Create the local table once with:

```sh
npx wrangler d1 migrations apply nickymyny-collectors --local
```
