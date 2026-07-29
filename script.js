/* =========================================================
   TIKKI — MAIN SCRIPT
   ========================================================= */


/* =========================================================
   01. SHOP DATA
   ========================================================= */

const products = [
  {
    code: "00",
    title: "Birthday Pop!",
    tags: ["birthday"],
    tagLabel: "BIRTHDAY",
    description: "วันเกิดสดใส มีจังหวะเซอร์ไพรส์และโมเมนต์น่ารัก",
    price: 99,
    salePrice: 49,
    bg: "#ffe1b8",
    tilt: "-3deg",
    url: "https://birthday-aci.pages.dev/"
  },

  {
    code: "01",
    title: "Knock Knock",
    tags: ["love", "fun"],
    tagLabel: "LOVE · FUN",
    description: "เคาะประตูก่อน แล้วค่อยเปิดเข้าไปเจอเซอร์ไพรส์",
    price: 99,
    salePrice: 49,
    bg: "#e4efe1",
    tilt: "3deg",
    url: "https://knock-the-door.pages.dev/"
  },

  {
    code: "02",
    title: "Breaking Love News",
    tags: ["love", "fun"],
    tagLabel: "LOVE · FUN",
    description: "ข่าวด่วน ข่าวลับ เกี่ยวกับความรักแบบมีเรื่อง",
    price: 99,
    salePrice: 49,
    bg: "#deedf7",
    tilt: "-2deg",
    url: "https://breaking-love-news.pages.dev/"
  },

  {
    code: "03",
    title: "Who Is The Cutest?",
    tags: ["love", "fun"],
    tagLabel: "LOVE · FUN",
    description: "เกมคำถามกวน ๆ ก่อนเฉลยแบบเขิน ๆ",
    price: 99,
    salePrice: 49,
    bg: "#f8dce5",
    tilt: "2deg",
    url: "https://who-is-the-cutest.pages.dev/"
  },

  {
    code: "04",
    title: "Drink With Me",
    tags: ["friend", "fun"],
    tagLabel: "FRIEND · FUN",
    description: "คำชวนดริ้งในรูปแบบมินิเกม ส่งให้เพื่อนก็ได้",
    price: 99,
    salePrice: 49,
    bg: "#e8eadc",
    tilt: "-2deg",
    url: "https://drink-1qk.pages.dev/"
  },

  {
    code: "05",
    title: "Birthday Cinematic",
    tags: ["birthday", "special"],
    tagLabel: "BIRTHDAY · SPECIAL",
    description: "เล่าเรื่องวันเกิดแบบ cinematic เป็นซีนและความทรงจำ",
    price: 199,
    salePrice: null,
    bg: "#eadfd5",
    tilt: "2deg",
    url: "https://birthday-cinematic.pages.dev/"
  },

  {
    code: "06",
    title: "Sorry Meow",
    tags: ["sorry", "love"],
    tagLabel: "SORRY · LOVE",
    description: "ง้อแบบน่ารัก ให้เจ้าเหมียวช่วยพูดคำขอโทษแทน",
    price: 199,
    salePrice: null,
    bg: "#e4eee9",
    tilt: "-3deg",
    url: "https://sorry-meow.pages.dev/"
  },

  {
    code: "07",
    title: "Can U Be Mine?",
    tags: ["love", "special"],
    tagLabel: "LOVE · SPECIAL",
    description: "คำถามสำคัญที่อยากถามใครบางคนแบบพิเศษกว่าเดิม",
    price: 199,
    salePrice: null,
    bg: "#f3dfe2",
    tilt: "3deg",
    url: "https://canubemine.pages.dev/"
  },

  {
    code: "08",
    title: "To My Friend",
    tags: ["friend"],
    tagLabel: "FRIENDSHIP",
    description: "ส่งข้อความและความทรงจำดี ๆ ให้เพื่อนคนสำคัญ",
    price: 199,
    salePrice: null,
    bg: "#e8eadf",
    tilt: "-2deg",
    url: "https://to-myfriend.pages.dev/"
  },

  {
    code: "09",
    title: "Manchester Special",
    tags: ["special", "birthday"],
    tagLabel: "SPECIAL · BIRTHDAY",
    description: "เว็บเซอร์ไพรส์ฉบับพิเศษสำหรับแฟน Manchester United",
    price: 489,
    salePrice: null,
    bg: "#eadbd8",
    tilt: "2deg",
    url: "https://manchester-6qw.pages.dev/"
  }
];


/* =========================================================
   02. INSTAGRAM
   ========================================================= */

const instagramURL =
  "https://www.instagram.com/tikki_card?igsh=NTBvb3N1YzRiMzd0&utm_source=qr";


