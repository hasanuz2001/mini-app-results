// GitHub Gist API sozlamalari
const GITHUB_TOKEN = (typeof CONFIG !== 'undefined' && CONFIG.GITHUB_TOKEN) 
  ? CONFIG.GITHUB_TOKEN 
  : null;
const GIST_ID = (typeof CONFIG !== 'undefined' && CONFIG.GIST_ID) 
  ? CONFIG.GIST_ID 
  : null;

let allResponses = [];
let allStats = {};

const translations = {
/* ================= RESISTANCE INDEX HELPERS ================= */


  uz: {
    title: "Sun’iy intellektga qarshilik so‘rovnomasi — natijalar paneli",
    subtitle: "Uran qazib olish sohasida sun'iy intellektni joriy etishga ichki qarshilik bo'yicha tadqiqot natijalari.",
    meta: "Ushbu panel dissertatsiya (thesis) ko'rib chiqish va akademik baholash uchun mo'ljallangan.",
    badge: "Ekspertiza",
    sections: {
      summary: "Umumiy Ko'rsatkichlar",
      languages: "Til bo'yicha taqsimot",
      questions: "Savollar Bo'yicha Tahlil",
      allResponses: "Barcha javoblar"
    },
    labels: {
      participants: "Ishtirokchilar soni",
      responses: "Javoblar soni",
      lastUpdate: "So'nggi yangilanish",
      langUzCombined: "O'zbekcha (lotin + кирил)",
      langRu: "Русский",
      langEn: "English"
    },
    actions: {
      refresh: "Ma'lumotlarni yangilash",
      savePdf: "PDF ga saqlash",
      pdfHint: "Print dialogda «PDF ga saqlash» ni tanlang"
    },
    resistance: {
      title: "Umumiy qarshilik indeksi (0–100)",
      labels: {
        overall: "Umumiy qarshilik",
        yuqori: "Yuqori boshqaruv qarshilik indeksi (0–100)",
        orta: "O'rta boshqaruv qarshilik indeksi (0–100)",
        quyi: "Quyi boshqaruv qarshilik indeksi (0–100)",
        mutaxassis: "Mutaxassis darajasidagi qarshilik indeksi (0–100)",
        jami: "Jami qarshilik indeksi",
        leadershipResistance: "Rahbariyat qarshiligi",
        coreResistance: "Asosiy qarshilik",
        readinessResistance: "Tayyorgarlik qarshiligi"
      },
      dimensions: {
        title: "Qarshilik yo‘nalishlari",
        leadershipLabel: "Rahbariyat qarshiligi:",
        leadershipText: "Rahbariyatning sun’iy intellektga nisbatan pozitsiyasi, ishonchi va kommunikatsiyasi.",
        coreLabel: "Asosiy qarshilik:",
        coreText: "Xodimlarning ishonchi, qo‘rquvlari va texnologiyaga munosabati.",
        readinessLabel: "Tayyorgarlik qarshiligi:",
        readinessText: "Trening, raqamli ko‘nikmalar va institutsional tayyorgarlik darajasi."
      },
      legend: {
        title: "Qarshilik indeksi shkalasi",
        items: [
          "0–20 — Qarshilik deyarli yo‘q",
          "21–40 — Past qarshilik",
          "41–60 — O‘rtacha qarshilik",
          "61–80 — Yuqori qarshilik",
          "81–100 — Juda yuqori qarshilik"
        ]
      },
      methodNote: {
        title: "Metodologik izoh",
        body1: "Qarshilik indeksi 5 ballik Likert shkalasi asosida hisoblandi. Rahbariyat, Asosiy va Tayyorgarlik yo‘nalishlari bo‘yicha savollar yig‘indi ballari maksimal mumkin bo‘lgan ballga nisbatan normallashtirilib, 0–100 indeks shakliga keltirildi.",
        body2: "Yuqori indeks qiymati sun’iy intellektni joriy etishga nisbatan kuchliroq tashkiliy va psixologik qarshilikni anglatadi."
      }
    },
    note: {
      label: "Eslatma:",
      text: "Ma'lumotlar sahifa yangilanganda yangilanadi."
    },
    states: {
      loading: "Ma'lumotlar yuklanmoqda...",
      noData: "Ma'lumotlar mavjud emas",
      pdfGenerating: "PDF yaratilmoqda..."
    },
    questionLabel: "Savol",
    countUnit: "ta",
    optionLabels: {
      openText: "Erkin javoblar",
      other: "Boshqa javoblar"
    },
    table: {
      date: "Sana",
      userId: "Foydalanuvchi identifikatori",
      answers: "Javoblar"
    },
    errors: {
      connectionTitle: "⚠️ GitHub Gist API bilan bog'lanishda xatolik.",
      source: "Ma'lumotlar bevosita GitHub Gist'dan olinadi.",
      checkConfig: "config.js faylini tekshiring:",
      checkConfigBody: "GITHUB_TOKEN va GIST_ID qiymatlari to'g'ri sozlanganligini tekshiring",
      errorLabel: "Xatolik tafsiloti:",
      gistUnavailable: "GitHub Gist'ga ulanish amalga oshmadi"
    }
  },
  en: {
    title: "AI Resistance Survey Results Dashboard",
    subtitle: "Research findings on internal resistance to AI adoption in the uranium mining sector.",
    meta: "This panel is intended for thesis review and academic evaluation.",
    badge: "Academic Review",
    sections: {
      summary: "Overall Indicators",
      languages: "Language breakdown",
      questions: "Question-Level Analysis",
      allResponses: "All responses"
    },
    labels: {
      participants: "Number of participants",
      responses: "Number of responses",
      lastUpdate: "Last update",
      langUzCombined: "Uzbek (Latin + Cyrillic)",
      langRu: "Russian",
      langEn: "English"
    },
    actions: {
      refresh: "Refresh data",
      savePdf: "Save as PDF",
      pdfHint: "Select «Save as PDF» in the print dialog"
    },
    resistance: {
      title: "Overall Resistance Index (0–100)",
      labels: {
        overall: "Overall Resistance",
        yuqori: "Senior Management Resistance Index (0–100)",
        orta: "Middle Management Resistance Index (0–100)",
        quyi: "Lower Management Resistance Index (0–100)",
        mutaxassis: "Specialist Level Resistance Index (0–100)",
        jami: "Total resistance index",
        leadershipResistance: "Leadership resistance",
        coreResistance: "Core resistance",
        readinessResistance: "Readiness resistance"
      },
      dimensions: {
        title: "Resistance Dimensions",
        leadershipLabel: "Leadership Resistance:",
        leadershipText: "Leadership stance, trust, and communication around AI adoption.",
        coreLabel: "Core Resistance:",
        coreText: "Employee trust, fears, and attitudes toward technology.",
        readinessLabel: "Readiness Resistance:",
        readinessText: "Training, digital skills, and institutional preparedness level."
      },
      legend: {
        title: "Resistance Index Legend",
        items: [
          "0–20 — Very low resistance",
          "21–40 — Low resistance",
          "41–60 — Moderate resistance",
          "61–80 — High resistance",
          "81–100 — Very high resistance"
        ]
      },
      methodNote: {
        title: "Methodological Note",
        body1: "The Resistance Index is calculated using a 5-point Likert scale. Question totals for Leadership, Core, and Readiness are normalized against the maximum possible score and converted to a 0–100 index.",
        body2: "Higher index values indicate stronger organizational and psychological resistance to AI adoption."
      }
    },
    note: {
      label: "Note:",
      text: "Data updates when the page is refreshed."
    },
    states: {
      loading: "Loading data...",
      noData: "No data available",
      pdfGenerating: "Generating PDF..."
    },
    questionLabel: "Question",
    countUnit: "responses",
    optionLabels: {
      openText: "Open text responses",
      other: "Other responses"
    },
    table: {
      date: "Date",
      userId: "User identifier",
      answers: "Responses"
    },
    errors: {
      connectionTitle: "⚠️ Error connecting to the GitHub Gist API.",
      source: "Data is retrieved directly from GitHub Gist.",
      checkConfig: "Check config.js:",
      checkConfigBody: "Ensure GITHUB_TOKEN and GIST_ID are correctly configured",
      errorLabel: "Error details:",
      gistUnavailable: "Could not connect to GitHub Gist"
    }
  }
};
function toIndex(score, max) {
  if (!max || isNaN(score)) return 0;
  return Math.round((score / max) * 100);
}

