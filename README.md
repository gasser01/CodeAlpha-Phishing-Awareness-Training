# 🛡️ PhishGuard — Phishing Awareness Training

> **CodeAlpha Cyber Security Internship — Task 2**

An **interactive, browser-based phishing-awareness training module**. It teaches
users to recognise phishing emails, spot fake websites and see through
social-engineering tricks — then tests them with a scored, instant-feedback quiz.

Built with **vanilla HTML, CSS & JavaScript** — no frameworks, no build step, no
tracking. Just open `index.html` and start.

---

## 📑 Table of Contents

- [Highlights](#-highlights)
- [What the module covers](#-what-the-module-covers)
- [Screenshots](#-screenshots)
- [How to run](#-how-to-run)
- [Project structure](#-project-structure)
- [Interactive features](#-interactive-features)
- [Customising the content](#-customising-the-content)
- [Accessibility & compatibility](#-accessibility--compatibility)
- [Educational disclaimer](#-educational-disclaimer)

---

## ✨ Highlights

| | Feature |
|---|---|
| 🎓 | A complete **8-section training module** in one page |
| 🖱️ | **Interactive "dissect a phishing email"** — click the 6 red flags to reveal them |
| 🔗 | A **fake-URL lab** that teaches you to read links right-to-left |
| 🧠 | The **six psychological levers** attackers pull, named and explained |
| 🕰️ | A **timeline of real-world breaches** (Target, Twitter, Uber, $100M BEC…) |
| ✅ | A clear **Do / Don't best-practices** checklist |
| 📝 | A **10-question quiz** with per-answer feedback, scoring and a result screen |
| 📱 | **Fully responsive** + animated, with a reduced-motion fallback |
| 🚫 | **Zero dependencies** — runs offline, nothing to install |

---

## 📚 What the module covers

The task brief asks the module to *"explain how to recognise phishing emails and
fake websites, educate about social-engineering tactics, provide best practices,
and include real-world examples and interactive quizzes."* Each is a dedicated section:

1. **The basics** — what phishing is and the lure → hook → catch → payday lifecycle.
2. **Types of phishing** — email, spear, whaling, smishing, vishing, BEC, clone, angler.
3. **Spot the email** *(interactive)* — a realistic phishing email you dissect flag by flag.
4. **Fake websites** — typosquatting, subdomain tricks, punycode homographs, the padlock myth.
5. **Social-engineering tactics** — urgency, fear, authority, greed, trust, curiosity.
6. **Real-world cases** — a timeline of famous, costly phishing attacks.
7. **Best practices** — an actionable Do / Don't checklist and the one rule to remember.
8. **Quiz** — 10 scenario questions that test recognition, not memorisation.

---

## 🖼️ Screenshots

> Open `index.html` to see it live. (Add screenshots to a `docs/` folder and link
> them here, e.g. `![Home](docs/home.png)`.)

- **Hero** with animated statistics
- **Interactive email dissector** with a live red-flag counter ring
- **Fake-URL lab** comparing real vs. malicious links
- **Quiz** with instant feedback and a final score ring

---

## 🚀 How to run

No installation, no server, no internet required.

**Option A — just open it**

```text
Double-click  index.html   (opens in your default browser)
```

**Option B — serve it locally** (recommended for the smoothest fonts/animations):

```bash
# from inside the Task2 folder
python -m http.server 8000
# then visit http://localhost:8000
```

That's it. The only external resource is Google Fonts; the module works fully
offline (the browser falls back to system fonts).

---

## 📂 Project structure

```
.
├── index.html              # the entire training module (8 sections + quiz mount)
├── assets/
│   ├── css/
│   │   └── style.css        # dark "cyber" theme, responsive, animations
│   └── js/
│       ├── app.js           # nav, scroll progress, reveal, stats, email dissector
│       └── quiz.js          # the 10-question quiz engine + question bank
└── README.md
```

---

## 🧩 Interactive features

| Feature | File | What it does |
|---------|------|--------------|
| **Email dissector** | `app.js` | Click each highlighted phrase in the sample email; a tooltip explains the red flag, a ring tracks `found / 6`, and the verdict unlocks at 100%. |
| **Quiz engine** | `quiz.js` | Renders one question at a time, locks options on answer, shows why each is right/wrong, tracks score, and ends on a graded result screen with a retake button. |
| **Scroll progress** | `app.js` | A gradient bar under the nav fills as you read. |
| **Reveal-on-scroll** | `app.js` | Sections fade/slide in via `IntersectionObserver`. |
| **Animated stats** | `app.js` | Hero numbers count up when they enter the viewport. |

All state lives in memory — nothing is sent anywhere, and there is no backend.

---

## 🛠️ Customising the content

- **Quiz questions** live in the `QUESTIONS` array at the top of
  [`assets/js/quiz.js`](assets/js/quiz.js). Each entry has `q`, `options`,
  `answer` (0-based index) and `why`. Add or edit freely — the engine adapts to
  any number of questions.
- **Email red flags** are plain `<span class="flag" data-flag="…" data-tip="…">`
  elements in [`index.html`](index.html). Add a span with those attributes and it
  becomes clickable automatically; update the count in the `#flagTotal` label.
- **Theme colours** are CSS variables at the top of
  [`assets/css/style.css`](assets/css/style.css) (`--brand`, `--danger`, etc.).

---

## ♿ Accessibility & compatibility

- Semantic HTML, keyboard-operable buttons, and visible focus on the quiz "Next" button.
- Respects **`prefers-reduced-motion`** (disables animations for those who ask).
- Responsive from ~320px phones up to large desktops; a collapsible mobile menu.
- Works in all modern browsers (Chrome, Edge, Firefox, Safari). No polyfills needed.

---

## ⚖️ Educational disclaimer

> This module is for **security awareness and education only**. The example emails,
> URLs and brand names shown are **fabricated for training purposes** and do not
> represent real messages from those companies. Built as part of the **CodeAlpha
> Cyber Security Internship — Task 2**.
