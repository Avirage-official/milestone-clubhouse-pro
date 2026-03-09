// src/lib/clubhouseData.ts
import { DB_ENABLED, prisma } from './dbClient';
import {
  BadgeType,
  BreakType,
  ClubhouseStatus,
  PetMood,
  QuestCategory,
  Rank,
  TaskSource,
  TaskStatus,
  WorkSessionOrigin,
} from '@prisma/client';

// TYPES FOR THE UI (simple, shaped for components)

export type ManagersHubMetrics = {
  cards: {
    label: string;
    value: string;
    subtitle: string;
  }[];
  workdayRhythm: {
    label: string;
    deepWorkMinutes: number;
    meetingMinutes: number;
  }[];
  breakTypes: {
    label: string;
    value: number;
  }[];
  energyOverWeek: {
    day: string;
    score: number;
  }[];
  recentRituals: {
    time: string;
    title: string;
    description: string;
  }[];
  teamPerformance: {
    rank: number;
    team: string;
    focusScore: number;
    breakScore: number;
    connectionScore: number;
    pulse: 'Low' | 'Medium' | 'High' | 'Excellent';
  }[];
};

export type EmployeeHomeData = {
  cards: {
    label: string;
    value: string;
    subtitle: string;
  }[];
  todaysTasks: {
    id: string;
    title: string;
    source: TaskSource;
    status: TaskStatus;
  }[];
  yesterdayDone: {
    id: string;
    title: string;
  }[];
  missedFromYesterday: {
    id: string;
    title: string;
  }[];
  repeatSuggestions: {
    id: string;
    title: string;
  }[];
  dailyChecks: {
    id: string;
    label: string;
    completed: boolean;
  }[];
  pet: {
    name: string;
    type: string;
    mood: PetMood;
    personality: string;
  };
  notifications: {
    id: string;
    type: 'LUNCH' | 'GIFT' | 'QUEST';
    title: string;
    description: string;
    timeAgo: string;
  }[];
  shortcuts: {
    id: string;
    label: string;
    href: string;
  }[];
  songOfTheDay: {
    title: string;
    artist: string;
    url: string;
    pickedBy: string;
  };
};

export type PeopleDirectoryRow = {
  id: string;
  name: string;
  avatarUrl?: string;
  roleAndTeam: string;
  status: ClubhouseStatus;
  songTitle: string;
  songUrl: string;
  petLabel: string;
};

export type RecognitionRow = {
  id: string;
  fromName: string;
  toName: string;
  badge: BadgeType;
  reason: string;
  when: string;
};

// HELPERS

