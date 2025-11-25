export interface TestOffer {
  id: number
  name: string
  description: string
  icon: string
  price: string
  originalPrice: string
  gradient: string
  badge?: string
  badgeColor?: string
  category: string
}

export const testOffers: TestOffer[] = [
  {
    id: 1,
    name: 'Emotional Intelligence (EQ)',
    description: 'Measure your ability to understand and manage emotions',
    icon: '💖',
    price: '2.99',
    originalPrice: '9.99',
    gradient: 'from-pink-500 to-rose-500',
    badge: 'Popular',
    badgeColor: 'bg-pink-500 text-white',
    category: 'emotional',
  },
  {
    id: 2,
    name: 'Memory & Recall Test',
    description: 'Evaluate your short-term and long-term memory capacity',
    icon: '🧠',
    price: '2.99',
    originalPrice: '9.99',
    gradient: 'from-purple-500 to-indigo-500',
    badge: 'Best Seller',
    badgeColor: 'bg-purple-500 text-white',
    category: 'cognitive',
  },
  {
    id: 3,
    name: 'Logical Reasoning',
    description: 'Test your deductive and inductive reasoning skills',
    icon: '🔬',
    price: '2.99',
    originalPrice: '9.99',
    gradient: 'from-blue-500 to-cyan-500',
    category: 'cognitive',
  },
  {
    id: 4,
    name: 'Creativity Assessment',
    description: 'Discover your creative thinking potential',
    icon: '🎨',
    price: '2.99',
    originalPrice: '9.99',
    gradient: 'from-orange-500 to-amber-500',
    category: 'creative',
  },
  {
    id: 5,
    name: 'Verbal Intelligence',
    description: 'Assess your vocabulary and language comprehension',
    icon: '📚',
    price: '2.99',
    originalPrice: '9.99',
    gradient: 'from-green-500 to-emerald-500',
    category: 'verbal',
  },
  {
    id: 6,
    name: 'Mathematical Aptitude',
    description: 'Evaluate your numerical reasoning abilities',
    icon: '🔢',
    price: '2.99',
    originalPrice: '9.99',
    gradient: 'from-red-500 to-orange-500',
    badge: 'New',
    badgeColor: 'bg-red-500 text-white',
    category: 'mathematical',
  },
  {
    id: 7,
    name: 'Spatial Intelligence',
    description: 'Test your 3D visualization and spatial reasoning',
    icon: '📐',
    price: '2.99',
    originalPrice: '9.99',
    gradient: 'from-teal-500 to-cyan-500',
    category: 'spatial',
  },
  {
    id: 8,
    name: 'Processing Speed',
    description: 'Measure how quickly you can process information',
    icon: '⚡',
    price: '2.99',
    originalPrice: '9.99',
    gradient: 'from-yellow-500 to-amber-500',
    category: 'speed',
  },
  {
    id: 9,
    name: 'Attention & Focus',
    description: 'Assess your concentration and attention span',
    icon: '🎯',
    price: '2.99',
    originalPrice: '9.99',
    gradient: 'from-indigo-500 to-purple-500',
    category: 'attention',
  },
  {
    id: 10,
    name: 'Problem Solving',
    description: 'Test your ability to solve complex problems',
    icon: '🧩',
    price: '2.99',
    originalPrice: '9.99',
    gradient: 'from-pink-500 to-purple-500',
    category: 'problem-solving',
  },
  {
    id: 11,
    name: 'Critical Thinking',
    description: 'Evaluate your analytical thinking skills',
    icon: '💡',
    price: '2.99',
    originalPrice: '9.99',
    gradient: 'from-amber-500 to-yellow-500',
    category: 'analytical',
  },
  {
    id: 12,
    name: 'Visual Perception',
    description: 'Test your ability to interpret visual information',
    icon: '👁️',
    price: '2.99',
    originalPrice: '9.99',
    gradient: 'from-cyan-500 to-blue-500',
    category: 'visual',
  },
  {
    id: 13,
    name: 'Social Intelligence',
    description: 'Measure your social awareness and skills',
    icon: '🤝',
    price: '2.99',
    originalPrice: '9.99',
    gradient: 'from-rose-500 to-pink-500',
    category: 'social',
  },
  {
    id: 14,
    name: 'Abstract Reasoning',
    description: 'Test your ability to identify patterns and relationships',
    icon: '🔮',
    price: '2.99',
    originalPrice: '9.99',
    gradient: 'from-violet-500 to-purple-500',
    badge: 'Advanced',
    badgeColor: 'bg-violet-500 text-white',
    category: 'abstract',
  },
  {
    id: 15,
    name: 'Leadership Assessment',
    description: 'Discover your leadership potential and style',
    icon: '👑',
    price: '3.99',
    originalPrice: '14.99',
    gradient: 'from-yellow-500 to-orange-500',
    category: 'leadership',
  },
  {
    id: 16,
    name: 'Career Aptitude',
    description: 'Find careers that match your cognitive profile',
    icon: '💼',
    price: '4.99',
    originalPrice: '19.99',
    gradient: 'from-blue-500 to-indigo-500',
    badge: 'Premium',
    badgeColor: 'bg-blue-500 text-white',
    category: 'career',
  },
  {
    id: 17,
    name: 'Personality Profile',
    description: 'Comprehensive personality assessment',
    icon: '🪞',
    price: '3.99',
    originalPrice: '14.99',
    gradient: 'from-emerald-500 to-teal-500',
    category: 'personality',
  },
  {
    id: 18,
    name: 'Learning Style',
    description: 'Discover how you learn best',
    icon: '📖',
    price: '2.99',
    originalPrice: '9.99',
    gradient: 'from-sky-500 to-blue-500',
    category: 'learning',
  },
  {
    id: 19,
    name: 'Stress Resilience',
    description: 'Measure your ability to handle stress',
    icon: '🧘',
    price: '2.99',
    originalPrice: '9.99',
    gradient: 'from-lime-500 to-green-500',
    category: 'wellness',
  },
  {
    id: 20,
    name: 'Cognitive Flexibility',
    description: 'Test your mental adaptability',
    icon: '🔄',
    price: '2.99',
    originalPrice: '9.99',
    gradient: 'from-fuchsia-500 to-pink-500',
    badge: 'New',
    badgeColor: 'bg-fuchsia-500 text-white',
    category: 'flexibility',
  },
]

export const getTotalOriginalValue = () => {
  return testOffers.reduce((sum, offer) => sum + parseFloat(offer.originalPrice), 0).toFixed(2)
}

export const getTotalDiscountedValue = () => {
  return testOffers.reduce((sum, offer) => sum + parseFloat(offer.price), 0).toFixed(2)
}

export const getOffersByCategory = (category: string) => {
  return testOffers.filter(offer => offer.category === category)
}
