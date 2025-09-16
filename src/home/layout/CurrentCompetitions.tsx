import { Badge, Button, Card, MaxWidthContainer } from '@/+shared/components';
import { IcoChallengeFilled, IcoTeamFilled, IcoArrowRightSLined} from '@/+shared/assets/icons';
import { getContestStatusMessage } from "@/+shared/utils";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/+shared/stores/authStore";
import { SquareBg } from '@/home/assets/images';
import { mockCompetitions } from '@/dashboard/data/mockData';

export function CurrentCompetitions() {

  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

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
          <Card 
            key={comp.id} 
            className="w-[430px] min-h-[480px] border border-primary-800 rounded-radius-lg p-8 flex flex-col justify-between group hover:border-primary-500 hover:shadow-2 hover:bg-primary-900 hover:bg-image-none transition-all duration-300 relative overflow-hidden"
            style={{
              backgroundImage: `url(${comp.backgroundImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Background Overlay */}
            <div className="bg-overlay absolute inset-0 bg-primary-900/70 z-0 duration-300"></div>
            
            {/* Header Section */}
            <div className="flex flex-col gap-8 relative z-10">
              <div className="flex flex-col gap-2">
                <h3 className="typo-heading-medium text-primary-100">
                  {comp.name}
                </h3>
                <Badge variant={comp.status === 'live' ? 'live' : 'upcoming'}>
                  {comp.status === 'live' ? 'Live' : 'Upcoming'}
                </Badge>
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
            <div className="flex flex-col gap-4 relative z-10">
              <p className="typo-body-small text-primary-200">
                {getContestStatusMessage({status: comp.status, startTime: comp.startTime, endTime: comp.endTime})}
              </p>
              <Button 
                onClick={() => navigate(isAuthenticated ? '/competitions' : '/login')}
              >
                {comp.status === 'live' ? 'Join now' : 'Register'}
              </Button>
            </div>
          </Card>

        ))}
      </div>
      <Button 
        variant="secondary" 
        className="w-fit h-12 px-6 text-primary mt-14"
        onClick={() => navigate('/competitions')}
      >
        View All Competitions
        <IcoArrowRightSLined />
      </Button>
    </MaxWidthContainer>
  </section>
  )
}

export default CurrentCompetitions;