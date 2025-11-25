export interface Question {
  id: number
  type: 'pattern' | 'sequence' | 'spatial' | 'logic' | 'analogy'
  difficulty: 'easy' | 'medium' | 'hard'
  questionSvg: string
  options: string[]
  correctAnswer: number
  timeLimit: number // seconds
}

// SVG Pattern Generators
const createPatternSvg = (shapes: string, bg: string = '#1e293b') => `
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" fill="${bg}" rx="10"/>
    ${shapes}
  </svg>
`

const createOptionSvg = (shapes: string, bg: string = '#334155') => `
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="${bg}" rx="8"/>
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
      <circle cx="50" cy="50" r="20" fill="#ec4899"/>
      <circle cx="100" cy="50" r="20" fill="#8b5cf6"/>
      <circle cx="150" cy="50" r="20" fill="#ec4899"/>
      <circle cx="50" cy="100" r="20" fill="#8b5cf6"/>
      <circle cx="100" cy="100" r="20" fill="#ec4899"/>
      <circle cx="150" cy="100" r="20" fill="#8b5cf6"/>
      <circle cx="50" cy="150" r="20" fill="#ec4899"/>
      <circle cx="100" cy="150" r="20" fill="#8b5cf6"/>
      <text x="150" y="158" font-size="40" fill="#fbbf24" text-anchor="middle">?</text>
    `),
    options: [
      createOptionSvg(`<circle cx="50" cy="50" r="20" fill="#ec4899"/>`),
      createOptionSvg(`<circle cx="50" cy="50" r="20" fill="#8b5cf6"/>`),
      createOptionSvg(`<circle cx="50" cy="50" r="20" fill="#22c55e"/>`),
      createOptionSvg(`<rect x="30" y="30" width="40" height="40" fill="#ec4899"/>`),
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
      <rect x="20" y="80" width="40" height="40" fill="#3b82f6"/>
      <polygon points="100,60 130,120 70,120" fill="#22c55e"/>
      <circle cx="170" cy="100" r="25" fill="#f97316"/>
      <text x="100" y="180" font-size="20" fill="#94a3b8" text-anchor="middle">What comes next?</text>
    `),
    options: [
      createOptionSvg(`<rect x="30" y="30" width="40" height="40" fill="#3b82f6"/>`),
      createOptionSvg(`<circle cx="50" cy="50" r="25" fill="#f97316"/>`),
      createOptionSvg(`<polygon points="50,25 75,75 25,75" fill="#22c55e"/>`),
      createOptionSvg(`<rect x="30" y="30" width="40" height="40" fill="#ec4899"/>`),
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
      <g transform="translate(50,50)">
        <polygon points="0,-30 25,20 -25,20" fill="#8b5cf6"/>
        <circle cx="0" cy="-10" r="8" fill="#fbbf24"/>
      </g>
      <g transform="translate(100,50) rotate(90)">
        <polygon points="0,-30 25,20 -25,20" fill="#8b5cf6"/>
        <circle cx="0" cy="-10" r="8" fill="#fbbf24"/>
      </g>
      <g transform="translate(150,50) rotate(180)">
        <polygon points="0,-30 25,20 -25,20" fill="#8b5cf6"/>
        <circle cx="0" cy="-10" r="8" fill="#fbbf24"/>
      </g>
      <text x="100" y="130" font-size="40" fill="#fbbf24" text-anchor="middle">?</text>
      <text x="100" y="180" font-size="16" fill="#94a3b8" text-anchor="middle">Continue the rotation</text>
    `),
    options: [
      createOptionSvg(`<g transform="translate(50,50) rotate(270)"><polygon points="0,-25 20,15 -20,15" fill="#8b5cf6"/><circle cx="0" cy="-8" r="6" fill="#fbbf24"/></g>`),
      createOptionSvg(`<g transform="translate(50,50) rotate(0)"><polygon points="0,-25 20,15 -20,15" fill="#8b5cf6"/><circle cx="0" cy="-8" r="6" fill="#fbbf24"/></g>`),
      createOptionSvg(`<g transform="translate(50,50) rotate(180)"><polygon points="0,-25 20,15 -20,15" fill="#8b5cf6"/><circle cx="0" cy="-8" r="6" fill="#fbbf24"/></g>`),
      createOptionSvg(`<g transform="translate(50,50) rotate(90)"><polygon points="0,-25 20,15 -20,15" fill="#ec4899"/><circle cx="0" cy="-8" r="6" fill="#fbbf24"/></g>`),
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
      <circle cx="40" cy="50" r="15" fill="#f97316"/>
      <circle cx="80" cy="50" r="15" fill="#f97316"/>
      <circle cx="120" cy="50" r="15" fill="#f97316"/>

      <rect x="25" y="90" width="30" height="30" fill="#22c55e"/>
      <rect x="65" y="90" width="30" height="30" fill="#22c55e"/>
      <rect x="105" y="90" width="30" height="30" fill="#22c55e"/>
      <rect x="145" y="90" width="30" height="30" fill="#22c55e"/>

      <polygon points="40,145 55,180 25,180" fill="#ec4899"/>
      <polygon points="80,145 95,180 65,180" fill="#ec4899"/>
      <polygon points="120,145 135,180 105,180" fill="#ec4899"/>
      <polygon points="160,145 175,180 145,180" fill="#ec4899"/>
      <polygon points="160" y="145" fill="#ec4899"/>

      <text x="170" y="55" font-size="30" fill="#fbbf24" text-anchor="middle">?</text>
      <text x="100" y="195" font-size="12" fill="#94a3b8" text-anchor="middle">How many circles should there be?</text>
    `),
    options: [
      createOptionSvg(`<text x="50" y="60" font-size="40" fill="#f97316" text-anchor="middle" font-weight="bold">5</text>`),
      createOptionSvg(`<text x="50" y="60" font-size="40" fill="#f97316" text-anchor="middle" font-weight="bold">4</text>`),
      createOptionSvg(`<text x="50" y="60" font-size="40" fill="#f97316" text-anchor="middle" font-weight="bold">6</text>`),
      createOptionSvg(`<text x="50" y="60" font-size="40" fill="#f97316" text-anchor="middle" font-weight="bold">3</text>`),
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
      <line x1="100" y1="20" x2="100" y2="180" stroke="#64748b" stroke-width="2" stroke-dasharray="5,5"/>

      <rect x="20" y="40" width="60" height="40" fill="#8b5cf6" rx="5"/>
      <circle cx="50" cy="60" r="12" fill="#fbbf24"/>
      <circle cx="35" cy="60" r="6" fill="#ec4899"/>

      <polygon points="40,100 75,140 20,140" fill="#3b82f6"/>
      <rect x="35" y="120" width="15" height="15" fill="#22c55e"/>

      <text x="150" y="100" font-size="40" fill="#fbbf24" text-anchor="middle">?</text>
      <text x="100" y="195" font-size="12" fill="#94a3b8" text-anchor="middle">Mirror the left side</text>
    `),
    options: [
      createOptionSvg(`
        <rect x="20" y="10" width="60" height="40" fill="#8b5cf6" rx="5"/>
        <circle cx="50" cy="30" r="12" fill="#fbbf24"/>
        <circle cx="65" cy="30" r="6" fill="#ec4899"/>
        <polygon points="60,55 25,95 80,95" fill="#3b82f6"/>
        <rect x="50" y="75" width="15" height="15" fill="#22c55e"/>
      `),
      createOptionSvg(`
        <rect x="20" y="10" width="60" height="40" fill="#8b5cf6" rx="5"/>
        <circle cx="50" cy="30" r="12" fill="#fbbf24"/>
        <circle cx="35" cy="30" r="6" fill="#ec4899"/>
        <polygon points="40,55 75,95 20,95" fill="#3b82f6"/>
        <rect x="35" y="75" width="15" height="15" fill="#22c55e"/>
      `),
      createOptionSvg(`
        <rect x="20" y="10" width="60" height="40" fill="#ec4899" rx="5"/>
        <circle cx="50" cy="30" r="12" fill="#fbbf24"/>
        <circle cx="65" cy="30" r="6" fill="#8b5cf6"/>
      `),
      createOptionSvg(`
        <rect x="20" y="10" width="60" height="40" fill="#8b5cf6" rx="5"/>
        <circle cx="50" cy="30" r="12" fill="#ec4899"/>
        <circle cx="65" cy="30" r="6" fill="#fbbf24"/>
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
      <text x="100" y="25" font-size="14" fill="#94a3b8" text-anchor="middle">A is to B as C is to ?</text>

      <rect x="15" y="40" width="70" height="70" fill="#1e293b" stroke="#64748b" stroke-width="2" rx="5"/>
      <text x="50" y="55" font-size="12" fill="#64748b" text-anchor="middle">A</text>
      <rect x="25" y="60" width="50" height="40" fill="#ec4899"/>

      <text x="100" y="75" font-size="24" fill="#fbbf24">→</text>

      <rect x="115" y="40" width="70" height="70" fill="#1e293b" stroke="#64748b" stroke-width="2" rx="5"/>
      <text x="150" y="55" font-size="12" fill="#64748b" text-anchor="middle">B</text>
      <circle cx="150" cy="80" r="25" fill="#ec4899"/>

      <rect x="15" y="120" width="70" height="70" fill="#1e293b" stroke="#64748b" stroke-width="2" rx="5"/>
      <text x="50" y="135" font-size="12" fill="#64748b" text-anchor="middle">C</text>
      <polygon points="50,145 75,175 25,175" fill="#3b82f6"/>

      <text x="100" y="155" font-size="24" fill="#fbbf24">→</text>

      <rect x="115" y="120" width="70" height="70" fill="#1e293b" stroke="#fbbf24" stroke-width="3" rx="5"/>
      <text x="150" y="165" font-size="30" fill="#fbbf24" text-anchor="middle">?</text>
    `),
    options: [
      createOptionSvg(`<circle cx="50" cy="50" r="25" fill="#3b82f6"/>`),
      createOptionSvg(`<rect x="25" y="30" width="50" height="40" fill="#3b82f6"/>`),
      createOptionSvg(`<polygon points="50,20 80,70 20,70" fill="#ec4899"/>`),
      createOptionSvg(`<circle cx="50" cy="50" r="25" fill="#ec4899"/>`),
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
      <text x="100" y="25" font-size="14" fill="#94a3b8" text-anchor="middle">What do you see when shapes overlap?</text>

      <circle cx="60" cy="100" r="40" fill="#ec4899" opacity="0.7"/>
      <circle cx="100" cy="100" r="40" fill="#3b82f6" opacity="0.7"/>
      <circle cx="140" cy="100" r="40" fill="#22c55e" opacity="0.7"/>

      <text x="100" y="170" font-size="14" fill="#94a3b8" text-anchor="middle">How many distinct regions are created?</text>
    `),
    options: [
      createOptionSvg(`<text x="50" y="60" font-size="40" fill="#fbbf24" text-anchor="middle" font-weight="bold">7</text>`),
      createOptionSvg(`<text x="50" y="60" font-size="40" fill="#fbbf24" text-anchor="middle" font-weight="bold">5</text>`),
      createOptionSvg(`<text x="50" y="60" font-size="40" fill="#fbbf24" text-anchor="middle" font-weight="bold">6</text>`),
      createOptionSvg(`<text x="50" y="60" font-size="40" fill="#fbbf24" text-anchor="middle" font-weight="bold">8</text>`),
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
      <text x="100" y="25" font-size="14" fill="#94a3b8" text-anchor="middle">If folded along the dotted line, which pattern appears?</text>

      <rect x="40" y="40" width="120" height="60" fill="#334155" stroke="#64748b" rx="5"/>
      <line x1="100" y1="40" x2="100" y2="100" stroke="#fbbf24" stroke-width="2" stroke-dasharray="5,5"/>

      <circle cx="60" cy="70" r="12" fill="#ec4899"/>
      <rect x="75" y="58" width="15" height="24" fill="#3b82f6"/>

      <text x="100" y="140" font-size="14" fill="#94a3b8" text-anchor="middle">What will be on the right side after folding?</text>
    `),
    options: [
      createOptionSvg(`<rect x="20" y="25" width="60" height="50" fill="#334155" stroke="#64748b" rx="5"/><rect x="30" y="38" width="15" height="24" fill="#3b82f6"/><circle cx="60" cy="50" r="12" fill="#ec4899"/>`),
      createOptionSvg(`<rect x="20" y="25" width="60" height="50" fill="#334155" stroke="#64748b" rx="5"/><circle cx="60" cy="50" r="12" fill="#ec4899"/><rect x="55" y="38" width="15" height="24" fill="#3b82f6"/>`),
      createOptionSvg(`<rect x="20" y="25" width="60" height="50" fill="#334155" stroke="#64748b" rx="5"/><circle cx="40" cy="50" r="12" fill="#ec4899"/><rect x="55" y="38" width="15" height="24" fill="#3b82f6"/>`),
      createOptionSvg(`<rect x="20" y="25" width="60" height="50" fill="#334155" stroke="#64748b" rx="5"/><circle cx="40" cy="50" r="12" fill="#3b82f6"/><rect x="55" y="38" width="15" height="24" fill="#ec4899"/>`),
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
      <text x="100" y="25" font-size="14" fill="#94a3b8" text-anchor="middle">Count all the triangles</text>

      <polygon points="100,40 160,150 40,150" fill="none" stroke="#8b5cf6" stroke-width="3"/>
      <line x1="70" y1="95" x2="130" y2="95" stroke="#8b5cf6" stroke-width="3"/>
      <line x1="100" y1="40" x2="70" y2="95" stroke="#8b5cf6" stroke-width="3"/>
      <line x1="100" y1="40" x2="130" y2="95" stroke="#8b5cf6" stroke-width="3"/>
      <line x1="100" y1="150" x2="70" y2="95" stroke="#8b5cf6" stroke-width="3"/>
      <line x1="100" y1="150" x2="130" y2="95" stroke="#8b5cf6" stroke-width="3"/>

      <text x="100" y="180" font-size="14" fill="#94a3b8" text-anchor="middle">How many triangles can you find?</text>
    `),
    options: [
      createOptionSvg(`<text x="50" y="60" font-size="40" fill="#8b5cf6" text-anchor="middle" font-weight="bold">9</text>`),
      createOptionSvg(`<text x="50" y="60" font-size="40" fill="#8b5cf6" text-anchor="middle" font-weight="bold">6</text>`),
      createOptionSvg(`<text x="50" y="60" font-size="40" fill="#8b5cf6" text-anchor="middle" font-weight="bold">7</text>`),
      createOptionSvg(`<text x="50" y="60" font-size="40" fill="#8b5cf6" text-anchor="middle" font-weight="bold">8</text>`),
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
      <text x="100" y="25" font-size="14" fill="#94a3b8" text-anchor="middle">Which shape doesn't belong?</text>

      <g transform="translate(30, 50)">
        <rect x="0" y="0" width="60" height="60" fill="#334155" stroke="#64748b" rx="5"/>
        <text x="30" y="15" font-size="12" fill="#64748b" text-anchor="middle">A</text>
        <circle cx="30" cy="40" r="18" fill="none" stroke="#ec4899" stroke-width="3"/>
        <circle cx="30" cy="40" r="8" fill="#ec4899"/>
      </g>

      <g transform="translate(110, 50)">
        <rect x="0" y="0" width="60" height="60" fill="#334155" stroke="#64748b" rx="5"/>
        <text x="30" y="15" font-size="12" fill="#64748b" text-anchor="middle">B</text>
        <rect x="12" y="22" width="36" height="36" fill="none" stroke="#3b82f6" stroke-width="3"/>
        <rect x="22" y="32" width="16" height="16" fill="#3b82f6"/>
      </g>

      <g transform="translate(30, 120)">
        <rect x="0" y="0" width="60" height="60" fill="#334155" stroke="#64748b" rx="5"/>
        <text x="30" y="15" font-size="12" fill="#64748b" text-anchor="middle">C</text>
        <polygon points="30,22 48,58 12,58" fill="none" stroke="#22c55e" stroke-width="3"/>
        <polygon points="30,32 38,48 22,48" fill="#22c55e"/>
      </g>

      <g transform="translate(110, 120)">
        <rect x="0" y="0" width="60" height="60" fill="#334155" stroke="#64748b" rx="5"/>
        <text x="30" y="15" font-size="12" fill="#64748b" text-anchor="middle">D</text>
        <polygon points="30,22 50,40 30,58 10,40" fill="none" stroke="#f97316" stroke-width="3"/>
        <circle cx="30" cy="40" r="8" fill="#f97316"/>
      </g>
    `),
    options: [
      createOptionSvg(`<text x="50" y="60" font-size="40" fill="#f97316" text-anchor="middle" font-weight="bold">D</text>`),
      createOptionSvg(`<text x="50" y="60" font-size="40" fill="#ec4899" text-anchor="middle" font-weight="bold">A</text>`),
      createOptionSvg(`<text x="50" y="60" font-size="40" fill="#3b82f6" text-anchor="middle" font-weight="bold">B</text>`),
      createOptionSvg(`<text x="50" y="60" font-size="40" fill="#22c55e" text-anchor="middle" font-weight="bold">C</text>`),
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
