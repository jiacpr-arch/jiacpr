/* ============================================================
   JiaCPR — แท็กวัดผล/โฆษณา (ยกมาจากเว็บเดิม jiacpr.com ให้ครบชุดเดิม)
   - Google Analytics 4 : G-TLM9JTDJF3
   - Google Ads         : AW-11472746518, AW-17937223034
   - Google Tag Manager : GTM-K4D98KS6
   - Meta (Facebook) Pixel : 1103064446544207
   - LINE Tag           : 918927da-c2bf-4ca3-894b-e95d7a4d9a44

   ชุดเดียวกับที่เว็บเดิมโหลดอยู่ทุกวันนี้ เพื่อให้ยอด conversion ของ
   โฆษณา Google/Meta/LINE ไม่ขาดตอนตอนย้ายโดเมนมาเว็บใหม่
   (PostHog อยู่ใน main.js แยกต่างหาก)
   ถ้าจะเลิกใช้ตัวไหน ลบทั้งบล็อกของตัวนั้นได้เลย ตัวอื่นทำงานต่อได้ปกติ
   ============================================================ */

(function () {
  "use strict";

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  function loadScript(src) {
    var s = document.createElement("script");
    s.async = true;
    s.src = src;
    var first = document.getElementsByTagName("script")[0];
    first.parentNode.insertBefore(s, first);
  }

  /* ---------- Google Analytics 4 + Google Ads ---------- */
  try {
    loadScript("https://www.googletagmanager.com/gtag/js?id=G-TLM9JTDJF3");
    gtag("js", new Date());
    gtag("config", "G-TLM9JTDJF3");
    gtag("config", "AW-11472746518");
    gtag("config", "AW-17937223034");
  } catch (e) { /* วัดผลล่มไม่กระทบเว็บ */ }

  /* ---------- Google Tag Manager ---------- */
  try {
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    loadScript("https://www.googletagmanager.com/gtm.js?id=GTM-K4D98KS6");
  } catch (e) { /* ignore */ }

  /* ---------- Meta (Facebook) Pixel ---------- */
  try {
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", "1103064446544207");
    window.fbq("track", "PageView");
  } catch (e) { /* ignore */ }

  /* ---------- LINE Tag ---------- */
  try {
    var LINE_TAG_ID = "918927da-c2bf-4ca3-894b-e95d7a4d9a44";
    (function (g, d) {
      g._ltq = g._ltq || [];
      g._lt = g._lt || function () { g._ltq.push(arguments); };
      var h = location.protocol === "https:" ? "https://d.line-scdn.net" : "http://d.line-cdn.net";
      loadScript(h + "/n/line_tag/public/release/v1/lt.js");
    })(window, document);
    window._lt("init", { customerType: "account", tagId: LINE_TAG_ID });
    window._lt("send", "pv", [LINE_TAG_ID]);
  } catch (e) { /* ignore */ }

  /* ---------- ส่ง conversion ตอนคลิกปุ่ม LINE / ปุ่มโทร ----------
     เว็บนี้ไม่มีตะกร้า/เช็คเอาต์ — lead คือการทักแชทหรือโทร
     จึงยิงเป็น event ให้ Google Ads/Meta ใช้ตั้ง conversion ได้ */
  document.addEventListener("click", function (ev) {
    var a = ev.target.closest ? ev.target.closest("a") : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";
    var isLine = href.indexOf("line.me") !== -1;
    var isCall = href.indexOf("tel:") === 0;
    if (!isLine && !isCall) return;
    var label = a.getAttribute("data-line-msg") || (isCall ? "โทร" : "แชท LINE");
    try {
      if (window.gtag) {
        window.gtag("event", isLine ? "line_click" : "call_click", {
          event_category: "contact",
          event_label: label,
          page_path: location.pathname,
        });
      }
      if (window.fbq) window.fbq("track", "Contact", { content_name: label });
      if (window._lt) window._lt("send", "cv", { type: "Conversion" }, ["918927da-c2bf-4ca3-894b-e95d7a4d9a44"]);
    } catch (e) { /* ignore */ }
  });
})();