/* =========================================================
   03. ELEMENTS
   ========================================================= */

const productGrid = document.querySelector(".product-grid");

const filterButtons = document.querySelectorAll(".filter");

const previewModal = document.querySelector(".preview-modal");
const modalBackdrop = document.querySelector(".modal-backdrop");
const modalClose = document.querySelector(".modal-close");

const modalIframe = document.querySelector(".modal-sheet iframe");
const modalTitle = document.querySelector(".modal-info h3");
const modalCode = document.querySelector(".modal-info span");
const modalLink = document.querySelector(".modal-info a");

const pageTransition = document.querySelector("#pageTransition");


/* =========================================================
   04. PRICE
   ========================================================= */

function createPrice(product) {
  if (product.salePrice) {
    return `
      <span class="price-pill sale">
        <del>${product.price}.-</del>
        ${product.salePrice}.-
      </span>
    `;
  }

  return `
    <span class="price-pill">
      ${product.price}.-
    </span>
  `;
}


/* =========================================================
   05. CREATE PRODUCT CARD
   ========================================================= */

function createProductCard(product, index) {
  const article = document.createElement("article");

  article.className = "product-card";

  article.dataset.tags = product.tags.join(" ");

  article.style.setProperty("--card-bg", product.bg);
  article.style.setProperty("--tilt", product.tilt);

  article.style.animationDelay = `${index * 45}ms`;

  article.innerHTML = `
    <div class="card-preview">

      <div class="card-meta">

        <span class="card-code">
          TIKKI ${product.code}
        </span>

        ${createPrice(product)}

      </div>


      <div class="mock">

        <iframe
          src="${product.url}"
          loading="lazy"
          tabindex="-1"
          aria-hidden="true">
        </iframe>

      </div>

    </div>


    <div class="card-body">

      <div class="card-tags">
        ${product.tagLabel}
      </div>

      <h3>
        ${product.title}
      </h3>

      <p>
        ${product.description}
      </p>


      <div class="card-actions">

        <button
          class="preview-btn"
          type="button">
          Preview
        </button>

        <a
          class="order-btn"
          href="${instagramURL}"
          target="_blank"
          rel="noopener">
          สั่งแบบนี้
        </a>

      </div>

    </div>
  `;


  /* PREVIEW BUTTON */

  const previewButton =
    article.querySelector(".preview-btn");

  previewButton.addEventListener("click", () => {
    openPreview(product);
  });


  return article;
}


/* =========================================================
   06. RENDER PRODUCTS
   ========================================================= */

function renderProducts(filter = "all") {
  if (!productGrid) return;

  productGrid.innerHTML = "";

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter(product =>
          product.tags.includes(filter)
        );


  filteredProducts.forEach((product, index) => {
    const card =
      createProductCard(product, index);

    productGrid.appendChild(card);
  });
}


renderProducts();


/* =========================================================
   07. FILTER
   ========================================================= */

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    const filter =
      button.dataset.filter || "all";


    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });


    button.classList.add("active");


    renderProducts(filter);

  });

});


/* =========================================================
   08. PREVIEW TRANSITION
   ========================================================= */

function startTransition(callback) {

  /*
    ถ้าไม่มี transition element
    ให้ทำงานต่อทันที
  */

  if (!pageTransition) {
    callback();
    return;
  }


  pageTransition.classList.add("active");


  /*
    รอ animation คลุมหน้าจอ
  */

  setTimeout(() => {

    callback();


    /*
      หลังเปิด Modal แล้ว
      ค่อยเอา transition ออก
    */

    setTimeout(() => {

      pageTransition.classList.remove("active");

    }, 350);

  }, 600);

}


/* =========================================================
   09. OPEN PREVIEW
   ========================================================= */

function openPreview(product) {

  startTransition(() => {

    if (!previewModal) {

      /*
        fallback
        ถ้าไม่มี modal ใน HTML
      */

      window.open(
        product.url,
        "_blank",
        "noopener,noreferrer"
      );

      return;
    }


    /* ใส่ข้อมูล */

    if (modalIframe) {
      modalIframe.src = product.url;
    }

    if (modalTitle) {
      modalTitle.textContent = product.title;
    }

    if (modalCode) {
      modalCode.textContent =
        `TIKKI ${product.code}`;
    }

    if (modalLink) {
      modalLink.href = product.url;
      modalLink.target = "_blank";
      modalLink.rel = "noopener";
    }


    /* เปิด Modal */

    previewModal.classList.add("open");

    previewModal.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.style.overflow = "hidden";

  });

}


