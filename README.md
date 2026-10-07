# Penerbit Tera

Website statis HTML, CSS, dan JavaScript. Tidak memerlukan npm atau build.

## Upload GitHub

Upload ISI folder ini ke akar repository: index.html, vercel.json, semua HTML/CSS/JS, dan folder Assets.
Jangan membungkus isi ini dalam subfolder penerbit tera di repository.

## Vercel

- Framework Preset: Other
- Root Directory: kosong/default
- Build Command: kosong
- Install Command: kosong
- Output Directory: . (satu titik)

vercel.json sudah menyediakan konfigurasi di atas.
Jika memakai proyek Vercel lama, hapus atau ubah override Output Directory lama menjadi satu titik.
Deploy commit terbaru yang berisi file ini. Setelah Ready, buka melalui Visit.

## Pemeriksaan

index.html tersedia di akar folder.
Referensi file lokal HTML/CSS sudah diperiksa.
Referensi gambar assets/problem-bg.png yang tidak tersedia di CSS cadangan diganti dengan background-image: none.
Layanan eksternal seperti Google Fonts, WhatsApp, dan tautan toko memerlukan koneksi internet.
