// StatNusa — entri "best national statistics site" (Node 22, standard library only).
// Situsnya adalah berkas statis di app/ (HTML, CSS, ES module, tanpa build step),
// kontennya tersimpan di berkasnya sendiri dan tidak memuat apa pun dari jaringan.
// Program ini menyerahkan situs itu: menyalin app/ dan screenshots/ dari samping
// berkas ini ke /output lalu menulis /output/dossier.json dengan library make.fun
// yang divendor. Biarkan vendor/makefun-frontend.ts apa adanya: scorer menuntut
// dossier.json sama persis byte demi byte dengan yang ditulis salinan library itu.
//
// Di luar container grader, MAKEFUN_OUTPUT_DIR menggantikan /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Gagal cepat bila situsnya tidak lengkap, daripada menyerahkan /output kosong.
if (!existsSync(join(here, 'app', 'index.html'))) {
  throw new Error('app/index.html tidak ditemukan di samping main.ts');
}

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// Batas-batas scorer (reference/gate.json): hanya text_max_bytes yang membentuk
// byte dossier; sisanya menolak entri yang akan ditolak scorer (lebih dari 4
// screenshot atau satu di atas 256 KiB; lebih dari 993 berkas dan direktori di
// app/ atau 16 MiB berkas app/: app/ dihitung di samping batas 1000 entri /output
// sendiri, bersama screenshots/ dan dossier.json).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
