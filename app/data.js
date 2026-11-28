// Data statistik nasional Indonesia — StatNusa.
// Setiap angka membawa sumber dan tahunnya. Sumber utama: Badan Pusat Statistik
// (BPS); pelengkap: Bank Dunia dan APJII. Angka adalah nilai resmi yang
// dipublikasikan; estimasi tengah tahun ditandai sebagai estimasi.
export const META = {
  country: 'Indonesia',
  countryCode: 'IDN',
  updated: '26 November 2026',
  currency: 'Rupiah (Rp)',
};

// Seri tahunan 2020-2024. Nilai: lihat label satuan di tiap seri.
export const SERIES = {
  populationMillions: {
    label: 'Jumlah penduduk',
    unit: 'juta jiwa',
    source: 'BPS, estimasi tengah tahun',
    values: { 2020: 270.2, 2021: 272.68, 2022: 275.77, 2023: 278.69, 2024: 281.6 },
  },
  gdpGrowthPct: {
    label: 'Pertumbuhan PDB',
    unit: '% (y-on-y)',
    source: 'BPS, Berita Resmi Statistik',
    values: { 2020: -2.07, 2021: 3.7, 2022: 5.31, 2023: 5.05, 2024: 5.03 },
  },
  gdpNominalTrillionRp: {
    label: 'PDB harga berlaku',
    unit: 'Rp triliun',
    source: 'BPS',
    values: { 2020: 15434, 2021: 16976, 2022: 19588, 2023: 20892, 2024: 22139 },
  },
  inflationPct: {
    label: 'Inflasi Desember (y-on-y)',
    unit: '%',
    source: 'BPS',
    values: { 2020: 1.68, 2021: 1.87, 2022: 5.51, 2023: 2.61, 2024: 1.57 },
  },
  unemploymentPct: {
    label: 'Tingkat pengangguran terbuka (Agustus)',
    unit: '%',
    source: 'BPS, Sakernas Agustus',
    values: { 2020: 7.07, 2021: 6.49, 2022: 5.86, 2023: 5.32, 2024: 4.91 },
  },
  povertyPct: {
    label: 'Penduduk miskin',
    unit: '%',
    source: 'BPS',
    values: { 2020: 10.19, 2021: 9.71, 2022: 9.57, 2023: 9.36, 2024: 8.57 },
  },
  exportsUsdB: {
    label: 'Ekspor',
    unit: 'miliar US$',
    source: 'BPS',
    values: { 2020: 163.19, 2021: 231.61, 2022: 291.9, 2023: 258.82, 2024: 264.7 },
  },
  importsUsdB: {
    label: 'Impor',
    unit: 'miliar US$',
    source: 'BPS',
    values: { 2020: 141.57, 2021: 196.2, 2022: 237.45, 2023: 221.89, 2024: 233.66 },
  },
  hdi: {
    label: 'Indeks Pembangunan Manusia',
    unit: 'skala 0-100',
    source: 'BPS',
    values: { 2020: 71.94, 2021: 72.29, 2022: 73.37, 2023: 74.39, 2024: 75.02 },
  },
};

// Indikator tunggal terbaru (2024, kecuali ditandai lain).
export const SNAPSHOT_2024 = [
  { key: 'population', label: 'Penduduk', value: '281,6 jt', note: 'Estimasi tengah tahun 2024', source: 'BPS' },
  { key: 'gdpGrowth', label: 'Pertumbuhan ekonomi', value: '5,03%', note: 'PDB tumbuh 5,03% pada 2024', source: 'BPS' },
  { key: 'gdpPerCapita', label: 'PDB per kapita', value: 'US$ 4.925', note: 'Harga berlaku 2024', source: 'Bank Dunia' },
  { key: 'inflation', label: 'Inflasi (Des 2024)', value: '1,57%', note: 'y-on-y, terendah sejak 2020', source: 'BPS' },
  { key: 'unemployment', label: 'Pengangguran (Agu 2024)', value: '4,91%', note: 'Terendah dalam 5 tahun terakhir', source: 'BPS' },
  { key: 'poverty', label: 'Kemiskinan (Sep 2024)', value: '8,57%', note: '24,06 juta jiwa', source: 'BPS' },
  { key: 'hdi', label: 'IPM', value: '75,02', note: 'Kategori tinggi, naik 0,63 poin', source: 'BPS' },
  { key: 'lifeExpectancy', label: 'Harapan hidup', value: '74,15 thn', note: 'Angka harapan hidup saat lahir', source: 'BPS 2024' },
  { key: 'gini', label: 'Rasio gini (Mar 2024)', value: '0,379', note: 'Ketimpangan pengeluaran', source: 'BPS' },
  { key: 'exports', label: 'Ekspor 2024', value: 'US$ 264,7 M', note: 'Surplus dagang US$ 31,0 M', source: 'BPS' },
  { key: 'tourists', label: 'Wisman 2024', value: '13,89 jt', note: 'Kunjungan wisatawan mancanegara', source: 'BPS' },
  { key: 'internet', label: 'Pengguna internet', value: '221,6 jt', note: '79,5% populasi, 2024', source: 'APJII 2024' },
];

