// ==============================
// Wealth With Sarode configuration
// ==============================
const CONFIG = {
  // Replace this placeholder with your real 10-digit mobile number.
  mobileNumber: "918080185241",

  // After creating your Google Apps Script Web App, paste its /exec URL here.
  googleAppsScriptUrl: "PASTE_YOUR_GOOGLE_APPS_SCRIPT_EXEC_URL_HERE"
};

const cleanPhone = CONFIG.mobileNumber.replace(/\D/g, "");
const hasPhone = /^91\d{10}$/.test(cleanPhone);
const phoneDisplay = hasPhone ? `+${cleanPhone.slice(0,2)} ${cleanPhone.slice(2,7)} ${cleanPhone.slice(7)}` : "+91 XXXXX XXXXX";
const telHref = hasPhone ? `tel:+${cleanPhone}` : "#enquiry";
const waHref = hasPhone ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Namaste, mujhe Wealth With Sarode ke financial plans ke baare mein jankari chahiye.")}` : "#enquiry";

["callBtn","callBtn2"].forEach(id => {
  const el = document.getElementById(id);
  if (el) { el.href = telHref; el.title = phoneDisplay; }
});
["whatsappBtn","floatingWhatsApp"].forEach(id => {
  const el = document.getElementById(id);
  if (el) { el.href = waHref; el.target = hasPhone ? "_blank" : "_self"; el.title = `WhatsApp ${phoneDisplay}`; }
});

document.getElementById("year").textContent = new Date().getFullYear();
const waNumberDisplay = document.getElementById("whatsappNumberDisplay");
const callNumberDisplay = document.getElementById("callNumberDisplay");
if (waNumberDisplay) waNumberDisplay.textContent = `${phoneDisplay} · Quick enquiry`;
if (callNumberDisplay) callNumberDisplay.textContent = `${phoneDisplay} · Speak directly`;

// Plan slider
const track = document.querySelector(".plan-track");
const cards = [...document.querySelectorAll(".plan-card")];
const dots = document.getElementById("sliderDots");
const next = document.querySelector(".slider-btn.next");
const prev = document.querySelector(".slider-btn.prev");
let current = 0;

cards.forEach((_, i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.setAttribute("aria-label", `Plan ${i+1}`);
  b.addEventListener("click", () => goTo(i));
  dots.appendChild(b);
});
function goTo(i){
  current = (i + cards.length) % cards.length;
  cards.forEach((c, idx) => c.classList.toggle("active", idx === current));
  const card = cards[current];
  if (window.innerWidth <= 700) track.scrollTo({left: card.offsetLeft - track.offsetLeft - 8, behavior:"smooth"});
  [...dots.children].forEach((d, idx) => d.classList.toggle("active", idx === current));
}
next.addEventListener("click",()=>goTo(current+1));
prev.addEventListener("click",()=>goTo(current-1));
goTo(0);

