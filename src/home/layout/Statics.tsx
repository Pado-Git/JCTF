import { IcoChallengeFilled, IcoLightFilled, IcoTeamFilled, IcoTrophyFilled } from "@/+shared/assets";
import { Card, CardContent, CountUp, MaxWidthContainer, AnimatedBackground } from "@/+shared/components";
import { staticsBg1, staticsBg2, staticsBg3 } from "@home/assets/background";

export function Statics() {
  interface StatCard {
    id: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    value: number;
    label: string;
  }

  const statCards: StatCard[] = [
    {
      id: 'stat-1',
      icon: IcoTrophyFilled,
      value: 0, // Will be updated with mockStats.totalCompetitions
      label: 'Total Competitions',
    },
    {
      id: 'stat-2',
      icon: IcoTeamFilled,
      value: 0, // Will be updated with mockStats.totalParticipants
      label: 'Participants',
    },
    {
      id: 'stat-3',
      icon: IcoChallengeFilled,
      value: 0, // Will be updated with mockStats.totalChallenges
      label: 'Challenges Solved',
    },
    {
      id: 'stat-4',
      icon: IcoLightFilled,
      value: 0, // Will be updated with mockStats.activeCompetitions
      label: 'Active Now',
    }
  ];

  interface Stats {
    totalCompetitions: number;
    totalParticipants: number;
    totalChallenges: number;
    activeCompetitions: number;
  }
  
  const mockStats: Stats = {
    totalCompetitions: 42,
    totalParticipants: 15670,
    totalChallenges: 987,
    activeCompetitions: 3
  };

  return(
    <section className="py-20 bg-card/20 relative">
    <div className="absolute inset-0 z-0">
    <AnimatedBackground
      images={[staticsBg1, staticsBg2, staticsBg3]}
      interval={400}
      opacity={0.7}
    />
  </div>
    <MaxWidthContainer className="relative z-10">
      <div className="flex items-center justify-between gap-14">
        <div className="mb-12 w-[350px]">
          <h2 className="text-heading-large text-primary-200 mb-4">
            Platform Statistics
          </h2>
          <p className="text-body-medium text-primary-50">
            Join thousands of security enthusiasts
          </p>
        </div>
      
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 w-full">
          {statCards.map((stat, index) => {
            const values = [
              mockStats.totalCompetitions,
              mockStats.totalParticipants,
              mockStats.totalChallenges,
              mockStats.activeCompetitions
            ];
            
            return (
              <Card key={stat.id} className="bg-background/60 border border-primary-900 text-center py-11">
                <CardContent className="p-8">
                  <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" fill="primary-500" />
                  <div className="text-heading-large text-primary mb-2">
                    <CountUp end={values[index]} />
                  </div>
                  <p className="text-primary-200 text-heading-small">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MaxWidthContainer>
  </section>
  )
}

export default Statics