function interpretIndex(value, lang = "uz") {
  const labels = {
    uz: [
      "Qarshilik deyarli yo‘q",
      "Past qarshilik",
      "O‘rtacha qarshilik",
      "Yuqori qarshilik",
      "Juda yuqori qarshilik"
    ],
    en: [
      "Very low resistance",
      "Low resistance",
      "Moderate resistance",
      "High resistance",
      "Very high resistance"
    ]
  };

  const l = labels[lang] || labels.uz;
  if (value <= 20) return l[0];
  if (value <= 40) return l[1];
  if (value <= 60) return l[2];
  if (value <= 80) return l[3];
  return l[4];
}

function indexColor(value) {
  if (value <= 20) return "#2e7d32";
  if (value <= 40) return "#c0ca33";
  if (value <= 60) return "#fb8c00";
  return "#c62828";
}
function calculateResistanceIndices() {
  if (!allResponses || allResponses.length === 0) return null;

  let leadershipSum = 0;
  let coreSum = 0;
  let readinessSum = 0;

  const respondentSet = new Set();
  allResponses.forEach(r => {
    respondentSet.add(r.user_id);
  });
  const respondentCount = respondentSet.size || 1;

  allResponses.forEach(r => {
    const qId = String(r.question_id);
    const answer = r.answer;

    if (!answer || !answer.id) return;

    const val = parseInt(answer.id, 10);
    if (isNaN(val)) return;

    if (["5", "6", "7"].includes(qId)) {
      leadershipSum += val;
    }
    if (["3", "4", "12"].includes(qId)) {
      coreSum += val;
    }
    if (["8", "9", "10", "11"].includes(qId)) {
      readinessSum += val;
    }
  });

  const leadershipAvg = leadershipSum / respondentCount;
  const coreAvg = coreSum / respondentCount;
  const readinessAvg = readinessSum / respondentCount;

  return {
    leadershipIndex: toIndex(leadershipAvg, 15),
    coreIndex: toIndex(coreAvg, 15),
    readinessIndex: toIndex(readinessAvg, 20)
  };
}

