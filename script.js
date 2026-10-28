/* ============================================================
   EDIT THIS PART — everything on the page comes from here.
   Put your photos in the "photos" folder and list them below.
   ============================================================ */
const CONFIG = {
  herName: "Ravneet",
  subtitle: "To the girl who makes every day feel like a celebration.",

  first: {
    src: "photos/first.jpg",
    intro: "Where it all began — I didn't know it yet, but my whole life was about to change. 💫",
    caption: "The start of my favourite story 💕",
  },

  together: [
    { src: "photos/together1.jpg", caption: "Under the sunlit trees 🌿" },
    { src: "photos/together2.jpg", caption: "Roses for my rose 🌹" },
    { src: "photos/together3.jpg", caption: "Evenings are better with you ✨" },
  ],

  events: [
    {
      title: "Our special days 💍",
      note: "Every moment of becoming ours is my favourite memory.",
      photos: [
        { src: "photos/special1.jpg", caption: "Pretty in pink" },
        { src: "photos/special2.jpg", caption: "Walking into forever" },
      ],
    },
    {
      title: "Celebrating with family 🪔",
      note: "You fit into my world like you were always meant to.",
      photos: [
        { src: "photos/family1.jpg", caption: "My Ravneet" },
        { src: "photos/family2.jpg", caption: "Together with our loved ones" },
        { src: "photos/family3.jpg", caption: "Blessings and smiles" },
        { src: "photos/family4.jpg", caption: "Selfie with the squad 🤳" },
        { src: "photos/family5.jpg", caption: "Our big, happy family" },
        { src: "photos/family6.jpg", caption: "A night to remember" },
      ],
    },
  ],

  letter: [
    "My dearest {name},",
    "Happy birthday to the girl who owns my heart. Before you, I didn't know a person could feel like home. Now I can't imagine a single day without your smile, your laugh, and the way you make even ordinary moments feel magical.",
    "I'm counting the days until I get to call you my wife. I promise to hold your hand through every adventure, to be your biggest fan, your safe place, and the one who always makes you laugh, even on the hard days.",
    "Today the world celebrates the day you were born, and I thank the universe for it every single time. You are my today, my tomorrow, and my forever.",
    "Happy birthday, my love. Here's to a lifetime of birthdays together. 💖",
  ],
  signature: "Forever yours,\nYour future husband",

  finale: "May every wish you made come true. Happy birthday, {name}! 🎂💗",
};

/* ============================================================
   Code below — no need to change anything
   ============================================================ */
const $ = (id) => document.getElementById(id);
const fill = (s) => s.replace(/\{name\}/g, CONFIG.herName);

// photo card; falls back to a pink placeholder if the file is missing
function photoCard(p, extraClass = "") {
  const fig = document.createElement("figure");
  fig.className = `polaroid ${extraClass}`.trim();
  const img = document.createElement("img");
  img.src = p.src;
  img.alt = p.caption || "Our photo";
  img.loading = "lazy";
  img.onerror = () => {
    const ph = document.createElement("div");
    ph.className = "ph";
    ph.textContent = "💗";
    img.replaceWith(ph);
    fig.dataset.missing = "1";
  };
  fig.append(img);
  if (p.caption) {
    const cap = document.createElement("figcaption");
    cap.textContent = p.caption;
    fig.append(cap);
  }
  fig.addEventListener("click", () => {
    if (fig.dataset.missing) return;
    openLightbox(p);
  });
  return fig;
}

// hero
$("herName").textContent = CONFIG.herName;
let i = 0;
const sub = CONFIG.subtitle;
(function type() {
  $("herSub").textContent = sub.slice(0, i++);
  if (i <= sub.length) setTimeout(type, 45);
})();

// first photo
$("firstCaption").textContent = "";
const firstEl = photoCard(CONFIG.first, "big reveal");
$("firstPhoto").replaceWith(firstEl);
firstEl.id = "firstPhoto";
$("firstCaption").textContent = CONFIG.first.intro;

// together
CONFIG.together.forEach((p) => $("togetherGrid").append(photoCard(p)));

// events
CONFIG.events.forEach((ev) => {
  const wrap = document.createElement("div");
  wrap.className = "event reveal";
  wrap.innerHTML = `<h3></h3><p class="note"></p><div class="grid"></div>`;
  wrap.querySelector("h3").textContent = ev.title;
  wrap.querySelector(".note").textContent = ev.note;
  ev.photos.forEach((p) => wrap.querySelector(".grid").append(photoCard(p)));
  $("events").append(wrap);
});

// letter
CONFIG.letter.forEach((t) => {
  const p = document.createElement("p");
  p.textContent = fill(t);
  $("letter").append(p);
});
const sign = document.createElement("p");
sign.className = "sign";
sign.innerHTML = CONFIG.signature.split("\n").map((l) => l.replace(/</g, "&lt;")).join("<br>");
$("letter").append(sign);

// floating hearts
const symbols = ["💗", "💖", "💕", "🌸", "🎈", "🎀", "🎂", "🩷"];
for (let n = 0; n < 18; n++) {
  const f = document.createElement("span");
  f.className = "floater";
  f.textContent = symbols[n % symbols.length];
  f.style.left = Math.random() * 100 + "%";
  f.style.fontSize = 14 + Math.random() * 22 + "px";
  f.style.animationDuration = 9 + Math.random() * 10 + "s";
  f.style.animationDelay = -Math.random() * 15 + "s";
  $("floaters").append(f);
}

// scroll reveal
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("show"), io.unobserve(e.target))),
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// lightbox
function openLightbox(p) {
  $("lbImg").src = p.src;
  $("lbCap").textContent = p.caption || "";
  $("lightbox").classList.add("open");
}
$("lightbox").addEventListener("click", () => $("lightbox").classList.remove("open"));
document.addEventListener("keydown", (e) => e.key === "Escape" && $("lightbox").classList.remove("open"));

// finale surprise
$("surprise").addEventListener("click", () => {
  $("cake").classList.add("out");
  $("finaleMsg").textContent = fill(CONFIG.finale);
  for (let n = 0; n < 60; n++) {
    const c = document.createElement("span");
    c.className = "confetti";
    c.textContent = symbols[n % symbols.length];
    c.style.left = Math.random() * 100 + "vw";
    c.style.fontSize = 18 + Math.random() * 24 + "px";
    c.style.animationDuration = 2.5 + Math.random() * 3 + "s";
    c.style.animationDelay = Math.random() * 1.2 + "s";
    document.body.append(c);
    setTimeout(() => c.remove(), 7500);
  }
});
