# เว็บไซต์ JiaCPR — JIA TRAINER CENTER

เว็บไซต์ใหม่ของ [jiacpr.com](https://www.jiacpr.com) แบบ **static HTML** (ไม่มีขั้นตอน build) ออกแบบเป็น Landing ที่ทุกปุ่มพาลูกค้าเข้าแชท **LINE @jiacpr พร้อมข้อความอัตโนมัติ** — ลูกค้าไม่ต้องพิมพ์เอง แอดมินเห็นทันทีว่าสนใจคอร์สไหน

## โครงสร้าง

| ไฟล์ | หน้า |
|---|---|
| `index.html` | หน้าแรก (hero, คอร์สยอดนิยม, ตารางรอบ, รีวิว, FAQ, แผนที่) |
| `course.html` | หลักสูตรทั้งหมด + บริการเสริม |
| `cpr-aed.html` / `bls.html` / `acls.html` | รายละเอียดรายคอร์ส |
| `online.html` | คอร์สออนไลน์ฟรี + วุฒิบัตร |
| `inhouse.html` | อบรมองค์กร In-house + แพ็กเกจ |
| `about.html` / `contact.html` / `terms.html` / `404.html` | หน้าประกอบ |
| `assets/data/schedule.json` | **ตารางรอบอบรม — แก้ไฟล์นี้ไฟล์เดียว ตารางอัปเดตทุกหน้า** |
| `assets/css/main.css` / `assets/js/main.js` | สไตล์และสคริปต์กลาง |

## วิธีแก้ไขที่ใช้บ่อย

### เพิ่ม/แก้รอบอบรม
แก้ `assets/data/schedule.json` (แก้บนเว็บ GitHub จากมือถือได้เลย) — เพิ่ม object ใหม่ตามรูปแบบเดิม:

```json
{
  "date": "เสาร์ 18 ก.ค. 2569",
  "time": "09:00 – 12:30 น.",
  "course": "cpr-aed",           // cpr-aed | bls | acls (ใช้กรองในหน้าคอร์ส)
  "courseName": "CPR & AED บุคคลทั่วไป",
  "location": "The Street รัชดา ชั้น 3",
  "status": "เปิดรับสมัคร"        // เปิดรับสมัคร | ใกล้เต็ม | เต็ม
}
```

### แก้ราคา/เนื้อหา
ค้นหาคำว่า `TODO` ในไฟล์ HTML — ทุกจุดที่เป็นตัวเลข/ข้อมูลที่ต้องยืนยัน (ราคา, สถิติ, เวลาทำการ, เงื่อนไข) มีคอมเมนต์ `<!-- TODO: ... -->` กำกับไว้

### ปุ่ม LINE พร้อมข้อความอัตโนมัติ
ปุ่มไหนก็ตามที่มี `data-line-msg="ข้อความ"` จะกลายเป็นลิงก์เปิดแชท LINE @jiacpr พร้อมข้อความนั้นโดยอัตโนมัติ (สคริปต์จัดการใน `assets/js/main.js`) — อยากเพิ่มปุ่มใหม่แค่ใส่ attribute นี้

### รูปภาพ
รูปทั้งหมดใน `assets/img/` ตอนนี้เป็น **placeholder** — แทนที่ด้วยรูปจริงชื่อเดิม (หรือแก้ `src` ในหน้า HTML) แนะนำ:
- `og-cover.png` — รูปตอนแชร์ลิงก์ (1200×630)
- `ph-*.svg` — รูปการ์ดคอร์ส (สัดส่วน 16:9)
- `hero-cpr.svg` — รูปใหญ่หน้าแรก

## การวัดผลและแท็กโฆษณา

**PostHog** (`assets/js/main.js`) — ทุกคลิกปุ่ม LINE และปุ่มโทรถูกส่งเป็น event `line_click` / `call_click` พร้อมระบุหน้าและข้อความของปุ่ม → ดูได้ว่าคอร์สไหนสร้าง lead มากที่สุด

**แท็กเดิมจาก jiacpr.com** (`assets/js/tracking.js`) — ยกมาครบชุดเดียวกับเว็บเดิม เพื่อให้ยอด conversion ของโฆษณาไม่ขาดตอนตอนย้ายโดเมน:

| แท็ก | ID |
|---|---|
| Google Analytics 4 | `G-TLM9JTDJF3` |
| Google Ads | `AW-11472746518`, `AW-17937223034` |
| Google Tag Manager | `GTM-K4D98KS6` |
| Meta (Facebook) Pixel | `1103064446544207` |
| LINE Tag | `918927da-c2bf-4ca3-894b-e95d7a4d9a44` |

คลิกปุ่ม LINE/โทร จะยิง event `line_click`/`call_click` เข้า GA4, `Contact` เข้า Meta Pixel และ conversion เข้า LINE Tag → เอาไปตั้งเป็น conversion goal ในแต่ละแพลตฟอร์มได้เลย

นอกจากนี้หน้าแรกมี meta **ยืนยันความเป็นเจ้าของโดเมน** ของ Google Search Console และ Meta Business ยกมาจากเว็บเดิม — **ห้ามลบ** ไม่งั้นสิทธิ์โดเมนหลุดตอนย้ายเว็บ

## Deploy (Vercel)

repo นี้ deploy อัตโนมัติบน Vercel อยู่แล้ว — team **JiaLucksa company** โปรเจกต์ **jiacpr** (ตอนนี้อยู่ที่ `jiacpr.vercel.app`) ทุกครั้งที่ push โค้ดขึ้น `main` Vercel deploy ให้เอง และทุก PR ได้ลิงก์ preview

หมายเหตุ: เปิด `cleanUrls` ไว้ URL จะสวยแบบ `/course` (ลิงก์ `.html` เดิม redirect ให้อัตโนมัติ) และ `vercel.json` มี redirect จาก URL เว็บเดิมทั้งหมดไว้แล้ว (ดูหัวข้อถัดไป)

## ✅ Checklist วันตัดโดเมน jiacpr.com มาเว็บใหม่

> สถานะปัจจุบัน: DNS ของ `jiacpr.com` และ `www.jiacpr.com` ยังชี้ไปเว็บเดิม (MakeWebEasy, IP `147.50.226.13`) — เว็บเดิมยังทำงานปกติจนกว่าจะเปลี่ยน DNS

**ก่อนตัด**
1. อัปเดต `assets/data/schedule.json` ให้เป็นรอบอบรมจริงที่กำลังจะถึง (รอบที่เลยวันแล้วเว็บซ่อนให้อัตโนมัติ ถ้าไม่เหลือรอบเลยตารางจะขึ้นข้อความให้ทัก LINE แทน)
2. ตรวจราคา/เนื้อหาที่ยังเป็นค่าประมาณ (ค้นหา `TODO` ในไฟล์ HTML)
3. เปิด `jiacpr.vercel.app` ทวนหน้าสำคัญให้ครบก่อนตัดจริง

**วันตัด**
4. Vercel → โปรเจกต์ `jiacpr` → Settings → **Domains** → เพิ่ม `www.jiacpr.com` และ `jiacpr.com` (ตั้งให้ `jiacpr.com` redirect ไป `www`)
5. ที่ผู้ให้บริการ domain ตั้ง DNS ตามที่หน้า Domains ของ Vercel แจ้ง (ค่ามาตรฐานคือ `www` → CNAME → `cname.vercel-dns.com` และ root → A → `76.76.21.21` — **ยึดค่าที่ Vercel แสดงเป็นหลัก**)
6. รอ DNS อัปเดต (ปกติไม่กี่นาที–ไม่กี่ชั่วโมง) Vercel จะออกใบรับรอง HTTPS ให้เอง
7. เช็ก redirect ของ URL เดิมว่าไม่ 404 เช่น `https://www.jiacpr.com/pricing`, `/savelife`, `/blog/xxx`

**หลังตัด**
8. Google Search Console → ส่ง `https://www.jiacpr.com/sitemap.xml` ใหม่ และดู Coverage ว่า URL เดิม redirect ถูกต้อง
9. เช็กว่า GA4 / Google Ads / Meta Pixel / LINE Tag ยังเก็บข้อมูลได้ (ดู realtime ของแต่ละแพลตฟอร์ม)
10. **อย่าเพิ่งปิดเว็บเดิมทันที** — เก็บไว้ก่อนอย่างน้อย 1–2 เดือน เผื่อต้องย้อนดูเนื้อหาบทความเดิม

## รันดูในเครื่อง

```bash
python3 -m http.server 8000
# เปิด http://localhost:8000
```
