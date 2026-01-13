// API bazasi manzili (localhost yoki production)
// Agar GitHub Pages-da ishlamoqchi bo'lsa, bu URL bilan server ishga tushirilishi kerak
const API_BASE = window.location.hostname === 'localhost' ? "http://localhost:8000" : "/api";

let allResponses = [];
let allStats = {};

// Ma'lumotlarni yuklash
async function loadData() {
  try {
    // Statistika yuklash
    console.log("API dan yuklash: " + API_BASE + "/stats");
    const statsResponse = await fetch(`${API_BASE}/stats`);
    
    if (!statsResponse.ok) {
      throw new Error(`Stats API error: ${statsResponse.status}`);
    }
    
    const stats = await statsResponse.json();
    allStats = stats;
    console.log("Stats yuklandi:", allStats);

    // Barcha javoblarni yuklash
    const responsesResponse = await fetch(`${API_BASE}/responses`);
    
    if (!responsesResponse.ok) {
      throw new Error(`Responses API error: ${responsesResponse.status}`);
    }
    
    const responses = await responsesResponse.json();
    allResponses = responses.responses || [];
    console.log("Responses yuklandi:", allResponses.length);

    // Sahifani yangilash
    updateDashboard();
    updateLastUpdate();
  } catch (error) {
    console.error("API xatosi:", error);
    console.log("localStorage dan ma'lumot yuklash...");
    
    // Agar API ishlamasa, localStorage dan o'qiylik
    loadFromLocalStorage();
    
    // Xato xabarini ko'rsatish
    const message = `⚠️ Backend API bog'lanish xatosi.<br>
    Ma'lumotlar localStorage dan yuklandi.<br>
    <br>
    <strong>Backend-ni ishga tushirish uchun:</strong><br>
    <code style="background: #f0f0f0; padding: 10px; display: block; margin: 10px 0; border-radius: 5px; font-family: monospace;">
    cd /Users/hasanhaydarov/hello_app/diploma_app/mini-app<br>
    python3 -m uvicorn backend:app --reload --host 0.0.0.0 --port 8000
    </code>`;
    
    document.getElementById("questionsStats").innerHTML = `<p style="color: #d32f2f; padding: 15px; background: #ffebee; border-radius: 5px;">${message}</p>`;
  }
}

// LocalStorage dan o'qish (backup)
function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("survey_results") || "{}");
  
  if (Object.keys(data).length === 0) {
    document.getElementById("totalCount").innerText = "0";
    document.getElementById("totalResponses").innerText = "0";
    document.getElementById("questionsStats").innerHTML = `
      <p style="color: #666; padding: 20px; text-align: center; background: #f5f5f5; border-radius: 5px;">
        Hozircha javoblar yo'q.<br>
        <br>
        <strong style="color: #d32f2f;">Backend API ishlamayapti</strong><br>
        <br>
        Backend-ni ishga tushirish uchun terminal-da quyidagi buyruqni bajaring:
        <br><br>
        <code style="background: #fff3e0; padding: 15px; display: block; border-radius: 5px; font-family: monospace; border-left: 4px solid #ff9800; color: #333;">
        cd /Users/hasanhaydarov/hello_app/diploma_app/mini-app<br>
        python3 -m uvicorn backend:app --reload --host 0.0.0.0 --port 8000
        </code>
      </p>
    `;
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  
  if (data[today]) {
    const d = data[today];
    document.getElementById("totalCount").innerText = d.count || 0;
    document.getElementById("totalResponses").innerText = (d.count * 14) || 0;
  }
}

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
  const statsDiv = document.getElementById("questionsStats");
  const stats = allStats.question_stats || {};

  if (Object.keys(stats).length === 0) {
    statsDiv.innerHTML = '<p style="text-align: center; color: #999;">Javoblar yo\'q</p>';
    return;
  }

  let html = "";
  
  // Savollarni sonli tartibi bilan saralab, ko'rsatish
  const sortedQuestions = Object.keys(stats).sort((a, b) => parseInt(a) - parseInt(b));
  
  sortedQuestions.forEach((qId) => {
    const answers = stats[qId];
    const totalForQuestion = Object.values(answers).reduce((a, b) => a + b, 0);
    
    html += `
      <div style="margin-bottom: 25px; padding: 20px; background: #f9f9f9; border-radius: 8px; border-left: 5px solid #2a9df4;">
        <h4 style="margin: 0 0 15px 0; color: #333; font-size: 16px;">📋 Savol #${qId}</h4>
        <div style="background: white; padding: 15px; border-radius: 6px;">
    `;

    // Javoblarni soni bo'yicha tartibi bilan ko'rsatish (eng ko'p tanlagan birinchi)
    const sortedAnswers = Object.entries(answers)
      .sort((a, b) => b[1] - a[1])
      .forEach(([answer, count]) => {
        const percentage = totalForQuestion > 0 ? ((count / totalForQuestion) * 100).toFixed(1) : 0;
        const barWidth = percentage;
        
        html += `
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <span style="font-weight: bold; color: #333; word-break: break-word; max-width: 70%;">${answer}</span>
              <span style="color: #2a9df4; font-weight: bold;">${count} ta (${percentage}%)</span>
            </div>
            <div style="width: 100%; height: 25px; background: #e8f0f5; border-radius: 4px; overflow: hidden;">
              <div style="width: ${barWidth}%; height: 100%; background: linear-gradient(90deg, #2a9df4, #1976d2); display: flex; align-items: center; justify-content: flex-end; padding-right: 8px;">
                ${barWidth > 15 ? `<span style="color: white; font-size: 12px; font-weight: bold;">${percentage}%</span>` : ''}
              </div>
            </div>
          </div>
        `;
      });

    html += `
        </div>
      </div>
    `;
  });

  statsDiv.innerHTML = html;
}

// Javoblarni ko'rsatish
function displayResponses() {
  const list = document.getElementById("responsesList");

  if (allResponses.length === 0) {
    list.innerHTML = '<p style="text-align: center; color: #999;">Javoblar yo\'q</p>';
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
  html += '<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Sana</th>';
  html += '<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Foydalanuvchi ID</th>';
  html += '<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Javoblar</th>';
  html += '</tr>';

  Object.values(byUser).slice(-50).reverse().forEach((user, idx) => {
    const bgColor = idx % 2 === 0 ? '#f9f9f9' : 'white';
    const answerCount = Object.keys(user.answers).length;
    
    html += `<tr style="background: ${bgColor};">`;
    html += `<td style="padding: 10px; border: 1px solid #ddd;">${new Date(user.timestamp).toLocaleString('uz-UZ')}</td>`;
    html += `<td style="padding: 10px; border: 1px solid #ddd;">${user.user_id.substring(0, 8)}</td>`;
    html += `<td style="padding: 10px; border: 1px solid #ddd;">${answerCount} ta</td>`;
    html += '</tr>';
  });

  html += '</table>';
  list.innerHTML = html;
}

// CSV yuklab olish
function downloadCSV() {
  if (allResponses.length === 0) {
    alert("Yuklab oladigan javoblar yo'q");
    return;
  }

  let csv = "Sana,Foydalanuvchi ID,Savol ID,Javob\n";
  
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
  const now = new Date().toLocaleString('uz-UZ');
  document.getElementById("lastUpdate").innerText = now;
}

// Boshlang'ich yuklash
loadData();

// Har 5 soniyada yangilash
setInterval(loadData, 5000);
