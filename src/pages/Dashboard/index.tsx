import { MaxWidthContainer, AnimatedBackground } from '@/+shared/components';
import { IcoMedalFilled } from '@/+shared/assets/icons';
import { leaderBg1, leaderBg2, leaderBg3 } from '@/home/assets';
import { CompetitionCard, StatCard } from '@/dashboard/components';
import { useDashboard } from './index.hooks';
import { RecentActivity } from '@/profile/layout';

export function DashboardPage() {
  const { user, dashboardMocks, mockCompetitions, mockActivities } = useDashboard();

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
          <RecentActivity activities={mockActivities} />
        </MaxWidthContainer>
      </section>
    </>
  );
}