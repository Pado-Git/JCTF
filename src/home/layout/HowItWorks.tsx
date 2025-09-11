import { ImageJoin, ImageSolve, ImageWin } from '@/home/assets';
import { MaxWidthContainer } from '@/+shared/components';

export function HowItWorks() {
  interface Step {
    id: string;
    number: number;
    title: string;
    subtitle: string;
    description: string;
    gradientFrom: string;
    gradientTo: string;
    circleBg: string;
    circleText: string;
    cardText: string;
    image: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }
  
  const steps: Step[] = [
    {
      id: 'step-1',
      number: 1,
      title: 'Join',
      subtitle: 'Register, connect, and build your team',
      description: 'Create your hacker profile and explore upcoming competitions.\nMeet players from around the world and start your journey together.',
      gradientFrom: 'from-primary-500/20',
      gradientTo: 'to-primary-700/30',
      circleBg: 'bg-primary',
      circleText: 'text-primary-foreground',
      cardText: 'text-primary-foreground',
      image: ImageJoin
    },
    {
      id: 'step-2',
      number: 2,
      title: 'Solve',
      subtitle: 'Tackle challenges, learn, and grow your skills',
      description: 'Face real-world problems across web, crypto, pwn, and reverse.\nSharpen your creativity and technical expertise with every solve.',
      gradientFrom: 'from-accent/20',
      gradientTo: 'to-accent/30',
      circleBg: 'bg-accent',
      circleText: 'text-accent-foreground',
      cardText: 'text-accent-foreground',
      image: ImageSolve
    },
    {
      id: 'step-3',
      number: 3,
      title: 'Win',
      subtitle: 'Capture flags, climb the leaderboard, and celebrate victory',
      description: 'Showcase your talent against global competitors under pressure.\nEarn recognition, grow with your team, and enjoy the thrill of success.',
      gradientFrom: 'from-first-blood/20',
      gradientTo: 'to-first-blood/30',
      circleBg: 'bg-first-blood',
      circleText: 'text-first-blood-foreground',
      cardText: 'text-first-blood-foreground',
      image: ImageWin
    }
  ];

  
  return (
    <section className="py-32 gradient-3">
    <MaxWidthContainer>
      {/* Header */}
      <div className="flex items-start gap-14 mb-12">
        <div className="flex-1 max-w-[350px]">
          <h2 className="typo-heading-large text-primary-200 mb-4">
            How It Works
          </h2>
          <p className="typo-body-medium text-primary-50">
            Three simple steps to start hacking
          </p>
        </div>
        <div className="flex-1">
          {steps.map((step) => (
            <div key={step.id}>
              <div className="flex items-center gap-20 mb-12">
                {/* Step Card */}
                <div className="text-center">
                  <div className="w-[250px] h-[220px] mx-auto mb-4 flex items-center justify-center">
                    <step.image className="w-full h-full" />
                  </div>
                </div>
                
                {/* Step Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-6">
                    <span className="typo-heading-large text-primary">{step.number}</span>
                    <h3 className="typo-heading-large text-primary-50">{step.title}</h3>
                  </div>
                  <h4 className="typo-body-large text-primary-50 font-bold">
                    {step.subtitle}
                  </h4>
                  <p className="typo-body-medium text-primary-100">
                    {step.description.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < step.description.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MaxWidthContainer>
  </section>
  )
}