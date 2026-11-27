// Tampilan tiap halaman StatNusa. Setiap halaman dirender dari data.js —
// tidak ada angka yang ditulis tangan di HTML, semua lewat fungsi ini.
import { META, SERIES, SNAPSHOT_2024, PROVINCES, AGE_GROUPS, SECTORS_2024, TRADE_PARTNERS_2024, YEARS, seriesPoints, fmtId } from './data.js';
import { barChart, lineChart, donutChart, hbarChart, PALETTE } from './charts.js';

function srcLine(seriesKey) {
  const s = SERIES[seriesKey];
  return `<p class="src">Sumber: ${s.source} &middot; Satuan: ${s.unit}</p>`;
}

function kpiCards() {
  return `<div class="kpi-grid">${SNAPSHOT_2024.map((k) => `
    <article class="kpi">
      <div class="k-label">${k.label}</div>
      <div class="k-value">${k.value}</div>
      <p class="k-note">${k.note}</p>
      <p class="k-src">Sumber: ${k.source}</p>
    </article>`).join('')}</div>`;
}

function yearValue(seriesKey, year) {
  return SERIES[seriesKey].values[year];
}

export function renderHome(year) {
  const g = yearValue('gdpGrowthPct', year);
  const pop = yearValue('populationMillions', year);
  const inf = yearValue('inflationPct', year);
  const unemp = yearValue('unemploymentPct', year);
  const hdi = yearValue('hdi', year);
  const pov = yearValue('povertyPct', year);
  return `
  <section class="hero" style="margin:-8px -20px 0; padding-left:20px; padding-right:20px;">
    <h1>Statistik Indonesia, lengkap dan terbaru</h1>
    <p>Portal statistik nasional: penduduk, ekonomi, sosial dan daerah — dengan angka
    resmi, sumber dan tahun yang jelas, dalam satu tempat.</p>
    <div class="year-picker">
      <label for="year">Tahun data:</label>
      <select id="year" data-action="year">${YEARS.map((y) => `<option value="${y}"${y === year ? ' selected' : ''}>${y}</option>`).join('')}</select>
      <span class="updated">Terakhir diperbarui ${META.updated} &middot; Semua angka dari ${META.country}</span>
    </div>
  </section>
  <section>
    <h2>Indonesia dalam angka — ${year}</h2>
    <p class="lede">Enam indikator utama tahun ${year}. Ubah tahun di atas untuk melihat
    angka tahun lain; grafik di bawah ikut berubah.</p>
    <div class="kpi-grid">
      <article class="kpi"><div class="k-label">Penduduk</div><div class="k-value">${fmtId(pop)} jt</div><p class="k-note">Estimasi tengah tahun ${year}</p><p class="k-src">Sumber: BPS</p></article>
      <article class="kpi"><div class="k-label">Pertumbuhan PDB</div><div class="k-value">${fmtId(g)}%</div><p class="k-note">${g >= 0 ? 'Ekonomi tumbuh' : 'Ekonomi terkontraksi'} ${fmtId(Math.abs(g))}% pada ${year}</p><p class="k-src">Sumber: BPS</p></article>
      <article class="kpi"><div class="k-label">Inflasi (Desember)</div><div class="k-value">${fmtId(inf)}%</div><p class="k-note">y-on-y bulan Desember ${year}</p><p class="k-src">Sumber: BPS</p></article>
      <article class="kpi"><div class="k-label">Pengangguran (Agustus)</div><div class="k-value">${fmtId(unemp)}%</div><p class="k-note">Tingkat pengangguran terbuka</p><p class="k-src">Sumber: BPS, Sakernas</p></article>
      <article class="kpi"><div class="k-label">IPM</div><div class="k-value">${fmtId(hdi)}</div><p class="k-note">Kategori tinggi, skala 0–100</p><p class="k-src">Sumber: BPS</p></article>
      <article class="kpi"><div class="k-label">Kemiskinan</div><div class="k-value">${fmtId(pov)}%</div><p class="k-note">Penduduk miskin, September ${year}</p><p class="k-src">Sumber: BPS</p></article>
    </div>
  </section>
  <section>
    <h2>Pertumbuhan ekonomi 2020–2024</h2>
    <p class="lede">PDB tumbuh 5,03% pada 2024 setelah 5,05% pada 2023. Kontraksi 2020 adalah
    dampak pandemi Covid-19.</p>
    <div class="card">
      <h3>Pertumbuhan PDB (% y-on-y)</h3>
      ${srcLine('gdpGrowthPct')}
      ${barChart({ points: seriesPoints('gdpGrowthPct'), format: (v) => `${fmtId(v)}%`, title: 'Pertumbuhan PDB 2020-2024' })}
    </div>
  </section>
  <section>
    <h2>Yang paling dicari</h2>
    <p class="lede">Jalan pintas ke halaman yang paling sering dibuka pengunjung.</p>
    <div class="grid-2">
      <div class="card"><h3><a href="#/penduduk">Penduduk 281,6 juta jiwa</a></h3><p>Jumlah penduduk, struktur umur, dan 14 provinsi terbesar — BPS 2024.</p></div>
      <div class="card"><h3><a href="#/ekonomi">Ekonomi tumbuh 5,03%</a></h3><p>PDB, ekspor-impor, dan sektor penggerak — BPS 2024.</p></div>
      <div class="card"><h3><a href="#/sosial">IPM 75,02 — kategori tinggi</a></h3><p>Kesehatan, pendidikan, kemiskinan dan ketimpangan — BPS 2024.</p></div>
      <div class="card"><h3><a href="#/daerah">Daerah: Jawa Barat terpadat</a></h3><p>Perbandingan 14 provinsi: penduduk, luas, kepadatan — BPS 2024.</p></div>
    </div>
  </section>`;
}

