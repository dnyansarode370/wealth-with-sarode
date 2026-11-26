# Wealth With Sarode Website

Premium lead-generation website for Wealth With Sarode using the uploaded advisor photo and Wealth With Sarode logo.

## 1. Mobile number configured
The website is configured with the supplied number: `+91 80801 85241`. Call and WhatsApp links use this number. To change it later, edit `mobileNumber` in `script.js`.

## 2. Connect Google Sheets leads
Open `google-apps-script.gs` and follow the instructions at the top. After deploying the Google Apps Script as a Web App, copy its `/exec` URL into:

`googleAppsScriptUrl: "PASTE_YOUR_GOOGLE_APPS_SCRIPT_EXEC_URL_HERE"`

The form captures name, mobile, email, city, age group, occupation, interest, approximate budget, message, consent and timestamp.

Do not collect Aadhaar, PAN, OTP, bank account or other highly sensitive information through this basic enquiry form.

## 3. GitHub Pages
Upload the complete folder to your GitHub repository. In GitHub: Settings -> Pages -> Deploy from branch -> choose `main` and `/root` -> Save.

Your project URL will normally be:
`https://dnyansarode370.github.io/wealth-with-sarode/`

## 4. LIC branding
The page includes a restrained LIC-style identification area. If you are authorised to use the official LIC logo in your marketing material, replace the badge with your approved LIC brand asset. Keep required LIC/compliance disclosures and product terms applicable to your role.
