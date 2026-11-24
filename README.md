# Wealth With Sarode — free static website

## Files
- `index.html`, `styles.css`, `app.js`: bilingual responsive website.
- `assets/logo.png`: supplied brand logo.
- `icon-192.png`, `icon-512.png`, `manifest.webmanifest`: PWA-ready assets.
- `google-apps-script/Code.gs`: Google Sheets lead receiver.

## Publish free with GitHub Pages
1. Create/sign in to a GitHub account.
2. Create a **public** repository named `wealth-with-sarode`.
3. Upload all files and folders in this project to the repository root.
4. In repository Settings → Pages, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
5. Wait for GitHub Pages to publish. Your URL will be `https://YOUR-USERNAME.github.io/wealth-with-sarode/`.

## Connect enquiry form to Google Sheets
1. Create a new Google Sheet. Add a tab named `LIC Leads` (the script can create it if missing).
2. Copy the spreadsheet ID from the URL between `/d/` and `/edit`.
3. Open Extensions → Apps Script.
4. Paste the contents of `google-apps-script/Code.gs`.
5. Replace `PASTE_YOUR_GOOGLE_SHEET_ID_HERE` with your spreadsheet ID and save.
6. Deploy → New deployment → Web app. Execute as **Me**; Who has access: **Anyone**. Review Google's warning and deploy using your own account.
7. Copy the deployed URL ending in `/exec`.
8. In `app.js`, replace `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with that URL. Commit the change to GitHub.
9. Test with a dummy lead and verify it appears in your Sheet. Delete the test row afterward.

## Important
- This is a static website; GitHub Pages does not run PHP or server-side code.
- The Google Apps Script web app is the backend that writes to Sheets. The browser's `no-cors` submission cannot verify the server response, so verify test leads in the Sheet.
- Anyone can submit a public form. Add spam controls/rate limiting before promoting heavily.
- Keep the Google Sheet private; do not publish it or share it publicly.
- Publish a privacy notice with the actual business contact details and retention practices before collecting real leads. Obtain appropriate consent and collect only necessary information.
- Do not request Aadhaar, PAN, bank details, medical records, passwords, or policy documents in this basic lead form.
- This site is not an official LIC website. Use only approved, accurate product information and required disclosures. Do not imply guaranteed returns or official affiliation.
- GitHub Pages is free for public repositories, subject to GitHub's current plan and usage terms.