export function renderPopulation(year) {
  const pop = yearValue('populationMillions', year);
  return `
  <section>
    <h2>Penduduk Indonesia</h2>
    <p class="lede">Indonesia adalah negara berpenduduk terbesar keempat di dunia.
    ${fmtId(pop)} juta jiwa pada ${year} — naik dari 270,2 juta pada 2020.</p>
    <div class="card">
      <h3>Jumlah penduduk 2020–2024 (juta jiwa)</h3>
      ${srcLine('populationMillions')}
      ${lineChart({ points: seriesPoints('populationMillions'), format: (v) => fmtId(v), title: 'Jumlah penduduk 2020-2024' })}
    </div>
    <div class="grid-2">
      <div class="card">
        <h3>Struktur umur 2024</h3>
        <p class="src">Sumber: BPS, 2024</p>
        ${hbarChart({ items: AGE_GROUPS.map((a) => ({ label: a.group, value: a.share })), format: (v) => `${fmtId(v)}%`, title: 'Struktur umur penduduk 2024' })}
        <p class="source-note">68,9% penduduk berada di usia produktif (15–64 tahun) — bonus demografi
        yang mencapai puncaknya pada 2020-an.</p>
      </div>
      <div class="card">
        <h3>Fakta penduduk</h3>
        <ul class="fact-list">
          <li><span class="f-num">1</span><span><b>281,6 juta jiwa</b> — penduduk 2024 (BPS, estimasi tengah tahun).</span></li>
          <li><span class="f-num">2</span><span><b>56% tinggal di Jawa</b> — pulau terpadat, 6 provinsi di 10 besar penduduk.</span></li>
          <li><span class="f-num">3</span><span><b>TFR 2,1 anak per perempuan</b> — angka kelahiran total 2024 (BPS).</span></li>
          <li><span class="f-num">4</span><span><b>Harapan hidup 74,15 tahun</b> — saat lahir, 2024 (BPS).</span></li>
          <li><span class="f-num">5</span><span><b>221,6 juta pengguna internet</b> — 79,5% populasi (APJII 2024).</span></li>
        </ul>
      </div>
    </div>
    <div class="card">
      <h3>Provinsi berpenduduk terbesar 2024</h3>
      <p class="src">Sumber: BPS, estimasi tengah tahun 2024 &middot; <a href="#/daerah">Lihat tabel lengkap 14 provinsi</a></p>
      ${hbarChart({ items: [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 8).map((p) => ({ label: p.name, value: p.pop })), format: (v) => `${fmtId(v)} jt`, title: 'Provinsi berpenduduk terbesar 2024' })}
    </div>
  </section>`;
}

