// StatNusa — router hash dan kontrol. Semua kontrol di halaman benar-benar bekerja:
// pemilih tahun, pengalih jenis grafik, pencarian dan pengurutan provinsi, unduh CSV.
import { PROVINCES, fmtId } from './data.js';
import { renderHome, renderPopulation, renderEconomy, renderSocial, renderRegions, renderMethodology } from './views.js';

const view = document.getElementById('view');
const navLinks = [...document.querySelectorAll('.main-nav a')];

const state = {
  year: 2024,
  chartType: 'bar',
  query: '',
  sortKey: 'pop',
};

function route() {
  const hash = location.hash.replace(/^#\/?/, '') || '';
  const page = hash.split('/')[0] || 'home';
  navLinks.forEach((a) => {
    const target = a.getAttribute('href').replace(/^#\/?/, '') || 'home';
    a.classList.toggle('active', target === page);
    if (target === 'home' && page === 'home') a.classList.add('active');
  });
  let html = '';
  if (page === 'penduduk') html = renderPopulation(state.year);
  else if (page === 'ekonomi') html = renderEconomy(state.year, state.chartType);
  else if (page === 'sosial') html = renderSocial(state.year);
  else if (page === 'daerah') html = renderRegions(state.query, state.sortKey);
  else if (page === 'metodologi') html = renderMethodology();
  else html = renderHome(state.year);
  view.innerHTML = html;
  window.scrollTo(0, 0);
}

function downloadCsv() {
  const header = 'Provinsi,Penduduk (juta jiwa),Luas (km2),Kepadatan (jiwa/km2)\n';
  const rows = PROVINCES.map((p) => `${p.name},${p.pop},${p.area},${p.density}`).join('\n');
  const blob = new Blob([header + rows + '\n'], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'statnusa-provinsi-2024.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

// Delegasi klik: semua tombol di dalam #view.
view.addEventListener('click', (ev) => {
  const btn = ev.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;
  if (action === 'chart-type') {
    state.chartType = btn.dataset.type;
    route();
  } else if (action === 'sort') {
    state.sortKey = btn.dataset.sort;
    route();
  } else if (action === 'download-csv') {
    downloadCsv();
  }
});

// Delegasi perubahan dan ketikan di dalam #view.
view.addEventListener('change', (ev) => {
  if (ev.target.matches('[data-action="year"]')) {
    state.year = Number(ev.target.value);
    route();
  }
});
view.addEventListener('input', (ev) => {
  if (ev.target.id === 'prov-search') {
    state.query = ev.target.value;
    const pos = ev.target.selectionStart;
    route();
    const again = document.getElementById('prov-search');
    if (again) {
      again.focus();
      again.setSelectionRange(pos, pos);
    }
  }
});

window.addEventListener('hashchange', route);
route();
