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
  uz: {
    title: "AI Resistance Survey Results Dashboard",
    subtitle: "Uran qazib olish sohasida sun'iy intellektni joriy etishga ichki qarshilik bo'yicha tadqiqot natijalari.",
    meta: "Ushbu panel dissertatsiya (thesis) ko'rib chiqish va akademik baholash uchun mo'ljallangan.",
    badge: "Ekspertiza",
    sections: {
      summary: "Umumiy Ko'rsatkichlar",
      questions: "Savollar Bo'yicha Tahlil",
      responses: "Barcha Javoblar"
    },
    labels: {
      participants: "Ishtirokchilar soni",
      responses: "Javoblar soni",
      lastUpdate: "So'nggi yangilanish"
    },
    actions: {
      downloadCsv: "CSV formatida yuklab olish",
      refresh: "Ma'lumotlarni yangilash"
    },
    note: {
      label: "Eslatma:",
      text: "Ma'lumotlar sahifa yangilanganda yangilanadi."
    },
    states: {
      loading: "Ma'lumotlar yuklanmoqda...",
      noData: "Ma'lumotlar mavjud emas"
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
    },
    csv: {
      noData: "Yuklab olish uchun ma'lumot mavjud emas",
      header: "Sana,Foydalanuvchi identifikatori,Savol ID,Javob\n"
    }
  },
  en: {
    title: "AI Resistance Survey Results Dashboard",
    subtitle: "Research findings on internal resistance to AI adoption in the uranium mining sector.",
    meta: "This panel is intended for thesis review and academic evaluation.",
    badge: "Academic Review",
    sections: {
      summary: "Overall Indicators",
      questions: "Question-Level Analysis",
      responses: "All Responses"
    },
    labels: {
      participants: "Number of participants",
      responses: "Number of responses",
      lastUpdate: "Last update"
    },
    actions: {
      downloadCsv: "Download as CSV",
      refresh: "Refresh data"
    },
    note: {
      label: "Note:",
      text: "Data updates when the page is refreshed."
    },
    states: {
      loading: "Loading data...",
      noData: "No data available"
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
    },
    csv: {
      noData: "No data available for download",
      header: "Date,User identifier,Question ID,Response\n"
    }
  }
};

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
  const sectionQuestionsTitle = document.getElementById("sectionQuestionsTitle");
  const sectionResponsesTitle = document.getElementById("sectionResponsesTitle");
  const labelParticipants = document.getElementById("labelParticipants");
  const labelResponses = document.getElementById("labelResponses");
  const labelLastUpdate = document.getElementById("labelLastUpdate");
  const downloadCsvBtn = document.getElementById("downloadCsvBtn");
  const refreshBtn = document.getElementById("refreshBtn");
  const noteLabel = document.getElementById("noteLabel");
  const noteText = document.getElementById("noteText");

  if (heroTitle) heroTitle.innerText = t.title;
  if (heroSubtitle) heroSubtitle.innerText = t.subtitle;
  if (heroMeta) heroMeta.innerText = t.meta;
  if (heroBadge) heroBadge.innerText = t.badge;
  if (sectionSummaryTitle) sectionSummaryTitle.innerText = t.sections.summary;
  if (sectionQuestionsTitle) sectionQuestionsTitle.innerText = t.sections.questions;
  if (sectionResponsesTitle) sectionResponsesTitle.innerText = t.sections.responses;
  if (labelParticipants) labelParticipants.innerText = t.labels.participants;
  if (labelResponses) labelResponses.innerText = t.labels.responses;
  if (labelLastUpdate) labelLastUpdate.innerText = t.labels.lastUpdate;
  if (downloadCsvBtn) downloadCsvBtn.innerText = t.actions.downloadCsv;
  if (refreshBtn) refreshBtn.innerText = t.actions.refresh;
  if (noteLabel) noteLabel.innerText = t.note.label;
  if (noteText) noteText.innerText = t.note.text;

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
  if (langUzButton) langUzButton.addEventListener("click", () => setLanguage("uz"));
  if (langEnButton) langEnButton.addEventListener("click", () => setLanguage("en"));
  if (refreshButton) refreshButton.addEventListener("click", refreshData);
}

