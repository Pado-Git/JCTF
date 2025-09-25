import { Badge, Button, Card } from '@/+shared/components';
import { IcoChallengeFilled, IcoTeamFilled } from '@/+shared/assets/icons';
import { getCompetitionStatus, getContestStatusMessage } from "@/+shared/utils";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/+shared/stores/authStore";

interface CompetitionCardProps {
  competition: {
    id: string;
    name: string;
    description?: string;
    status?: 'live' | 'upcoming' | 'ended';
    participants?: number;
    challenges?: number;
    startDate: string;
    endDate: string;
    backgroundImg: string;
  };
}

export function CompetitionCard({ competition: comp }: CompetitionCardProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  return (
    <Card 
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
          <Badge variant={getCompetitionStatus(comp).status} />
          <p className="typo-body-medium text-primary-50 mt-4 h-12 flex items-start">
            {comp.description || 'No description available'}
          </p>
        </div>
        
        {/* Stats Section */}
        <div className="flex gap-6">
          <div className="flex items-center gap-4 flex-1">
            <IcoTeamFilled />
            <div className="flex flex-col">
              <span className="typo-body-large font-bold text-primary-50">
                {comp.participants || 0}
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
                {comp.challenges || 0}
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
          {getContestStatusMessage({status: comp.status, startTime: comp.startDate, endTime: comp.endDate})}
        </p>
        <Button 
          onClick={() => navigate(isAuthenticated ? '/competitions' : '/login')}
        >
          {comp.status === 'live' ? 'Join now' : 'Register'}
        </Button>
      </div>
    </Card>
  );
}

export default CompetitionCard;