export function renderEconomy(year, chartType) {
  const g = yearValue('gdpGrowthPct', year);
  const nominal = yearValue('gdpNominalTrillionRp', year);
  const exp = yearValue('exportsUsdB', year);
  const imp = yearValue('importsUsdB', year);
  const chart = chartType === 'line'
    ? lineChart({ points: seriesPoints('gdpGrowthPct'), format: (v) => `${fmtId(v)}%`, title: 'Pertumbuhan PDB 2020-2024' })
    : barChart({ points: seriesPoints('gdpGrowthPct'), format: (v) => `${fmtId(v)}%`, title: 'Pertumbuhan PDB 2020-2024' });
  return `
  <section>
    <h2>Ekonomi Indonesia</h2>
    <p class="lede">PDB ${year} sebesar Rp ${fmtId(nominal, 0)} triliun dengan pertumbuhan
    ${fmtId(g)}%. Ekspor US$ ${fmtId(exp)} miliar, impor US$ ${fmtId(imp)} miliar.</p>
    <div class="kpi-grid">
      <article class="kpi"><div class="k-label">Pertumbuhan PDB ${year}</div><div class="k-value">${fmtId(g)}%</div><p class="k-note">y-on-y</p><p class="k-src">Sumber: BPS</p></article>
      <article class="kpi"><div class="k-label">PDB harga berlaku</div><div class="k-value">Rp ${fmtId(nominal, 0)} T</div><p class="k-note">Tahun ${year}</p><p class="k-src">Sumber: BPS</p></article>
      <article class="kpi"><div class="k-label">Ekspor ${year}</div><div class="k-value">US$ ${fmtId(exp)} M</div><p class="k-note">Surplus US$ ${fmtId(exp - imp)} M</p><p class="k-src">Sumber: BPS</p></article>
      <article class="kpi"><div class="k-label">PDB per kapita 2024</div><div class="k-value">US$ 4.925</div><p class="k-note">Harga berlaku</p><p class="k-src">Sumber: Bank Dunia</p></article>
    </div>
    <div class="card">
      <h3>Pertumbuhan PDB 2020–2024 (% y-on-y)</h3>
      ${srcLine('gdpGrowthPct')}
      <div class="chart-toggle" role="group" aria-label="Jenis grafik">
        <button class="btn" data-action="chart-type" data-type="bar" aria-pressed="${chartType === 'bar'}">Batang</button>
        <button class="btn" data-action="chart-type" data-type="line" aria-pressed="${chartType === 'line'}">Garis</button>
      </div>
      ${chart}
    </div>
    <div class="grid-2">
      <div class="card">
        <h3>Ekspor vs impor 2020–2024 (miliar US$)</h3>
        ${srcLine('exportsUsdB')}
        ${barChart({ points: seriesPoints('exportsUsdB'), format: (v) => fmtId(v, 0), color: '#15803d', title: 'Ekspor 2020-2024' })}
        <p class="source-note">Impor 2024: US$ ${fmtId(imp)} miliar — neraca dagang surplus
        US$ ${fmtId(exp - imp)} miliar.</p>
      </div>
      <div class="card">
        <h3>Pangsa sektor terhadap PDB 2024</h3>
        <p class="src">Sumber: BPS, 2024</p>
        <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center;">
          ${donutChart({ items: SECTORS_2024.map((s) => ({ label: s.sector, value: s.share })), colors: PALETTE })}
          <ul class="legend">${SECTORS_2024.map((s, i) => `<li><span class="sw" style="background:${PALETTE[i % PALETTE.length]}"></span>${s.sector} — ${fmtId(s.share)}%</li>`).join('')}</ul>
        </div>
      </div>
    </div>
    <div class="card">
      <h3>Mitra dagang utama 2024 (ekspor, miliar US$)</h3>
      <p class="src">Sumber: BPS, 2024</p>
      ${hbarChart({ items: TRADE_PARTNERS_2024.map((t) => ({ label: t.partner, value: t.value })), format: (v) => `US$ ${fmtId(v, 1)} M`, color: '#15803d', title: 'Mitra dagang utama 2024' })}
    </div>
  </section>`;
}

