// GitHub Gist API sozlamalari
const CONFIG = {
    GITHUB_TOKEN: 'your-github-token-here', // GitHub Personal Access Token
    GIST_ID: 'd88f1ebc50c5d37c857ee5961d6dba5c', // GitHub Gist ID
    
    // Eski backend API URL (ixtiyoriy, agar backend ishlatmoqchi bo'lsangiz)
    API_BASE: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? "http://localhost:8000"
      : null // Backend kerak emas, to'g'ridan-to'g'ri Gist API ishlatiladi
};
