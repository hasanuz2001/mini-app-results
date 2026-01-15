const fs = require("fs");
const path = require("path");
const vm = require("vm");

function loadQuestions(questionsPath) {
  const code = fs.readFileSync(questionsPath, "utf8");
  const context = {
    module: { exports: {} }
  };
  vm.createContext(context);
  vm.runInContext(`${code}\nmodule.exports = { questions };`, context);
  return context.module.exports.questions || [];
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^["'«»]+|["'«»]+$/g, "")
    .replace(/\s+/g, " ");
}

function parseAnswer(value) {
  if (value === null || value === undefined) {
    return { id: null, text: "" };
  }
  if (typeof value === "object") {
    return extractAnswerText(value);
  }

  const raw = String(value);
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return extractAnswerText(parsed);
    }
  } catch (error) {
    // ignore JSON parse errors
  }
  return { id: null, text: raw };
}

function extractAnswerText(parsed) {
  if (parsed.id === "open_text") {
    return { id: "open_text", text: parsed.text || "" };
  }
  if (parsed.id === "open_option") {
    const selected = parsed.selected;
    if (selected && typeof selected === "object") {
      return { id: selected.id || null, text: selected.text || "" };
    }
    if (typeof selected === "string") {
      return { id: null, text: selected };
    }
    return { id: "open_option", text: "" };
  }
  if (typeof parsed.text === "string") {
    return { id: parsed.id || null, text: parsed.text };
  }
  return { id: parsed.id || null, text: "" };
}

function hasCyrillic(text) {
  return /[\u0400-\u04FF]/.test(text);
}

function hasUzCyrillicMarkers(text) {
  return /[қғҳў]/i.test(text);
}

function guessLanguageFromText(text) {
  if (!text) {
    return null;
  }
  if (hasCyrillic(text)) {
    return hasUzCyrillicMarkers(text) ? "uz_cyrl" : "ru";
  }
  return "uz";
}

function inferSubmissionLanguage(entries, questionMap) {
  const scores = {
    uz: 0,
    uz_cyrl: 0,
    ru: 0,
    en: 0
  };

  const hints = [];

  entries.forEach((entry) => {
    if (!entry.text) {
      return;
    }
    if (entry.id === "open_text" || entry.id === "open_option") {
      return;
    }
    const normalizedAnswer = normalizeText(entry.text);
    if (!normalizedAnswer) {
      return;
    }
    const question = questionMap[entry.questionId];
    if (question && question.options) {
      Object.keys(scores).forEach((langKey) => {
        const opts = question.options[langKey];
        if (!opts) {
          return;
        }
        const match = opts.some((opt) => normalizeText(opt) === normalizedAnswer);
        if (match) {
          scores[langKey] += 1;
        }
      });
    } else {
      hints.push(entry.text);
    }
  });

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  if (best && best[1] > 0) {
    return best[0];
  }

  const fallbackText = entries.map((e) => e.text).join(" ");
  return guessLanguageFromText(fallbackText) || "uz";
}

function buildQuestionMap(questions) {
  return questions.reduce((acc, question) => {
    acc[String(question.id)] = question;
    return acc;
  }, {});
}

function deriveLanguage(responsesPath, questionsPath, writeBack) {
  const responses = JSON.parse(fs.readFileSync(responsesPath, "utf8"));
  const questions = loadQuestions(questionsPath);
  const questionMap = buildQuestionMap(questions);

  const count = responses.timestamp?.length || 0;
  const submissions = new Map();
  const languagePerRow = new Array(count);

  for (let i = 0; i < count; i += 1) {
    const timestamp = responses.timestamp[i];
    const userId = responses.user_id[i];
    const questionId = String(responses.question_id[i]);
    const answer = parseAnswer(responses.answer[i]);

    const key = `${userId}::${timestamp}`;
    if (!submissions.has(key)) {
      submissions.set(key, []);
    }
    submissions.get(key).push({
      questionId,
      id: answer.id,
      text: answer.text,
      rowIndex: i
    });
  }

  const languageCounts = {
    uz: 0,
    uz_cyrl: 0,
    ru: 0,
    en: 0,
    unknown: 0
  };

  submissions.forEach((entries) => {
    const lang = inferSubmissionLanguage(entries, questionMap) || "unknown";
    languageCounts[lang] = (languageCounts[lang] || 0) + 1;
    entries.forEach((entry) => {
      languagePerRow[entry.rowIndex] = lang;
    });
  });

  if (writeBack) {
    responses.language = languagePerRow;
    fs.writeFileSync(responsesPath, JSON.stringify(responses, null, 2));
  }

  return languageCounts;
}

function main() {
  const args = process.argv.slice(2);
  const responsesPath = args[0] || path.resolve(process.cwd(), "responses.json");
  const questionsPath = args[1] || path.resolve(process.cwd(), "questions.js");
  const writeBack = args.includes("--write");

  if (!fs.existsSync(responsesPath)) {
    console.error(`responses.json topilmadi: ${responsesPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(questionsPath)) {
    console.error(`questions.js topilmadi: ${questionsPath}`);
    process.exit(1);
  }

  const counts = deriveLanguage(responsesPath, questionsPath, writeBack);
  console.log("Language counts:", counts);
  if (writeBack) {
    console.log("Updated responses.json with language array.");
  }
}

main();
