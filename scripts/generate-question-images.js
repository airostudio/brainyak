/* Premium IQ-test graphic generator.
 * Designs polished SVG artwork and rasterizes to high-res WebP via sharp.
 * Question canvas: 200x200 viewBox -> 600px.  Option canvas: 100x100 -> 320px.
 */
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const OUT = path.resolve(__dirname, '..', 'public', 'questions')
fs.mkdirSync(OUT, { recursive: true })

/* ---- palette: 3-stop gradients for depth ---- */
const GRAD = {
  pink:    ['#fbcfe8', '#ec4899', '#9d174d'],
  violet:  ['#ddd6fe', '#8b5cf6', '#5b21b6'],
  blue:    ['#bfdbfe', '#3b82f6', '#1e40af'],
  emerald: ['#a7f3d0', '#10b981', '#065f46'],
  amber:   ['#fef3c7', '#f59e0b', '#92400e'],
  orange:  ['#fed7aa', '#f97316', '#9a3412'],
  slate:   ['#cbd5e1', '#64748b', '#334155'],
}
const LIGHT = { pink:'#f9a8d4', violet:'#c4b5fd', blue:'#93c5fd', emerald:'#6ee7b7', amber:'#fcd34d', orange:'#fdba74', slate:'#94a3b8' }

/* ---- defs: backdrop, gradients, shadow, gloss ---- */
function defs(dim) {
  const stops = Object.entries(GRAD).map(([k, c]) => `
    <linearGradient id="g-${k}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c[0]}"/>
      <stop offset="55%" stop-color="${c[1]}"/>
      <stop offset="100%" stop-color="${c[2]}"/>
    </linearGradient>`).join('')
  const textStops = Object.entries(GRAD).map(([k, c]) => `
    <linearGradient id="t-${k}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${c[0]}"/>
      <stop offset="100%" stop-color="${c[1]}"/>
    </linearGradient>`).join('')
  return `
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0b1220"/>
    </linearGradient>
    <radialGradient id="vignette" cx="50%" cy="42%" r="65%">
      <stop offset="0%" stop-color="#334155" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0b1220" stop-opacity="0"/>
    </radialGradient>
    ${stops}
    ${textStops}
    <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="${dim/90}" stdDeviation="${dim/70}" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
    <linearGradient id="gloss" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35"/>
      <stop offset="45%" stop-color="#ffffff" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>`
}

/* ---- primitives (absolute coords) ---- */
const glossCircle = (cx, cy, r) =>
  `<ellipse cx="${cx}" cy="${cy - r * 0.32}" rx="${r * 0.62}" ry="${r * 0.4}" fill="url(#gloss)"/>`

