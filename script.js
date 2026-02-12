const music = document.getElementById("bgMusic");
document.addEventListener("click", () => music.play(), { once: true });

function goStep(n) {
  document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
  document.getElementById("step" + n)?.classList.add("active");
}

// ================= HEARTS =================
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 16 + Math.random() * 18 + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 9000);
}, 350);
// Preload images
const images = ["assets/me.jpg", "assets/him.png"];
images.forEach(src => {
  const img = new Image();
  img.src = src;
});
// ================= PHOTO FLIP =================
let flipped = false;
function flipPhoto() {
  const img = document.getElementById("photo");
  flipped = !flipped;
  img.src = flipped ? "assets/him.png" : "assets/me.jpg";
  document.getElementById("photoHint").innerText =
    flipped ? " Not perfect!😜 but Cute laaa😍😌" : "Tap the photo 💗";
}

// ================= QUIZ =================
const quiz = [
  { q: "Who loves more? ❤️", correct: "you", msg: "Yess 😘 That’s my boy 💖" },
  { q: "Who looks more beautiful? 😍", correct: "you", msg: "Correct 😌 da kanna 💕" },
  { q: "Who is smarter? 🧠", correct: "you", msg: "Obviously ME 😉" },
  { q: "Who cares more? 🫠", correct: "you", msg: "24×7 😏 U Idiot" },

  // ⭐ SPECIAL CASE
  {
    q: "Who is luckier? 🍀",
    correct: "me",
    msg: "Yes 😌❤️ because you have me — I'm your lucky charm 😜"
  }
];

let qi = 0;
let disableNoFlirt = false;

function loadQ() {
  document.getElementById("quizQ").innerText = quiz[qi].q;
  document.getElementById("quizMsg").innerText = "";

  // reset button positions
  document.querySelectorAll("#step5 button").forEach(btn => {
    btn.style.left = "0px";
    btn.style.top = "0px";
  });

  // disable NO-button flirting ONLY for luckier question
  disableNoFlirt = quiz[qi].q.includes("luckier");
}

function quizAnswer(ans) {
  const current = quiz[qi];

  // ⭐ SPECIAL CASE: luckier
  if (current.q.includes("luckier")) {
    if (ans === "me") {
      document.getElementById("quizMsg").innerText = current.msg;

      if (qi === quiz.length - 1) {
        document.getElementById("quizContinue").style.display = "inline-block";
      } else {
        qi++;
        setTimeout(loadQ, 1400);
      }
    } else {
      document.getElementById("quizMsg").innerText =
        "Ahhhh😜, yes I'm also. Try ME once 😉";
    }
    return;
  }

  // NORMAL QUESTIONS
  if (ans === current.correct) {
    document.getElementById("quizMsg").innerText = current.msg;

    if (qi === quiz.length - 1) {
      document.getElementById("quizContinue").style.display = "inline-block";
    } else {
      qi++;
      setTimeout(loadQ, 1400);
    }
  } else {
    document.getElementById("quizMsg").innerText =
      ["Poi solladha 😏", "Wrong answer 😌", "Try again da 😉", "YOU dhaan correct 😏"]
      [Math.floor(Math.random() * 4)];
  }
}

loadQ();

// ================= SECRET =================
const hints = [
  "Nee enna chellama koopdra word😌",
  "Apdi koopdrathu enaku pidikathu 😏",
  "Yeii Athu illa da porikki ",
  "No no no 🙈",
  "I'm disappointed prasath eh 😜💔",
  "Un papa-ku call panni kelu 📞😂"
];
let hi = 0;

function checkSecret() {
  const v = secretInput.value.toLowerCase();
  if (!v) return;

  if (v === "kundhani") {
    document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
    final.classList.add("active");
  } else {
    hint.innerText = hints[hi];
    hi = Math.min(hi + 1, hints.length - 1);
  }
}

// ================= FINAL YES =================
function finalYes() {
  document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
  end.classList.add("active");
}

// ================= NO BUTTON FLIRT =================
document.addEventListener("mouseover", e => {
  if (e.target.classList.contains("no-btn") && !disableNoFlirt) {
    e.target.style.left = Math.random() * 60 - 30 + "px";
    e.target.style.top = Math.random() * 40 - 20 + "px";
  }
});
