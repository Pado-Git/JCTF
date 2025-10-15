
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { Button, Card, CardDescription, CardTitle, Badge, Progress, BadgeVariant } from '@/+shared/components';
import { useCompetitionCard } from './index.hooks';
import { IcoCalendarLined, IcoChart, IcoTeamLined, IcoTrophyLined } from '@/+shared/assets';
import { LINKS } from '@/+shared/constants';
import { ChallengeBg1 } from '@/dashboard/assets';

interface Competition {
  id: string;
  name: string;
  description: string;
  status: 'UPCOMING' | 'RUNNING' | 'ENDED';
  competitionType: 'TEAM' | 'INDIVIDUAL';
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  maxTeamSize: number;
  isPublic: boolean;
  showLeaderboard: boolean;
  showFirstBlood: boolean;
  timezone: string;
  createdAt: string;
  _count?: {
    teams: number;
    challenges: number;
  };
}

interface CompetitionCardProps {
  competition: Competition;
  isSelected?: boolean;
}

export function CompetitionCard({ competition }: CompetitionCardProps) {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(Date.now());
  
  // 실시간 업데이트를 위한 useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000); // 1초마다 업데이트
    
    return () => clearInterval(interval);
  }, []);
  
  const statusInfo = useMemo(() => {
    return {
      status: competition.status.toLowerCase(),
      isUpcoming: competition.status === 'UPCOMING',
      isRunning: competition.status === "RUNNING",
      isEnded: competition.status === 'ENDED'
    };
  }, [competition]);

  // Badge 표기를 위한 상태 매핑 (RUNNING -> live)
  const badgeVariant = useMemo(() => (
    competition.status === 'RUNNING' ? 'live' : competition.status.toLowerCase()
  ), [competition.status]);

  const { registerModalOpen, setRegisterModalOpen, formatDate, handleRegister } = useCompetitionCard();
  
  return (
    <Card
      className="h-[600px] border border-neutral-700 hover:border-primary/50 transition-all duration-300 cursor-pointer p-8 relative overflow-hidden"
      onClick={() => setRegisterModalOpen(true)}
      style={{
        // 수정 필요 더미
        // backgroundImage: `url(${competition?.backgroundImg})`,
        backgroundImage: `url(${ChallengeBg1})`,
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
          <Badge variant={badgeVariant as BadgeVariant} />
          {/* <Badge variant={competition.difficulty as BadgeVariant} /> */}
          {/* 수정 필요 더미 */}
          <Badge variant='advanced' />
        </div>
        <div className='flex gap-2'>
          {/* 수정 필요 : 카테고리 주석 해제 */}
        {/* {competition.categories.map((category) => (
          <Badge variant='greyTag' key={category}>{category}</Badge>
        ))} */}
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
              {/* 수정 필요 더미 */}
              {competition._count?.participants?.toLocaleString() || 0} / {competition.maxParticipants?.toLocaleString() || 9999}
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
            <span>Format: {competition.competitionType}</span>
          </div>
          <div className='flex items-center gap-1'>
            <IcoTeamLined className='size-4' />
            <span>1 - {competition.maxTeamSize} members</span>
          </div>
        </div>
        {/* <div className='flex flex-col items-end'>
          <span className="typo-body-large-bold text-primary">TBD</span>
          <span className="typo-body-xsmall text-neutral-200">Prize Pool</span>
        </div> */}
      </section>

      {/* Action Button */}
      <div className="w-full">
        {statusInfo.status === "upcoming" && (
          <div className="">
            {/* 수정 필요 : registered 구현 후 */}
            {/* {competition.registered ? ( */}
            { false ? (
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

        {statusInfo.status === "running" && (
          <div className="w-full">
            {/* 수정 필요 : registered 구현 후 */}
            {/* {competition.registered ? ( */}
            { true ? (
              <div className="flex gap-2 w-full">
                <Button
                  className="flex-[2]"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate?.(LINKS.challenges.replace(':competitionId', competition.id));
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
                    navigate?.(LINKS.leaderboard.replace(':competitionId', competition.id));
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
                  navigate?.(LINKS.leaderboard.replace(':competitionId', competition.id));
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
              navigate?.(LINKS.leaderboard.replace(':competitionId', competition.id));
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