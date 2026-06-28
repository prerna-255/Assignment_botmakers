import type { Competition, PastResult } from '../types';

export const competitions: Competition[] = [
  {
    id: 'c1',
    name: 'Bengaluru Regionals',
    location: 'Bengaluru, KA',
    date: 'Live Now',
    status: 'live',
    participants: 120,
    prize: '₹2,00,000',
  },
  {
    id: 'c2',
    name: 'Event in Mumbai',
    location: 'Mumbai, MH',
    date: '10-12 Feb',
    status: 'upcoming',
    participants: 85,
    prize: 'Category: Combats',
  },
  {
    id: 'c3',
    name: 'Event in Delhi',
    location: 'New Delhi, DL',
    date: '05-07 Mar',
    status: 'upcoming',
    participants: 200,
    prize: 'Category: Chess & Autonomous',
  },
];

export const pastResults: PastResult[] = [
  { rank: '1st', team: 'Bengaluru Regionals', score: 'Winner - Robo' },
  { rank: '2nd', team: 'Bengaluru Regionals', score: 'Winner - Robo' },
  { rank: '3rd', team: 'Bengaluru Regionals', score: 'Winner - Robo' },
];
export const upcomingEvents = [
  { id: 'u1', name: 'Event in Mumbai', date: '10-12 Feb', category: 'Combats' },
  { id: 'u2', name: 'Event in Delhi', date: '05-07 Mar', category: 'Chess & Autonomous' }
];
