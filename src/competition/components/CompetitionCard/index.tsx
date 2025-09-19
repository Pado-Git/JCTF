
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardDescription, CardTitle, Badge, Progress, BadgeVariant } from '@/+shared/components';
import { getCompetitionStatus } from '@/+shared/utils';
import { formatDate, handleRegister } from './index.hooks';
import { IcoCalendarLined, IcoChart, IcoTeamLined, IcoTrophyLined } from '@/+shared/assets';

interface Competition {
  id: string;
  name: string;
  backgroundImg: string;
  description: string;
  startDate: string;
  endDate: string;
  participants: number;
  maxParticipants: number;
  format: string;
  difficulty: 'beginner' | 'advanced' | 'expert';
  categories: string[];
  prize: string;
  registered: boolean;
  minMembers: number;
  maxMembers: number;
}

interface CompetitionCardProps {
  competition: Competition;
  isSelected?: boolean;
  onSelect?: (competitionId: string) => void;
}

export function CompetitionCard({ competition, onSelect }: CompetitionCardProps) {
  const navigate = useNavigate();
  const statusInfo = getCompetitionStatus(competition);

  return (
    <Card
      className="h-[600px] border border-neutral-700 hover:border-primary/50 transition-all duration-300 cursor-pointer p-8 relative overflow-hidden"
      onClick={() => onSelect?.(competition.id)}
      style={{
        backgroundImage: `url(${competition.backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="bg-overlay absolute inset-0 bg-neutral-900/80 z-0 duration-300"></div>
      <div className='flex flex-col justify-between gap-7 h-full z-10'>
      <section>
        <div className="flex flex-col gap-1 items-start justify-between">
          <CardTitle className="typo-heading-medium text-primary-100">{competition.name}</CardTitle>
          <CardDescription className="typo-body-medium text-neutral-100">
            {competition.description}
          </CardDescription>
          
        </div>
      </section>

      <section className='flex flex-col gap-4'>
        <div className="flex gap-2">
          <Badge variant={statusInfo.status as BadgeVariant} />
          <Badge variant={competition.difficulty as BadgeVariant} />
        </div>
        <div className='flex gap-2'>
        {competition.categories.map((category) => (
          <Badge variant='greyTag' key={category}>{category}</Badge>
        ))}
        </div>
      </section>

      <section>
        {/* Participants */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between typo-body-small">
            <div className="flex items-center gap-1 ">
              <span className='text-primary-300'>Participants</span>
            </div>
            <span className="text-neutral-200">
              {competition.participants.toLocaleString()} / {competition.maxParticipants.toLocaleString()}
            </span>
          </div>
          <Progress 
            value={(competition.participants / competition.maxParticipants) * 100} 
            className="h-2"
          />
        </div>
      </section>

      <section className='flex justify-between items-end'>
        <div className='flex flex-col gap-2 typo-body-xsmall text-neutral-100'>
          <span className='typo-body-xsmall-bold text-neutral-50'>Competition Details</span>
          <div className='flex items-center gap-1'>
            <IcoCalendarLined className='size-4' />
            <span>Start: {formatDate(competition.startDate)}</span>
          </div>
          <div className='flex items-center gap-1'>
            <IcoCalendarLined className='size-4' />
            <span>End: {formatDate(competition.endDate)}</span>
          </div>
          <div className='flex items-center gap-1'>
            <IcoTrophyLined className='size-4' />
            <span>Format: {competition.format}</span>
          </div>
          <div className='flex items-center gap-1'>
            <IcoTeamLined className='size-4' />
            <span>{competition.minMembers} - {competition.maxMembers} members</span>
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <span className="typo-body-large-bold text-primary">{competition.prize}</span>
          <span className="typo-body-xsmall text-neutral-200">Prize Pool</span>
        </div>
      </section>

      {/* Action Button */}
      <div className="w-full">
        {statusInfo.status === "upcoming" && (
          <div className="">
            {competition.registered ? (
              <Button className="w-full" variant="secondary" disabled>
                Registered
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRegister(competition.id);
                }}
                disabled={competition.participants >= competition.maxParticipants}
              >
                {competition.participants >= competition.maxParticipants ? "Full" : "Register Now"}
              </Button>
            )}
          </div>
        )}

        {statusInfo.status === "live" && (
          <div className="w-full">
            {competition.registered ? (
              <div className="flex gap-2 w-full">
                <Button
                  className="flex-[2]"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate?.("challenges");
                  }}
                >
                  <IcoTrophyLined />
                  Enter
                </Button>
                <Button
                  className="flex-[1]"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate?.("leaderboard");
                  }}
                >
                  <IcoChart />
                  Leaderboard
                </Button>
              </div>
            ) : (
              <Button
                className="w-full"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate?.("leaderboard");
                }}
              >
                Leaderboard
              </Button>
            )}
          </div>
        )}

        {statusInfo.status === "ended" && (
          <Button
            className="w-full"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              navigate?.("leaderboard");
            }}
          >
            View Results
          </Button>
        )}
      </div>

      </div>
    </Card>
  );
}

export default CompetitionCard;