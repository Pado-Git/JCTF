import { Button, Card, MaxWidthContainer } from '@/+shared/components';
import { IcoChallengeFilled, IcoTeamFilled, IcoArrowRightSLined} from '@/+shared/assets/icons';
import { Competition, getContestStatusMessage } from "@/+shared/utils";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/+shared/stores/authStore";
import { SquareBg } from '@/home/assets/images';

export function CurrentCompetitions() {
  const mockCompetitions: Competition[] = [
    {
      id: 'comp-001',
      name: 'Winter CTF 2024',
      description: 'Test your skills in web exploitation, cryptography, and reverse engineering',
      status: 'live',
      startTime: '2024-01-15T09:00:00Z',
      endTime: '2024-01-17T21:00:00Z',
      participants: 234,
      challenges: 25,
      type: 'team'
    },
    {
      id: 'comp-002',
      name: 'Beginner Crypto Challenge',
      description: 'Perfect for newcomers to cryptography',
      status: 'upcoming',
      startTime: '2024-01-20T10:00:00Z',
      endTime: '2024-01-20T18:00:00Z',
      participants: 89,
      challenges: 15,
      type: 'individual'
    },
    {
      id: 'comp-003',
      name: 'Advanced Pwning Tournament',
      description: 'Binary exploitation and reverse engineering challenges',
      status: 'upcoming',
      startTime: '2024-01-25T14:00:00Z',
      endTime: '2024-01-27T14:00:00Z',
      participants: 156,
      challenges: 20,
      type: 'team'
    }
  ];

  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  return(
    <section className="py-20 relative">
      <div className="absolute inset-0 z-0">
        <img 
          src={SquareBg} 
          alt="Background" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
    <MaxWidthContainer className="relative z-10">
      <div className="mb-12">
        <h2 className="typo-heading-large text-primary-200 mb-4">
          Current Competitions
        </h2>
        <p className="typo-body-medium text-primary-50">
          Join ongoing competitions and test your skills
        </p>
      </div>
      
      <div className="flex gap-8">
        {mockCompetitions.slice(0, 3).map((comp) => (
          <Card key={comp.id} className="w-[430px] h-[480px] bg-primary-900/70 border border-primary-800 rounded-3xl p-8 flex flex-col justify-between group hover:border-primary-500 transition-all duration-300">
            {/* Header Section */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h3 className="typo-heading-medium text-primary-100">
                  {comp.name}
                </h3>
                <div className={`px-2 py-1 rounded-xs typo-body-xsmall font-bold w-fit ${
                  comp.status === 'live' 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-warning text-warning-foreground'
                }`}>
                  {comp.status === 'live' ? 'Live' : 'Upcoming'}
                </div>
                <p className="typo-body-medium text-primary-50 mt-4 h-12 flex items-start">
                  {comp.description}
                </p>
              </div>
              
              {/* Stats Section */}
              <div className="flex gap-6">
                <div className="flex items-center gap-4 flex-1">
                  <IcoTeamFilled />
                  <div className="flex flex-col">
                    <span className="typo-body-large font-bold text-primary-50">
                      {comp.participants}
                    </span>
                    <span className="typo-body-xsmall text-primary-100">
                      Participants
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 flex-1">
                  <IcoChallengeFilled />
                  <div className="flex flex-col">
                    <span className="typo-body-large font-bold text-primary-50">
                      {comp.challenges}
                    </span>
                    <span className="typo-body-xsmall text-primary-100">
                      Challenges
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer Section */}
            <div className="flex flex-col gap-4">
              <p className="typo-body-small text-primary-200">
                {getContestStatusMessage(comp)}
              </p>
              <Button 
                onClick={() => navigate(isAuthenticated ? '/competitions' : '/login')}
                className="w-full bg-primary hover:bg-primary/80 text-primary-foreground h-10 text-[15px]"
              >
                {comp.status === 'live' ? 'Join now' : 'Register'}
              </Button>
            </div>
          </Card>

        ))}
      </div>
      <Button variant="secondary" className="w-fit h-12 px-6 text-primary mt-14">
        View All Competitions
        <IcoArrowRightSLined />
      </Button>
    </MaxWidthContainer>
  </section>
  )
}

export default CurrentCompetitions;