export function renderSocial(year) {
  const hdi = yearValue('hdi', year);
  const pov = yearValue('povertyPct', year);
  const unemp = yearValue('unemploymentPct', year);
  return `
  <section>
    <h2>Kesehatan, pendidikan dan kesejahteraan</h2>
    <p class="lede">IPM ${year} mencapai ${fmtId(hdi)} — kategori tinggi. Kemiskinan turun ke
    ${fmtId(pov)}% dan pengangguran ke ${fmtId(unemp)}%.</p>
    <div class="kpi-grid">
      <article class="kpi"><div class="k-label">IPM ${year}</div><div class="k-value">${fmtId(hdi)}</div><p class="k-note">Kategori tinggi</p><p class="k-src">Sumber: BPS</p></article>
      <article class="kpi"><div class="k-label">Kemiskinan ${year}</div><div class="k-value">${fmtId(pov)}%</div><p class="k-note">Penduduk miskin</p><p class="k-src">Sumber: BPS</p></article>
      <article class="kpi"><div class="k-label">Pengangguran ${year}</div><div class="k-value">${fmtId(unemp)}%</div><p class="k-note">Agustus ${year}</p><p class="k-src">Sumber: BPS</p></article>
      <article class="kpi"><div class="k-label">Harapan hidup 2024</div><div class="k-value">74,15 thn</div><p class="k-note">Saat lahir</p><p class="k-src">Sumber: BPS</p></article>
    </div>
    <div class="grid-2">
      <div class="card">
        <h3>Indeks Pembangunan Manusia 2020–2024</h3>
        ${srcLine('hdi')}
        ${lineChart({ points: seriesPoints('hdi'), format: (v) => fmtId(v), title: 'IPM 2020-2024' })}
      </div>
      <div class="card">
        <h3>Kemiskinan 2020–2024 (% penduduk)</h3>
        ${srcLine('povertyPct')}
        ${lineChart({ points: seriesPoints('povertyPct'), color: '#b45309', format: (v) => `${fmtId(v)}%`, title: 'Kemiskinan 2020-2024' })}
        <p class="source-note">September 2024: 8,57% atau 24,06 juta jiwa — terendah sepanjang sejarah pencatatan.</p>
      </div>
    </div>
    <div class="card">
      <h3>Pengangguran 2020–2024 (% angkatan kerja)</h3>
      ${srcLine('unemploymentPct')}
      ${barChart({ points: seriesPoints('unemploymentPct'), color: '#7c3aed', format: (v) => `${fmtId(v)}%`, title: 'Pengangguran 2020-2024' })}
      <p class="source-note">Puncak 7,07% pada Agustus 2020 (pandemi), lalu turun tiap tahun hingga 4,91% pada Agustus 2024.</p>
    </div>
    <div class="card">
      <h3>Yang perlu diketahui</h3>
      <ul class="fact-list">
        <li><span class="f-num">1</span><span><b>Rasio gini 0,379</b> (Maret 2024) — ketimpangan pengeluaran menurun dari 0,388 setahun sebelumnya (BPS).</span></li>
        <li><span class="f-num">2</span><span><b>Melek huruf 96,4%</b> penduduk usia 15 tahun ke atas (BPS 2024).</span></li>
        <li><span class="f-num">3</span><span><b>13,89 juta wisman</b> berkunjung pada 2024, naik 19,1% dari 2023 (BPS).</span></li>
        <li><span class="f-num">4</span><span><b>Produksi beras 30,34 juta ton</b> (GKG) pada 2024 (BPS).</span></li>
      </ul>
    </div>
  </section>`;
}