function calculateResistanceIndicesByPosition() {
  if (!allResponses || allResponses.length === 0) return null;

  const submissionQ16 = new Map();
  allResponses.forEach(r => {
    if (String(r.question_id) === "1b" && r.answer && r.answer.id) {
      const key = `${r.user_id}::${r.timestamp}`;
      submissionQ16.set(key, String(r.answer.id));
    }
  });

  const calcForGroup = (submissionKeys) => {
    const n = submissionKeys.length;
    if (n === 0) return { overall: null };

    let leadershipSum = 0;
    let coreSum = 0;
    let readinessSum = 0;
    const keysSet = new Set(submissionKeys);

    allResponses.forEach(r => {
      const key = `${r.user_id}::${r.timestamp}`;
      if (!keysSet.has(key)) return;

      const qId = String(r.question_id);
      const answer = r.answer;
      if (!answer || !answer.id) return;

      const val = parseInt(answer.id, 10);
      if (isNaN(val)) return;

      if (["5", "6", "7"].includes(qId)) leadershipSum += val;
      if (["3", "4", "12"].includes(qId)) coreSum += val;
      if (["8", "9", "10", "11"].includes(qId)) readinessSum += val;
    });

    const leadershipAvg = leadershipSum / n;
    const coreAvg = coreSum / n;
    const readinessAvg = readinessSum / n;

    const li = toIndex(leadershipAvg, 15);
    const ci = toIndex(coreAvg, 15);
    const ri = toIndex(readinessAvg, 20);
    const overall = Math.round((li + ci + ri) / 3);
    return { overall, leadershipIndex: li, coreIndex: ci, readinessIndex: ri };
  };

  const byLevel = { "1": [], "2": [], "3": [], "4": [] };
  submissionQ16.forEach((q16Id, key) => {
    if (byLevel[q16Id]) byLevel[q16Id].push(key);
  });

  return {
    yuqori: calcForGroup(byLevel["1"]),
    orta: calcForGroup(byLevel["2"]),
    quyi: calcForGroup(byLevel["3"]),
    mutaxassis: calcForGroup(byLevel["4"])
  };
}
function getQuestions() {
  if (typeof questions === "undefined") {
    return [];
  }
  return questions.filter((item) => String(item.id) !== "1");
}

function findQuestionById(id) {
  const items = getQuestions();
  return items.find((item) => String(item.id) === String(id)) || null;
}

const localeMap = {
  uz: "uz-UZ",
  en: "en-US"
};

let currentLang = localStorage.getItem("dashboard_lang") || "uz";

