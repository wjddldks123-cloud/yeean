document.getElementById("toggleMenuBtn").addEventListener("click", function () {
  const sidebar = document.getElementById("menu1");
  sidebar.classList.toggle("fixed");
});

(function startClock() {
  const elTime = document.querySelector("#clock .clock-time");
  const elDate = document.querySelector("#clock .clock-date");
  if (!elTime || !elDate) return;

  const yoil = ["일", "월", "화", "수", "목", "금", "토"];
  const pad = (n) => String(n).padStart(2, "0");

  function render() {
    const now = new Date();
    const y = now.getFullYear();
    const m = pad(now.getMonth() + 1);
    const d = pad(now.getDate());
    const w = yoil[now.getDay()];
    const hh = pad(now.getHours());
    const mm = pad(now.getMinutes());
    const ss = pad(now.getSeconds());

    elTime.innerHTML = `${hh}&nbsp;<span class="blink">:</span>&nbsp;${mm}&nbsp;<span class="blink">:</span>&nbsp;${ss}`;
    elDate.textContent = `${y}.${m}.${d} (${w})`;

    setTimeout(render, 1000 - now.getMilliseconds());
  }

  render();
})();

(function initStartupChecklist() {
  const checklistEl = document.getElementById("startupChecklist");
  if (!checklistEl) return;

  const checklistItems = [
    "UVMS cctv 정보 등록",
    "전화 연결 확인",
    "캡스 웹페이지에서 매장 이름 변경",
    "체크사항 작성",
    "NQVM 연결확인 및 해당시간에 추가",
    "ctrl에 시간표 등록 및 시작일 설정",
    "CCTV/전체 녹화 설정",
    "하이크 출입문 시간 설정",
    "점주 카톡 초대 및 관제 시간표 발송",
  ];

  const storageKey = "startup-checklist-state-v1";
  let savedState = {};

  try {
    savedState = JSON.parse(localStorage.getItem(storageKey) || "{}");
  } catch (error) {
    savedState = {};
  }

  checklistItems.forEach((item, index) => {
    const itemKey = `item-${index}`;

    const li = document.createElement("li");
    li.className = "checklist-item";

    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(savedState[itemKey]);

    const text = document.createElement("span");
    text.textContent = item;

    label.appendChild(checkbox);
    label.appendChild(text);
    li.appendChild(label);
    checklistEl.appendChild(li);

    checkbox.addEventListener("change", () => {
      savedState[itemKey] = checkbox.checked;
      localStorage.setItem(storageKey, JSON.stringify(savedState));
    });
  });
})();