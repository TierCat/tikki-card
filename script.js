/* =========================================================
   TIKKI CARD
   Main JavaScript
   ========================================================= */


/* =========================================================
   01. SCROLL REVEAL
   ========================================================= */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12,
  }
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => revealObserver.observe(element));


/* =========================================================
   02. TEMPLATE CATEGORY FILTER
   ========================================================= */

const moods = document.querySelectorAll(".mood");
const cards = document.querySelectorAll(".template-card");

moods.forEach((button) => {
  button.addEventListener("click", () => {
    moods.forEach((item) => item.classList.remove("active"));

    button.classList.add("active");

    const filter = button.dataset.filter;

    cards.forEach((card) => {
      const shouldHide =
        filter !== "all" &&
        card.dataset.category !== filter;

      card.classList.toggle("hidden", shouldHide);
    });

    const cardsSection = document.querySelector("#cards");

    if (cardsSection) {
      cardsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});


/* =========================================================
   03. TOAST
   ========================================================= */

const toast = document.querySelector("#toast");
const heroDemoBtn = document.querySelector("#heroDemoBtn");


function showToast(message, duration = 1800) {
  if (!toast) return;

  const originalText = toast.textContent;

  if (message) {
    toast.textContent = message;
  }

  toast.classList.add("show");

  window.setTimeout(() => {
    toast.classList.remove("show");

    if (message) {
      window.setTimeout(() => {
        toast.textContent = originalText;
      }, 300);
    }
  }, duration);
}


if (heroDemoBtn) {
  heroDemoBtn.addEventListener("click", () => {
    showToast();
  });
}


/* =========================================================
   04. WHY TIKKI — PRESS & HOLD
   ========================================================= */

const loveBtn = document.querySelector("#loveButton");
const loveMessage = document.querySelector("#loveMessage");
const holdProgress = document.querySelector("#holdProgress");
const holdText = document.querySelector("#holdText");
const holdHint = document.querySelector("#holdHint");


if (
  loveBtn &&
  loveMessage &&
  holdProgress &&
  holdText &&
  holdHint
) {

  /* -------------------------------------------------------
     SETTINGS
     ------------------------------------------------------- */

  const HOLD_DURATION = 1100;

  /*
    SVG circle radius
    ต้องตรงกับ r="94" ใน HTML
  */

  const radius = 94;

  const circumference =
    2 * Math.PI * radius;


  /* -------------------------------------------------------
     INITIAL PROGRESS STATE
     ------------------------------------------------------- */

  holdProgress.style.strokeDasharray =
    circumference;

  holdProgress.style.strokeDashoffset =
    circumference;


  /* -------------------------------------------------------
     STATE
     ------------------------------------------------------- */

  let holdStartTime = null;

  let animationFrame = null;

  let completed = false;

  let resetTimer = null;


  /* =======================================================
     START HOLD
     ======================================================= */

  function startHold(event) {

    if (completed) {
      return;
    }


    /*
      ป้องกัน browser behavior
      ตอนกดค้างบนมือถือ
    */

    if (event.cancelable) {
      event.preventDefault();
    }


    window.clearTimeout(resetTimer);


    loveBtn.classList.add(
      "is-holding"
    );


    holdHint.textContent =
      "keep holding...";


    holdProgress.style.transition =
      "none";


    holdStartTime =
      performance.now();


    animationFrame =
      requestAnimationFrame(
        updateHoldProgress
      );
  }


  /* =======================================================
     UPDATE HOLD PROGRESS
     ======================================================= */

  function updateHoldProgress(currentTime) {

    if (holdStartTime === null) {
      return;
    }


    const elapsed =
      currentTime - holdStartTime;


    const progress =
      Math.min(
        elapsed / HOLD_DURATION,
        1
      );


    /*
      คำนวณเส้นวงกลม
    */

    const offset =
      circumference -
      progress * circumference;


    holdProgress.style.strokeDashoffset =
      offset;


    /* -----------------------------------------------------
       เปลี่ยนข้อความตามระยะเวลาที่ Hold
       ----------------------------------------------------- */

    if (progress < 0.35) {

      holdText.textContent =
        "keep holding...";

    }

    else if (progress < 0.75) {

      holdText.textContent =
        "almost there...";

    }

    else {

      holdText.textContent =
        "just a little more...";

    }


    /* -----------------------------------------------------
       HOLD ครบแล้ว
       ----------------------------------------------------- */

    if (progress >= 1) {

      completeHold();

      return;
    }


    animationFrame =
      requestAnimationFrame(
        updateHoldProgress
      );
  }


  /* =======================================================
     CANCEL HOLD
     ======================================================= */

  function cancelHold() {

    /*
      ถ้าปลดล็อกไปแล้ว
      ไม่ต้อง Cancel
    */

    if (completed) {
      return;
    }


    holdStartTime = null;


    if (animationFrame) {

      cancelAnimationFrame(
        animationFrame
      );

      animationFrame = null;
    }


    loveBtn.classList.remove(
      "is-holding"
    );


    /*
      ให้ Progress ไหลกลับ
      แทนที่จะหายทันที
    */

    holdProgress.style.transition =
      "stroke-dashoffset 0.25s ease";


    holdProgress.style.strokeDashoffset =
      circumference;


    holdText.textContent =
      "press & hold";


    holdHint.textContent =
      "hold me!";


    window.setTimeout(() => {

      holdProgress.style.transition =
        "none";

    }, 250);
  }


  /* =======================================================
     COMPLETE HOLD
     ======================================================= */

  function completeHold() {

    completed = true;

    holdStartTime = null;


    if (animationFrame) {

      cancelAnimationFrame(
        animationFrame
      );

      animationFrame = null;
    }


    /* หยุดสถานะ Holding */

    loveBtn.classList.remove(
      "is-holding"
    );


    /* เปิด Success State */

    loveBtn.classList.add(
      "is-complete"
    );


    /* Bubble ซ้าย */

    holdHint.textContent =
      "you did it!";


    /* Bubble ขวา */

    loveMessage.innerHTML =
      "see? not just a card.<br>" +
      "<b>♡ tiny moments matter ♡</b>";


    loveMessage.classList.add(
      "is-surprise"
    );


    /* -----------------------------------------------------
       VIBRATION
       มือถือที่รองรับจะสั่นเบา ๆ
       ----------------------------------------------------- */

    if ("vibrate" in navigator) {

      navigator.vibrate(
        [30, 40, 60]
      );

    }


    /* -----------------------------------------------------
       RESET อัตโนมัติ
       ----------------------------------------------------- */

    resetTimer =
      window.setTimeout(
        resetInteraction,
        4200
      );
  }


  /* =======================================================
     RESET INTERACTION
     ======================================================= */

  function resetInteraction() {

    completed = false;


    /* Reset Button */

    loveBtn.classList.remove(
      "is-complete"
    );


    /* Reset Bubble */

    loveMessage.classList.remove(
      "is-surprise"
    );


    loveMessage.innerHTML =
      "a little feeling<br>" +
      "is hiding here";


    /* Reset Hint */

    holdHint.textContent =
      "hold me!";


    /* Reset Button Text */

    holdText.textContent =
      "press & hold";


    /* Reset Progress */

    holdProgress.style.transition =
      "stroke-dashoffset 0.35s ease";


    holdProgress.style.strokeDashoffset =
      circumference;


    window.setTimeout(() => {

      holdProgress.style.transition =
        "none";

    }, 350);
  }


  /* =======================================================
     POINTER EVENTS
     รองรับ Mouse + Touch + Pen
     ======================================================= */


  /* เริ่มกด */

  loveBtn.addEventListener(
    "pointerdown",
    startHold
  );


  /* ปล่อย */

  loveBtn.addEventListener(
    "pointerup",
    cancelHold
  );


  /* ลากออกจากปุ่ม */

  loveBtn.addEventListener(
    "pointerleave",
    cancelHold
  );


  /* Browser ยกเลิก Pointer */

  loveBtn.addEventListener(
    "pointercancel",
    cancelHold
  );


  /* =======================================================
     PREVENT MOBILE LONG PRESS MENU
     ======================================================= */

  loveBtn.addEventListener(
    "contextmenu",
    (event) => {

      event.preventDefault();

    }
  );
}


/* =========================================================
   05. LIVE DEMO PLACEHOLDER LINKS
   ========================================================= */

document
  .querySelectorAll(".demo-link")
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        /*
          ถ้ายังไม่ได้ใส่ลิงก์จริง
        */

        if (
          link.getAttribute("href") === "#"
        ) {

          event.preventDefault();


          showToast(
            "ใส่ลิงก์ Live Demo ของงานตรงนี้ได้เลย ♡",
            2200
          );

        }

      }
    );

  });