function applyTranslations() {
  const t = translations[currentLang] || translations.uz;

  document.title = t.title;
  const heroTitle = document.getElementById("heroTitle");
  const heroSubtitle = document.getElementById("heroSubtitle");
  const heroMeta = document.getElementById("heroMeta");
  const heroBadge = document.getElementById("heroBadge");
  const sectionSummaryTitle = document.getElementById("sectionSummaryTitle");
  const sectionLanguagesTitle = document.getElementById("sectionLanguagesTitle");
  const sectionQuestionsTitle = document.getElementById("sectionQuestionsTitle");
  const labelParticipants = document.getElementById("labelParticipants");
  const labelResponses = document.getElementById("labelResponses");
  const labelLastUpdate = document.getElementById("labelLastUpdate");
  const labelLangUzCombined = document.getElementById("labelLangUzCombined");
  const labelLangRu = document.getElementById("labelLangRu");
  const labelLangEn = document.getElementById("labelLangEn");
  const refreshBtn = document.getElementById("refreshBtn");
  const pdfBtn = document.getElementById("pdfBtn");
  const noteLabel = document.getElementById("noteLabel");
  const noteText = document.getElementById("noteText");
  const resistanceTitle = document.getElementById("resistanceTitle");
  const labelOverallResistance = document.getElementById("labelOverallResistance");
  const labelYuqoriResistance = document.getElementById("labelYuqoriResistance");
  const labelOrtaResistance = document.getElementById("labelOrtaResistance");
  const labelQuyiResistance = document.getElementById("labelQuyiResistance");
  const labelMutaxassisResistance = document.getElementById("labelMutaxassisResistance");
  const resistanceDimensionsTitle = document.getElementById("resistanceDimensionsTitle");
  const resistanceDimensionLeadershipLabel = document.getElementById("resistanceDimensionLeadershipLabel");
  const resistanceDimensionLeadershipText = document.getElementById("resistanceDimensionLeadershipText");
  const resistanceDimensionCoreLabel = document.getElementById("resistanceDimensionCoreLabel");
  const resistanceDimensionCoreText = document.getElementById("resistanceDimensionCoreText");
  const resistanceDimensionReadinessLabel = document.getElementById("resistanceDimensionReadinessLabel");
  const resistanceDimensionReadinessText = document.getElementById("resistanceDimensionReadinessText");
  const resistanceLegendTitle = document.getElementById("resistanceLegendTitle");
  const resistanceLegend1 = document.getElementById("resistanceLegend1");
  const resistanceLegend2 = document.getElementById("resistanceLegend2");
  const resistanceLegend3 = document.getElementById("resistanceLegend3");
  const resistanceLegend4 = document.getElementById("resistanceLegend4");
  const resistanceLegend5 = document.getElementById("resistanceLegend5");
  const methodNoteTitle = document.getElementById("methodNoteTitle");
  const methodNoteBody1 = document.getElementById("methodNoteBody1");
  const methodNoteBody2 = document.getElementById("methodNoteBody2");

  if (heroTitle) heroTitle.innerText = t.title;
  if (heroSubtitle) heroSubtitle.innerText = t.subtitle;
  if (heroMeta) heroMeta.innerText = t.meta;
  if (heroBadge) heroBadge.innerText = t.badge;
  if (sectionSummaryTitle) sectionSummaryTitle.innerText = t.sections.summary;
  if (sectionLanguagesTitle) sectionLanguagesTitle.innerText = t.sections.languages;
  if (sectionQuestionsTitle) sectionQuestionsTitle.innerText = t.sections.questions;
  if (labelParticipants) labelParticipants.innerText = t.labels.participants;
  if (labelResponses) labelResponses.innerText = t.labels.responses;
  if (labelLastUpdate) labelLastUpdate.innerText = t.labels.lastUpdate;
  if (labelLangUzCombined) labelLangUzCombined.innerText = t.labels.langUzCombined;
  if (labelLangRu) labelLangRu.innerText = t.labels.langRu;
  if (labelLangEn) labelLangEn.innerText = t.labels.langEn;
  if (refreshBtn) refreshBtn.innerText = t.actions.refresh;
  if (pdfBtn) {
    pdfBtn.innerText = t.actions.savePdf;
    pdfBtn.title = t.actions.pdfHint || "";
  }
  if (noteLabel) noteLabel.innerText = t.note.label;
  if (noteText) noteText.innerText = t.note.text;
  if (resistanceTitle) resistanceTitle.innerText = t.resistance.title;
  if (labelOverallResistance) labelOverallResistance.innerText = t.resistance.labels.overall;
  if (labelYuqoriResistance) labelYuqoriResistance.innerText = t.resistance.labels.yuqori;
  if (labelOrtaResistance) labelOrtaResistance.innerText = t.resistance.labels.orta;
  if (labelQuyiResistance) labelQuyiResistance.innerText = t.resistance.labels.quyi;
  if (labelMutaxassisResistance) labelMutaxassisResistance.innerText = t.resistance.labels.mutaxassis;
  if (resistanceDimensionsTitle) resistanceDimensionsTitle.innerText = t.resistance.dimensions.title;
  if (resistanceDimensionLeadershipLabel) resistanceDimensionLeadershipLabel.innerText = t.resistance.dimensions.leadershipLabel;
  if (resistanceDimensionLeadershipText) resistanceDimensionLeadershipText.innerText = t.resistance.dimensions.leadershipText;
  if (resistanceDimensionCoreLabel) resistanceDimensionCoreLabel.innerText = t.resistance.dimensions.coreLabel;
  if (resistanceDimensionCoreText) resistanceDimensionCoreText.innerText = t.resistance.dimensions.coreText;
  if (resistanceDimensionReadinessLabel) resistanceDimensionReadinessLabel.innerText = t.resistance.dimensions.readinessLabel;
  if (resistanceDimensionReadinessText) resistanceDimensionReadinessText.innerText = t.resistance.dimensions.readinessText;
  if (resistanceLegendTitle) resistanceLegendTitle.innerText = t.resistance.legend.title;
  if (resistanceLegend1) resistanceLegend1.innerText = t.resistance.legend.items[0];
  if (resistanceLegend2) resistanceLegend2.innerText = t.resistance.legend.items[1];
  if (resistanceLegend3) resistanceLegend3.innerText = t.resistance.legend.items[2];
  if (resistanceLegend4) resistanceLegend4.innerText = t.resistance.legend.items[3];
  if (resistanceLegend5) resistanceLegend5.innerText = t.resistance.legend.items[4];
  if (methodNoteTitle) methodNoteTitle.innerText = t.resistance.methodNote.title;
  if (methodNoteBody1) methodNoteBody1.innerText = t.resistance.methodNote.body1;
  if (methodNoteBody2) methodNoteBody2.innerText = t.resistance.methodNote.body2;

  const langUz = document.getElementById("langUz");
  const langEn = document.getElementById("langEn");
  if (langUz && langEn) {
    langUz.classList.toggle("active", currentLang === "uz");
    langEn.classList.toggle("active", currentLang === "en");
  }
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("dashboard_lang", lang);
  applyTranslations();
  updateDashboard();
  updateLastUpdate();
}

