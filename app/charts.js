// Chart SVG tanpa library: bar, line, donut dan bar horizontal.
// Semua grafik digambar dari data.js, tanpa request jaringan.
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function niceMax(values) {
  const m = Math.max(...values.map((v) => Math.abs(v)));
  if (m <= 0) return 1;
  const pow = 10 ** Math.floor(Math.log10(m));
  return Math.ceil(m / pow) * pow;
}

export function barChart({ points, width = 640, height = 280, color = '#0e7490', format = (v) => String(v), title = '' }) {
  const padL = 44, padB = 28, padT = 12;
  const max = niceMax(points.map((p) => p.value));
  const min = Math.min(0, ...points.map((p) => p.value));
  const span = max - min || 1;
  const iw = width - padL - 12;
  const ih = height - padT - padB;
  const bw = Math.min(46, (iw / points.length) * 0.62);
  const step = iw / points.length;
  const y = (v) => padT + ih - ((v - min) / span) * ih;
  const zeroY = y(0);
  let bars = '';
  let labels = '';
  points.forEach((p, i) => {
    const x = padL + i * step + (step - bw) / 2;
    const top = Math.min(y(p.value), zeroY);
    const h = Math.max(1, Math.abs(y(p.value) - zeroY));
    const fill = p.value < 0 ? '#b45309' : color;
    bars += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${fill}"><title>${esc(p.year)}: ${format(p.value)}</title></rect>`;
    labels += `<text x="${(x + bw / 2).toFixed(1)}" y="${(height - 8).toFixed(1)}" text-anchor="middle" font-size="11" fill="#475569">${p.year}</text>`;
    labels += `<text x="${(x + bw / 2).toFixed(1)}" y="${(top - 5).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="#0f172a">${format(p.value)}</text>`;
  });
  const grid = [0, 0.5, 1].map((f) => {
    const v = min + span * f;
    const gy = y(v);
    return `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${width - 12}" y2="${gy.toFixed(1)}" stroke="#e2e8f0" stroke-width="1"/><text x="${padL - 6}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="10" fill="#64748b">${format(Math.round(v * 10) / 10)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="${esc(title || 'Grafik batang')}">${grid}<line x1="${padL}" y1="${zeroY.toFixed(1)}" x2="${width - 12}" y2="${zeroY.toFixed(1)}" stroke="#94a3b8" stroke-width="1"/>${bars}${labels}</svg>`;
}

export function lineChart({ points, width = 640, height = 280, color = '#0e7490', format = (v) => String(v), title = '' }) {
  const padL = 44, padB = 28, padT = 16;
  const vals = points.map((p) => p.value);
  let max = Math.max(...vals);
  let min = Math.min(...vals);
  if (max === min) { max += 1; min -= 1; }
  const pad = (max - min) * 0.15;
  max += pad; min -= pad;
  const iw = width - padL - 12;
  const ih = height - padT - padB;
  const x = (i) => points.length === 1 ? padL + iw / 2 : padL + (i / (points.length - 1)) * iw;
  const y = (v) => padT + ih - ((v - min) / (max - min)) * ih;
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const dots = points.map((p, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="4.5" fill="#fff" stroke="${color}" stroke-width="2.5"><title>${p.year}: ${format(p.value)}</title></circle><text x="${x(i).toFixed(1)}" y="${(y(p.value) - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="#0f172a">${format(p.value)}</text><text x="${x(i).toFixed(1)}" y="${(height - 8).toFixed(1)}" text-anchor="middle" font-size="11" fill="#475569">${p.year}</text>`).join('');
  const grid = [0, 0.5, 1].map((f) => {
    const v = min + (max - min) * f;
    const gy = y(v);
    return `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${width - 12}" y2="${gy.toFixed(1)}" stroke="#e2e8f0" stroke-width="1"/><text x="${padL - 6}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="10" fill="#64748b">${format(Math.round(v * 10) / 10)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="${esc(title || 'Grafik garis')}">${grid}<path d="${line}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}</svg>`;
}

export function donutChart({ items, size = 260, colors }) {
  const total = items.reduce((a, b) => a + b.value, 0);
  const cx = size / 2, cy = size / 2, r = size / 2 - 14, ir = r * 0.58;
  let offset = 0;
  let arcs = '';
  items.forEach((it, i) => {
    const frac = it.value / total;
    const a0 = offset * Math.PI * 2 - Math.PI / 2;
    const a1 = (offset + frac) * Math.PI * 2 - Math.PI / 2;
    offset += frac;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + ir * Math.cos(a1), yi1 = cy + ir * Math.sin(a1);
    const xi0 = cx + ir * Math.cos(a0), yi0 = cy + ir * Math.sin(a0);
    const col = colors[i % colors.length];
    arcs += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${ir},${ir} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${col}"><title>${esc(it.label)}: ${it.value}%</title></path>`;
  });
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Diagram lingkaran">${arcs}<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="22" font-weight="700" fill="#0f172a">100%</text><text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="#64748b">PDB 2024</text></svg>`;
}

export function hbarChart({ items, width = 640, barH = 26, gap = 12, color = '#0e7490', format = (v) => String(v), title = '' }) {
  const padL = 170;
  const max = niceMax(items.map((i) => i.value));
  const height = items.length * (barH + gap) + 10;
  const rows = items.map((it, i) => {
    const y = 6 + i * (barH + gap);
    const w = Math.max(2, ((it.value / max) * (width - padL - 70)).toFixed(1));
    return `<text x="${padL - 8}" y="${(y + barH / 2 + 4).toFixed(1)}" text-anchor="end" font-size="12" fill="#0f172a">${esc(it.label)}</text><rect x="${padL}" y="${y}" width="${w}" height="${barH}" rx="4" fill="${color}"><title>${esc(it.label)}: ${format(it.value)}</title></rect><text x="${padL + Number(w) + 8}" y="${(y + barH / 2 + 4).toFixed(1)}" font-size="12" font-weight="600" fill="#0f172a">${format(it.value)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="${esc(title || 'Grafik batang horizontal')}">${rows}</svg>`;
}

export const PALETTE = ['#0e7490', '#b45309', '#15803d', '#7c3aed', '#be185d', '#0369a1', '#a16207'];