export async function getManagersHubMetrics(
  userId: string,
): Promise<ManagersHubMetrics> {
  if (!DB_ENABLED || !prisma) {
    // MOCK DATA ONLY – used in the current demo
    return {
      cards: [
        {
          label: 'Focus streaks',
          value: '68 active',
          subtitle: 'teammates with 3+ day deep-work streaks',
        },
        {
          label: 'Quality breaks',
          value: '72%',
          subtitle: 'breaks that hit 5+ minutes and no work apps',
        },
        {
          label: 'Quests done',
          value: '420+',
          subtitle: 'micro-missions finished this week',
        },
        {
          label: 'Lunch & coffee',
          value: '38',
          subtitle: 'pairs matched in the last 7 days',
        },
        {
          label: 'Pet nudges',
          value: '1.9k',
          subtitle: 'nudges accepted (not snoozed)',
        },
        {
          label: 'Wellness opt-in',
          value: '81%',
          subtitle: 'team members active in at least 1 ritual',
        },
        {
          label: 'Clubhouse pulse',
          value: '8.6/10',
          subtitle: 'composite of focus, breaks, and connection',
        },
      ],
      workdayRhythm: [
        { label: 'Mon', deepWorkMinutes: 120, meetingMinutes: 60 },
        { label: 'Tue', deepWorkMinutes: 140, meetingMinutes: 45 },
        { label: 'Wed', deepWorkMinutes: 90, meetingMinutes: 90 },
        { label: 'Thu', deepWorkMinutes: 160, meetingMinutes: 30 },
        { label: 'Fri', deepWorkMinutes: 100, meetingMinutes: 75 },
      ],
      breakTypes: [
        { label: 'Focus breaks', value: 45 },
        { label: 'Movement breaks', value: 30 },
        { label: 'Social breaks', value: 25 },
      ],
      energyOverWeek: [
        { day: 'Mon', score: 7.2 },
        { day: 'Tue', score: 7.8 },
        { day: 'Wed', score: 6.9 },
        { day: 'Thu', score: 8.4 },
        { day: 'Fri', score: 8.1 },
      ],
      recentRituals: [
        {
          time: '09:00',
          title: 'Focus Friday launched',
          description: 'Product team started a weekly deep-work ritual.',
        },
        {
          time: '11:30',
          title: 'Marketing hit 7-day streak',
          description: 'Consistent deep-work block before standup.',
        },
        {
          time: '14:00',
          title: '25th lunch buddy match',
          description: 'Cross-team lunch pairing reached a new milestone.',
        },
        {
          time: '16:15',
          title: 'New wellness quest unlocked',
          description: '“Move for 5” quest added to Playground.',
        },
      ],
      teamPerformance: [
        {
          rank: 1,
          team: 'Product',
          focusScore: 9.1,
          breakScore: 8.4,
          connectionScore: 8.8,
          pulse: 'Excellent',
        },
        {
          rank: 2,
          team: 'Engineering',
          focusScore: 8.7,
          breakScore: 7.9,
          connectionScore: 8.2,
          pulse: 'High',
        },
        {
          rank: 3,
          team: 'Sales',
          focusScore: 7.9,
          breakScore: 7.2,
          connectionScore: 8.5,
          pulse: 'High',
        },
        {
          rank: 4,
          team: 'People Ops',
          focusScore: 7.5,
          breakScore: 8.1,
          connectionScore: 8.9,
          pulse: 'High',
        },
        {
          rank: 5,
          team: 'Marketing',
          focusScore: 7.1,
          breakScore: 7.4,
          connectionScore: 7.8,
          pulse: 'Medium',
        },
      ],
    };
  }

  // TODO: Once DB is enabled, replace mocks with real Prisma queries here.
  // Example sketch (not implemented yet):
  // const focusStreaks = await prisma.userStats.count({ where: { focusStreak: { gte: 3 } } });
  // return { ... }

  return getManagersHubMetrics(userId); // temporary fallback
}

