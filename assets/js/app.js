/* =========================================================
   PhishGuard Training — interactions
   CodeAlpha Cyber Security Internship · Task 2
   Handles: mobile nav, scroll progress, reveal-on-scroll,
   animated stats, and the interactive phishing-email dissector.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  /* ---------- Scroll progress bar ---------- */
  const progress = document.getElementById("navProgress");
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (progress) progress.style.width = pct + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal sections on scroll ---------- */
  document.querySelectorAll(".section").forEach((s) => s.setAttribute("data-reveal", ""));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

  /* ---------- Animated hero stats ---------- */
  const counters = document.querySelectorAll(".stat__num");
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = (el.dataset.count.split(".")[1] || "").length;
    const dur = 1200;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals);
    };
    requestAnimationFrame(tick);
  };
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCount(e.target);
          statObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => statObserver.observe(c));

  /* ---------- Interactive phishing-email dissector ---------- */
  const flags = Array.from(document.querySelectorAll(".flag"));
  const ring = document.getElementById("ring");
  const ringText = document.getElementById("ringText");
  const log = document.getElementById("flagLog");
  const verdict = document.getElementById("verdict");
  const total = flags.length;
  const tip = document.createElement("div");
  tip.className = "flag-tip";
  document.body.appendChild(tip);
  let found = 0;

  const flagLabels = {
    from: "Suspicious sender address",
    to: "Mass-sent / hidden recipients",
    subject: "Manufactured urgency",
    greeting: "Generic greeting",
    link: "Deceptive / mismatched link",
    threat: "Threat & pressure",
  };

  const showTip = (el) => {
    tip.textContent = el.dataset.tip;
    const r = el.getBoundingClientRect();
    tip.classList.add("show");
    const tw = tip.offsetWidth;
    let left = r.left + r.width / 2 - tw / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - tw - 12));
    let top = r.bottom + 10;
    if (top + tip.offsetHeight > window.innerHeight - 12) top = r.top - tip.offsetHeight - 10;
    tip.style.left = left + "px";
    tip.style.top = top + "px";
  };
  const hideTip = () => tip.classList.remove("show");

  flags.forEach((flag) => {
    flag.addEventListener("mouseenter", () => showTip(flag));
    flag.addEventListener("mouseleave", hideTip);
    flag.addEventListener("click", () => {
      showTip(flag);
      if (flag.classList.contains("found")) return;
      flag.classList.add("found");
      found++;

      // first click clears the placeholder
      const placeholder = log.querySelector(".muted");
      if (placeholder) placeholder.remove();

      const li = document.createElement("li");
      const key = flag.dataset.flag;
      li.innerHTML = "&#9873; <b>" + (flagLabels[key] || "Red flag") + "</b>";
      log.appendChild(li);

      // update ring
      const deg = (found / total) * 360;
      ring.style.background =
        "radial-gradient(closest-side, var(--panel) 79%, transparent 80%)," +
        "conic-gradient(var(--brand) " + deg + "deg, var(--line) 0deg)";
      ringText.textContent = found + "/" + total;

      if (found === total && verdict) {
        verdict.hidden = false;
        verdict.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  });

  // reposition/hide tooltip on scroll
  window.addEventListener("scroll", hideTip, { passive: true });
})();