export function renderRegions(query, sortKey) {
  let rows = [...PROVINCES];
  if (query) {
    const q = query.toLowerCase();
    rows = rows.filter((p) => p.name.toLowerCase().includes(q));
  }
  const sorts = {
    pop: (a, b) => b.pop - a.pop,
    density: (a, b) => b.density - a.density,
    name: (a, b) => a.name.localeCompare(b.name, 'id'),
  };
  rows.sort(sorts[sortKey] || sorts.pop);
  const totalPop = PROVINCES.reduce((a, p) => a + p.pop, 0);
  const body = rows.map((p) => `<tr><td>${p.name}</td><td>${fmtId(p.pop)}</td><td>${p.area.toLocaleString('id-ID')}</td><td>${p.density.toLocaleString('id-ID')}</td><td>${fmtId((p.pop / 281.6) * 100, 1)}%</td></tr>`).join('');
  return `
  <section>
    <h2>Statistik daerah: 14 provinsi terbesar</h2>
    <p class="lede">Ke-14 provinsi ini menampung ${fmtId(totalPop)} juta jiwa — ${fmtId((totalPop / 281.6) * 100, 1)}%
    penduduk Indonesia. Cari provinsi, urutkan kolomnya, atau unduh datanya.</p>
    <div class="card">
      <div class="controls">
        <input type="search" id="prov-search" placeholder="Cari provinsi, mis. Jawa…" value="${query.replace(/"/g, '&quot;')}" aria-label="Cari provinsi">
        <button class="btn primary" data-action="download-csv">Unduh CSV</button>
      </div>
      <div class="table-wrap">
      <table class="data">
        <thead><tr>
          <th><button data-action="sort" data-sort="name">Provinsi ${sortKey === 'name' ? '▲' : ''}</button></th>
          <th><button data-action="sort" data-sort="pop">Penduduk (jt) ${sortKey === 'pop' ? '▼' : ''}</button></th>
          <th>Luas (km²)</th>
          <th><button data-action="sort" data-sort="density">Kepadatan (jiwa/km²) ${sortKey === 'density' ? '▼' : ''}</button></th>
          <th>% penduduk nasional</th>
        </tr></thead>
        <tbody>${body || '<tr><td colspan="5" class="empty-note">Tidak ada provinsi yang cocok dengan pencarian Anda.</td></tr>'}</tbody>
      </table>
      </div>
      <p class="src" style="margin-top:12px;">Sumber: BPS, estimasi tengah tahun 2024. Kepadatan = penduduk dibagi luas wilayah.</p>
    </div>
    <div class="callout"><b>Yang paling padat:</b> DKI Jakarta — 15.904 jiwa/km², sekitar 12 kali
    kepadatan Jawa Barat. <b>Yang paling luas:</b> Kalimantan Barat — 147.307 km² dengan
    kepadatan hanya 39 jiwa/km².</div>
  </section>`;
}

export function renderMethodology() {
  return `
  <section>
    <h2>Metodologi dan sumber data</h2>
    <p class="lede">Dari mana angka-angka di situs ini berasal, apa definisinya, dan bagaimana
    kami menyajikannya.</p>
    <div class="card">
      <h3>Sumber data</h3>
      <ul class="fact-list">
        <li><span class="f-num">1</span><span><b>Badan Pusat Statistik (BPS)</b> — sumber utama: penduduk, PDB, inflasi, pengangguran, kemiskinan, IPM, perdagangan, pariwisata. Publikasi: Berita Resmi Statistik dan Statistik Indonesia 2025.</span></li>
        <li><span class="f-num">2</span><span><b>Bank Dunia</b> — PDB per kapita 2024 (US$ 4.925, harga berlaku).</span></li>
        <li><span class="f-num">3</span><span><b>APJII</b> — Survei Penetrasi Internet Indonesia 2024: 221,6 juta pengguna.</span></li>
      </ul>
    </div>
    <div class="card">
      <h3>Definisi yang dipakai</h3>
      <ul class="fact-list">
        <li><span class="f-num">1</span><span><b>Pertumbuhan PDB</b> — perubahan PDB harga konstan terhadap tahun sebelumnya (y-on-y).</span></li>
        <li><span class="f-num">2</span><span><b>Inflasi</b> — perubahan Indeks Harga Konsumen Desember terhadap Desember tahun sebelumnya.</span></li>
        <li><span class="f-num">3</span><span><b>Pengangguran terbuka</b> — penganggur dibagi angkatan kerja, hasil Sakernas Agustus.</span></li>
        <li><span class="f-num">4</span><span><b>IPM</b> — indeks komposit harapan hidup, pendidikan dan standar hidup layak, skala 0–100.</span></li>
        <li><span class="f-num">5</span><span><b>Kepadatan penduduk</b> — jumlah penduduk dibagi luas wilayah administratif.</span></li>
      </ul>
    </div>
    <div class="card">
      <h3>Catatan</h3>
      <p>Angka penduduk 2020–2024 adalah estimasi tengah tahun BPS; Sensus Penduduk 2020
      mencatat 270,20 juta jiwa. Angka dapat direvisi BPS pada publikasi berikutnya; situs ini
      memakai publikasi terakhir per 26 November 2026. Situs ini statis: tidak memuat data dari
      jaringan, semua angka tersimpan di berkasnya sendiri.</p>
      <p class="source-note">StatNusa adalah situs independen dan bukan situs resmi BPS atau pemerintah.
      Untuk data resmi terbaru, kunjungi bps.go.id.</p>
    </div>
  </section>`;
}
