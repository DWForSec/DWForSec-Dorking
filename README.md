# DWForSec-Dorking

> **Automated Google Dorking Workspace untuk Security Researchers & Bug Bounty Hunters**

**DWForSec-Dorking** adalah platform workspace reconnaissance & Google dorking modern, interaktif, dan fully client-side yang dirancang khusus untuk mempermudah pekerjaan offensive security engineer. Cukup masukkan domain target, pilih kategori pencarian kerentanan, dan biarkan aplikasi mengotomatiskan query pencarian lanjutan langsung ke Google Search.

---

## 🚀 Fitur Utama

*   **Cyber Dark UI**: Antarmuka modern bertema sci-fi/cyberpunk dengan efek pendaran neon, glassmorphism, dan transisi halus menggunakan Framer Motion.
*   **13 Dorking Categories**: Dilengkapi dengan lebih dari 200+ dork payloads taktis yang sangat realistis untuk penemuan kebocoran data.
*   **Smart Domain Normalization**: Secara otomatis membersihkan URL kotor (misalnya `https://sub.domain.com/path?query=true`) menjadi domain bersih `sub.domain.com`.
*   **Direct & Fallback Launcher**: Membuka tab Google Search secara otomatis untuk seluruh dork terpilih atau menyediakan link manual apabila diblokir oleh peramban (Popup Blocker).
*   **Interactive Counter & Preview**: Menyediakan statistik dork terpilih secara instan, salin massal (*Copy All*), serta tinjauan langsung (*live preview*) sebelum dieksekusi.
*   **Severity Indicators**: Visualisasi tingkat keparahan risiko dork (Critical, High, Medium, Low) dengan indikator warna neon.
*   **Keamanan Data 100%**: Tanpa backend, seluruh data domain dan query diproses langsung di peramban lokal Anda.

---

## 🛠️ Tech Stack & Kompatibilitas

*   **Framework**: React + Vite (Dikonfigurasi dengan **Vite 5** untuk stabilitas penuh)
*   **Styling**: **Tailwind CSS v3** + PostCSS (Kompatibel dengan semua browser)
*   **Animasi**: Framer Motion
*   **Ikon**: Lucide React
*   **Kompatibilitas**: Node.js versi `20.13.1` ke atas

---

## 📦 Struktur Repositori

```text
src/
 ├── components/
 │    ├── Header.jsx            # Judul workspace, badge fitur, & safety warning
 │    ├── DomainInput.jsx       # Input target domain, normalizer otomatis & status
 │    ├── DorkCategoryGrid.jsx  # Grid kartu kategori dork + badge tingkat keparahan
 │    ├── QueryPreview.jsx      # Panel Preview, Copy, Launch & Fallback link
 │    └── Footer.jsx            # Branding footer
 ├── data/
 │    └── dorkCategories.js     # Pusat payload dork lengkap (13 kategori)
 ├── utils/
 │    ├── normalizeDomain.js    # Utilitas pembersih input URL & regex validator
 │    └── buildGoogleUrl.js     # Penyusun string kueri Google & URL Encoder
 ├── App.jsx                   # Pengendali utama alur aplikasi & state
 └── main.jsx                  # React DOM entrypoint
```

---

## 💻 Panduan Instalasi & Menjalankan Projek

Ikuti langkah-langkah berikut untuk menjalankan workspace di komputer lokal Anda:

### 1. Prasyarat
Pastikan Anda sudah menginstal **Node.js** (versi >= 20.13) dan **npm** di komputer Anda.

### 2. Kloning & Persiapan Direktori
Buka terminal/shell dan masuk ke folder projek:
```bash
# Masuk ke direktori projek
cd "DWForSec-Dorking"
```

### 3. Menginstal Dependensi
Pasang semua dependensi yang diperlukan:
```bash
npm install
```

### 4. Menjalankan Server Pengembangan (Local Dev Server)
Jalankan perintah berikut untuk mengaktifkan hot-reloading server:
```bash
npm run dev
```
Buka browser Anda dan kunjungi **`http://localhost:5173`** untuk mulai menggunakan workspace.

### 5. Membangun Aplikasi untuk Produksi (Production Build)
Untuk mengompilasi dan mengoptimalkan seluruh aset untuk di-deploy ke hosting statis (seperti GitHub Pages, Vercel, Netlify):
```bash
npm run build
```
Hasil build akan berada di dalam direktori `dist/`.

---

## 📖 Tutorial Lengkap Cara Menggunakan Workspace

Ikuti panduan langkah demi langkah berikut untuk memaksimalkan efisiensi pengintaian target Anda:

### Langkah 1: Memasukkan Domain Target
1. Pada input bertuliskan **Target Domain**, masukkan alamat target Anda.
2. **DWForSec-Dorking** memiliki fitur *auto-normalize*. Jika Anda memasukkan:
   * `https://example.com/admin/login.php` $\rightarrow$ otomatis dikonversi menjadi `example.com`
   * `http://api.staging.target.id:8080/v1` $\rightarrow$ otomatis dikonversi menjadi `api.staging.target.id`
3. Jika domain yang dimasukkan tidak valid, sistem akan menampilkan notifikasi kesalahan berwarna merah untuk mencegah kesalahan kueri.