function pCircle(cx, cy, r, color) {
  return `<g filter="url(#shadow)">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#g-${color})" stroke="${LIGHT[color]}" stroke-width="${r*0.06}" stroke-opacity="0.6"/>
    ${glossCircle(cx, cy, r)}
  </g>`
}
function pRing(cx, cy, r, color, w) {
  return `<g filter="url(#shadow)"><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="url(#g-${color})" stroke-width="${w}"/></g>`
}
function pRect(x, y, w, h, color, rx = 6) {
  return `<g filter="url(#shadow)">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="url(#g-${color})" stroke="${LIGHT[color]}" stroke-width="${w*0.03}" stroke-opacity="0.6"/>
    <rect x="${x+w*0.12}" y="${y+h*0.1}" width="${w*0.76}" height="${h*0.42}" rx="${rx*0.7}" fill="url(#gloss)"/>
  </g>`
}
function pSquareOutline(x, y, w, color, sw) {
  return `<g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="${w}" rx="${w*0.14}" fill="none" stroke="url(#g-${color})" stroke-width="${sw}"/></g>`
}
function tri(cx, cy, s, rot = 0) {
  // upward equilateral-ish, radius s
  const pts = [[0, -s], [s * 0.92, s * 0.62], [-s * 0.92, s * 0.62]]
  const r = rot * Math.PI / 180
  return pts.map(([x, y]) => {
    const X = cx + x * Math.cos(r) - y * Math.sin(r)
    const Y = cy + x * Math.sin(r) + y * Math.cos(r)
    return `${X.toFixed(2)},${Y.toFixed(2)}`
  }).join(' ')
}
function pTriangle(cx, cy, s, color, rot = 0) {
  return `<g filter="url(#shadow)"><polygon points="${tri(cx, cy, s, rot)}" fill="url(#g-${color})" stroke="${LIGHT[color]}" stroke-width="${s*0.06}" stroke-opacity="0.6" stroke-linejoin="round"/></g>`
}
function pTriangleOutline(cx, cy, s, color, sw) {
  return `<g filter="url(#shadow)"><polygon points="${tri(cx, cy, s)}" fill="none" stroke="url(#g-${color})" stroke-width="${sw}" stroke-linejoin="round"/></g>`
}
function pDiamond(cx, cy, s, color) {
  const p = `${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`
  return `<g filter="url(#shadow)"><polygon points="${p}" fill="url(#g-${color})" stroke="${LIGHT[color]}" stroke-width="${s*0.06}" stroke-opacity="0.6" stroke-linejoin="round"/></g>`
}
function pDiamondOutline(cx, cy, s, color, sw) {
  const p = `${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`
  return `<g filter="url(#shadow)"><polygon points="${p}" fill="none" stroke="url(#g-${color})" stroke-width="${sw}" stroke-linejoin="round"/></g>`
}
function pText(cx, cy, size, txt, color) {
  return `<text x="${cx}" y="${cy}" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="${size}" fill="url(#t-${color})" text-anchor="middle" dominant-baseline="middle" filter="url(#shadow)">${txt}</text>`
}
function label(cx, cy, size, txt, color = '#cbd5e1') {
  return `<text x="${cx}" y="${cy}" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="${size}" fill="${color}" text-anchor="middle" dominant-baseline="middle">${txt}</text>`
}
function cell(x, y, w, h, highlight = false) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w*0.12}" fill="#0f172a" fill-opacity="0.85" stroke="${highlight ? '#f59e0b' : '#334155'}" stroke-width="${highlight ? 2 : 1.4}"/>`
}
function qmark(cx, cy, size) {
  const r = size / 2
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#0f172a" fill-opacity="0.6" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 5"/>
    ${pText(cx, cy + r * 0.06, r * 1.3, '?', 'amber')}`
}
function qmarkRect(x, y, w, h) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w*0.14}" fill="#0f172a" fill-opacity="0.6" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 5"/>
    ${pText(x + w/2, y + h/2, Math.min(w,h)*0.62, '?', 'amber')}`
}
function arrow(x, y, size, color = '#94a3b8') {
  return `<g fill="${color}"><rect x="${x}" y="${y - size*0.09}" width="${size*0.7}" height="${size*0.18}" rx="${size*0.09}"/><polygon points="${x+size*0.55},${y-size*0.32} ${x+size},${y} ${x+size*0.55},${y+size*0.32}"/></g>`
}

