// auth-guard.js (로컬 file:// 과 서버 https:// 모두 안전)
(() => {
  const TOKEN_KEY = "site_auth_token";
  const isServer = location.protocol.startsWith("http");
  // 서버면 절대경로, 로컬이면 상대경로 사용
  const toLogin = isServer ? "/login.html" : "./login.html";
  const toHome  = isServer ? "/"           : "./index.html";

  const path = location.pathname.replace(/\/+$/, "");
  const isLoginPage =
    path.endsWith("/login") || path.endsWith("/login.html");

  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    const data = raw ? JSON.parse(raw) : null;
    const valid = !!(data && data.ok && typeof data.exp === "number" && Date.now() < data.exp);

    if (!valid && !isLoginPage) location.replace(toLogin);
    if (valid && isLoginPage)   location.replace(toHome);
  } catch {
    if (!isLoginPage) location.replace(toLogin);
  }
})();
// ✅ 엔터키로도 로그인되게 추가
document.getElementById("pw").addEventListener("keydown", async (e) => {
  if (e.key === "Enter") document.getElementById("loginBtn").click();
});
