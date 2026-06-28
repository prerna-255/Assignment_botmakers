// ─── Competition ────────────────────────────────────────────────────────────
export type CompetitionStatus = 'live' | 'upcoming' | 'past';

export interface Competition {
  id: string;
  name: string;
  location: string;
  date: string;
  status: CompetitionStatus;
  participants: number;
  prize: string;
}

export interface PastResult {
  rank: string;
  team: string;
  score: string;
}

// ─── Journey ─────────────────────────────────────────────────────────────────
export interface JourneyStep {
  id: string;
  step: string;
  title: string;
  description: string;
  emoji: string;
}

// ─── Category ────────────────────────────────────────────────────────────────
export interface Category {
  id: string;
  title: string;
  description: string;
  emoji: string;
  participants: number;
  accentColor: string;
}

// ─── Discipline ──────────────────────────────────────────────────────────────
export interface Discipline {
  id: string;
  title: string;
  description: string;
  emoji: string;
  accentColor: string;
  image: string;
}

// ─── Sponsor ─────────────────────────────────────────────────────────────────
export type SponsorTier = 'platinum' | 'gold' | 'silver';

export interface Sponsor {
  id: string;
  name: string;
  abbr: string;
  tier: SponsorTier;
}

// ─── Navigation ──────────────────────────────────────────────────────────────
export interface NavLink {
  id: string;
  label: string;
  href: string;
}

// ─── Join cards ──────────────────────────────────────────────────────────────
export interface JoinField {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'tel';
}

export interface JoinCard {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  fields: JoinField[];
  accentColor: string;
}

// ─── Stats ───────────────────────────────────────────────────────────────────
export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}