function initLanguageControls() {
  const langUzButton = document.getElementById("langUz");
  const langEnButton = document.getElementById("langEn");
  const refreshButton = document.getElementById("refreshBtn");
  const pdfButton = document.getElementById("pdfBtn");
  if (langUzButton) langUzButton.addEventListener("click", () => setLanguage("uz"));
  if (langEnButton) langEnButton.addEventListener("click", () => setLanguage("en"));
  if (refreshButton) refreshButton.addEventListener("click", refreshData);
  if (pdfButton) pdfButton.addEventListener("click", exportToPdf);
}

function refreshData() {
  const btn = document.getElementById("refreshBtn");
  const t = translations[currentLang] || translations.uz;
  if (btn) {
    btn.disabled = true;
    btn.innerText = t.states.loading;
  }
  loadData().finally(() => {
    if (btn) {
      btn.disabled = false;
      btn.innerText = t.actions.refresh;
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initLanguageControls();
    applyTranslations();
  });
} else {
  initLanguageControls();
  applyTranslations();
}

// GitHub Gist'dan yoki local responses.json dan ma'lumotlarni olish
async function fetchData() {
  if (GITHUB_TOKEN && GIST_ID) {
    const url = `https://api.github.com/gists/${GIST_ID}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    if (!response.ok) throw new Error(`Gist API error: ${response.status}`);
    const gist = await response.json();
    const content = gist.files['responses.json'].content;
    return JSON.parse(content);
  }
  // Fallback: local responses.json (config.js bo'lmaganda)
  const res = await fetch('responses.json');
  if (!res.ok) throw new Error('responses.json topilmadi');
  return res.json();
}

// Ma'lumotlarni yuklash (to'g'ridan-to'g'ri Gist API'dan)
async function loadData() {
  try {
    console.log("GitHub Gist'dan ma'lumotlar yuklanmoqda...");
    const t = translations[currentLang] || translations.uz;
    const statsEl = document.getElementById("questionsStats");
    if (statsEl) {
      statsEl.innerHTML = `<p style="text-align: center; color: #999;">${t.states.loading}</p>`;
    }
    
    // Ma'lumotlarni olish (Gist yoki local responses.json)
    const gistData = await fetchData();
    
    // Agar gist bo'sh bo'lsa
    if (!gistData || !gistData.timestamp || gistData.timestamp.length === 0) {
      allResponses = [];
      allStats = {
        total: 0,
        question_stats: {},
        user_count: 0
      };
      updateDashboard();
      updateLastUpdate();
      return;
    }
    
    // Ma'lumotlarni qayta tuzish
    allResponses = [];
    const submissionLangCounts = {
      uz_combined: 0,
      ru: 0,
      en: 0
    };
    const submissionLangMap = new Map();
    for (let i = 0; i < gistData.timestamp.length; i++) {
      const parsedAnswer = parseStoredAnswer(gistData.answer[i]);
      const responseLang = gistData.language ? gistData.language[i] : null;
      allResponses.push({
        timestamp: gistData.timestamp[i],
        user_id: gistData.user_id[i],
        question_id: gistData.question_id[i],
        answer: parsedAnswer,
        language: responseLang
      });
    }
    
    // Statistika hisoblash
    const questionStats = {};
    const submissionKeys = new Set();
    
    allResponses.forEach(row => {
      const qId = row.question_id;
      const answer = row.answer;
      const userId = row.user_id;
      const submissionKey = `${userId}::${row.timestamp}`;
      submissionKeys.add(submissionKey);

      if (!submissionLangMap.has(submissionKey)) {
        const normalizedLang = normalizeLang(row.language);
        submissionLangMap.set(submissionKey, normalizedLang);
        submissionLangCounts[normalizedLang] = (submissionLangCounts[normalizedLang] || 0) + 1;
      }
      
      if (!(qId in questionStats)) {
        questionStats[qId] = {};
      }
      
      const answerKey = answer?.id || normalizeAnswer(answer?.text);
      if (!answerKey) {
        return;
      }

      if (!(answerKey in questionStats[qId])) {
        questionStats[qId][answerKey] = 0;
      }
      questionStats[qId][answerKey] += 1;
    });
    
    allStats = {
      total: allResponses.length,
      question_stats: questionStats,
      user_count: submissionKeys.size,
      language_counts: submissionLangCounts
    };
    
    console.log("Ma'lumotlar yuklandi:", {
      total: allStats.total,
      users: allStats.user_count
    });

    // Sahifani yangilash
    updateDashboard();
    updateLastUpdate();
  } catch (error) {
    console.error("GitHub Gist API xatosi:", error);
    
    // Xato xabarini ko'rsatish
    const t = translations[currentLang] || translations.uz;
    const message = `${t.errors.connectionTitle}<br>
    ${t.errors.source}<br>
    <br>
    <strong>${t.errors.checkConfig}</strong><br>
    <code style="background: #f0f0f0; padding: 10px; display: block; margin: 10px 0; border-radius: 5px; font-family: monospace;">
    ${t.errors.checkConfigBody}
    </code>
    <br>
    <strong>${t.errors.errorLabel}</strong><br>
    <code style="background: #fff3e0; padding: 10px; display: block; margin: 10px 0; border-radius: 5px; font-family: monospace;">
    ${error.message}
    </code>`;
    
    document.getElementById("totalCount").innerText = "0";
    document.getElementById("totalResponses").innerText = "0";
    document.getElementById("questionsStats").innerHTML = `<p style="color: #d32f2f; padding: 15px; background: #ffebee; border-radius: 5px;">${message}</p>`;
  }
}

// LocalStorage funksiyasi o'chirildi - faqat backend'dan ma'lumot olinadi

// Dashboard yangilash
function updateDashboard() {
  // Umumiy statistika
  const totalCount = allStats.user_count || 0;
  const totalResponses = allStats.total || 0;
  const langCounts = allStats.language_counts || {};

  document.getElementById("totalCount").innerText = totalCount;
  document.getElementById("totalResponses").innerText = totalResponses;
  const langUzCombined = document.getElementById("countLangUzCombined");
  const langRu = document.getElementById("countLangRu");
  const langEn = document.getElementById("countLangEn");
  if (langUzCombined) langUzCombined.innerText = langCounts.uz_combined || 0;
  if (langRu) langRu.innerText = langCounts.ru || 0;
  if (langEn) langEn.innerText = langCounts.en || 0;

  // Savollar statistikasi
  displayQuestionStats();

  /* ===== Resistance Index Rendering ===== */

  const indices = calculateResistanceIndices();
  const byPosition = calculateResistanceIndicesByPosition();
  if (!indices) return;

  const { leadershipIndex, coreIndex, readinessIndex } = indices;
  const overallIndex = Math.round(
    (leadershipIndex + coreIndex + readinessIndex) / 3
  );

  const lang = currentLang || "uz";

  const bind = (id, value, labelId) => {
    const el = document.getElementById(id);
    const lbl = document.getElementById(labelId);
    if (!el || !lbl) return;
    el.innerText = value !== null && value !== undefined ? value + "%" : "–";
    el.style.color = value != null ? indexColor(value) : "#999";
    lbl.innerText = value != null ? interpretIndex(value, lang) : "";
  };

  bind("overallIndex", overallIndex, "overallLabel");

  const t = translations[lang] || translations.uz;
  const overallBreakdownEl = document.getElementById("overallBreakdown");
  if (overallBreakdownEl) {
    overallBreakdownEl.innerHTML = `
      <li>• ${t.resistance.labels.leadershipResistance}: <strong style="color:${indexColor(leadershipIndex)}">${leadershipIndex}%</strong></li>
      <li>• ${t.resistance.labels.coreResistance}: <strong style="color:${indexColor(coreIndex)}">${coreIndex}%</strong></li>
      <li>• ${t.resistance.labels.readinessResistance}: <strong style="color:${indexColor(readinessIndex)}">${readinessIndex}%</strong></li>
    `;
    overallBreakdownEl.style.display = "";
  }
  const bindPositionBlock = (indexId, labelId, breakdownId, data) => {
    const hasData = data && data.overall !== null;
    bind(indexId, hasData ? data.overall : null, labelId);
    const breakdownEl = document.getElementById(breakdownId);
    if (breakdownEl) {
      if (hasData) {
        breakdownEl.innerHTML = `
          <li>• ${t.resistance.labels.leadershipResistance}: <strong style="color:${indexColor(data.leadershipIndex)}">${data.leadershipIndex}%</strong></li>
          <li>• ${t.resistance.labels.coreResistance}: <strong style="color:${indexColor(data.coreIndex)}">${data.coreIndex}%</strong></li>
          <li>• ${t.resistance.labels.readinessResistance}: <strong style="color:${indexColor(data.readinessIndex)}">${data.readinessIndex}%</strong></li>
        `;
        breakdownEl.style.display = "";
      } else {
        breakdownEl.innerHTML = "";
        breakdownEl.style.display = "none";
      }
    }
  };

  if (byPosition) {
    bindPositionBlock("yuqoriIndex", "yuqoriLabel", "yuqoriBreakdown", byPosition.yuqori);
    bindPositionBlock("ortaIndex", "ortaLabel", "ortaBreakdown", byPosition.orta);
    bindPositionBlock("quyiIndex", "quyiLabel", "quyiBreakdown", byPosition.quyi);
    bindPositionBlock("mutaxassisIndex", "mutaxassisLabel", "mutaxassisBreakdown", byPosition.mutaxassis);
  } else {
    bindPositionBlock("yuqoriIndex", "yuqoriLabel", "yuqoriBreakdown", null);
    bindPositionBlock("ortaIndex", "ortaLabel", "ortaBreakdown", null);
    bindPositionBlock("quyiIndex", "quyiLabel", "quyiBreakdown", null);
    bindPositionBlock("mutaxassisIndex", "mutaxassisLabel", "mutaxassisBreakdown", null);
  }
}

// Savollar bo'yicha statistika
function displayQuestionStats() {
  const t = translations[currentLang] || translations.uz;
  const statsDiv = document.getElementById("questionsStats");
  const stats = allStats.question_stats || {};

  if (Object.keys(stats).length === 0) {
    statsDiv.innerHTML = `<p style="text-align: center; color: #999;">${t.states.noData}</p>`;
    return;
  }

  let html = "";
  
  // Barcha savollarni questions.js dan olish va ID bo'yicha saralash (faqat javob bor savollar emas)
  const questionOrder = (id) => {
    const s = String(id);
    if (s === "1") return 0;
    if (s === "1a") return 1;
    if (s === "1b") return 2;
    const n = parseInt(s, 10);
    return isNaN(n) ? 999 : n + 2;
  };
  const allQuestionIds = getQuestions()
    .map((q) => String(q.id))
    .sort((a, b) => questionOrder(a) - questionOrder(b));
  
  allQuestionIds.forEach((qId) => {
    const answers = stats[qId] || {};
    const totalForQuestion = Object.values(answers).reduce((a, b) => a + b, 0);
    
    const question = findQuestionById(qId);
    const questionText = question?.text?.[currentLang] || question?.text?.uz || `${t.questionLabel} #${qId}`;
    let questionOptions = question?.options?.[currentLang] || question?.options?.uz || [];
    if (question?.resultsExcludeOptions?.length) {
      questionOptions = questionOptions.filter((opt) => !question.resultsExcludeOptions.includes(opt));
    }
    const normalizedCounts = new Map();

    Object.entries(answers).forEach(([answer, count]) => {
      const normalized = normalizeAnswer(answer);
      normalizedCounts.set(normalized, (normalizedCounts.get(normalized) || 0) + count);
    });

    html += `
      <div style="margin-bottom: 25px; padding: 20px; background: #f9f9f9; border-radius: 8px; border-left: 5px solid #2a9df4;">
        <h4 style="margin: 0 0 8px 0; color: #333; font-size: 16px;">📋 ${questionText}</h4>
        <p style="margin: 0 0 12px; color: #64748b; font-size: 12px;">${t.questionLabel} #${qId}</p>
        <div style="background: white; padding: 15px; border-radius: 6px;">
    `;

    if (question?.type === "open_text") {
      const openLabel = t.optionLabels?.openText || "Open text responses";
      const openCount = totalForQuestion;
      html += renderAnswerRow(openLabel, openCount, totalForQuestion, t);
    } else {
      const usedAnswers = new Set();

      questionOptions.forEach((option, index) => {
        const normalizedOption = normalizeAnswer(option);
        const optionId = String(index + 1);
        const count = (answers[optionId] || 0) + (normalizedCounts.get(normalizedOption) || 0);
        usedAnswers.add(optionId);
        usedAnswers.add(normalizedOption);
        html += renderAnswerRow(option, count, totalForQuestion, t);
      });

      const unmatchedCount = Array.from(normalizedCounts.entries())
        .filter(([answer]) => !usedAnswers.has(answer))
        .reduce((sum, [, count]) => sum + count, 0);

      if (unmatchedCount > 0) {
        const otherLabel = t.optionLabels?.other || "Other responses";
        html += renderAnswerRow(otherLabel, unmatchedCount, totalForQuestion, t);
      }

      if (!questionOptions.length && Object.keys(answers).length) {
        Object.entries(answers).forEach(([answer, count]) => {
          html += renderAnswerRow(answer, count, totalForQuestion, t);
        });
      }
    }

    html += `
        </div>
      </div>
    `;
  });

  statsDiv.innerHTML = html;
}

