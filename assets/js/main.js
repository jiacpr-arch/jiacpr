/* ============================================================
   JiaCPR — สคริปต์หลัก
   1) เมนูมือถือ
   2) ปุ่ม LINE อัตโนมัติ: ทุก element ที่มี data-line-msg จะกลายเป็น
      ลิงก์เปิดแชท LINE @jiacpr พร้อมข้อความพิมพ์รอไว้ให้ลูกค้า
   3) ตารางรอบอบรมจาก assets/data/schedule.json
   4) PostHog: นับคลิกปุ่ม LINE/โทร เพื่อวัดว่าคอร์สไหนสร้างลูกค้ามากสุด
   ============================================================ */

(function () {
  "use strict";

  var LINE_ID = "@jiacpr";
  var LINE_CHAT_URL = "https://line.me/R/ti/p/" + encodeURIComponent(LINE_ID);
  var LINE_MSG_BASE = "https://line.me/R/oaMessage/" + encodeURIComponent(LINE_ID) + "/?";

  /* ---------- 1) เมนูมือถือ ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- 2) ลิงก์ LINE พร้อมข้อความอัตโนมัติ ---------- */
  document.querySelectorAll("[data-line-msg]").forEach(function (el) {
    var msg = (el.getAttribute("data-line-msg") || "").trim();
    var suffix = " (ติดต่อจากหน้าเว็บ)";
    el.setAttribute("href", msg ? LINE_MSG_BASE + encodeURIComponent(msg + suffix) : LINE_CHAT_URL);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  /* ---------- 3) ตารางรอบอบรม ---------- */
  var scheduleBody = document.querySelector("[data-schedule-body]");
  if (scheduleBody) {
    var filterCourse = scheduleBody.getAttribute("data-course-filter") || "";
    var base = scheduleBody.getAttribute("data-base") || "assets/data/schedule.json";
    fetch(base)
      .then(function (r) { return r.json(); })
      .then(function (rows) {
        var list = rows.filter(function (r) {
          return !filterCourse || r.course === filterCourse;
        });
        if (!list.length) {
          scheduleBody.innerHTML =
            '<tr><td colspan="5">ยังไม่มีรอบเปิดรับสมัครในขณะนี้ — สอบถามรอบถัดไปทาง LINE ' + LINE_ID + " ได้เลยครับ</td></tr>";
          return;
        }
        scheduleBody.innerHTML = list.map(renderRow).join("");
        bindLineButtons(scheduleBody);
      })
      .catch(function () {
        scheduleBody.innerHTML =
          '<tr><td colspan="5">โหลดตารางไม่สำเร็จ — สอบถามรอบอบรมทาง LINE ' + LINE_ID + " ได้เลยครับ</td></tr>";
      });
  }

  function renderRow(r) {
    var badge =
      r.status === "เต็ม"
        ? '<span class="seat-badge full">เต็มแล้ว</span>'
        : r.status === "ใกล้เต็ม"
        ? '<span class="seat-badge few">ใกล้เต็ม</span>'
        : '<span class="seat-badge open">เปิดรับสมัคร</span>';
    var action =
      r.status === "เต็ม"
        ? '<span class="tag">ขอรอบถัดไปทาง LINE</span>'
        : '<a class="btn btn-line btn-sm" data-line-msg="สนใจจองคอร์ส ' +
          escapeHtml(r.courseName) + " รอบวันที่ " + escapeHtml(r.date) + '">จองรอบนี้</a>';
    return (
      "<tr>" +
      "<td><strong>" + escapeHtml(r.date) + "</strong><br><small>" + escapeHtml(r.time || "") + "</small></td>" +
      "<td>" + escapeHtml(r.courseName) + "</td>" +
      "<td>" + escapeHtml(r.location) + "</td>" +
      "<td>" + badge + "</td>" +
      "<td>" + action + "</td>" +
      "</tr>"
    );
  }

  function bindLineButtons(scope) {
    scope.querySelectorAll("[data-line-msg]").forEach(function (el) {
      if (el.getAttribute("href")) return;
      var msg = (el.getAttribute("data-line-msg") || "").trim();
      el.setAttribute("href", LINE_MSG_BASE + encodeURIComponent(msg + " (ติดต่อจากหน้าเว็บ)"));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- 4) PostHog (วัดผลปุ่มติดต่อ) ---------- */
  /* โค้ดโหลดแบบ async — ถ้าโหลดไม่ได้เว็บทำงานปกติทุกอย่าง */
  try {
    !(function (t, e) {
      var o, n, p, r;
      e.__SV ||
        ((window.posthog = e),
        (e._i = []),
        (e.init = function (i, s, a) {
          function g(t, e) {
            var o = e.split(".");
            2 == o.length && ((t = t[o[0]]), (e = o[1])),
              (t[e] = function () {
                t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
              });
          }
          ((p = t.createElement("script")).type = "text/javascript"),
            (p.crossOrigin = "anonymous"),
            (p.async = !0),
            (p.src = s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js"),
            (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r);
          var u = e;
          for (
            void 0 !== a ? (u = e[a] = []) : (a = "posthog"),
              u.people = u.people || [],
              u.toString = function (t) {
                var e = "posthog";
                return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e;
              },
              u.people.toString = function () {
                return u.toString(1) + ".people (stub)";
              },
              o = "init capture register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset".split(" "),
              n = 0;
            n < o.length;
            n++
          )
            g(u, o[n]);
          e._i.push([i, s, a]);
        }),
        (e.__SV = 1));
    })(document, window.posthog || []);
    window.posthog.init("phc_zYMrFeM7HEGEBUdgeyixzNw24pt5XUom38QAAJfAwgLr", {
      api_host: "https://us.i.posthog.com",
      defaults: "2025-05-24",
    });
  } catch (e) {
    /* วิเคราะห์ล่มก็ไม่กระทบเว็บ */
  }

  document.addEventListener("click", function (ev) {
    var a = ev.target.closest ? ev.target.closest("a") : null;
    if (!a || !window.posthog || !window.posthog.capture) return;
    var href = a.getAttribute("href") || "";
    try {
      if (href.indexOf("line.me") !== -1) {
        window.posthog.capture("line_click", {
          message: a.getAttribute("data-line-msg") || "(แชทเปล่า)",
          page: location.pathname,
        });
      } else if (href.indexOf("tel:") === 0) {
        window.posthog.capture("call_click", { number: href.slice(4), page: location.pathname });
      }
    } catch (e) { /* ignore */ }
  });

  /* ---------- ปีปัจจุบันในฟุตเตอร์ ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
