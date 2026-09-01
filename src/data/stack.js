export const stackGroups = [
  {
    id: 'backend',
    label: 'Back-end',
    items: [
      { name: 'Java', icon: 'java.png', href: 'https://www.java.com/' },
      { name: 'C#', icon: 'csharp.png', href: 'https://learn.microsoft.com/dotnet/csharp/' },
    ],
  },
  {
    id: 'frontend',
    label: 'Front-end',
    items: [
      { name: 'Vue', icon: 'vue.png', href: 'https://vuejs.org/' },
      {
        name: 'JavaScript',
        icon: 'javascript.png',
        href: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript',
      },
      { name: 'Tailwind', icon: 'tailwind.png', href: 'https://tailwindcss.com/' },
      { name: 'React', icon: 'react.png', href: 'https://react.dev/' },
      { name: 'Flutter', icon: 'flutter.png', href: 'https://flutter.dev/' },
      { name: 'Dart', icon: 'dart.png', href: 'https://dart.dev/' },
    ],
  },
  {
    id: 'database',
    label: 'Banco de Dados',
    items: [
      { name: 'PostgreSQL', icon: 'postgresql.svg', href: 'https://www.postgresql.org/' },
      { name: 'MongoDB', icon: 'mongodb.svg', href: 'https://www.mongodb.com/' },
      { name: 'MySQL', icon: 'mysql.svg', href: 'https://www.mysql.com/' },
    ],
  },
  {
    id: 'processos',
    label: 'Processos',
    items: [
      { name: 'Camunda', icon: 'camunda.png', href: 'https://camunda.com/' },
      { name: 'BPMN', abbr: 'BPMN', href: 'https://www.bpmn.org/' },
      { name: 'DMN', icon: 'dmn.png', href: 'https://www.omg.org/dmn/' },
    ],
  },
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

export const credentials = [
  {
    id: 'github-foundations',
    title: 'GitHub Foundations',
    issuer: 'Microsoft',
    year: '2026',
  },
  {
    id: 'santander-java',
    title: 'Bootcamp AI Java Back-end',
    issuer: 'Santander Open Academy',
    year: '2026',
  },
  {
    id: 'fiap-mobile',
    title: 'Programação e Desenvolvimento de Aplicativos Móveis',
    issuer: 'FIAP',
    year: '2026',
  },
]
