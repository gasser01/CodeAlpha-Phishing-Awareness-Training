/* =========================================================
   PhishGuard Training — interactive quiz
   CodeAlpha Cyber Security Internship · Task 2
   A self-contained 10-question quiz with instant per-answer
   feedback, a progress bar, scoring and a result screen.
   ========================================================= */
(function () {
  "use strict";

  const QUESTIONS = [
    {
      q: "An email from \"IT Support\" says your password expires in 1 hour and links you to a login page. What's the safest first move?",
      options: [
        "Click the link quickly so you don't get locked out",
        "Stop, and log in by typing the company portal address yourself",
        "Reply asking if the email is genuine",
        "Forward it to a colleague to click first",
      ],
      answer: 1,
      why: "Never trust a link in an unexpected email. Go directly to the site you already know, and verify through a channel you trust. Urgency is the attacker's tool.",
    },
    {
      q: "Which sender address is the clearest sign of a fake \"Microsoft\" email?",
      options: [
        "no-reply@microsoft.com",
        "account@accounts.microsoft.com",
        "support@micros0ft-security.com",
        "ms-team@microsoft.com",
      ],
      answer: 2,
      why: "\"micros0ft\" uses a zero for the 'o' and bolts on extra words — classic look-alike (typosquatting) domain. The real registered domain matters, not the display name.",
    },
    {
      q: "Reading right-to-left, which of these links actually goes to a non-PayPal site?",
      options: [
        "https://www.paypal.com/signin",
        "https://paypal.com.account-verify.net/login",
        "https://paypal.com/myaccount/summary",
        "https://history.paypal.com",
      ],
      answer: 1,
      why: "The real domain is the part just before the first single slash: here that's account-verify.net. \"paypal.com\" is only a subdomain dressed up to fool you.",
    },
    {
      q: "A &#128274; HTTPS padlock in the address bar means the website is...",
      options: [
        "Verified as the real, trustworthy company",
        "Safe to enter your password on",
        "Only using an encrypted connection — nothing about honesty",
        "Approved by your bank",
      ],
      answer: 2,
      why: "The padlock only means traffic is encrypted. Most phishing sites use HTTPS too. It is not a trust badge for the site's identity.",
    },
    {
      q: "What is \"spear phishing\"?",
      options: [
        "Phishing sent to millions of random people",
        "A targeted attack crafted for a specific person using details about them",
        "Phishing done only over the phone",
        "A phishing email with an attachment",
      ],
      answer: 1,
      why: "Spear phishing is personalised — it uses your name, role, employer or interests (often from social media or leaks) to look convincing.",
    },
    {
      q: "You get a text: \"Your parcel is held — pay a $1.99 fee: bit.ly/xz9.\" This is an example of...",
      options: ["Whaling", "Smishing", "Vishing", "Clone phishing"],
      answer: 1,
      why: "Phishing by SMS is called smishing. The tiny fee and shortened link hiding the real destination are giveaways. Carriers and couriers don't collect fees this way.",
    },
    {
      q: "Your phone keeps buzzing with MFA approval prompts you didn't request. What should you do?",
      options: [
        "Approve one to make them stop",
        "Deny them and report it — someone has your password and is trying to get in",
        "Ignore it; MFA prompts are harmless",
        "Approve only if the app looks official",
      ],
      answer: 1,
      why: "This is \"MFA fatigue.\" Repeated prompts mean an attacker already has your password and is hoping you'll tap Approve. Deny every prompt and report it immediately.",
    },
    {
      q: "Which request in an email is the biggest red flag of a Business Email Compromise (BEC) scam?",
      options: [
        "\"Here are the meeting notes from yesterday.\"",
        "\"The CEO needs an urgent wire transfer to a new account — keep it confidential.\"",
        "\"Please review the shared calendar.\"",
        "\"Lunch is moved to 1 PM.\"",
      ],
      answer: 1,
      why: "Urgency + secrecy + payment to a new account, impersonating an executive, is the textbook BEC pattern. Always verify payment changes by phone using a known number.",
    },
    {
      q: "What does a password manager do that helps protect you from phishing?",
      options: [
        "It blocks all spam emails",
        "It won't auto-fill your login on a look-alike (wrong) domain",
        "It scans attachments for viruses",
        "It makes your passwords shorter and easier",
      ],
      answer: 1,
      why: "A password manager matches credentials to the exact domain. If it refuses to autofill, that's a strong hint you're on a fake site — a built-in alarm.",
    },
    {
      q: "You realise you just entered your work password on a site that turned out to be fake. Best response?",
      options: [
        "Say nothing and hope it's fine",
        "Wait to see if anything bad happens",
        "Immediately change the password and report it to your security/IT team",
        "Only change it if you notice suspicious activity",
      ],
      answer: 2,
      why: "Speed limits the damage. Change the password right away (and anywhere it was reused), enable MFA, and report it so the team can watch for misuse. Reporting is never embarrassing — it's responsible.",
    },
  ];

  const root = document.getElementById("quizApp");
  if (!root) return;

  const LETTERS = ["A", "B", "C", "D"];
  let current = 0;
  let score = 0;
  let locked = false;

  function renderQuestion() {
    locked = false;
    const item = QUESTIONS[current];
    const pct = (current / QUESTIONS.length) * 100;

    root.innerHTML = `
      <div class="quiz__bar"><span style="width:${pct}%"></span></div>
      <div class="quiz__count">
        <span>Question ${current + 1} of ${QUESTIONS.length}</span>
        <span>Score: ${score}</span>
      </div>
      <h3 class="quiz__q">${item.q}</h3>
      <div class="quiz__options" id="opts"></div>
      <div class="quiz__feedback" id="fb"></div>
      <div class="quiz__next" id="nextWrap" style="display:none">
        <button class="btn btn--primary" id="nextBtn">
          ${current === QUESTIONS.length - 1 ? "See my result &rarr;" : "Next question &rarr;"}
        </button>
      </div>
    `;

    const opts = document.getElementById("opts");
    item.options.forEach((text, i) => {
      const btn = document.createElement("button");
      btn.className = "quiz__opt";
      btn.innerHTML = `<span class="key">${LETTERS[i]}</span><span>${text}</span>`;
      btn.addEventListener("click", () => choose(i, btn, item));
      opts.appendChild(btn);
    });
  }

  function choose(i, btn, item) {
    if (locked) return;
    locked = true;
    const buttons = Array.from(document.querySelectorAll(".quiz__opt"));
    buttons.forEach((b) => (b.disabled = true));

    const correct = i === item.answer;
    if (correct) score++;
    btn.classList.add(correct ? "correct" : "wrong");
    if (!correct) buttons[item.answer].classList.add("correct");

    const fb = document.getElementById("fb");
    fb.classList.add("show", correct ? "ok" : "no");
    fb.innerHTML =
      (correct ? "<b>&#9989; Correct.</b> " : "<b>&#10060; Not quite.</b> ") + item.why;

    document.getElementById("nextWrap").style.display = "block";
    const nextBtn = document.getElementById("nextBtn");
    nextBtn.focus();
    nextBtn.addEventListener("click", () => {
      current++;
      if (current < QUESTIONS.length) renderQuestion();
      else renderResult();
    });
  }

  function renderResult() {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    let verdict, blurb;
    if (pct === 100) {
      verdict = "&#127942; Phishing-proof!";
      blurb = "A perfect score. You can spot the bait every time — now help your team do the same.";
    } else if (pct >= 70) {
      verdict = "&#128737; Well defended";
      blurb = "Strong instincts. Review the few you missed and you'll be bulletproof.";
    } else if (pct >= 40) {
      verdict = "&#9888; Stay alert";
      blurb = "You caught some, but attackers only need one slip. Revisit the lessons above.";
    } else {
      verdict = "&#127907; Easy to hook";
      blurb = "Don't worry — that's what training is for. Re-read the sections and try again.";
    }

    root.innerHTML = `
      <div class="quiz__result">
        <div class="quiz__score-ring" style="--pct:${pct}%">
          <div><b>${score}/${QUESTIONS.length}</b><br /><span>${pct}%</span></div>
        </div>
        <div class="quiz__verdict">${verdict}</div>
        <p class="quiz__breakdown">${blurb}</p>
        <button class="btn btn--ghost" id="retry">&#8635; Retake the quiz</button>
      </div>
    `;
    document.getElementById("retry").addEventListener("click", () => {
      current = 0;
      score = 0;
      renderQuestion();
      root.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  renderQuestion();
})();