function refreshData() {
  loadData();
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

// GitHub Gist'dan ma'lumotlarni olish
async function getGistData() {
  if (!GITHUB_TOKEN || !GIST_ID) {
    throw new Error('GITHUB_TOKEN yoki GIST_ID sozlanmagan');
  }
  
  const url = `https://api.github.com/gists/${GIST_ID}`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Gist API error: ${response.status}`);
  }
  
  const gist = await response.json();
  const content = gist.files['responses.json'].content;
  return JSON.parse(content);
}

// Ma'lumotlarni yuklash (to'g'ridan-to'g'ri Gist API'dan)
async function loadData() {
  try {
    console.log("GitHub Gist'dan ma'lumotlar yuklanmoqda...");
    const t = translations[currentLang] || translations.uz;
    const statsEl = document.getElementById("questionsStats");
    const responsesEl = document.getElementById("responsesList");
    if (statsEl) {
      statsEl.innerHTML = `<p style="text-align: center; color: #999;">${t.states.loading}</p>`;
    }
    if (responsesEl) {
      responsesEl.innerHTML = `<p style="text-align: center; color: #999;">${t.states.loading}</p>`;
    }
    
    // Token va Gist ID tekshirish
    if (!GITHUB_TOKEN || !GIST_ID) {
      throw new Error('GITHUB_TOKEN yoki GIST_ID sozlanmagan');
    }
    
    // Gist'dan ma'lumotlarni olish
    const gistData = await getGistData();
    
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
    for (let i = 0; i < gistData.timestamp.length; i++) {
      allResponses.push({
        timestamp: gistData.timestamp[i],
        user_id: gistData.user_id[i],
        question_id: gistData.question_id[i],
        answer: gistData.answer[i]
      });
    }
    
    // Statistika hisoblash
    const questionStats = {};
    const submissionKeys = new Set();
    
    allResponses.forEach(row => {
      const qId = row.question_id;
      const answer = row.answer;
      const userId = row.user_id;
      
      submissionKeys.add(`${userId}::${row.timestamp}`);
      
      if (!(qId in questionStats)) {
        questionStats[qId] = {};
      }
      
      if (!(answer in questionStats[qId])) {
        questionStats[qId][answer] = 0;
      }
      questionStats[qId][answer] += 1;
    });
    
    allStats = {
      total: allResponses.length,
      question_stats: questionStats,
      user_count: submissionKeys.size
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
    document.getElementById("responsesList").innerHTML = `<p style="text-align: center; color: #999;">${t.errors.gistUnavailable}</p>`;
  }
}

// LocalStorage funksiyasi o'chirildi - faqat backend'dan ma'lumot olinadi

// Dashboard yangilash
function updateDashboard() {
  // Umumiy statistika
  const totalCount = allStats.user_count || 0;
  const totalResponses = allStats.total || 0;

  document.getElementById("totalCount").innerText = totalCount;
  document.getElementById("totalResponses").innerText = totalResponses;

  // Savollar statistikasi
  displayQuestionStats();

  // Javoblarni ko'rsatish
  displayResponses();
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
  
  // Savollarni sonli tartibi bilan saralab, ko'rsatish
  const sortedQuestions = Object.keys(stats).sort((a, b) => parseInt(a) - parseInt(b));
  
  sortedQuestions.forEach((qId) => {
    const answers = stats[qId];
    const totalForQuestion = Object.values(answers).reduce((a, b) => a + b, 0);
    
    const question = findQuestionById(qId);
    const questionText = question?.text?.[currentLang] || question?.text?.uz || `${t.questionLabel} #${qId}`;
    const questionOptions = question?.options?.[currentLang] || question?.options?.uz || [];
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

      questionOptions.forEach((option) => {
        const normalizedOption = normalizeAnswer(option);
        const count = normalizedCounts.get(normalizedOption) || 0;
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

// Javoblarni ko'rsatish
function displayResponses() {
  const t = translations[currentLang] || translations.uz;
  const list = document.getElementById("responsesList");

  if (allResponses.length === 0) {
    list.innerHTML = `<p style="text-align: center; color: #999;">${t.states.noData}</p>`;
    return;
  }

  // Foydalanuvchilar bo'yicha yig'ish
  const byUser = {};
  allResponses.forEach(row => {
    if (!byUser[row.user_id]) {
      byUser[row.user_id] = {
        user_id: row.user_id,
        timestamp: row.timestamp,
        answers: {}
      };
    }
    byUser[row.user_id].answers[row.question_id] = row.answer;
  });

  let html = '<table style="width: 100%; border-collapse: collapse;">';
  html += '<tr style="background: #2a9df4; color: white;">';
  html += `<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">${t.table.date}</th>`;
  html += `<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">${t.table.userId}</th>`;
  html += `<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">${t.table.answers}</th>`;
  html += '</tr>';

  Object.values(byUser).slice(-50).reverse().forEach((user, idx) => {
    const bgColor = idx % 2 === 0 ? '#f9f9f9' : 'white';
    const answerCount = Object.keys(user.answers).length;
    
    html += `<tr style="background: ${bgColor};">`;
    html += `<td style="padding: 10px; border: 1px solid #ddd;">${new Date(user.timestamp).toLocaleString(localeMap[currentLang] || "uz-UZ")}</td>`;
    html += `<td style="padding: 10px; border: 1px solid #ddd;">${user.user_id.substring(0, 8)}</td>`;
    html += `<td style="padding: 10px; border: 1px solid #ddd;">${answerCount} ${t.countUnit}</td>`;
    html += '</tr>';
  });

  html += '</table>';
  list.innerHTML = html;
}

// CSV yuklab olish
function downloadCSV() {
  const t = translations[currentLang] || translations.uz;
  if (allResponses.length === 0) {
    alert(t.csv.noData);
    return;
  }

  let csv = t.csv.header;
  
  allResponses.forEach(row => {
    csv += `"${row.timestamp}","${row.user_id}","${row.question_id}","${row.answer}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `survey_results_${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
}

// Yakungi yangilash vaqti
function updateLastUpdate() {
  const now = new Date().toLocaleString(localeMap[currentLang] || "uz-UZ");
  document.getElementById("lastUpdate").innerText = now;
}

// Boshlang'ich yuklash
loadData();

// Auto-refresh olib tashlandi