function normalizeAnswer(value) {
  if (value === null || value === undefined) {
    return "";
  }
  return String(value)
    .trim()
    .replace(/^["'«»]+|["'«»]+$/g, "");
}

function normalizeLang(value) {
  if (!value) {
    return "uz_combined";
  }
  const normalized = String(value).toLowerCase().replace(/[^a-z_]/g, "");
  if (normalized === "ru" || normalized === "rus") {
    return "ru";
  }
  if (normalized === "en" || normalized === "eng") {
    return "en";
  }
  return "uz_combined";
}

function parseStoredAnswer(value) {
  if (value === null || value === undefined) {
    return { raw: "", id: null, text: "" };
  }

  if (typeof value === "object") {
    return normalizeParsedAnswer(value);
  }

  const rawText = String(value);
  try {
    const parsed = JSON.parse(rawText);
    if (parsed && typeof parsed === "object") {
      return normalizeParsedAnswer(parsed, rawText);
    }
  } catch (error) {
    // ignore JSON parse errors
  }

  return { raw: rawText, id: null, text: rawText };
}

function normalizeParsedAnswer(parsed, rawText = "") {
  if (!parsed || typeof parsed !== "object") {
    return { raw: rawText, id: null, text: rawText };
  }

  if (parsed.id && typeof parsed.text === "string") {
    return { raw: rawText, id: String(parsed.id), text: parsed.text };
  }

  if (parsed.id === "open_option" || parsed.selected) {
    const selected = parsed.selected;
    if (selected && typeof selected === "object") {
      return {
        raw: rawText,
        id: selected.id ? String(selected.id) : null,
        text: selected.text || ""
      };
    }
    if (typeof selected === "string") {
      return { raw: rawText, id: null, text: selected };
    }
    return { raw: rawText, id: null, text: "" };
  }

  return { raw: rawText, id: null, text: JSON.stringify(parsed) };
}

function renderAnswerRow(label, count, totalForQuestion, t) {
  const percentage = totalForQuestion > 0 ? ((count / totalForQuestion) * 100).toFixed(1) : 0;
  const barWidth = percentage;

  return `
    <div style="margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
        <span style="font-weight: bold; color: #333; word-break: break-word; max-width: 70%;">${label}</span>
        <span style="color: #2a9df4; font-weight: bold;">${count} ${t.countUnit} (${percentage}%)</span>
      </div>
      <div style="width: 100%; height: 25px; background: #e8f0f5; border-radius: 4px; overflow: hidden;">
        <div style="width: ${barWidth}%; height: 100%; background: linear-gradient(90deg, #2a9df4, #1976d2); display: flex; align-items: center; justify-content: flex-end; padding-right: 8px;">
          ${barWidth > 15 ? `<span style="color: white; font-size: 12px; font-weight: bold;">${percentage}%</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

// PDF ga saqlash (barcha ma'lumotlar, savollar va javoblar)
function formatAnswerForPdf(answer, question) {
  if (!answer) return "";
  if (answer.text) return String(answer.text).slice(0, 200);
  const opts = question?.options?.[currentLang] || question?.options?.uz || [];
  const idx = parseInt(answer.id, 10);
  if (!isNaN(idx) && opts[idx - 1]) return opts[idx - 1];
  return answer.id ? String(answer.id) : "";
}

function exportToPdf() {
  const t = translations[currentLang] || translations.uz;
  const btn = document.getElementById("pdfBtn");
  const el = document.getElementById("allResponsesForPrint");
  if (!el) return;

  let html = `<h2 style="margin:0 0 12px 0;">${t.sections.allResponses}</h2>`;
  if (allResponses.length > 0) {
    const submissions = new Map();
    allResponses.forEach((r) => {
      const key = `${r.user_id}::${r.timestamp}`;
      if (!submissions.has(key)) submissions.set(key, []);
      submissions.get(key).push(r);
    });
    let tableHtml = `
      <table style="width:100%; border-collapse:collapse; font-size:11px;">
        <thead><tr style="background:#f0f0f0;">
          <th style="border:1px solid #ccc; padding:6px; text-align:left;">${t.table.date}</th>
          <th style="border:1px solid #ccc; padding:6px; text-align:left;">${t.table.userId}</th>
          <th style="border:1px solid #ccc; padding:6px; text-align:left;">${t.questionLabel}</th>
          <th style="border:1px solid #ccc; padding:6px; text-align:left;">${t.table.answers}</th>
        </tr></thead><tbody>`;
    submissions.forEach((rows) => {
      rows.sort((a, b) => String(a.question_id).localeCompare(String(b.question_id)));
      rows.forEach((r) => {
        const q = findQuestionById(r.question_id);
        const qText = q?.text?.[currentLang] || q?.text?.uz || `#${r.question_id}`;
        const aText = formatAnswerForPdf(r.answer, q);
        const date = r.timestamp ? new Date(r.timestamp).toLocaleDateString(currentLang === "en" ? "en-GB" : "uz-UZ") : "";
        tableHtml += `<tr>
          <td style="border:1px solid #ccc; padding:4px;">${date}</td>
          <td style="border:1px solid #ccc; padding:4px;">${r.user_id || ""}</td>
          <td style="border:1px solid #ccc; padding:4px;">${qText.slice(0, 80)}${qText.length > 80 ? "…" : ""}</td>
          <td style="border:1px solid #ccc; padding:4px;">${aText.slice(0, 100)}${aText.length > 100 ? "…" : ""}</td>
        </tr>`;
      });
    });
    tableHtml += "</tbody></table>";
    html += `<div style="overflow-x:auto; margin-top:8px;">${tableHtml}</div>`;
  } else {
    html += `<p style="color:#999;">${t.states.noData}</p>`;
  }
  el.innerHTML = html;

  const handler = () => {
    if (btn) { btn.disabled = false; btn.innerText = t.actions.savePdf; }
    window.removeEventListener("afterprint", handler);
  };
  window.addEventListener("afterprint", handler);
  if (btn) { btn.disabled = true; btn.innerText = t.states.pdfGenerating; }
  window.print();
}

// Ma'lumotlar yangilash tugmasi ostida — so'nggi yangilanish vaqti
function updateLastUpdate() {
  const el = document.getElementById("lastUpdate");
  if (!el) return;
  const d = new Date();
  const opts = { day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true };
  const locale = currentLang === "en" ? "en-GB" : "uz-UZ";
  const formatted = d.toLocaleString(locale, opts);
  const prefix = currentLang === "uz" ? "So'nggi yangilanish " : "Last update ";
  el.innerText = prefix + formatted;
}

// Boshlang'ich yuklash
loadData();

// Auto-refresh olib tashlandi