export async function getEmployeeHomeData(
  userId: string,
): Promise<EmployeeHomeData> {
  if (!DB_ENABLED || !prisma) {
    return {
      cards: [
        {
          label: 'My focus streak',
          value: '5 days',
          subtitle: 'deep-work days in a row',
        },
        {
          label: 'Today’s XP',
          value: '320',
          subtitle: 'earned from quests and sessions',
        },
        {
          label: 'Breaks taken',
          value: '3 / 5',
          subtitle: 'quality breaks so far',
        },
        {
          label: 'Quests done',
          value: '2 / 3',
          subtitle: 'today’s quests completed',
        },
        {
          label: 'Social moments',
          value: '1 lunch',
          subtitle: 'or coffee booked today',
        },
        {
          label: 'Pet mood',
          value: 'Happy',
          subtitle: 'stays happy when you take real breaks',
        },
        {
          label: 'Today’s mission',
          value: 'Deep work on Project Nova',
          subtitle: 'your main focus for today',
        },
      ],
      todaysTasks: [
        {
          id: 't1',
          title: 'Deep work on Project Nova',
          source: TaskSource.TODAY,
          status: TaskStatus.OPEN,
        },
        {
          id: 't2',
          title: '1:1 with Maya',
          source: TaskSource.TODAY,
          status: TaskStatus.OPEN,
        },
      ],
      yesterdayDone: [
        { id: 'y1', title: 'Prep slides for product review' },
        { id: 'y2', title: 'Ship customer summary email' },
      ],
      missedFromYesterday: [
        { id: 'm1', title: 'Write follow-up notes for QBR' },
      ],
      repeatSuggestions: [
        { id: 'r1', title: 'Morning inbox triage' },
        { id: 'r2', title: 'Afternoon focus block' },
        { id: 'r3', title: 'End-of-day wrap-up notes' },
      ],
      dailyChecks: [
        { id: 'c1', label: 'Check inbox & triage', completed: false },
        { id: 'c2', label: 'Reply to priority chats', completed: false },
        { id: 'c3', label: 'Review today’s calendar', completed: true },
        { id: 'c4', label: 'Scan key dashboards', completed: false },
      ],
      pet: {
        name: 'Nova',
        type: 'Fox',
        mood: PetMood.HAPPY,
        personality: 'Energetic',
      },
      notifications: [
        {
          id: 'n1',
          type: 'LUNCH',
          title: 'Lunch with Alex at 12:30',
          description: 'Downtown café, 5 min walk from you.',
          timeAgo: '2h ago',
        },
        {
          id: 'n2',
          type: 'GIFT',
          title: 'Maya sent you a “Focus hero” gift',
          description: '5 days of deep work in a row.',
          timeAgo: 'Yesterday',
        },
        {
          id: 'n3',
          type: 'QUEST',
          title: 'New quest unlocked',
          description: 'Try the “Move for 5” break quest today.',
          timeAgo: 'This morning',
        },
      ],
      shortcuts: [
        {
          id: 's1',
          label: 'Outlook',
          href: 'https://outlook.office.com',
        },
        {
          id: 's2',
          label: 'Teams',
          href: 'https://teams.microsoft.com',
        },
        {
          id: 's3',
          label: 'Slack',
          href: 'https://slack.com',
        },
        {
          id: 's4',
          label: 'Notion',
          href: 'https://www.notion.so',
        },
        {
          id: 's5',
          label: 'Jira',
          href: 'https://www.atlassian.com/software/jira',
        },
        {
          id: 's6',
          label: 'Power BI',
          href: 'https://app.powerbi.com',
        },
      ],
      songOfTheDay: {
        title: 'Midnight Focus',
        artist: 'Clubhouse Collective',
        url: 'https://open.spotify.com/track/demo',
        pickedBy: 'Alex',
      },
    };
  }

  // TODO: replace with real queries once DB is on.
  return getEmployeeHomeData(userId);
}

export async function getPeopleDirectory(): Promise<{
  people: PeopleDirectoryRow[];
  recognition: RecognitionRow[];
}> {
  if (!DB_ENABLED || !prisma) {
    return {
      people: [
        {
          id: 'u1',
          name: 'Alex Rivera',
          roleAndTeam: 'Senior Product Designer · Product',
          status: ClubhouseStatus.IN_CLUBHOUSE,
          songTitle: 'Midnight Focus',
          songUrl: 'https://open.spotify.com/track/demo1',
          petLabel: '🦊 Nova',
        },
        {
          id: 'u2',
          name: 'Maya Chen',
          roleAndTeam: 'Engineering Manager · Platform',
          status: ClubhouseStatus.DEEP_FOCUS,
          songTitle: 'Calm Circuit',
          songUrl: 'https://open.spotify.com/track/demo2',
          petLabel: '🤖 Cosmo',
        },
        {
          id: 'u3',
          name: 'Leo Martins',
          roleAndTeam: 'Account Executive · Sales',
          status: ClubhouseStatus.ON_BREAK,
          songTitle: 'Coffee Run',
          songUrl: 'https://open.spotify.com/track/demo3',
          petLabel: '🐶 Pixel',
        },
      ],
      recognition: [
        {
          id: 'g1',
          fromName: 'Maya Chen',
          toName: 'Alex Rivera',
          badge: BadgeType.FOCUS_HERO,
          reason: '5 days of deep work before standup.',
          when: '2h ago',
        },
        {
          id: 'g2',
          fromName: 'Leo Martins',
          toName: 'Maya Chen',
          badge: BadgeType.TEAM_SPARK,
          reason: 'Hosted an open Q&A for the team.',
          when: 'Yesterday',
        },
        {
          id: 'g3',
          fromName: 'People Ops',
          toName: 'Whole Product Team',
          badge: BadgeType.WELLNESS_CHAMP,
          reason: 'Highest quality break score this week.',
          when: 'This week',
        },
      ],
    };
  }

  // TODO: real Prisma queries later.
  return getPeopleDirectory();
}
