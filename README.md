# StatNusa — Portal Statistik Indonesia

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Mastomy2/best-national-statistics-site-20261126-0539-entry/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Mastomy2/best-national-statistics-site-20261126-0539-entry/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

StatNusa adalah situs statistik nasional Indonesia yang berjalan dari berkas statis,
tanpa request jaringan, di desktop maupun HP. Angka-angka resmi — penduduk 281,6 juta
jiwa, ekonomi tumbuh 5,03%, IPM 75,02 — masing-masing dengan sumber (BPS, Bank Dunia,
APJII) dan tahunnya.

## Halaman

- **Beranda** — indikator utama tahun terpilih, grafik pertumbuhan PDB, jalan pintas
- **Penduduk** — jumlah penduduk 2020–2024, struktur umur, provinsi terbesar
- **Ekonomi** — PDB, ekspor-impor, pangsa sektor, mitra dagang utama
- **Sosial** — IPM, kemiskinan, pengangguran, harapan hidup
- **Daerah** — tabel 14 provinsi: cari, urutkan, unduh CSV
- **Metodologi** — sumber data, definisi, dan catatan

## Kontrol yang berfungsi

Pemilih tahun (2020–2024) mengubah KPI dan grafik; pengalih Batang/Garis mengubah
grafik PDB; pencarian dan pengurutan bekerja pada tabel provinsi; tombol Unduh CSV
mengunduh data provinsi sebagai CSV. Semua navigasi lewat tautan (hash routes).

## Menjalankan

```sh
node serve.ts
# buka http://localhost:8080
```

Tidak ada build step dan tidak ada dependensi: `app/` hanya HTML, CSS dan ES module
yang ditulis tangan, grafik SVG digambar dari `app/data.js` sendiri.

## Entri make.fun

Entri untuk kompetisi [Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
di make.fun. `main.ts` (Node 22) menyalin `app/` dan `screenshots/` ke `/output` dan
menulis `dossier.json` dengan `vendor/makefun-frontend.ts` dari kit.

## Lisensi

MIT — lihat [LICENSE](LICENSE).
