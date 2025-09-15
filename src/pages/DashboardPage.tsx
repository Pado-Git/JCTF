import { Card, MaxWidthContainer, AnimatedBackground } from '@/+shared/components';
import { IcoTrophyFilled, IcoChallengeFilled, IcoStarFilled, IcoCrownFilled, IcoTimerLined1, IcoMedalFilled } from '@/+shared/assets/icons';
import { leaderBg1, leaderBg2, leaderBg3 } from '@/home/assets';
import { headerInfo, mockCompetitions } from '@/dashboard/data/mockData';
import { ActivityCard, CompetitionCard, StatCard } from '@/dashboard/components';
import { useAuthStore } from '@/+shared/stores/authStore';

// Props interface removed - using React Router now

// CompetitionEntry interface removed - using mock data directly

interface RecentActivity {
  id: string;
  type: 'solve' | 'join' | 'rank_up';
  challengeName?: string;
  competitionName: string;
  points?: number;
  timestamp: string;
  isFirstBlood?: boolean;
}


const dashboardMocks = [
  {
    id: 'competitions',
    value: 15,
    label: 'Competitions',
    icon: IcoTrophyFilled,
  },
  {
    id: 'solved',
    value: 127,
    label: 'Challenges Solved',
    icon: IcoChallengeFilled,
  },
  {
    id: 'points',
    value: 18650,
    label: 'Total Points',
    icon: IcoStarFilled,
  },
  {
    id: 'firstbloods',
    value: 12,
    label: 'First Bloods',
    icon: IcoCrownFilled,
    }
];

const mockActivities: RecentActivity[] = [
  {
    id: 'act-001',
    type: 'solve',
    challengeName: 'SQL Injection Master',
    competitionName: 'Winter CTF 2024',
    points: 450,
    timestamp: '2 hours ago',
    isFirstBlood: true
  },
  {
    id: 'act-002',
    type: 'rank_up',
    competitionName: 'Winter CTF 2024',
    timestamp: '3 hours ago'
  },
  {
    id: 'act-003',
    type: 'solve',
    challengeName: 'Buffer Overflow Basics',
    competitionName: 'Winter CTF 2024',
    points: 200,
    timestamp: '1 day ago'
  },
  {
    id: 'act-004',
    type: 'join',
    competitionName: 'Advanced Pwning Tournament',
    timestamp: '2 days ago'
  }
];


export function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <>
      <MaxWidthContainer className="relative z-10">
          {/* Welcome Header */}
          <div className="p-4">
            <div className="absolute inset-0 z-0">
              <AnimatedBackground
                images={[leaderBg1, leaderBg2, leaderBg3]}
                interval={400}
                opacity={1}
              />
            </div>
            <div className='relative z-10 mt-20 mb-14 flex items-center justify-between'>
              <div>
                <h1 className="typo-heading-large text-primary-50 mb-2">
                  Welcome back <span className="text-primary">{user?.nickname || user?.email || 'User'}</span>
                </h1>
                <p className="text-primary-100 typo-body-medium">
                  Ready to hack some challenges? Let's see what's new.
                </p>
              </div>
              <div className='flex items-center gap-10'>
                {headerInfo.map((info) => {
                  return (
                    <div className='flex flex-col items-center gap-1'>
                      <span className='typo-heading-xsmall text-primary-50'>{info.value}</span>
                      <span className='text-primary-200 typo-body-small'>{info.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {dashboardMocks.map((stat) => (
              <StatCard
                key={stat.id}
                id={stat.id}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
              />
            ))}
          </div>
      </MaxWidthContainer>

      {/* Main Content */}
      <section className="py-20">
        <MaxWidthContainer>
          <div className='flex items-center gap-4 mb-10'>
            <IcoMedalFilled className='text-primary size-6' />
            <span className='text-primary-200 typo-heading-medium'>My Competitions</span>
          </div>
          <div className="grid gap-6">
            {mockCompetitions.map((comp) => (
              <CompetitionCard
                key={comp.id}
                competition={comp}
              />
            ))}
          </div>
        </MaxWidthContainer>
      </section>

      <section className='py-20 bg-neutral-800'>
        <MaxWidthContainer>
          <div className='flex flex-col gap-2 mb-10'>
            <div className='flex items-center gap-4'>
              <IcoTimerLined1 className='text-primary size-6' />
              <span className='text-primary-200 typo-heading-medium'>Recent Activity</span>
            </div>
            <span className='text-primary-100 typo-body-medium'>
              Your latest achievements and competition updates
            </span>
          </div>

          <Card className="border-neutral-600 bg-neutral-900">
            <div className="grid grid-cols-1 gap-4 p-4">
              {mockActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </Card>
        </MaxWidthContainer>
      </section>
    </>
  );
}