// Lead form
const form = document.getElementById("leadForm");
const status = document.getElementById("formStatus");
function showStatus(message, type){ status.textContent = message; status.className = `form-status show ${type}`; }

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  data.submittedAt = new Date().toISOString();
  data.source = "Wealth With Sarode Website";

  if (CONFIG.googleAppsScriptUrl.startsWith("PASTE_")) {
    const text = `Namaste, mujhe Wealth With Sarode ke baare mein jankari chahiye.\n\nName: ${data.name}\nMobile: ${data.mobile}\nCity: ${data.city}\nInterest: ${data.interest}`;
    const url = hasPhone ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}` : null;
    if (url) {
      showStatus("Enquiry ready hai. WhatsApp open ho raha hai…", "success");
      window.open(url, "_blank", "noopener");
      form.reset();
    } else {
      showStatus("Website form ready hai. Google Sheets connect karne ke liye script.js mein Apps Script URL add karein, aur mobile number bhi replace karein.", "error");
    }
    return;
  }

  try {
    showStatus("आपकी enquiry submit हो रही है…", "success");
    const response = await fetch(CONFIG.googleAppsScriptUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    form.reset();
    showStatus("धन्यवाद! आपकी enquiry successfully submit हो गई है. हम जल्द संपर्क करेंगे.", "success");
  } catch (err) {
    showStatus("Submission में समस्या आई. कृपया WhatsApp या Call से संपर्क करें.", "error");
  }
});

// Three-language website: Marathi, Hindi and English.
const translations = {
  hi: {
    navPlans:'योजनाएँ',navAbout:'मेरे बारे में',navProcess:'कैसे काम करता है',consult:'मुफ्त परामर्श',callNow:'अभी कॉल करें',
    eyebrow:'LIC वित्तीय योजना एवं मार्गदर्शन',heroTitle:'आज के समझदारी भरे फैसले,<br><span>कल की बेहतर सुरक्षा।</span>',heroText:'बीमा, बचत, रिटायरमेंट और वित्तीय योजना के विकल्पों को अपनी जरूरत और लक्ष्यों के अनुसार समझें।',
    ourFocus:'हमारा फोकस',plansTitle:'आपके लक्ष्यों के लिए <span>सही योजना</span>',plansText:'अपने वित्तीय लक्ष्यों के बारे में बात करें। उपलब्ध विकल्पों को समझने में हम आपकी मदद करेंगे।',
    meetAdvisor:'अपने सलाहकार से मिलें',aboutTitle:'वित्तीय फैसले, <span>अब और आसान।</span>',aboutText:'मैं आपके वित्तीय लक्ष्यों को समझकर बीमा, बचत, रिटायरमेंट और वेल्थ प्लानिंग के विकल्प सरल भाषा में समझाने पर ध्यान देता हूँ।',
    simpleProcess:'आसान प्रक्रिया',processTitle:'सिर्फ 3 चरणों में <span>शुरुआत करें</span>',getInTouch:'संपर्क करें',enquiryTitle:'अपने लिए सही योजना जानना चाहते हैं?',enquiryText:'अपनी जानकारी भेजें। मैं आपकी जरूरत समझने के लिए आपसे संपर्क करूंगा।',formTitle:'मुफ्त परामर्श',formText:'आपकी जानकारी का उपयोग केवल आपकी enquiry के जवाब के लिए किया जाएगा।',submit:'Enquiry भेजें',
    cards:[['परिवार की सुरक्षा','परिवार की वित्तीय सुरक्षा और बीमा जरूरतों पर व्यक्तिगत मार्गदर्शन।','इस योजना पर चर्चा करें'],['बच्चों का भविष्य','बच्चों की शिक्षा और भविष्य के लक्ष्यों के लिए लंबी अवधि की योजना।','इस योजना पर चर्चा करें'],['रिटायरमेंट','रिटायरमेंट के बाद आय और वित्तीय स्वतंत्रता के लिए योजना पर चर्चा।','इस योजना पर चर्चा करें'],['वेल्थ क्रिएशन','आपके समय और लक्ष्यों के अनुसार संपत्ति निर्माण के विकल्प।','इस योजना पर चर्चा करें'],['विशेष आय योजना','आय से जुड़े विकल्पों, शर्तों और पात्रता की पूरी जानकारी लें।','जानकारी प्राप्त करें']],
    labels:['पूरा नाम*','मोबाइल नंबर*','ईमेल','शहर*','आयु वर्ग*','व्यवसाय','आपकी रुचि*','अनुमानित बजट','आपका संदेश'],placeholders:['आपका नाम','10 अंकों का मोबाइल नंबर','आपका शहर','आप क्या जानना चाहते हैं?']
  },
  mr: {
    navPlans:'योजना',navAbout:'माझ्याबद्दल',navProcess:'प्रक्रिया',consult:'मोफत सल्लामसलत',callNow:'आत्ताच कॉल करा',
    eyebrow:'LIC आर्थिक नियोजन आणि मार्गदर्शन',heroTitle:'आजचा योग्य निर्णय,<br><span>उद्याचे सुरक्षित भविष्य.</span>',heroText:'तुमच्या गरजा आणि उद्दिष्टांनुसार विमा, बचत, निवृत्ती आणि आर्थिक नियोजनाचे पर्याय समजून घ्या.',
    ourFocus:'आमचे लक्ष',plansTitle:'तुमच्या उद्दिष्टांसाठी <span>योग्य योजना</span>',plansText:'तुमच्या आर्थिक उद्दिष्टांबद्दल चर्चा करा. उपलब्ध पर्याय समजून घेण्यासाठी आम्ही मदत करू.',
    meetAdvisor:'तुमच्या सल्लागाराला भेटा',aboutTitle:'आर्थिक निर्णय, <span>आता अधिक सोपे.</span>',aboutText:'तुमची आर्थिक उद्दिष्टे समजून विमा, बचत, निवृत्ती आणि संपत्ती नियोजनाचे पर्याय सोप्या भाषेत समजावून सांगणे हे माझे उद्दिष्ट आहे.',
    simpleProcess:'सोपी प्रक्रिया',processTitle:'फक्त 3 टप्प्यांत <span>सुरुवात करा</span>',getInTouch:'संपर्क साधा',enquiryTitle:'तुमच्यासाठी योग्य योजना जाणून घ्यायची आहे?',enquiryText:'तुमची माहिती पाठवा. तुमच्या गरजा समजून घेण्यासाठी मी तुमच्याशी संपर्क साधेन.',formTitle:'मोफत सल्लामसलत',formText:'तुमची माहिती फक्त तुमच्या चौकशीला उत्तर देण्यासाठी वापरली जाईल.',submit:'चौकशी पाठवा',
    cards:[['कुटुंबाचे संरक्षण','कुटुंबाच्या आर्थिक सुरक्षिततेसाठी आणि विम्याच्या गरजांसाठी वैयक्तिक मार्गदर्शन.','या योजनेबद्दल चर्चा करा'],['मुलांचे भविष्य','मुलांचे शिक्षण आणि भविष्यातील उद्दिष्टांसाठी दीर्घकालीन नियोजन.','या योजनेबद्दल चर्चा करा'],['निवृत्ती नियोजन','निवृत्तीनंतरचे उत्पन्न आणि आर्थिक स्वावलंबन यासाठी नियोजन.','या योजनेबद्दल चर्चा करा'],['संपत्ती निर्मिती','तुमचा कालावधी आणि उद्दिष्टांनुसार संपत्ती निर्मितीचे पर्याय.','या योजनेबद्दल चर्चा करा'],['विशेष उत्पन्न योजना','उत्पन्नाशी संबंधित पर्याय, अटी आणि पात्रता यांची माहिती मिळवा.','माहिती मिळवा']],
    labels:['पूर्ण नाव*','मोबाइल क्रमांक*','ईमेल','शहर*','वयोगट*','व्यवसाय','तुमची आवड*','अंदाजे बजेट','तुमचा संदेश'],placeholders:['तुमचे नाव','10 अंकी मोबाइल क्रमांक','तुमचे शहर','तुम्हाला काय जाणून घ्यायचे आहे?']
  },
  en: {
    navPlans:'Plans',navAbout:'About',navProcess:'How It Works',consult:'Free Consultation',callNow:'Call Now',eyebrow:'LIC Financial Planning & Advisory',heroTitle:'Make smarter choices today,<br><span>build a more secure tomorrow.</span>',heroText:'Explore insurance, savings, retirement and financial-planning options based on your needs and goals.',ourFocus:'OUR FOCUS',plansTitle:'The <span>right plan</span> for your goals',plansText:'Tell us about your financial goals. We can help you understand the available options.',meetAdvisor:'MEET YOUR ADVISOR',aboutTitle:'Financial decisions, <span>made simpler.</span>',aboutText:'I focus on understanding your financial goals and explaining insurance, savings, retirement and wealth-planning options in simple language.',simpleProcess:'SIMPLE PROCESS',processTitle:'Get started in <span>3 simple steps</span>',getInTouch:'GET IN TOUCH',enquiryTitle:'Looking for a plan that suits you?',enquiryText:'Share your details. I will contact you to understand your requirements.',formTitle:'Free Consultation',formText:'Your information will only be used to respond to your enquiry.',submit:'Submit Enquiry',
    cards:[['Family Protection','Personal guidance for your family protection and insurance needs.','Discuss this plan'],['Child Future','Long-term planning options for children’s education and future goals.','Discuss this plan'],['Retirement','Discuss income and financial-independence planning for retirement.','Discuss this plan'],['Wealth Creation','Explore wealth-planning options based on your goals and time horizon.','Discuss this plan'],['Special Income Plan','Understand income-oriented options, terms and eligibility.','Get Details']],
    labels:['Full Name*','Mobile Number*','Email','City*','Age Group*','Occupation','Your Interest*','Approximate Budget','Your Message'],placeholders:['Your name','10-digit mobile number','Your city','What would you like to know?']
  }
};
function setLanguage(lang){
  const t=translations[lang]||translations.hi; document.documentElement.lang=lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(t[k])el.innerHTML=t[k];});
  document.querySelectorAll('.plan-card').forEach((card,i)=>{const d=t.cards[i];if(!d)return;card.querySelector('h3').textContent=d[0];card.querySelector('p').textContent=d[1];card.querySelector('a').textContent=d[2]+' →';});
  const labels=[...document.querySelectorAll('.form-grid > label')];
  labels.forEach((label,i)=>{if(t.labels[i]){const first=label.childNodes[0];if(first&&first.nodeType===Node.TEXT_NODE)first.nodeValue=t.labels[i];}});
  const inputs=[...document.querySelectorAll('.form-grid input, .form-grid textarea')];
  if(inputs[0])inputs[0].placeholder=t.placeholders[0];if(inputs[1])inputs[1].placeholder=t.placeholders[1];if(inputs[3])inputs[3].placeholder=t.placeholders[2];if(inputs[inputs.length-1])inputs[inputs.length-1].placeholder=t.placeholders[3];
  document.querySelectorAll('.language-switch button').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
  try{localStorage.setItem('wws-language',lang)}catch(e){}
}
document.querySelectorAll('.language-switch button').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
let savedLang='hi';try{savedLang=localStorage.getItem('wws-language')||'hi'}catch(e){}setLanguage(savedLang);
