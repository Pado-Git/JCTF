import { IcoChartIncreaseLined, IcoTeamFilled, IcoArrowRightSLined } from '@/+shared/assets';
import { Card, TitleWIcon } from '@/+shared/components';

interface OverviewProps {
  profile: {
    stats: {
      totalCompetitions: number;
      totalSolved: number;
      totalPoints: number;
      averageRank: number;
      firstBloods: number;
      bestRank: number;
    };
    currentTeam?: {
      id: string;
      name: string;
      role: 'leader' | 'member';
      members: number;
    };
  };
  onNavigate?: (path: string) => void;
}

export function Overview({ profile, onNavigate }: OverviewProps) {
  const successRate = Math.round((profile.stats.totalSolved / (profile.stats.totalCompetitions * 20)) * 100);
  const skillLevel = 78; // Figma에서 78%로 표시

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Competition Statistics */}
      <div className="flex-1">
        <TitleWIcon 
          title="Competition Statistics"
          icon={<IcoChartIncreaseLined />}
          description="Your competition statistics"
        />
        
        <Card className="bg-neutral-900 border border-neutral-700 rounded-3xl p-8">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Statistics List */}
            <div className="flex-1 space-y-8">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-bold text-sm">Total Competitions</span>
                <span className="text-primary-300 font-bold text-lg">{profile.stats.totalCompetitions}</span>
              </div>
              <div className="w-full h-px bg-neutral-600"></div>
              
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-bold text-sm">Average Rank</span>
                <span className="text-primary-300 font-bold text-lg">{profile.stats.averageRank}</span>
              </div>
              <div className="w-full h-px bg-neutral-600"></div>
              
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-bold text-sm">Success Rate</span>
                <span className="text-primary-300 font-bold text-lg">{successRate}%</span>
              </div>
            </div>

            {/* Skill Level Progress */}
            <div className="flex-1 flex flex-col justify-end gap-4">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-4">
                  <span className="text-primary-300 font-bold text-sm">Skill Level</span>
                  <span className="text-neutral-300 text-sm">{skillLevel}%</span>
                </div>
                <div className="px-4 py-2 bg-orange-900 rounded-full">
                  <span className="text-orange-400 font-bold text-sm">Advanced</span>
                </div>
              </div>
              
              <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary-800 rounded-full"
                  style={{ width: `${skillLevel}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Current Team */}
      {profile.currentTeam && (
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-10">
            <IcoTeamFilled className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-primary-200">Current Team</h2>
          </div>
          
          <Card className="bg-neutral-900 border border-neutral-700 rounded-3xl p-8 h-[221px] flex flex-col justify-between">
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-bold text-sm">Team Name</span>
                <span className="text-primary-300 font-bold text-lg">{profile.currentTeam.name}</span>
              </div>
              <div className="w-full h-px bg-neutral-600"></div>
              
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-bold text-sm">Your Role</span>
                <span className="text-primary-300 font-bold text-lg">
                  {profile.currentTeam.role === 'leader' ? 'Team Leader' : 'Member'}
                </span>
              </div>
              <div className="w-full h-px bg-neutral-600"></div>
              
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-bold text-sm">Members</span>
                <span className="text-primary-300 font-bold text-lg">{profile.currentTeam.members}</span>
              </div>
            </div>
            
            <button 
              className="w-full h-12 bg-primary text-primary-foreground font-bold text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              onClick={() => onNavigate?.('teams')}
            >
              Manage Team
              <IcoArrowRightSLined className="w-4 h-4" />
            </button>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Overview;