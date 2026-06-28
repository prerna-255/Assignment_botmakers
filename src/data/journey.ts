import type { JourneyStep } from '../types';

export const journeySteps: JourneyStep[] = [
  {
    id: 'j1',
    step: 'Step 01',
    title: 'Sign Up For Team',
    description: 'Create your account, register your team, and get access to the full BotLeague ecosystem.',
    emoji: '👥',
  },
  {
    id: 'j2',
    step: 'Step 02',
    title: 'Go To Your Grade',
    description: 'Select the competition tier that matches your team\'s experience and skill level.',
    emoji: '📊',
  },
  {
    id: 'j3',
    step: 'Step 03',
    title: 'Participate Regionally',
    description: 'Compete in regional tournaments, earn ranking points, and qualify for nationals.',
    emoji: '🏆',
  },
  {
    id: 'j4',
    step: 'Step 04',
    title: 'At The League',
    description: 'Advance to the prestigious national league and compete among India\'s elite robotics teams.',
    emoji: '🎯',
  },
];
