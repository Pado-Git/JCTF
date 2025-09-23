import { Button } from '@/+shared/components/form/button';
import { useMyTeam } from './index.hooks';
import { type Team } from '@/teams/data';
import { Divider } from '@/+shared/components';
import { IcoEditFilled, IcoTeamLined } from '@/+shared/assets';

interface MyTeamProps {
  team: Team;
  className?: string;
}

export function MyTeam({ team, className }: MyTeamProps) {
  const { isTeamLeader, teamStats, handleEditTeam } = useMyTeam(team);

  return (
    <div className={`flex flex-col gap-12 ${className || ''}`}>
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-6">
          <div className="w-18 h-18 rounded-full gradient-2 flex items-center justify-center">
            <span className="typo-heading-medium text-primary-50">
              {team.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
          
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <h1 className="typo-heading-medium text-primary-50">{team.name}</h1>
              {isTeamLeader && (
                <div className="w-fit px-2 py-1 gradient-2 rounded-radius-xs typo-body-xsmall-bold">
                  Team Leader
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <IcoTeamLined className="w-4 h-4 text-primary" />
              <span className="typo-body-small text-primary-300">{team.members.length} Members</span>
            </div>

            <p className="typo-body-medium text-primary-200">
              {team.description}
            </p>
          </div>
        </div>
        
        <Button 
          variant="primary" 
          size="small"
          className="flex items-center gap-2"
          onClick={handleEditTeam}
        >
          <IcoEditFilled className="w-4 h-4" />
          Edit
        </Button>
      </div>
      
      {/* Divider */}
      <Divider className='border-neutral-700' />

      {/* Team Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {teamStats.map((stat, index) => (
          <div key={index} className="bg-neutral-800 rounded-radius-lg px-4 py-6 text-center flex flex-col gap-2">
            <div className="typo-heading-large text-primary">
              {stat.value}
            </div>
            <div className="typo-body-medium-bold text-neutral-300">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyTeam;
