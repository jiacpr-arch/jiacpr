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

## การวัดผล (PostHog)
ทุกคลิกปุ่ม LINE และปุ่มโทรถูกส่งเป็น event `line_click` / `call_click` เข้า PostHog โปรเจกต์ของคุณ พร้อมระบุหน้าและข้อความของปุ่ม → ดูได้ว่าคอร์สไหนสร้าง lead มากที่สุด

## Deploy (Vercel — แนะนำ)

repo นี้พร้อม deploy บน Vercel ทันที (มี `vercel.json` แล้ว ไม่ต้องตั้งค่า build):

1. เข้า [vercel.com/new](https://vercel.com/new) (team **JiaLucksa company**)
2. กด **Import** repo `jiacpr-arch/jiacpr`
3. Framework Preset: **Other** — ไม่ต้องใส่ Build Command / Output Directory → กด **Deploy**
4. เสร็จแล้วได้เว็บที่ `jiacpr.vercel.app` — ทุกครั้งที่ push โค้ด Vercel deploy ให้อัตโนมัติ และทุก PR ได้ลิงก์ preview
5. ต่อ domain: Project → Settings → **Domains** → เพิ่ม `jiacpr.com` และ `www.jiacpr.com` แล้วตั้ง DNS ตามที่ Vercel บอก (ง่ายกว่า GitHub Pages)

หมายเหตุ: บน Vercel เปิด `cleanUrls` ไว้ URL จะสวยแบบ `/course` (ลิงก์ `.html` เดิม redirect ให้อัตโนมัติ)

## Deploy (GitHub Pages — ทางเลือกสำรอง)

merge เข้า `main` แล้วระบบ deploy อัตโนมัติผ่าน `.github/workflows/pages.yml`

**ตั้งค่าครั้งแรก (ทำครั้งเดียว):**
1. ไปที่ repo → **Settings → Pages → Source** เลือก **GitHub Actions**
2. เว็บจะออนไลน์ที่ `https://jiacpr-arch.github.io/jiacpr/`

## ✅ Checklist ย้าย domain jiacpr.com (ทำเมื่อพร้อม — เว็บเดิมยังใช้ได้ระหว่างนี้)

1. ตรวจเนื้อหา/ราคา (จุด `TODO`) และใส่รูปจริงให้ครบ
2. Settings → Pages → **Custom domain** ใส่ `www.jiacpr.com` แล้วรอ GitHub ตรวจสอบ
3. ที่ผู้ให้บริการ domain ของคุณ ตั้ง DNS:
   - `www` → CNAME → `jiacpr-arch.github.io`
   - root (`jiacpr.com`) → A records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
4. รอ DNS อัปเดต (อาจถึง 24 ชม.) แล้วติ๊ก **Enforce HTTPS**
5. แก้ URL ใน `sitemap.xml`, `robots.txt` และ `canonical`/`og:url` ในทุกหน้า จาก `https://jiacpr-arch.github.io/jiacpr/` เป็น `https://www.jiacpr.com/` (ค้นหา-แทนที่ทีเดียวทั้งโปรเจกต์)
6. แจ้ง Google Search Console ให้ index เว็บใหม่ เพื่อรักษาอันดับ SEO

## รันดูในเครื่อง

```bash
python3 -m http.server 8000
# เปิด http://localhost:8000
```
