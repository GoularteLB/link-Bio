export const sections = [
  { id: 'hero', index: '01', label: 'Início' },
  { id: 'work', index: '02', label: 'Work' },
  { id: 'sobre', index: '03', label: 'Sobre' },
  { id: 'stack', index: '04', label: 'Stack' },
  { id: 'contato', index: '05', label: 'Contato' },
]

export const navLinks = sections.filter((section) => section.id !== 'hero')
