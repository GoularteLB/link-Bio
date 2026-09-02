export const identity = {
  initials: 'LG',
  name: 'Lucas Goularte',
  email: 'goulartelucasbeluco@gmail.com',
  available: true,
  heroPhoto: 'lucas.webp',
  aboutPhoto: 'lucas-estudio-pb.webp',
  allProjectsHref: 'https://github.com/GoularteLB?tab=repositories',
  devCardHref: 'https://app.daily.dev/lucasgoularte',
  devCardImage: 'https://api.daily.dev/devcards/v2/luQTCnFOI4iGW2l5FEfXP.png?type=wide&r=23f',
}

export const sectionIds = ['home', 'sobre', 'projetos', 'case', 'processo', 'stack', 'contato']

export const projectBase = [
  {
    id: 'zh-solution-one',
    index: '01',
    product: 'ZH Solution One',
    tech: ['Java', 'Spring', 'PostgreSQL'],
    image: 'projects/zh-solution-one.webp',
    gallery: [],
    href: '',
    featured: true,
  },
  {
    id: 'hz-crm',
    index: '02',
    product: 'HZ CRM',
    tech: ['Java', 'Spring', 'PostgreSQL'],
    image: 'projects/hz-crm.webp',
    gallery: [],
    href: '',
  },
  {
    id: 'pet-club',
    index: '03',
    product: 'Pet Club',
    tech: ['Java', 'Spring', 'PostgreSQL'],
    image: 'projects/pet-club.webp',
    gallery: ['projects/pet-club-cadastro.webp'],
    href: 'https://github.com/GoularteLB/PetClube-backend',
  },
  {
    id: 'vaccine-control',
    index: '04',
    product: 'Vaccine Control',
    tech: ['C#', '.NET', 'PostgreSQL'],
    image: '',
    gallery: [],
    href: '',
    comingSoon: true,
  },
  {
    id: 'artifi',
    index: '05',
    product: 'Artifi',
    tech: ['Python', 'AI', 'API'],
    image: 'projects/artifi.webp',
    gallery: [],
    href: '',
  },
]

export const pillarBase = [
  { id: 'foco', icon: 'target' },
  { id: 'missao', icon: 'flag' },
  { id: 'valores', icon: 'heart' },
]

export const stepBase = [
  { id: 'entender', index: '01' },
  { id: 'modelar', index: '02' },
  { id: 'desenhar', index: '03' },
  { id: 'construir', index: '04' },
  { id: 'iterar', index: '05' },
]

export const socialBase = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    handle: '+55 48 99929-7467',
    href: 'https://wa.me/554899297467',
    icon: 'whatsapp.png',
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: '@GoularteLB',
    href: 'https://github.com/GoularteLB',
    icon: 'github.png',
    invert: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'lucas-goularte-desenv',
    href: 'https://www.linkedin.com/in/lucas-goularte-desenv/',
    icon: 'linkedin.png',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@devgoularte',
    href: 'https://www.instagram.com/devgoularte',
    icon: 'instagram.png',
  },
]

export const contactLineBase = [
  {
    id: 'email',
    icon: 'mail',
    label: 'goulartelucasbeluco@gmail.com',
    href: 'mailto:goulartelucasbeluco@gmail.com',
    cursor: 'mail',
  },
  {
    id: 'linkedin',
    icon: 'linkedin',
    label: 'linkedin.com/in/lucas-goularte-desenv',
    href: 'https://www.linkedin.com/in/lucas-goularte-desenv/',
    cursor: 'external',
  },
  {
    id: 'github',
    icon: 'github',
    label: 'github.com/GoularteLB',
    href: 'https://github.com/GoularteLB',
    cursor: 'external',
  },
]

export const stackCloud = [
  { id: 'javascript', label: 'JavaScript', weight: 2 },
  { id: 'backend', label: 'Backend', weight: 4 },
  { id: 'automacao', weight: 4, mark: 'underline' },
  { id: 'vue', label: 'Vue', weight: 2 },
  { id: 'docker', label: 'Docker', weight: 2 },
  { id: 'apis', label: 'APIs', weight: 4, mark: 'arrow' },
  { id: 'java', label: 'Java', weight: 3 },
  { id: 'typescript', label: 'TypeScript', weight: 2 },
  { id: 'spring', label: 'Spring Boot', weight: 3 },
  { id: 'camunda', label: 'Camunda', weight: 2, mark: 'circle' },
  { id: 'postgres', label: 'PostgreSQL', weight: 2 },
  { id: 'bpmn', label: 'BPMN', weight: 2 },
  { id: 'dmn', label: 'DMN', weight: 2 },
  { id: 'csharp', weight: 3 },
  { id: 'git', weight: 2 },
]

export const certifications = [
  {
    id: 'bpmn',
    title: 'BPMN Specialist',
    issuer: 'Camunda Academy',
    icon: 'camunda.png',
    href: 'https://academy.camunda.com/path/c8-lp-developer',
  },
  {
    id: 'dmn',
    title: 'DMN Expert',
    issuer: 'Camunda Academy',
    icon: 'dmn.png',
    href: 'https://academy.camunda.com/path/dmn-lp',
  },
]