### Langkah 2: Memilih Kategori Dorking
Pilih modul pencarian yang ingin digunakan pada grid kategori. Anda dapat mencentang kartu kategori satu per satu atau menggunakan tombol pintasan cepat:
*   **Select All**: Mencentang seluruh 13 kategori secara instan (menghasilkan ~200 dork).
*   **Clear All**: Mengosongkan seluruh pilihan dalam sekali klik.

*Setiap kartu akan menampilkan jumlah dork spesifik di dalamnya serta tingkat keparahan (severity) untuk mengarahkan prioritas temuan Anda.*

### Langkah 3: Meninjau Kueri (Preview) & Salin (Copy All)
*   **Tombol Preview**: Klik untuk memperluas area kueri monospaced. Anda dapat melihat dengan tepat teks kueri pencarian Google yang telah diformat dengan domain target Anda.
*   **Tombol Copy All**: Klik untuk langsung menyalin seluruh kueri pencarian yang aktif ke clipboard sistem Anda. Ini sangat berguna jika Anda ingin menyimpannya ke laporan bug bounty atau memprosesnya menggunakan program eksternal.

### Langkah 4: Meluncurkan Dork ke Google Search
1. Klik tombol neon biru bertuliskan **Generate Dorks** (atau tekan **Enter** di keyboard saat kursor berada di kotak input domain).
2. Peramban lokal Anda akan secara otomatis mencoba membuka tab baru untuk setiap kueri Google Dorking yang Anda pilih.

### ⚠️ Mengatasi Masalah Pemblokiran Tab (Popup Blocker)
Karena peramban modern (seperti Chrome, Firefox, Safari) melarang pembukaan puluhan tab baru secara massal demi keamanan, browser Anda kemungkinan akan memblokir popup tersebut saat pertama kali diklik.

**Cara mengatasinya di DWForSec-Dorking:**
1. Aplikasi akan mendeteksi pemblokiran secara instan dan menampilkan kotak peringatan **"Popup Blocked — Click links manually"** berwarna kuning.
2. Seluruh kueri Google Dorking yang terpilih akan disajikan dalam bentuk daftar tautan (*clickable links*) berikon `ExternalLink`.
3. Anda cukup mengeklik tautan tersebut secara manual di layar satu per satu untuk membuka pencarian Google di tab baru dengan cepat tanpa ada yang terlewat!

---

## 🛡️ Daftar 13 Kategori Dorking & Kegunaannya

| Kategori | Tingkat Risiko | Deskripsi Pengintaian |
| :--- | :--- | :--- |
| **Error Pages** | 🟡 Medium | Mendeteksi stack trace, pesan peringatan, atau error sistem yang membocorkan path backend. |
| **Database Files** | 🔴 Critical | Mencari dump database `.sql`, `.db`, sqlite, atau panel phpMyAdmin yang terekspos publik. |
| **Backup Files** | 🟠 High | Menemukan arsip cadangan lama seperti `.zip`, `.tar.gz`, `.bak`, `.old`, atau cadangan database. |
| **Config Files** | 🔴 Critical | Mencari file konfigurasi sensitif seperti `.env`, `wp-config.php`, token AWS, atau database credentials. |
| **Admin & Login Panels** | 🟠 High | Memetakan halaman login administrator, cPanel, SSO, konsol kontrol, atau gerbang login internal. |
| **Directory Listing** | 🟡 Medium | Menemukan folder server terbuka (*Index of /*) yang membiarkan file statis diunduh secara bebas. |
| **API Endpoints** | 🟠 High | Melacak dokumentasi Swagger/OpenAPI, endpoint GraphQL, silsilah API `/api/v1/`, atau webhooks. |
| **Exposed Git** | 🔴 Critical | Menemukan direktori `.git` yang terekspos untuk mengunduh seluruh source code aplikasi backend. |
| **Logs** | 🟡 Medium | Melacak file pencatatan audit, file `access.log`, `error.log`, yang dapat membocorkan kredensial user. |
| **Sensitive Keywords** | 🔴 Critical | Menelusuri kunci privat SSH/RSA, token JWT, Stripe Live keys, Github API keys, atau JDBC strings. |
| **Cloud Storage** | 🟠 High | Menemukan bucket AWS S3 publik yang tidak terlindungi, Azure Blobs, atau Google Cloud Storage. |
| **Public Documents** | 🟡 Medium | Menyaring file dokumen resmi seperti `.pdf`, `.docx`, `.xlsx` yang mengandung data sensitif atau metadata internal. |
| **Development Files** | 🟠 High | Melacak source code mentah, phpinfo, lingkungan staging/dev, sandbox, map files, atau robots.txt. |

---

## ⚠️ Peringatan Keamanan & Penafian Hukum

**Gunakan hanya pada aset yang Anda miliki atau yang berwenang untuk diuji.**

Aplikasi ini dibuat murni untuk tujuan pendidikan, penelitian keamanan siber terorisasi, audit infrastruktur internal, dan program *responsible bug bounty*. Penggunaan Google Dorking secara tidak bertanggung jawab atau tanpa izin terhadap sistem pihak ketiga adalah ilegal dan melanggar hukum. Pengembang tidak bertanggung jawab atas segala konsekuensi penyalahgunaan alat ini.

---

## 📝 Lisensi
Didistribusikan di bawah lisensi MIT. Dibuat dengan 💻 & ⚡ oleh **DWForSec**.
