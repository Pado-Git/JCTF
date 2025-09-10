import { IcoChallengeFilled, IcoLightFilled, IcoTeamFilled, IcoTrophyFilled } from "@/+shared/assets";
import { Card, CardContent, CountUp, MaxWidthContainer } from "@/+shared/components";
import FaultyTerminal from "@/home/components/FaultyTerminal/FaultyTerminal";

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
    <div className="absolute inset-0">
      <FaultyTerminal
        scale={2.4}
        digitSize={2.7}
        gridMul={[7, 2]}
        timeScale={1}
        scanlineIntensity={0.3}
        noiseAmp={0.9}
        chromaticAberration={0}
        dither={0}
        curvature={0}
        tint="#ffffff"
        mouseReact={false}
        mouseStrength={0.3}
        pageLoadAnimation={false}
        brightness={0.1}
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
              <Card key={stat.id} className="bg-neutral-0/50 border border-primary-900 text-center py-11">
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