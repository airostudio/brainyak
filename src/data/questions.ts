export interface Question {
  id: number
  type: 'pattern' | 'sequence' | 'spatial' | 'logic' | 'analogy'
  difficulty: 'easy' | 'medium' | 'hard'
  questionSvg: string
  options: string[]
  correctAnswer: number
  timeLimit: number // seconds
}

// SVG Pattern Generators with professional styling
const createPatternSvg = (shapes: string, bg: string = '#0f172a') => `
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="200" height="200" fill="url(#bgGrad)" rx="12"/>
    <rect x="2" y="2" width="196" height="196" fill="none" stroke="#334155" stroke-width="1" rx="11"/>
    ${shapes}
  </svg>
`

const createOptionSvg = (shapes: string, bg: string = '#1e293b') => `
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="optBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" fill="url(#optBgGrad)" rx="10"/>
    <rect x="1" y="1" width="98" height="98" fill="none" stroke="#334155" stroke-width="1" rx="9"/>
    ${shapes}
  </svg>
`

export const questions: Question[] = [
  // Question 1: Simple Pattern Completion (Easy)
  {
    id: 1,
    type: 'pattern',
    difficulty: 'easy',
    questionSvg: createPatternSvg(`
      <circle cx="50" cy="50" r="18" fill="#ec4899" stroke="#f472b6" stroke-width="2"/>
      <circle cx="100" cy="50" r="18" fill="#8b5cf6" stroke="#a78bfa" stroke-width="2"/>
      <circle cx="150" cy="50" r="18" fill="#ec4899" stroke="#f472b6" stroke-width="2"/>
      <circle cx="50" cy="100" r="18" fill="#8b5cf6" stroke="#a78bfa" stroke-width="2"/>
      <circle cx="100" cy="100" r="18" fill="#ec4899" stroke="#f472b6" stroke-width="2"/>
      <circle cx="150" cy="100" r="18" fill="#8b5cf6" stroke="#a78bfa" stroke-width="2"/>
      <circle cx="50" cy="150" r="18" fill="#ec4899" stroke="#f472b6" stroke-width="2"/>
      <circle cx="100" cy="150" r="18" fill="#8b5cf6" stroke="#a78bfa" stroke-width="2"/>
      <circle cx="150" cy="150" r="18" fill="none" stroke="#fbbf24" stroke-width="3" stroke-dasharray="6,4"/>
      <text x="150" y="156" font-size="28" fill="#fbbf24" text-anchor="middle" font-weight="bold" font-family="system-ui, sans-serif">?</text>
    `),
    options: [
      createOptionSvg(`<circle cx="50" cy="50" r="22" fill="#ec4899" stroke="#f472b6" stroke-width="2"/>`),
      createOptionSvg(`<circle cx="50" cy="50" r="22" fill="#8b5cf6" stroke="#a78bfa" stroke-width="2"/>`),
      createOptionSvg(`<circle cx="50" cy="50" r="22" fill="#22c55e" stroke="#4ade80" stroke-width="2"/>`),
      createOptionSvg(`<rect x="28" y="28" width="44" height="44" fill="#ec4899" stroke="#f472b6" stroke-width="2" rx="4"/>`),
    ],
    correctAnswer: 0,
    timeLimit: 30,
  },

  // Question 2: Shape Sequence (Easy)
  {
    id: 2,
    type: 'sequence',
    difficulty: 'easy',
    questionSvg: createPatternSvg(`
      <rect x="22" y="75" width="42" height="42" fill="#3b82f6" stroke="#60a5fa" stroke-width="2" rx="4"/>
      <polygon points="100,58 132,118 68,118" fill="#22c55e" stroke="#4ade80" stroke-width="2"/>
      <circle cx="170" cy="97" r="24" fill="#f97316" stroke="#fb923c" stroke-width="2"/>
      <text x="100" y="175" font-size="16" fill="#94a3b8" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="500">What comes next?</text>
      <circle cx="100" cy="155" r="16" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="5,3"/>
      <text x="100" y="161" font-size="20" fill="#fbbf24" text-anchor="middle" font-weight="bold">?</text>
    `),
    options: [
      createOptionSvg(`<rect x="28" y="28" width="44" height="44" fill="#3b82f6" stroke="#60a5fa" stroke-width="2" rx="4"/>`),
      createOptionSvg(`<circle cx="50" cy="50" r="24" fill="#f97316" stroke="#fb923c" stroke-width="2"/>`),
      createOptionSvg(`<polygon points="50,22 78,78 22,78" fill="#22c55e" stroke="#4ade80" stroke-width="2"/>`),
      createOptionSvg(`<rect x="28" y="28" width="44" height="44" fill="#ec4899" stroke="#f472b6" stroke-width="2" rx="4"/>`),
    ],
    correctAnswer: 0,
    timeLimit: 30,
  },

  // Question 3: Rotation Pattern (Medium)
  {
    id: 3,
    type: 'spatial',
    difficulty: 'medium',
    questionSvg: createPatternSvg(`
      <g transform="translate(50,55)">
        <polygon points="0,-28 24,18 -24,18" fill="#8b5cf6" stroke="#a78bfa" stroke-width="2"/>
        <circle cx="0" cy="-10" r="7" fill="#fbbf24" stroke="#fcd34d" stroke-width="1.5"/>
      </g>
      <g transform="translate(100,55) rotate(90)">
        <polygon points="0,-28 24,18 -24,18" fill="#8b5cf6" stroke="#a78bfa" stroke-width="2"/>
        <circle cx="0" cy="-10" r="7" fill="#fbbf24" stroke="#fcd34d" stroke-width="1.5"/>
      </g>
      <g transform="translate(150,55) rotate(180)">
        <polygon points="0,-28 24,18 -24,18" fill="#8b5cf6" stroke="#a78bfa" stroke-width="2"/>
        <circle cx="0" cy="-10" r="7" fill="#fbbf24" stroke="#fcd34d" stroke-width="1.5"/>
      </g>
      <rect x="70" y="100" width="60" height="50" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6,4" rx="6"/>
      <text x="100" y="132" font-size="28" fill="#fbbf24" text-anchor="middle" font-weight="bold" font-family="system-ui, sans-serif">?</text>
      <text x="100" y="178" font-size="14" fill="#94a3b8" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="500">Continue the rotation</text>
    `),
    options: [
      createOptionSvg(`<g transform="translate(50,50) rotate(270)"><polygon points="0,-24 20,16 -20,16" fill="#8b5cf6" stroke="#a78bfa" stroke-width="2"/><circle cx="0" cy="-8" r="6" fill="#fbbf24" stroke="#fcd34d" stroke-width="1.5"/></g>`),
      createOptionSvg(`<g transform="translate(50,50) rotate(0)"><polygon points="0,-24 20,16 -20,16" fill="#8b5cf6" stroke="#a78bfa" stroke-width="2"/><circle cx="0" cy="-8" r="6" fill="#fbbf24" stroke="#fcd34d" stroke-width="1.5"/></g>`),
      createOptionSvg(`<g transform="translate(50,50) rotate(180)"><polygon points="0,-24 20,16 -20,16" fill="#8b5cf6" stroke="#a78bfa" stroke-width="2"/><circle cx="0" cy="-8" r="6" fill="#fbbf24" stroke="#fcd34d" stroke-width="1.5"/></g>`),
      createOptionSvg(`<g transform="translate(50,50) rotate(90)"><polygon points="0,-24 20,16 -20,16" fill="#ec4899" stroke="#f472b6" stroke-width="2"/><circle cx="0" cy="-8" r="6" fill="#fbbf24" stroke="#fcd34d" stroke-width="1.5"/></g>`),
    ],
    correctAnswer: 0,
    timeLimit: 45,
  },

  // Question 4: Matrix Pattern (Medium)
  {
    id: 4,
    type: 'pattern',
    difficulty: 'medium',
    questionSvg: createPatternSvg(`
      <rect x="20" y="20" width="50" height="50" fill="#3b82f6" rx="5"/>
      <rect x="75" y="20" width="50" height="50" fill="#3b82f6" rx="5"/>
      <rect x="130" y="20" width="50" height="50" fill="#3b82f6" rx="5"/>

      <circle cx="45" cy="45" r="15" fill="#fbbf24"/>
      <circle cx="100" cy="45" r="15" fill="#fbbf24"/>
      <circle cx="100" cy="45" r="8" fill="#3b82f6"/>
      <circle cx="155" cy="45" r="15" fill="#fbbf24"/>
      <circle cx="155" cy="45" r="8" fill="#3b82f6"/>
      <circle cx="155" cy="45" r="4" fill="#fbbf24"/>

      <rect x="20" y="80" width="50" height="50" fill="#ec4899" rx="5"/>
      <rect x="75" y="80" width="50" height="50" fill="#ec4899" rx="5"/>
      <rect x="130" y="80" width="50" height="50" fill="#ec4899" rx="5"/>

      <rect x="35" y="95" width="20" height="20" fill="#fbbf24"/>
      <rect x="90" y="95" width="20" height="20" fill="#fbbf24"/>
      <rect x="93" y="98" width="14" height="14" fill="#ec4899"/>
      <rect x="145" y="95" width="20" height="20" fill="#fbbf24"/>
      <rect x="148" y="98" width="14" height="14" fill="#ec4899"/>
      <rect x="150" y="100" width="10" height="10" fill="#fbbf24"/>

      <rect x="20" y="140" width="50" height="50" fill="#22c55e" rx="5"/>
      <rect x="75" y="140" width="50" height="50" fill="#22c55e" rx="5"/>
      <rect x="130" y="140" width="50" height="50" stroke="#fbbf24" stroke-width="3" fill="none" rx="5"/>
      <text x="155" y="172" font-size="30" fill="#fbbf24" text-anchor="middle">?</text>

      <polygon points="45,152 57,178 33,178" fill="#fbbf24"/>
      <polygon points="100,152 112,178 88,178" fill="#fbbf24"/>
      <polygon points="100,158 106,172 94,172" fill="#22c55e"/>
    `),
    options: [
      createOptionSvg(`<rect x="15" y="15" width="70" height="70" fill="#22c55e" rx="5"/><polygon points="50,27 67,68 33,68" fill="#fbbf24"/><polygon points="50,35 58,55 42,55" fill="#22c55e"/><polygon points="50,40 54,50 46,50" fill="#fbbf24"/>`),
      createOptionSvg(`<rect x="15" y="15" width="70" height="70" fill="#22c55e" rx="5"/><polygon points="50,27 67,68 33,68" fill="#fbbf24"/>`),
      createOptionSvg(`<rect x="15" y="15" width="70" height="70" fill="#22c55e" rx="5"/><polygon points="50,27 67,68 33,68" fill="#fbbf24"/><polygon points="50,35 58,55 42,55" fill="#22c55e"/>`),
      createOptionSvg(`<rect x="15" y="15" width="70" height="70" fill="#22c55e" rx="5"/><circle cx="50" cy="50" r="20" fill="#fbbf24"/>`),
    ],
    correctAnswer: 0,
    timeLimit: 60,
  },

  // Question 5: Number of Shapes (Easy)
  {
    id: 5,
    type: 'logic',
    difficulty: 'easy',
    questionSvg: createPatternSvg(`
      <circle cx="40" cy="45" r="14" fill="#f97316" stroke="#fb923c" stroke-width="2"/>
      <circle cx="80" cy="45" r="14" fill="#f97316" stroke="#fb923c" stroke-width="2"/>
      <circle cx="120" cy="45" r="14" fill="#f97316" stroke="#fb923c" stroke-width="2"/>
      <circle cx="160" cy="45" r="14" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="5,3"/>
      <text x="160" y="51" font-size="20" fill="#fbbf24" text-anchor="middle" font-weight="bold">?</text>

      <rect x="27" y="80" width="26" height="26" fill="#22c55e" stroke="#4ade80" stroke-width="2" rx="3"/>
      <rect x="67" y="80" width="26" height="26" fill="#22c55e" stroke="#4ade80" stroke-width="2" rx="3"/>
      <rect x="107" y="80" width="26" height="26" fill="#22c55e" stroke="#4ade80" stroke-width="2" rx="3"/>
      <rect x="147" y="80" width="26" height="26" fill="#22c55e" stroke="#4ade80" stroke-width="2" rx="3"/>

      <polygon points="40,125 54,155 26,155" fill="#ec4899" stroke="#f472b6" stroke-width="2"/>
      <polygon points="80,125 94,155 66,155" fill="#ec4899" stroke="#f472b6" stroke-width="2"/>
      <polygon points="120,125 134,155 106,155" fill="#ec4899" stroke="#f472b6" stroke-width="2"/>
      <polygon points="160,125 174,155 146,155" fill="#ec4899" stroke="#f472b6" stroke-width="2"/>
      <polygon points="40,165 54,195 26,195" fill="#ec4899" stroke="#f472b6" stroke-width="2"/>

      <text x="100" y="188" font-size="11" fill="#94a3b8" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="500">How many circles should there be?</text>
    `),
    options: [
      createOptionSvg(`<text x="50" y="62" font-size="36" fill="#f97316" text-anchor="middle" font-weight="bold" font-family="system-ui, sans-serif">5</text>`),
      createOptionSvg(`<text x="50" y="62" font-size="36" fill="#f97316" text-anchor="middle" font-weight="bold" font-family="system-ui, sans-serif">4</text>`),
      createOptionSvg(`<text x="50" y="62" font-size="36" fill="#f97316" text-anchor="middle" font-weight="bold" font-family="system-ui, sans-serif">6</text>`),
      createOptionSvg(`<text x="50" y="62" font-size="36" fill="#f97316" text-anchor="middle" font-weight="bold" font-family="system-ui, sans-serif">3</text>`),
    ],
    correctAnswer: 0,
    timeLimit: 30,
  },

  // Question 6: Mirror Pattern (Medium)
  {
    id: 6,
    type: 'spatial',
    difficulty: 'medium',
    questionSvg: createPatternSvg(`
      <text x="100" y="22" font-size="12" fill="#cbd5e1" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="600">Mirror Pattern</text>
      <line x1="100" y1="35" x2="100" y2="165" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6,4"/>

      <rect x="22" y="45" width="58" height="38" fill="#8b5cf6" stroke="#a78bfa" stroke-width="2" rx="5"/>
      <circle cx="51" cy="64" r="11" fill="#fbbf24" stroke="#fcd34d" stroke-width="1.5"/>
      <circle cx="37" cy="64" r="5" fill="#ec4899" stroke="#f472b6" stroke-width="1"/>

      <polygon points="42,95 75,135 22,135" fill="#3b82f6" stroke="#60a5fa" stroke-width="2"/>
      <rect x="37" y="115" width="14" height="14" fill="#22c55e" stroke="#4ade80" stroke-width="1.5" rx="2"/>

      <rect x="120" y="70" width="60" height="50" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6,4" rx="6"/>
      <text x="150" y="102" font-size="26" fill="#fbbf24" text-anchor="middle" font-weight="bold" font-family="system-ui, sans-serif">?</text>
      <text x="100" y="185" font-size="11" fill="#94a3b8" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="500">Mirror the left side</text>
    `),
    options: [
      createOptionSvg(`
        <rect x="20" y="12" width="60" height="38" fill="#8b5cf6" stroke="#a78bfa" stroke-width="2" rx="5"/>
        <circle cx="50" cy="31" r="11" fill="#fbbf24" stroke="#fcd34d" stroke-width="1.5"/>
        <circle cx="64" cy="31" r="5" fill="#ec4899" stroke="#f472b6" stroke-width="1"/>
        <polygon points="58,55 25,92 78,92" fill="#3b82f6" stroke="#60a5fa" stroke-width="2"/>
        <rect x="49" y="73" width="14" height="14" fill="#22c55e" stroke="#4ade80" stroke-width="1.5" rx="2"/>
      `),
      createOptionSvg(`
        <rect x="20" y="12" width="60" height="38" fill="#8b5cf6" stroke="#a78bfa" stroke-width="2" rx="5"/>
        <circle cx="50" cy="31" r="11" fill="#fbbf24" stroke="#fcd34d" stroke-width="1.5"/>
        <circle cx="36" cy="31" r="5" fill="#ec4899" stroke="#f472b6" stroke-width="1"/>
        <polygon points="42,55 75,92 22,92" fill="#3b82f6" stroke="#60a5fa" stroke-width="2"/>
        <rect x="37" y="73" width="14" height="14" fill="#22c55e" stroke="#4ade80" stroke-width="1.5" rx="2"/>
      `),
      createOptionSvg(`
        <rect x="20" y="12" width="60" height="38" fill="#ec4899" stroke="#f472b6" stroke-width="2" rx="5"/>
        <circle cx="50" cy="31" r="11" fill="#fbbf24" stroke="#fcd34d" stroke-width="1.5"/>
        <circle cx="64" cy="31" r="5" fill="#8b5cf6" stroke="#a78bfa" stroke-width="1"/>
      `),
      createOptionSvg(`
        <rect x="20" y="12" width="60" height="38" fill="#8b5cf6" stroke="#a78bfa" stroke-width="2" rx="5"/>
        <circle cx="50" cy="31" r="11" fill="#ec4899" stroke="#f472b6" stroke-width="1.5"/>
        <circle cx="64" cy="31" r="5" fill="#fbbf24" stroke="#fcd34d" stroke-width="1"/>
      `),
    ],
    correctAnswer: 0,
    timeLimit: 45,
  },

  // Question 7: Color Pattern Logic (Medium)
  {
    id: 7,
    type: 'logic',
    difficulty: 'medium',
    questionSvg: createPatternSvg(`
      <circle cx="40" cy="40" r="25" fill="#ec4899"/>
      <circle cx="100" cy="40" r="25" fill="#3b82f6"/>
      <circle cx="160" cy="40" r="25" fill="#22c55e"/>

      <text x="40" y="48" font-size="24" fill="white" text-anchor="middle" font-weight="bold">1</text>
      <text x="100" y="48" font-size="24" fill="white" text-anchor="middle" font-weight="bold">2</text>
      <text x="160" y="48" font-size="24" fill="white" text-anchor="middle" font-weight="bold">3</text>

      <rect x="15" y="80" width="50" height="50" fill="#3b82f6" rx="5"/>
      <rect x="75" y="80" width="50" height="50" fill="#22c55e" rx="5"/>
      <rect x="135" y="80" width="50" height="50" fill="#ec4899" rx="5"/>

      <text x="40" y="112" font-size="24" fill="white" text-anchor="middle" font-weight="bold">2</text>
      <text x="100" y="112" font-size="24" fill="white" text-anchor="middle" font-weight="bold">3</text>
      <text x="160" y="112" font-size="24" fill="white" text-anchor="middle" font-weight="bold">1</text>

      <polygon points="40,150 65,190 15,190" fill="#22c55e"/>
      <polygon points="100,150 125,190 75,190" fill="#ec4899"/>
      <polygon points="160,150 185,190 135,190" stroke="#fbbf24" stroke-width="3" fill="none"/>

      <text x="40" y="178" font-size="20" fill="white" text-anchor="middle" font-weight="bold">3</text>
      <text x="100" y="178" font-size="20" fill="white" text-anchor="middle" font-weight="bold">1</text>
      <text x="160" y="178" font-size="30" fill="#fbbf24" text-anchor="middle" font-weight="bold">?</text>
    `),
    options: [
      createOptionSvg(`<polygon points="50,20 80,80 20,80" fill="#3b82f6"/><text x="50" y="60" font-size="24" fill="white" text-anchor="middle" font-weight="bold">2</text>`),
      createOptionSvg(`<polygon points="50,20 80,80 20,80" fill="#ec4899"/><text x="50" y="60" font-size="24" fill="white" text-anchor="middle" font-weight="bold">1</text>`),
      createOptionSvg(`<polygon points="50,20 80,80 20,80" fill="#22c55e"/><text x="50" y="60" font-size="24" fill="white" text-anchor="middle" font-weight="bold">3</text>`),
      createOptionSvg(`<polygon points="50,20 80,80 20,80" fill="#3b82f6"/><text x="50" y="60" font-size="24" fill="white" text-anchor="middle" font-weight="bold">3</text>`),
    ],
    correctAnswer: 0,
    timeLimit: 60,
  },

  // Question 8: Shape Transformation (Hard)
  {
    id: 8,
    type: 'analogy',
    difficulty: 'hard',
    questionSvg: createPatternSvg(`
      <text x="100" y="22" font-size="11" fill="#cbd5e1" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="600">A is to B as C is to ?</text>

      <rect x="18" y="35" width="65" height="65" fill="#0f172a" stroke="#475569" stroke-width="2" rx="6"/>
      <text x="50" y="48" font-size="11" fill="#94a3b8" text-anchor="middle" font-weight="600" font-family="system-ui, sans-serif">A</text>
      <rect x="28" y="55" width="44" height="35" fill="#ec4899" stroke="#f472b6" stroke-width="1.5" rx="2"/>

      <text x="100" y="70" font-size="20" fill="#fbbf24" font-weight="bold" font-family="system-ui, sans-serif">→</text>

      <rect x="117" y="35" width="65" height="65" fill="#0f172a" stroke="#475569" stroke-width="2" rx="6"/>
      <text x="150" y="48" font-size="11" fill="#94a3b8" text-anchor="middle" font-weight="600" font-family="system-ui, sans-serif">B</text>
      <circle cx="150" cy="75" r="22" fill="#ec4899" stroke="#f472b6" stroke-width="1.5"/>

      <rect x="18" y="115" width="65" height="65" fill="#0f172a" stroke="#475569" stroke-width="2" rx="6"/>
      <text x="50" y="128" font-size="11" fill="#94a3b8" text-anchor="middle" font-weight="600" font-family="system-ui, sans-serif">C</text>
      <polygon points="50,140 72,170 28,170" fill="#3b82f6" stroke="#60a5fa" stroke-width="1.5"/>

      <text x="100" y="150" font-size="20" fill="#fbbf24" font-weight="bold" font-family="system-ui, sans-serif">→</text>

      <rect x="117" y="115" width="65" height="65" fill="#0f172a" stroke="#fbbf24" stroke-width="2.5" rx="6"/>
      <text x="150" y="156" font-size="26" fill="#fbbf24" text-anchor="middle" font-weight="bold" font-family="system-ui, sans-serif">?</text>
    `),
    options: [
      createOptionSvg(`<circle cx="50" cy="50" r="24" fill="#3b82f6" stroke="#60a5fa" stroke-width="2"/>`),
      createOptionSvg(`<rect x="24" y="30" width="52" height="40" fill="#3b82f6" stroke="#60a5fa" stroke-width="2" rx="3"/>`),
      createOptionSvg(`<polygon points="50,18 80,72 20,72" fill="#ec4899" stroke="#f472b6" stroke-width="2"/>`),
      createOptionSvg(`<circle cx="50" cy="50" r="24" fill="#ec4899" stroke="#f472b6" stroke-width="2"/>`),
    ],
    correctAnswer: 0,
    timeLimit: 60,
  },

  // Question 9: Overlapping Shapes (Hard)
  {
    id: 9,
    type: 'spatial',
    difficulty: 'hard',
    questionSvg: createPatternSvg(`
      <text x="100" y="28" font-size="12" fill="#cbd5e1" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="600">Overlapping Circles</text>

      <circle cx="60" cy="100" r="38" fill="#ec4899" fill-opacity="0.6" stroke="#f472b6" stroke-width="2"/>
      <circle cx="100" cy="100" r="38" fill="#3b82f6" fill-opacity="0.6" stroke="#60a5fa" stroke-width="2"/>
      <circle cx="140" cy="100" r="38" fill="#22c55e" fill-opacity="0.6" stroke="#4ade80" stroke-width="2"/>

      <text x="100" y="168" font-size="12" fill="#94a3b8" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="500">How many distinct regions</text>
      <text x="100" y="184" font-size="12" fill="#94a3b8" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="500">are created?</text>
    `),
    options: [
      createOptionSvg(`<text x="50" y="62" font-size="36" fill="#fbbf24" text-anchor="middle" font-weight="bold" font-family="system-ui, sans-serif">7</text>`),
      createOptionSvg(`<text x="50" y="62" font-size="36" fill="#fbbf24" text-anchor="middle" font-weight="bold" font-family="system-ui, sans-serif">5</text>`),
      createOptionSvg(`<text x="50" y="62" font-size="36" fill="#fbbf24" text-anchor="middle" font-weight="bold" font-family="system-ui, sans-serif">6</text>`),
      createOptionSvg(`<text x="50" y="62" font-size="36" fill="#fbbf24" text-anchor="middle" font-weight="bold" font-family="system-ui, sans-serif">8</text>`),
    ],
    correctAnswer: 0,
    timeLimit: 60,
  },

  // Question 10: Pattern Completion Grid (Medium)
  {
    id: 10,
    type: 'pattern',
    difficulty: 'medium',
    questionSvg: createPatternSvg(`
      <rect x="20" y="20" width="50" height="50" fill="#334155" stroke="#64748b" rx="5"/>
      <circle cx="45" cy="45" r="15" fill="#ec4899"/>

      <rect x="75" y="20" width="50" height="50" fill="#334155" stroke="#64748b" rx="5"/>
      <rect x="90" y="35" width="20" height="20" fill="#3b82f6"/>

      <rect x="130" y="20" width="50" height="50" fill="#334155" stroke="#64748b" rx="5"/>
      <polygon points="155,30 170,55 140,55" fill="#22c55e"/>

      <rect x="20" y="75" width="50" height="50" fill="#334155" stroke="#64748b" rx="5"/>
      <rect x="35" y="90" width="20" height="20" fill="#3b82f6"/>

      <rect x="75" y="75" width="50" height="50" fill="#334155" stroke="#64748b" rx="5"/>
      <polygon points="100,85 115,110 85,110" fill="#22c55e"/>

      <rect x="130" y="75" width="50" height="50" fill="#334155" stroke="#64748b" rx="5"/>
      <circle cx="155" cy="100" r="15" fill="#ec4899"/>

      <rect x="20" y="130" width="50" height="50" fill="#334155" stroke="#64748b" rx="5"/>
      <polygon points="45,140 60,165 30,165" fill="#22c55e"/>

      <rect x="75" y="130" width="50" height="50" fill="#334155" stroke="#64748b" rx="5"/>
      <circle cx="100" cy="155" r="15" fill="#ec4899"/>

      <rect x="130" y="130" width="50" height="50" fill="#334155" stroke="#fbbf24" stroke-width="3" rx="5"/>
      <text x="155" y="162" font-size="30" fill="#fbbf24" text-anchor="middle">?</text>
    `),
    options: [
      createOptionSvg(`<rect x="25" y="25" width="50" height="50" fill="#334155" stroke="#64748b" rx="5"/><rect x="40" y="40" width="20" height="20" fill="#3b82f6"/>`),
      createOptionSvg(`<rect x="25" y="25" width="50" height="50" fill="#334155" stroke="#64748b" rx="5"/><circle cx="50" cy="50" r="15" fill="#ec4899"/>`),
      createOptionSvg(`<rect x="25" y="25" width="50" height="50" fill="#334155" stroke="#64748b" rx="5"/><polygon points="50,35 65,60 35,60" fill="#22c55e"/>`),
      createOptionSvg(`<rect x="25" y="25" width="50" height="50" fill="#334155" stroke="#64748b" rx="5"/><rect x="40" y="40" width="20" height="20" fill="#ec4899"/>`),
    ],
    correctAnswer: 0,
    timeLimit: 45,
  },

  // Question 11: Increasing Complexity (Medium)
  {
    id: 11,
    type: 'sequence',
    difficulty: 'medium',
    questionSvg: createPatternSvg(`
      <rect x="10" y="70" width="40" height="60" fill="#334155" stroke="#64748b" rx="5"/>
      <circle cx="30" cy="100" r="10" fill="#f97316"/>

      <rect x="55" y="70" width="40" height="60" fill="#334155" stroke="#64748b" rx="5"/>
      <circle cx="67" cy="90" r="8" fill="#f97316"/>
      <circle cx="83" cy="110" r="8" fill="#f97316"/>

      <rect x="100" y="70" width="40" height="60" fill="#334155" stroke="#64748b" rx="5"/>
      <circle cx="110" cy="85" r="7" fill="#f97316"/>
      <circle cx="130" cy="85" r="7" fill="#f97316"/>
      <circle cx="120" cy="115" r="7" fill="#f97316"/>

      <rect x="145" y="70" width="45" height="60" fill="#334155" stroke="#fbbf24" stroke-width="3" rx="5"/>
      <text x="167" y="108" font-size="30" fill="#fbbf24" text-anchor="middle">?</text>

      <text x="100" y="170" font-size="14" fill="#94a3b8" text-anchor="middle">What comes next in the sequence?</text>
    `),
    options: [
      createOptionSvg(`<rect x="20" y="20" width="60" height="60" fill="#334155" stroke="#64748b" rx="5"/><circle cx="35" cy="35" r="7" fill="#f97316"/><circle cx="65" cy="35" r="7" fill="#f97316"/><circle cx="35" cy="65" r="7" fill="#f97316"/><circle cx="65" cy="65" r="7" fill="#f97316"/>`),
      createOptionSvg(`<rect x="20" y="20" width="60" height="60" fill="#334155" stroke="#64748b" rx="5"/><circle cx="35" cy="35" r="7" fill="#f97316"/><circle cx="65" cy="35" r="7" fill="#f97316"/><circle cx="50" cy="65" r="7" fill="#f97316"/>`),
      createOptionSvg(`<rect x="20" y="20" width="60" height="60" fill="#334155" stroke="#64748b" rx="5"/><circle cx="50" cy="35" r="7" fill="#f97316"/><circle cx="50" cy="65" r="7" fill="#f97316"/>`),
      createOptionSvg(`<rect x="20" y="20" width="60" height="60" fill="#334155" stroke="#64748b" rx="5"/><circle cx="50" cy="50" r="15" fill="#f97316"/>`),
    ],
    correctAnswer: 0,
    timeLimit: 45,
  },

  // Question 12: Folding Pattern (Hard)
  {
    id: 12,
    type: 'spatial',
    difficulty: 'hard',
    questionSvg: createPatternSvg(`
      <text x="100" y="22" font-size="11" fill="#cbd5e1" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="600">Folding Pattern</text>

      <rect x="40" y="45" width="120" height="55" fill="#1e293b" stroke="#475569" stroke-width="2" rx="6"/>
      <line x1="100" y1="45" x2="100" y2="100" stroke="#fbbf24" stroke-width="2.5" stroke-dasharray="6,4"/>

      <circle cx="62" cy="72" r="11" fill="#ec4899" stroke="#f472b6" stroke-width="1.5"/>
      <rect x="77" y="60" width="14" height="24" fill="#3b82f6" stroke="#60a5fa" stroke-width="1.5" rx="2"/>

      <text x="100" y="132" font-size="11" fill="#94a3b8" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="500">If folded along the dotted line,</text>
      <text x="100" y="148" font-size="11" fill="#94a3b8" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="500">what appears on the right?</text>
    `),
    options: [
      createOptionSvg(`<rect x="18" y="25" width="64" height="50" fill="#1e293b" stroke="#475569" stroke-width="2" rx="5"/><rect x="28" y="38" width="14" height="24" fill="#3b82f6" stroke="#60a5fa" stroke-width="1.5" rx="2"/><circle cx="62" cy="50" r="11" fill="#ec4899" stroke="#f472b6" stroke-width="1.5"/>`),
      createOptionSvg(`<rect x="18" y="25" width="64" height="50" fill="#1e293b" stroke="#475569" stroke-width="2" rx="5"/><circle cx="62" cy="50" r="11" fill="#ec4899" stroke="#f472b6" stroke-width="1.5"/><rect x="54" y="38" width="14" height="24" fill="#3b82f6" stroke="#60a5fa" stroke-width="1.5" rx="2"/>`),
      createOptionSvg(`<rect x="18" y="25" width="64" height="50" fill="#1e293b" stroke="#475569" stroke-width="2" rx="5"/><circle cx="38" cy="50" r="11" fill="#ec4899" stroke="#f472b6" stroke-width="1.5"/><rect x="54" y="38" width="14" height="24" fill="#3b82f6" stroke="#60a5fa" stroke-width="1.5" rx="2"/>`),
      createOptionSvg(`<rect x="18" y="25" width="64" height="50" fill="#1e293b" stroke="#475569" stroke-width="2" rx="5"/><circle cx="38" cy="50" r="11" fill="#3b82f6" stroke="#60a5fa" stroke-width="1.5"/><rect x="54" y="38" width="14" height="24" fill="#ec4899" stroke="#f472b6" stroke-width="1.5" rx="2"/>`),
    ],
    correctAnswer: 0,
    timeLimit: 60,
  },

  // Question 13: Shape Counting (Easy)
  {
    id: 13,
    type: 'logic',
    difficulty: 'easy',
    questionSvg: createPatternSvg(`
      <text x="100" y="28" font-size="12" fill="#cbd5e1" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="600">Count All Triangles</text>

      <polygon points="100,42 158,148 42,148" fill="none" stroke="#8b5cf6" stroke-width="3"/>
      <line x1="71" y1="95" x2="129" y2="95" stroke="#a78bfa" stroke-width="2.5"/>
      <line x1="100" y1="42" x2="71" y2="95" stroke="#a78bfa" stroke-width="2.5"/>
      <line x1="100" y1="42" x2="129" y2="95" stroke="#a78bfa" stroke-width="2.5"/>
      <line x1="100" y1="148" x2="71" y2="95" stroke="#a78bfa" stroke-width="2.5"/>
      <line x1="100" y1="148" x2="129" y2="95" stroke="#a78bfa" stroke-width="2.5"/>

      <text x="100" y="175" font-size="12" fill="#94a3b8" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="500">How many triangles can you find?</text>
    `),
    options: [
      createOptionSvg(`<text x="50" y="62" font-size="36" fill="#8b5cf6" text-anchor="middle" font-weight="bold" font-family="system-ui, sans-serif">9</text>`),
      createOptionSvg(`<text x="50" y="62" font-size="36" fill="#8b5cf6" text-anchor="middle" font-weight="bold" font-family="system-ui, sans-serif">6</text>`),
      createOptionSvg(`<text x="50" y="62" font-size="36" fill="#8b5cf6" text-anchor="middle" font-weight="bold" font-family="system-ui, sans-serif">7</text>`),
      createOptionSvg(`<text x="50" y="62" font-size="36" fill="#8b5cf6" text-anchor="middle" font-weight="bold" font-family="system-ui, sans-serif">8</text>`),
    ],
    correctAnswer: 0,
    timeLimit: 45,
  },

  // Question 14: Odd One Out (Medium)
  {
    id: 14,
    type: 'logic',
    difficulty: 'medium',
    questionSvg: createPatternSvg(`
      <text x="100" y="25" font-size="12" fill="#cbd5e1" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="600">Which shape doesn't belong?</text>

      <g transform="translate(28, 42)">
        <rect x="0" y="0" width="62" height="62" fill="#0f172a" stroke="#475569" stroke-width="2" rx="6"/>
        <text x="31" y="16" font-size="11" fill="#94a3b8" text-anchor="middle" font-weight="600" font-family="system-ui, sans-serif">A</text>
        <circle cx="31" cy="42" r="16" fill="none" stroke="#ec4899" stroke-width="2.5"/>
        <circle cx="31" cy="42" r="7" fill="#ec4899"/>
      </g>

      <g transform="translate(110, 42)">
        <rect x="0" y="0" width="62" height="62" fill="#0f172a" stroke="#475569" stroke-width="2" rx="6"/>
        <text x="31" y="16" font-size="11" fill="#94a3b8" text-anchor="middle" font-weight="600" font-family="system-ui, sans-serif">B</text>
        <rect x="13" y="24" width="36" height="36" fill="none" stroke="#3b82f6" stroke-width="2.5" rx="2"/>
        <rect x="22" y="33" width="18" height="18" fill="#3b82f6" rx="2"/>
      </g>

      <g transform="translate(28, 115)">
        <rect x="0" y="0" width="62" height="62" fill="#0f172a" stroke="#475569" stroke-width="2" rx="6"/>
        <text x="31" y="16" font-size="11" fill="#94a3b8" text-anchor="middle" font-weight="600" font-family="system-ui, sans-serif">C</text>
        <polygon points="31,24 48,58 14,58" fill="none" stroke="#22c55e" stroke-width="2.5"/>
        <polygon points="31,34 39,50 23,50" fill="#22c55e"/>
      </g>

      <g transform="translate(110, 115)">
        <rect x="0" y="0" width="62" height="62" fill="#0f172a" stroke="#475569" stroke-width="2" rx="6"/>
        <text x="31" y="16" font-size="11" fill="#94a3b8" text-anchor="middle" font-weight="600" font-family="system-ui, sans-serif">D</text>
        <polygon points="31,24 50,42 31,60 12,42" fill="none" stroke="#f97316" stroke-width="2.5"/>
        <circle cx="31" cy="42" r="7" fill="#f97316"/>
      </g>
    `),
    options: [
      createOptionSvg(`<text x="50" y="62" font-size="36" fill="#f97316" text-anchor="middle" font-weight="bold" font-family="system-ui, sans-serif">D</text>`),
      createOptionSvg(`<text x="50" y="62" font-size="36" fill="#ec4899" text-anchor="middle" font-weight="bold" font-family="system-ui, sans-serif">A</text>`),
      createOptionSvg(`<text x="50" y="62" font-size="36" fill="#3b82f6" text-anchor="middle" font-weight="bold" font-family="system-ui, sans-serif">B</text>`),
      createOptionSvg(`<text x="50" y="62" font-size="36" fill="#22c55e" text-anchor="middle" font-weight="bold" font-family="system-ui, sans-serif">C</text>`),
    ],
    correctAnswer: 0,
    timeLimit: 45,
  },

  // Question 15: Complex Pattern Matrix (Hard)
  {
    id: 15,
    type: 'pattern',
    difficulty: 'hard',
    questionSvg: createPatternSvg(`
      <g transform="translate(10, 10)">
        <rect x="0" y="0" width="55" height="55" fill="#334155" stroke="#64748b" rx="3"/>
        <circle cx="20" cy="20" r="8" fill="#ec4899"/>
        <rect x="32" y="12" width="16" height="16" fill="#3b82f6"/>
        <polygon points="27,35 40,50 14,50" fill="#22c55e"/>
      </g>

      <g transform="translate(70, 10)">
        <rect x="0" y="0" width="55" height="55" fill="#334155" stroke="#64748b" rx="3"/>
        <rect x="7" y="12" width="16" height="16" fill="#3b82f6"/>
        <polygon points="27,20 40,35 14,35" fill="#22c55e"/>
        <circle cx="40" cy="45" r="8" fill="#ec4899"/>
      </g>

      <g transform="translate(130, 10)">
        <rect x="0" y="0" width="55" height="55" fill="#334155" stroke="#64748b" rx="3"/>
        <polygon points="20,12 33,27 7,27" fill="#22c55e"/>
        <circle cx="40" cy="20" r="8" fill="#ec4899"/>
        <rect x="25" y="35" width="16" height="16" fill="#3b82f6"/>
      </g>

      <g transform="translate(10, 70)">
        <rect x="0" y="0" width="55" height="55" fill="#334155" stroke="#64748b" rx="3"/>
        <rect x="7" y="7" width="16" height="16" fill="#3b82f6"/>
        <polygon points="40,12 53,27 27,27" fill="#22c55e"/>
        <circle cx="20" cy="42" r="8" fill="#ec4899"/>
      </g>

      <g transform="translate(70, 70)">
        <rect x="0" y="0" width="55" height="55" fill="#334155" stroke="#64748b" rx="3"/>
        <polygon points="20,7 33,22 7,22" fill="#22c55e"/>
        <circle cx="40" cy="15" r="8" fill="#ec4899"/>
        <rect x="20" y="30" width="16" height="16" fill="#3b82f6"/>
      </g>

      <g transform="translate(130, 70)">
        <rect x="0" y="0" width="55" height="55" fill="#334155" stroke="#64748b" rx="3"/>
        <circle cx="15" cy="15" r="8" fill="#ec4899"/>
        <rect x="30" y="7" width="16" height="16" fill="#3b82f6"/>
        <polygon points="27,30 40,45 14,45" fill="#22c55e"/>
      </g>

      <g transform="translate(10, 130)">
        <rect x="0" y="0" width="55" height="55" fill="#334155" stroke="#64748b" rx="3"/>
        <polygon points="15,7 28,22 2,22" fill="#22c55e"/>
        <circle cx="42" cy="15" r="8" fill="#ec4899"/>
        <rect x="20" y="32" width="16" height="16" fill="#3b82f6"/>
      </g>

      <g transform="translate(70, 130)">
        <rect x="0" y="0" width="55" height="55" fill="#334155" stroke="#64748b" rx="3"/>
        <circle cx="15" cy="15" r="8" fill="#ec4899"/>
        <rect x="32" y="7" width="16" height="16" fill="#3b82f6"/>
        <polygon points="27,32 40,47 14,47" fill="#22c55e"/>
      </g>

      <g transform="translate(130, 130)">
        <rect x="0" y="0" width="55" height="55" fill="#334155" stroke="#fbbf24" stroke-width="3" rx="3"/>
        <text x="27" y="35" font-size="24" fill="#fbbf24" text-anchor="middle">?</text>
      </g>
    `),
    options: [
      createOptionSvg(`<rect x="15" y="15" width="70" height="70" fill="#334155" stroke="#64748b" rx="3"/><rect x="22" y="22" width="16" height="16" fill="#3b82f6"/><polygon points="55,27 68,42 42,42" fill="#22c55e"/><circle cx="35" cy="60" r="10" fill="#ec4899"/>`),
      createOptionSvg(`<rect x="15" y="15" width="70" height="70" fill="#334155" stroke="#64748b" rx="3"/><circle cx="35" cy="30" r="10" fill="#ec4899"/><rect x="50" y="22" width="16" height="16" fill="#3b82f6"/><polygon points="35,50 48,65 22,65" fill="#22c55e"/>`),
      createOptionSvg(`<rect x="15" y="15" width="70" height="70" fill="#334155" stroke="#64748b" rx="3"/><polygon points="35,22 48,37 22,37" fill="#22c55e"/><circle cx="60" cy="30" r="10" fill="#ec4899"/><rect x="35" y="50" width="16" height="16" fill="#3b82f6"/>`),
      createOptionSvg(`<rect x="15" y="15" width="70" height="70" fill="#334155" stroke="#64748b" rx="3"/><circle cx="30" cy="30" r="10" fill="#ec4899"/><polygon points="55,27 68,42 42,42" fill="#22c55e"/><rect x="35" y="50" width="16" height="16" fill="#3b82f6"/>`),
    ],
    correctAnswer: 0,
    timeLimit: 90,
  },
]

export const getQuestionsByDifficulty = (difficulty: Question['difficulty']) =>
  questions.filter(q => q.difficulty === difficulty)

export const getTotalQuestions = () => questions.length
