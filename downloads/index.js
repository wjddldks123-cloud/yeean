document.getElementById("toggleMenuBtn").addEventListener("click", function() {
  const sidebar = document.getElementById("menu1");
  sidebar.classList.toggle("fixed");
});
(function startClock(){
  const elTime = document.querySelector('#clock .clock-time');
  const elDate = document.querySelector('#clock .clock-date');
  if (!elTime || !elDate) return;

  const yoil = ['일','월','화','수','목','금','토'];
  const pad  = n => String(n).padStart(2,'0');

  function render() {
    const now = new Date();
    const y = now.getFullYear();
    const m = pad(now.getMonth() + 1);
    const d = pad(now.getDate());
    const w = yoil[now.getDay()];
    const hh = pad(now.getHours());
    const mm = pad(now.getMinutes());
    const ss = pad(now.getSeconds());

    // 콜론 깜빡임
    elTime.innerHTML = `${hh}<span class="blink">:</span>${mm}<span class="blink">:</span>${ss}`;
    elDate.textContent = `${y}.${m}.${d} (${w})`;

    setTimeout(render, 1000 - now.getMilliseconds());
  }
  render();
})();