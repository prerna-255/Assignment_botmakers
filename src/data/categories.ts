import type { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'cat1',
    title: 'MINI MINIONS',
    description: 'Elementary-level track where young creators build simple autonomous robots.',
    emoji: 'M',
    participants: 240,
    accentColor: '#fbbf24', // Yellow color
  },
  {
    id: 'cat2',
    title: 'JUNIOR INNOVATORS',
    description: 'Middle-school innovators tackling environmental and rescue missions.',
    emoji: '💡',
    participants: 410,
    accentColor: '#3b82f6', // Blue color
  },
  {
    id: 'cat3',
    title: 'YOUNG ENGINEERS',
    description: 'High-school students building advanced robots with custom control mechanisms.',
    emoji: '👥',
    participants: 380,
    accentColor: '#10b981', // Green color
  },
  {
    id: 'cat4',
    title: 'ROBO MINDS',
    description: 'University-level teams competing with full industrial and chess AI platforms.',
    emoji: '🧠',
    participants: 190,
    accentColor: '#ec4899', // Pink/purple color
  },
];
