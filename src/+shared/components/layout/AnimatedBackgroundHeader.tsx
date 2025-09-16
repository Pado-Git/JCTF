import { AnimatedBackground, MaxWidthContainer } from '@/+shared/components';
import { StatCard } from '@/dashboard/components';
import { dashboardMocks } from '@/dashboard/data/mockData';
import { leaderBg1, leaderBg2, leaderBg3 } from '@/home/assets';

export function AnimatedBackgroundHeader({ title, coloredTitle, description, children }: { title: string, coloredTitle: string, description: string, children: React.ReactNode }) {
  
  return (
    <MaxWidthContainer className="relative z-10 pt-14 pb-10">
      {/* Welcome Header */}
      <div className="px-4">
        <div className="absolute inset-0 z-0">
          <AnimatedBackground
            images={[leaderBg1, leaderBg2, leaderBg3]}
            interval={400}
            opacity={1}
          />
        </div>
        <div className='relative z-10 flex flex-col gap-2'>
          <h1 className="typo-heading-large text-primary-50">
            {title} <span className="text-primary">{coloredTitle}</span>
          </h1>
          <p className="text-primary-100 typo-body-medium">
            {description}
          </p>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14 mb-6">
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
      {children && (
        <div className='flex flex-col gap-4 bg-neutral-900/50 backdrop-blur-sm border border-primary-900 rounded-radius-lg px-10 py-6 w-full'>
          {children}
        </div>
      )}
    </MaxWidthContainer>
  );
}