/* ---- wrappers ---- */
function wrap(dim, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${dim*3}" height="${dim*3}" viewBox="0 0 ${dim} ${dim}">
    ${defs(dim)}
    <rect width="${dim}" height="${dim}" rx="${dim*0.06}" fill="url(#bg)"/>
    <rect width="${dim}" height="${dim}" rx="${dim*0.06}" fill="url(#vignette)"/>
    ${inner}
    <rect x="1" y="1" width="${dim-2}" height="${dim-2}" rx="${dim*0.06}" fill="none" stroke="#475569" stroke-opacity="0.4" stroke-width="1.2"/>
  </svg>`
}
const Q = (inner) => wrap(200, inner)   // question
const O = (inner) => wrap(100, inner)   // option

/* =====================================================================
 * Question definitions — semantics preserved (option[0] is correct).
 * ===================================================================== */
const defsList = []

// helper: grid of 3x3 alternating circles for Q1
defsList.push({
  id: 1,
  q: Q(`
    ${[0,1,2].map(row => [0,1,2].map(col => {
      const cx = 50 + col*50, cy = 45 + row*50
      const last = row===2 && col===2
      if (last) return qmark(cx, cy, 40)
      const color = (row+col)%2===0 ? 'pink' : 'violet'
      return pCircle(cx, cy, 19, color)
    }).join('')).join('')}
  `),
  opts: [
    O(pCircle(50,50,30,'pink')),
    O(pCircle(50,50,30,'violet')),
    O(pCircle(50,50,30,'emerald')),
    O(pRect(22,22,56,56,'pink',10)),
  ],
})

// Q2 sequence square/triangle/circle -> repeats (square)
defsList.push({
  id: 2,
  q: Q(`
    ${label(100,26,13,'What comes next?')}
    ${pRect(24,70,42,42,'blue',8)}
    ${pTriangle(100,92,28,'emerald')}
    ${pCircle(168,92,24,'orange')}
    ${qmark(100,158,40)}
  `),
  opts: [
    O(pRect(24,24,52,52,'blue',9)),
    O(pCircle(50,50,28,'orange')),
    O(pTriangle(50,54,32,'emerald')),
    O(pRect(24,24,52,52,'pink',9)),
  ],
})

// Q3 rotation 0/90/180 -> 270
const rotTri = (cx, cy, rot, color='violet') =>
  `<g filter="url(#shadow)"><polygon points="${tri(cx,cy,26,rot)}" fill="url(#g-${color})" stroke="${LIGHT[color]}" stroke-width="1.6" stroke-opacity="0.6" stroke-linejoin="round"/></g>
   <circle cx="${cx + 13*Math.sin(rot*Math.PI/180)}" cy="${cy - 13*Math.cos(rot*Math.PI/180)}" r="6" fill="#fcd34d" stroke="#fef3c7" stroke-width="1"/>`
defsList.push({
  id: 3,
  q: Q(`
    ${label(100,24,12,'Continue the rotation')}
    ${rotTri(50,70,0)}
    ${rotTri(100,70,90)}
    ${rotTri(150,70,180)}
    ${qmark(100,145,44)}
  `),
  opts: [
    O(`${rotTri(50,50,270)}`),
    O(`${rotTri(50,50,0)}`),
    O(`${rotTri(50,50,180)}`),
    O(`${rotTri(50,50,90,'pink')}`),
  ],
})

// Q4 matrix: rows of increasing nested shapes -> 3 nested triangles
const nestTri = (cx, cy, n, color='emerald') => {
  let s = ''
  for (let i=0;i<n;i++){ s += pTriangleOutline(cx, cy, 26 - i*7, color, 2.4) }
  return s
}
defsList.push({
  id: 4,
  q: Q(`
    ${pCircle(45,45,15,'blue')}
    ${[0,1].map(i=>`<circle cx="100" cy="45" r="${15-i*7}" fill="none" stroke="url(#g-blue)" stroke-width="3"/>`).join('')}
    ${[0,1,2].map(i=>`<circle cx="155" cy="45" r="${15-i*5}" fill="none" stroke="url(#g-blue)" stroke-width="2.6"/>`).join('')}
    ${pRect(30,82,30,30,'pink',5)}
    ${[0,1].map(i=>`<rect x="${85+i*4}" y="${82+i*4}" width="${30-i*8}" height="${30-i*8}" rx="4" fill="none" stroke="url(#g-pink)" stroke-width="3"/>`).join('')}
    ${[0,1,2].map(i=>`<rect x="${140+i*3}" y="${82+i*3}" width="${30-i*6}" height="${30-i*6}" rx="3" fill="none" stroke="url(#g-pink)" stroke-width="2.6"/>`).join('')}
    ${pTriangleOutline(45,152,17,'emerald',3)}
    ${nestTri(100,152,2)}
    ${qmarkRect(133,128,48,48)}
  `),
  opts: [
    O(nestTri(50,52,3)),
    O(nestTri(50,52,1)),
    O(nestTri(50,52,2)),
    O(pCircle(50,50,26,'emerald')),
  ],
})

// Q5 counting -> 5
defsList.push({
  id: 5,
  q: Q(`
    ${[0,1,2].map(i=>pCircle(40+i*40,44,13,'orange')).join('')}
    ${qmark(160,44,30)}
    ${[0,1,2,3].map(i=>pRect(27+i*40,80,26,26,'emerald',4)).join('')}
    ${[0,1,2,3].map(i=>pTriangle(40+i*40,140,15,'pink')).join('')}
    ${pTriangle(40,180,15,'pink')}
    ${label(100,196,10,'How many circles should there be?')}
  `),
  opts: [
    O(pText(50,54,52,'5','orange')),
    O(pText(50,54,52,'4','orange')),
    O(pText(50,54,52,'6','orange')),
    O(pText(50,54,52,'3','orange')),
  ],
})

// Q6 mirror
const q6left = (ox, oy, s=1) => `
  ${pRect(ox+2, oy, 56*s, 36*s, 'violet', 5)}
  ${pCircle(ox+30*s, oy+18*s, 11*s, 'amber')}
  ${pCircle(ox+16*s, oy+18*s, 5*s, 'pink')}
  ${pTriangle(ox+22*s, oy+66*s, 20*s, 'blue')}
  ${pRect(ox+15*s, oy+58*s, 14*s, 14*s, 'emerald', 3)}
`
defsList.push({
  id: 6,
  q: Q(`
    ${label(100,22,12,'Mirror Pattern')}
    <line x1="100" y1="34" x2="100" y2="166" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 4" stroke-opacity="0.8"/>
    ${q6left(20,46)}
    ${qmarkRect(122,72,58,58)}
    ${label(100,186,11,'Mirror the left side','#94a3b8')}
  `),
  opts: [
    // correct: mirrored
    O(`${pRect(22,12,56,34,'violet',5)}${pCircle(50,29,11,'amber')}${pCircle(64,29,5,'pink')}${pTriangle(58,74,20,'blue')}${pRect(49,66,14,14,'emerald',3)}`),
    // same as left (not mirrored)
    O(`${pRect(22,12,56,34,'violet',5)}${pCircle(50,29,11,'amber')}${pCircle(36,29,5,'pink')}${pTriangle(42,74,20,'blue')}${pRect(37,66,14,14,'emerald',3)}`),
    O(`${pRect(22,12,56,34,'pink',5)}${pCircle(50,29,11,'amber')}${pCircle(64,29,5,'violet')}`),
    O(`${pRect(22,12,56,34,'violet',5)}${pCircle(50,29,11,'pink')}${pCircle(64,29,5,'amber')}`),
  ],
})

// Q7 color-number logic -> blue "2" triangle
const numRow = (y, shapeFn) => shapeFn(y)
defsList.push({
  id: 7,
  q: Q(`
    ${pCircle(42,44,22,'pink')}${label(42,46,20,'1','#ffffff')}
    ${pCircle(100,44,22,'blue')}${label(100,46,20,'2','#ffffff')}
    ${pCircle(158,44,22,'emerald')}${label(158,46,20,'3','#ffffff')}
    ${pRect(18,82,48,48,'blue',7)}${label(42,108,20,'2','#ffffff')}
    ${pRect(76,82,48,48,'emerald',7)}${label(100,108,20,'3','#ffffff')}
    ${pRect(134,82,48,48,'pink',7)}${label(158,108,20,'1','#ffffff')}
    ${pTriangle(42,168,24,'emerald')}${label(42,176,17,'3','#ffffff')}
    ${pTriangle(100,168,24,'pink')}${label(100,176,17,'1','#ffffff')}
    ${qmark(158,168,42)}
  `),
  opts: [
    O(`${pTriangle(50,56,32,'blue')}${label(50,62,22,'2','#ffffff')}`),
    O(`${pTriangle(50,56,32,'pink')}${label(50,62,22,'1','#ffffff')}`),
    O(`${pTriangle(50,56,32,'emerald')}${label(50,62,22,'3','#ffffff')}`),
    O(`${pTriangle(50,56,32,'blue')}${label(50,62,22,'3','#ffffff')}`),
  ],
})

// Q8 analogy square->circle, triangle->? (blue circle)
defsList.push({
  id: 8,
  q: Q(`
    ${label(100,22,12,'A is to B as C is to ?')}
    ${cell(16,34,64,64)}${label(32,46,11,'A','#94a3b8')}${pRect(30,54,40,32,'pink',4)}
    ${arrow(88,68,20)}
    ${cell(120,34,64,64)}${label(136,46,11,'B','#94a3b8')}${pCircle(152,74,20,'pink')}
    ${cell(16,116,64,64)}${label(32,128,11,'C','#94a3b8')}${pTriangle(48,156,20,'blue')}
    ${arrow(88,150,20)}
    ${qmarkRect(120,116,64,64)}
  `),
  opts: [
    O(pCircle(50,50,28,'blue')),
    O(pRect(24,30,52,40,'blue',4)),
    O(pTriangle(50,54,32,'pink')),
    O(pCircle(50,50,28,'pink')),
  ],
})

// Q9 overlapping circles regions -> 7
defsList.push({
  id: 9,
  q: Q(`
    ${label(100,26,13,'Overlapping Circles')}
    <g>
      <circle cx="62" cy="102" r="40" fill="url(#g-pink)" fill-opacity="0.55" stroke="${LIGHT.pink}" stroke-width="2"/>
      <circle cx="100" cy="102" r="40" fill="url(#g-blue)" fill-opacity="0.55" stroke="${LIGHT.blue}" stroke-width="2"/>
      <circle cx="138" cy="102" r="40" fill="url(#g-emerald)" fill-opacity="0.55" stroke="${LIGHT.emerald}" stroke-width="2"/>
    </g>
    ${label(100,170,12,'How many distinct')}
    ${label(100,186,12,'regions are created?')}
  `),
  opts: [
    O(pText(50,54,50,'7','amber')),
    O(pText(50,54,50,'5','amber')),
    O(pText(50,54,50,'6','amber')),
    O(pText(50,54,50,'8','amber')),
  ],
})

// Q10 shape-rotation grid -> blue square
const shapeByName = (cx, cy, name) => {
  if (name==='circle') return pCircle(cx,cy,14,'pink')
  if (name==='square') return pRect(cx-14,cy-14,28,28,'blue',4)
  if (name==='triangle') return pTriangle(cx,cy,15,'emerald')
}
const gridOrder = [
  ['circle','square','triangle'],
  ['square','triangle','circle'],
  ['triangle','circle',null],
]
defsList.push({
  id: 10,
  q: Q(`
    ${gridOrder.map((row,r)=>row.map((name,c)=>{
      const x=25+c*55, y=25+r*55
      if(name===null) return qmarkRect(x-25,y-25,50,50)
      return `${cell(x-25,y-25,50,50)}${shapeByName(x,y,name)}`
    }).join('')).join('')}
  `),
  opts: [
    O(pRect(24,24,52,52,'blue',6)),
    O(pCircle(50,50,26,'pink')),
    O(pTriangle(50,54,30,'emerald')),
    O(pRect(24,24,52,52,'pink',6)),
  ],
})

// Q11 increasing dots 1,2,3 -> 4
const dotBox = (x, coords, color='orange') => `${cell(x,70,42,60)}${coords.map(([dx,dy])=>pCircle(x+dx,dy,7,color)).join('')}`
defsList.push({
  id: 11,
  q: Q(`
    ${dotBox(10,[[21,100]])}
    ${dotBox(57,[[13,90],[29,110]])}
    ${dotBox(104,[[11,86],[31,86],[21,114]])}
    ${qmarkRect(150,70,44,60)}
    ${label(100,168,13,'What comes next?')}
  `),
  opts: [
    O(`${[[33,33],[67,33],[33,67],[67,67]].map(([x,y])=>pCircle(x,y,9,'orange')).join('')}`),
    O(`${[[33,33],[67,33],[50,67]].map(([x,y])=>pCircle(x,y,9,'orange')).join('')}`),
    O(`${[[50,33],[50,67]].map(([x,y])=>pCircle(x,y,9,'orange')).join('')}`),
    O(pCircle(50,50,16,'orange')),
  ],
})

// Q12 fold/mirror -> correct mirrored
defsList.push({
  id: 12,
  q: Q(`
    ${label(100,22,12,'Folding Pattern')}
    ${cell(40,44,120,56)}
    <line x1="100" y1="44" x2="100" y2="100" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 4" stroke-opacity="0.85"/>
    ${pCircle(63,72,11,'pink')}
    ${pRect(78,60,14,24,'blue',3)}
    ${label(100,130,11,'If folded along the dotted line,')}
    ${label(100,146,11,'what appears on the right?')}
  `),
  opts: [
    O(`${cell(18,26,64,50)}${pRect(28,38,14,24,'blue',3)}${pCircle(62,50,11,'pink')}`),
    O(`${cell(18,26,64,50)}${pCircle(62,50,11,'pink')}${pRect(54,38,14,24,'blue',3)}`),
    O(`${cell(18,26,64,50)}${pCircle(38,50,11,'pink')}${pRect(54,38,14,24,'blue',3)}`),
    O(`${cell(18,26,64,50)}${pCircle(38,50,11,'blue')}${pRect(54,38,14,24,'pink',3)}`),
  ],
})

// Q13 count triangles -> 9
defsList.push({
  id: 13,
  q: Q(`
    ${label(100,26,13,'Count All Triangles')}
    <g fill="none" stroke="url(#g-violet)" stroke-width="3" stroke-linejoin="round">
      <polygon points="100,44 158,150 42,150"/>
    </g>
    <g stroke="${LIGHT.violet}" stroke-width="2.4" stroke-linecap="round">
      <line x1="71" y1="97" x2="129" y2="97"/>
      <line x1="100" y1="44" x2="71" y2="97"/>
      <line x1="100" y1="44" x2="129" y2="97"/>
      <line x1="100" y1="150" x2="71" y2="97"/>
      <line x1="100" y1="150" x2="129" y2="97"/>
    </g>
    ${label(100,176,12,'How many can you find?')}
  `),
  opts: [
    O(pText(50,54,50,'9','violet')),
    O(pText(50,54,50,'6','violet')),
    O(pText(50,54,50,'7','violet')),
    O(pText(50,54,50,'8','violet')),
  ],
})

// Q14 odd one out -> D (diamond with dot, others are outline+filled matching)
defsList.push({
  id: 14,
  q: Q(`
    ${label(100,24,12,"Which shape doesn't belong?")}
    ${cell(28,42,62,62)}${label(40,54,11,'A','#94a3b8')}${pRing(59,74,16,'pink',6)}
    ${cell(110,42,62,62)}${label(122,54,11,'B','#94a3b8')}${pSquareOutline(126,58,30,'blue',6)}
    ${cell(28,114,62,62)}${label(40,126,11,'C','#94a3b8')}${pTriangleOutline(59,150,18,'emerald',6)}
    ${cell(110,114,62,62)}${label(122,126,11,'D','#94a3b8')}${pDiamondOutline(141,146,18,'orange',5)}${pCircle(141,146,7,'orange')}
  `),
  opts: [
    O(pText(50,58,48,'D','orange')),
    O(pText(50,58,48,'A','pink')),
    O(pText(50,58,48,'B','blue')),
    O(pText(50,58,48,'C','emerald')),
  ],
})

// Q15 complex 3x3 shuffled shapes -> correct arrangement
const trioAt = (ox, oy, order, sc=1) => {
  const spots = [[14,14],[41,14],[27,40]]
  const draw = { c:(x,y)=>pCircle(ox+x*sc,oy+y*sc,7*sc,'pink'), s:(x,y)=>pRect(ox+x*sc-7*sc,oy+y*sc-7*sc,14*sc,14*sc,'blue',2), t:(x,y)=>pTriangle(ox+x*sc,oy+y*sc,8*sc,'emerald') }
  return order.map((k,i)=>draw[k](spots[i][0],spots[i][1])).join('')
}
defsList.push({
  id: 15,
  q: Q(`
    ${[
      ['c','s','t'],['s','t','c'],['t','c','s'],
      ['s','c','t'],['t','s','c'],['c','t','s'],
      ['t','c','s'],['c','s','t'],null,
    ].map((order,i)=>{
      const r=Math.floor(i/3), c=i%3
      const x=12+c*60, y=12+r*60
      if(order===null) return qmarkRect(x,y,54,54)
      return `${cell(x,y,54,54)}${trioAt(x+4,y+4,order,0.82)}`
    }).join('')}
  `),
  opts: [
    O(`${trioAt(18,18,['s','t','c'],1.15)}`),
    O(`${trioAt(18,18,['c','s','t'],1.15)}`),
    O(`${trioAt(18,18,['t','c','s'],1.15)}`),
    O(`${trioAt(18,18,['c','t','s'],1.15)}`),
  ],
})

/* ---- render all ---- */
async function run() {
  for (const d of defsList) {
    await sharp(Buffer.from(d.q)).webp({ quality: 92 }).toFile(path.join(OUT, `q${d.id}.webp`))
    for (let i = 0; i < d.opts.length; i++) {
      await sharp(Buffer.from(d.opts[i])).webp({ quality: 92 }).toFile(path.join(OUT, `q${d.id}-o${i}.webp`))
    }
    console.log(`rendered q${d.id} (+${d.opts.length} options)`)
  }
  console.log('DONE ->', OUT)
}
run().catch(e => { console.error(e); process.exit(1) })
