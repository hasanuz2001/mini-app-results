// LocalStorage'dan survey natijalarini o‘qiymiz
const data = JSON.parse(localStorage.getItem("survey_results") || "{}");

// Bugungi sana
const today = new Date().toISOString().slice(0, 10);

// Elementlar
const countEl = document.getElementById("count");
const leadershipEl = document.getElementById("leadership");
const coreEl = document.getElementById("core");
const readinessEl = document.getElementById("readiness");

if (!data[today]) {
  // Bugun hech kim topshirmagan bo‘lsa
  countEl.innerText = "0";
  leadershipEl.innerText = "0";
  coreEl.innerText = "0";
  readinessEl.innerText = "0";
} else {
  const d = data[today];

  countEl.innerText = d.count;
  leadershipEl.innerText = d.leadership;
  coreEl.innerText = d.core;
  readinessEl.innerText = d.readiness;
}