// Provinsi: penduduk 2024 (juta jiwa), luas (km2), kepadatan (jiwa/km2).
// Sumber: BPS, estimasi tengah tahun 2024.
export const PROVINCES = [
  { name: 'Jawa Barat', pop: 49.94, area: 37223, density: 1342 },
  { name: 'Jawa Timur', pop: 41.81, area: 47803, density: 875 },
  { name: 'Jawa Tengah', pop: 37.89, area: 32801, density: 1155 },
  { name: 'Sumatera Utara', pop: 15.59, area: 72981, density: 214 },
  { name: 'Banten', pop: 12.43, area: 9663, density: 1286 },
  { name: 'DKI Jakarta', pop: 10.56, area: 664, density: 15904 },
  { name: 'Lampung', pop: 9.41, area: 34624, density: 272 },
  { name: 'Sulawesi Selatan', pop: 9.36, area: 46717, density: 200 },
  { name: 'Sumatera Selatan', pop: 9.01, area: 91592, density: 98 },
  { name: 'Riau', pop: 6.86, area: 87024, density: 79 },
  { name: 'Sumatera Barat', pop: 5.9, area: 42013, density: 140 },
  { name: 'Kalimantan Barat', pop: 5.71, area: 147307, density: 39 },
  { name: 'Nusa Tenggara Timur', pop: 5.6, area: 48718, density: 115 },
  { name: 'Aceh', pop: 5.55, area: 57956, density: 96 },
];

// Struktur umur penduduk 2024 (%). Sumber: BPS.
export const AGE_GROUPS = [
  { group: '0-14 tahun', share: 23.9, note: 'Anak' },
  { group: '15-64 tahun', share: 68.9, note: 'Usia produktif' },
  { group: '65+ tahun', share: 7.2, note: 'Lansia' },
];

// Pangsa sektor terhadap PDB 2024 (%). Sumber: BPS.
export const SECTORS_2024 = [
  { sector: 'Industri pengolahan', share: 18.7 },
  { sector: 'Perdagangan', share: 13.0 },
  { sector: 'Pertanian, kehutanan, perikanan', share: 12.5 },
  { sector: 'Konstruksi', share: 9.9 },
  { sector: 'Pertambangan dan penggalian', share: 8.1 },
  { sector: 'Transportasi dan pergudangan', share: 5.9 },
  { sector: 'Sektor lainnya', share: 31.9 },
];

// Perdagangan luar negeri: mitra utama ekspor 2024 (miliar US$). Sumber: BPS.
export const TRADE_PARTNERS_2024 = [
  { partner: 'Tiongkok', value: 62.4 },
  { partner: 'Amerika Serikat', value: 26.5 },
  { partner: 'Jepang', value: 17.5 },
  { partner: 'India', value: 16.6 },
  { partner: 'Singapura', value: 11.4 },
  { partner: 'Malaysia', value: 10.9 },
];

export const YEARS = [2020, 2021, 2022, 2023, 2024];

// PDB per kapita 2024 (US$ harga berlaku) + penduduk 2024, 5 negara ASEAN.
// Sumber: Bank Dunia (api.worldbank.org, indikator NY.GDP.PCAP.CD dan
// SP.POP.TOTL, diakses 28 Nov 2026). Penduduk Indonesia memakai BPS 281,6 jt
// (angka Bank Dunia 283,5 jt); negara lain memakai Bank Dunia.
// Singapura (US$ 94.897) tidak digambarkan agar skala terbaca — 19× Indonesia.
export const ASEAN_2024 = [
  { country: 'Malaysia', gdpPcap: 11874, popMillions: 35.6 },
  { country: 'Thailand', gdpPcap: 7387, popMillions: 71.7 },
  { country: 'Indonesia', gdpPcap: 4925, popMillions: 281.6 },
  { country: 'Vietnam', gdpPcap: 4717, popMillions: 101.0 },
  { country: 'Filipina', gdpPcap: 3985, popMillions: 115.8 },
];

export function seriesPoints(key) {
  const s = SERIES[key];
  return YEARS.map((y) => ({ year: y, value: s.values[y] }));
}

export function fmtId(n, digits = 2) {
  return n.toLocaleString('id-ID', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}