/* =========================================================
   10. CLOSE PREVIEW
   ========================================================= */

function closePreview() {

  if (!previewModal) return;


  previewModal.classList.remove("open");

  previewModal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow = "";


  /*
    รอ modal animation จบ
    แล้วค่อยหยุด iframe
  */

  setTimeout(() => {

    if (modalIframe) {
      modalIframe.src = "";
    }

  }, 450);

}


/* =========================================================
   11. MODAL EVENTS
   ========================================================= */

if (modalClose) {

  modalClose.addEventListener(
    "click",
    closePreview
  );

}


if (modalBackdrop) {

  modalBackdrop.addEventListener(
    "click",
    closePreview
  );

}


/* ESC */

document.addEventListener("keydown", event => {

  if (
    event.key === "Escape" &&
    previewModal?.classList.contains("open")
  ) {

    closePreview();

  }

});


/* =========================================================
   12. SCROLL REVEAL
   ========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;


          entry.target.classList.add(
            "visible"
          );


          revealObserver.unobserve(
            entry.target
          );

        });

      },

      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }

    );


  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

} else {

  revealElements.forEach(element => {
    element.classList.add("visible");
  });

}


/* =========================================================
   13. CUSTOM CURSOR
   ========================================================= */

const cursor =
  document.querySelector(".cursor-dot");


if (
  cursor &&
  window.matchMedia("(pointer: fine)").matches
) {

  window.addEventListener(
    "mousemove",
    event => {

      cursor.style.left =
        `${event.clientX}px`;

      cursor.style.top =
        `${event.clientY}px`;

    }
  );


  /*
    ขยาย cursor เวลา Hover
    สิ่งที่กดได้
  */

  document.addEventListener(
    "mouseover",
    event => {

      if (
        event.target.closest(
          "a, button, .product-card"
        )
      ) {

        cursor.style.width = "24px";
        cursor.style.height = "24px";

      }

    }
  );


  document.addEventListener(
    "mouseout",
    event => {

      if (
        event.target.closest(
          "a, button, .product-card"
        )
      ) {

        cursor.style.width = "12px";
        cursor.style.height = "12px";

      }

    }
  );

}


/* =========================================================
   14. SMOOTH ANCHOR
   ========================================================= */

document.querySelectorAll('a[href^="#"]')
  .forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const targetID =
          link.getAttribute("href");


        if (
          !targetID ||
          targetID === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(targetID);


        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


/* =========================================================
   15. PRELOAD PREVIEW ON HOVER
   ========================================================= */

/*
  Desktop:
  ตอนเอาเมาส์เข้า Preview
  browser จะเริ่มเตรียม connection
  ทำให้เปิดเว็บจริงเร็วขึ้น
*/

const preloadedDomains =
  new Set();


function preloadWebsite(url) {

  try {

    const domain =
      new URL(url).origin;


    if (
      preloadedDomains.has(domain)
    ) {
      return;
    }


    const link =
      document.createElement("link");


    link.rel = "preconnect";
    link.href = domain;


    document.head.appendChild(link);


    preloadedDomains.add(domain);

  } catch (error) {

    console.warn(
      "TIKKI preload:",
      error
    );

  }

}


productGrid?.addEventListener(
  "mouseover",
  event => {

    const card =
      event.target.closest(
        ".product-card"
      );


    if (!card) return;


    const cards =
      [...productGrid.children];


    const index =
      cards.indexOf(card);


    const visibleProducts =
      products.filter(product => {

        const activeFilter =
          document.querySelector(
            ".filter.active"
          )?.dataset.filter || "all";


        return (
          activeFilter === "all" ||
          product.tags.includes(
            activeFilter
          )
        );

      });


    const product =
      visibleProducts[index];


    if (product) {
      preloadWebsite(product.url);
    }

  }
);


/* =========================================================
   16. PAGE READY
   ========================================================= */

window.addEventListener("load", () => {

  document.body.classList.add(
    "page-ready"
  );

});


/* =========================================================
   TIKKI OPENING TRANSITION
========================================================= */

const introTransition =
  document.getElementById("introTransition");


if (introTransition) {

  /*
    ล็อก scroll ชั่วคราว
    ระหว่าง intro
  */

  document.body.style.overflow = "hidden";


  window.addEventListener("load", () => {

    /*
      ให้โลโก้อยู่บนหน้าจอแป๊บหนึ่ง
    */

    setTimeout(() => {

      introTransition.classList.add("hide");

      /*
        เปิด scroll กลับ
      */

      setTimeout(() => {

        introTransition.remove();

        document.body.style.overflow = "";

      }, 750);

    }, 1250);

  });

}