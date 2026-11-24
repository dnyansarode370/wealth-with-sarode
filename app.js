// Paste your deployed Google Apps Script Web App URL here after setup.
const GOOGLE_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

const translations = { en: "हिन्दी", hi: "English" };
let currentLanguage = "en";
const languageToggle = document.getElementById("languageToggle");
languageToggle.addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "hi" : "en";
  document.documentElement.lang = currentLanguage === "en" ? "en" : "hi";
  document.querySelectorAll("[data-en][data-hi]").forEach(el => {
    el.textContent = el.dataset[currentLanguage];
  });
  languageToggle.textContent = translations[currentLanguage];
});

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("leadForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.getElementById("formStatus");
  const data = Object.fromEntries(new FormData(form).entries());
  if (!/^[0-9+\-\s()]{10,15}$/.test(data.phone || "")) {
    status.textContent = "Please enter a valid phone number.";
    return;
  }
  if (GOOGLE_SCRIPT_URL.startsWith("PASTE_")) {
    status.textContent = "The enquiry form is ready, but the Google Sheets connection still needs setup. Please contact us directly for now.";
    return;
  }
  const submit = form.querySelector('button[type="submit"]');
  submit.disabled = true;
  status.textContent = "Sending your enquiry…";
  try {
    // no-cors is used for Apps Script form POST; the browser cannot read the response.
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: new URLSearchParams({...data, page: location.href, submittedAt: new Date().toISOString()})
    });
    status.textContent = "Your enquiry has been submitted. We will contact you if your details are valid.";
    form.reset();
  } catch (error) {
    status.textContent = "We couldn't send the enquiry. Please try again later.";
  } finally {
    submit.disabled = false;
  }
});