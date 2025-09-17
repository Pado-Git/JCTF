import { useState, useEffect, useRef } from 'react';
import { AnimatedBackgroundHeader, Button, Card, MaxWidthContainer, Divider, Switch, Toggle } from '@/+shared/components';
import { IcoChart, IcoTimerLined2, IcoCrownFilled, IcoReset } from '@/+shared/assets/icons';
import { getCategoryIcon } from '@/challenge/utils/categoryIcons';

// API 응답 구조에 맞는 인터페이스
interface ApiLeaderboardResponse {
  timezone: string;
  data: ApiTeamEntry[];
}

interface ApiTeamEntry {
  rank: number;
  score: number;
  name: string;
  solvedCount: number;
  lastSolvedAt: string;
  logo: string;
  members: {
    name: string;
    score: number;
  }[];
}

// 컴포넌트에서 사용할 인터페이스 (기존 구조 유지)
interface TeamEntry {
  rank: number;
  previousRank: number;
  teamName: string;
  score: number;
  solvedCount: number;
  lastSolvedAt: string;
  members: {
    nickname: string;
    score: number;
    contribution: number;
  }[];
  rankChange: number; // positive = up, negative = down, 0 = no change
  isMyTeam?: boolean;
  logo?: string;
}

interface FirstBloodEntry {
  challengeName: string;
  category: string;
  teamName: string;
  user: string;
  timestamp: string;
  points: number;
}



// API 데이터를 가져오는 함수
const fetchLeaderboardData = async (): Promise<ApiLeaderboardResponse> => {
  const response = await fetch('https://php-test.padev.surf/leaderboard/');

  if (!response.ok) {
    console.error('❌ Fetch failed with status:', response.status);
    throw new Error('Failed to fetch leaderboard data');
  }
  
  const data = await response.json();
  console.log('📦 Raw JSON data:', data);
  
  return data;
};

// API 데이터를 컴포넌트에서 사용하는 형태로 변환
const transformApiDataToTeamEntry = (apiData: ApiTeamEntry[]): TeamEntry[] => {
  return apiData.map((team) => {
    const totalScore = team.members.reduce((sum, member) => sum + member.score, 0);
    
    return {
      rank: team.rank,
      previousRank: team.rank, // API에서 이전 순위 정보가 없으므로 현재 순위로 설정
      teamName: team.name,
      score: team.score,
      solvedCount: team.solvedCount,
      lastSolvedAt: formatLastSolvedTime(team.lastSolvedAt),
      logo: team.logo,
      members: team.members.map(member => ({
        nickname: member.name,
        score: member.score,
        contribution: totalScore > 0 ? (member.score / totalScore) * 100 : 0
      })),
      rankChange: 0, // API에서 순위 변화 정보가 없으므로 0으로 설정
      isMyTeam: team.name === 'CyberNinjas' // 예시: 특정 팀을 내 팀으로 설정
    };
  });
};

// 시간 포맷팅 함수
const formatLastSolvedTime = (isoString: string): string => {
  const now = new Date();
  const lastSolved = new Date(isoString);
  const diffInMinutes = Math.floor((now.getTime() - lastSolved.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} hours ago`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `${days} days ago`;
  }
};

// 마지막 업데이트 시간 포맷팅 함수
const formatLastUpdatedTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minutes ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hours ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} days ago`;
  }
};

const mockFirstBloods: FirstBloodEntry[] = [
  {
    challengeName: 'Advanced Crypto Challenge',
    category: 'Crypto',
    teamName: 'CyberWarriors',
    user: 'Alice',
    timestamp: '5 minutes ago',
    points: 750
  },
  {
    challengeName: 'Buffer Overflow Master',
    category: 'Pwn',
    teamName: 'Binary Ninjas',
    user: 'Dave',
    timestamp: '23 minutes ago',
    points: 650
  },
  {
    challengeName: 'SQL Injection Pro',
    category: 'Web',
    teamName: 'Hack The Planet',
    user: 'Grace',
    timestamp: '1 hour ago',
    points: 500
  },
  {
    challengeName: 'Reverse Engineering Hell',
    category: 'Reverse',
    teamName: 'Code Breakers',
    user: 'John',
    timestamp: '2 hours ago',
    points: 900
  },
  {
    challengeName: 'Forensics Mystery',
    category: 'Forensics',
    teamName: 'Digital Detectives',
    user: 'Sarah',
    timestamp: '3 hours ago',
    points: 600
  }
];


export function LeaderboardPage() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [leaderboardData, setLeaderboardData] = useState<TeamEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllTeams, setShowAllTeams] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const lastUpdatedRef = useRef<Date | null>(null);

  // 데이터 가져오기 함수
  const loadLeaderboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiResponse = await fetchLeaderboardData();
      
      const transformedData = transformApiDataToTeamEntry(apiResponse.data);
      
      setLeaderboardData(transformedData);
      const now = new Date();
      setLastUpdated(now);
      lastUpdatedRef.current = now;
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
      console.error('Failed to load leaderboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    loadLeaderboardData();
  }, []);

  // 자동 새로고침
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        loadLeaderboardData();
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  // 마지막 업데이트 시간 실시간 업데이트
  useEffect(() => {
    if (!lastUpdatedRef.current) return;

    const interval = setInterval(() => {
      // 컴포넌트 리렌더링을 위해 상태 업데이트
      setLastUpdated(prev => prev ? new Date(prev.getTime()) : null);
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(interval);
  }, []); // 빈 의존성 배열로 한 번만 실행

  const handleRefresh = () => {
    loadLeaderboardData();
  };

  const myTeam = leaderboardData.find(team => team.isMyTeam);
  const top3Teams = leaderboardData.slice(0, 3);
  
  // 표시할 팀 수 결정 (Top 3 + Other 팀들로 총 10팀 또는 전체)
  const maxDisplayTeams = showAllTeams ? leaderboardData.length : 10;
  const otherTeams = leaderboardData.slice(3, maxDisplayTeams);
  const hasMoreTeams = leaderboardData.length > 10;
  // First Blood 카테고리 데이터
  const firstBloodCategories = [
    { name: 'All', count: mockFirstBloods.length },
    { name: 'Crypto', count: mockFirstBloods.filter(fb => fb.category === 'Crypto').length },
    { name: 'Pwn', count: mockFirstBloods.filter(fb => fb.category === 'Pwn').length },
    { name: 'Web', count: mockFirstBloods.filter(fb => fb.category === 'Web').length },
    { name: 'Reverse', count: mockFirstBloods.filter(fb => fb.category === 'Reverse').length },
    { name: 'Forensics', count: mockFirstBloods.filter(fb => fb.category === 'Forensics').length }
  ].filter(cat => cat.count > 0); // 카운트가 0인 카테고리는 제외

  // 로딩 중이거나 에러가 있을 때
  if (loading && leaderboardData.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="typo-body-medium text-primary-200">리더보드 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error && leaderboardData.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="typo-body-medium text-red-400 mb-4">{error}</p>
          <Button onClick={handleRefresh} variant="primary">
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header Section */}
      <AnimatedBackgroundHeader title="현재 참여중인 CTF 이름" coloredTitle="Live Overview" description="Live rankings updated every 30 seconds." >
        <>
          <span className='typo-heading-xsmall text-primary-200'>Your Team</span>
          <div className='flex items-center justify-between'>
            <div className='flex gap-4 items-center'>
              <span className='bg-primary rounded-radius-sm typo-heading-medium text-primary-100 w-10 h-10 flex items-center justify-center'>
                {myTeam?.rank || '?'}
              </span>
              <div>
                <div className='flex gap-2 items-center'>
                  <span className='typo-heading-medium text-primary-100'>{myTeam?.teamName || 'No Team'}</span>
                  {myTeam?.rankChange !== undefined && myTeam?.rankChange !== 0 && (
                    <span className={`rounded-radius-xs typo-body-small-bold text-neutral-0 w-fit h-fit px-2 flex items-center justify-center ${
                      (myTeam?.rankChange || 0) > 0 ? 'bg-success' : 'bg-red-500'
                    }`}>
                      {(myTeam?.rankChange || 0) > 0 ? '+' : ''}{myTeam?.rankChange}
                    </span>
                  )}
                </div>
                <span className='typo-body-xsmall text-neutral-200'>last updated : {myTeam?.lastSolvedAt || 'Unknown'}</span>
              </div>
            </div>
            <div className='flex flex-col gap-1 items-end'>
              <span className='typo-heading-medium text-primary'>{myTeam?.score.toLocaleString() || '0'} pts</span>
              <span className='typo-body-small-bold text-primary-200'>{myTeam?.solvedCount || '0'} challenges</span>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='typo-body-xsmall-bold text-primary'>Team Members</span>
            <div className='flex flex-col gap-2'>
              {myTeam?.members.map((member, index) => (
                <div key={member.nickname}>
                  <div className='flex gap-2 items-center justify-between'>
                    <span className='typo-body-small text-primary-100'>{member.nickname}</span>
                    <span className='typo-body-medium-bold text-primary'>{member.score.toLocaleString()}</span>
                  </div>
                  {index < myTeam.members.length - 1 && (
                    <Divider className='border-primary-800 mt-2' />
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      </AnimatedBackgroundHeader>

      <MaxWidthContainer className='py-5 border-b border-neutral-700'>
        <div className='flex items-center justify-between gap-4 typo-body-small'>
          <div className='flex items-center gap-4'>
            <span className='text-primary-200'>Auto - refresh (30s)</span>
            <Switch
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
          </div>
          <div className='flex items-center gap-4'>
            <span className='text-neutral-200'>
              Last updated: {lastUpdated ? formatLastUpdatedTime(lastUpdated) : 'Never'}
            </span>
            <Button 
              onClick={handleRefresh} 
              variant="primary" 
              size="xsmall"
              disabled={loading}
            >
              <IcoReset className='w-4 h-4' />
              {loading ? '새로고침 중...' : '새로고침'}
            </Button>
          </div>
          
        </div>
      </MaxWidthContainer>
      
      {/* Leaderboard Section */}
      <section className="py-16">
        <MaxWidthContainer>
          <div className="flex items-center gap-4 mb-14">
            <IcoChart className="w-6 h-6 text-primary" />
            <h2 className="typo-heading-medium text-primary-200">Leaderboard</h2>
          </div>

          {/* Top 3 Teams */}
          <div className="grid grid-cols-3 gap-6 mb-10 items-end">
            {top3Teams.map((team) => {
              // 순위에 따른 높이 조정
              const getCardHeight = (rank: number) => {
                switch (rank) {
                  case 1: return 'h-[540px]'; // 1등: 가장 높음
                  case 2: return 'h-[480px]'; // 2등: 중간 높이
                  case 3: return 'h-[440px]'; // 3등: 가장 낮음
                  default: return 'h-[31rem]';
                }
              };

              const getGapSize = (rank: number) => {
                switch (rank) {
                  case 1: return 'gap-10'; // 1등: 가장 큰 간격
                  case 2: return 'gap-6'; // 2등: 중간 간격
                  case 3: return 'gap-2'; // 3등: 가장 작은 간격
                  default: return 'gap-4';
                }
              };

              const getIconSize = (rank: number) => {
                switch (rank) {
                  case 1: return 'w-18 h-18'; // 1등: 가장 높음
                  case 2: return 'w-16 h-16'; // 2등: 중간 높이
                  case 3: return 'w-14 h-14'; // 3등: 가장 낮음
                  default: return 'w-10 h-10';
                }
              }

              return (
                <Card 
                  key={team.teamName} 
                  className={`bg-neutral-800 border-2 border-neutral-700 gradient-3-hover rounded-radius-lg p-6 pt-16 relative flex flex-col ${getGapSize(team.rank)} items-center ${getCardHeight(team.rank)} transition-all duration-300 ease-in-out`}
                >
                {/* Rank Badge - Absolute positioned at top center */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-primary rounded-radius-md flex items-center justify-center">
                    <span className="typo-heading-small">{team.rank}</span>
                  </div>
                </div>


                {/* 팀 로고 */}
                <div className={`${getIconSize(team.rank)} bg-primary rounded-radius-rounded mx-auto`}>
                  <img src={team.logo} alt={team.teamName} className="w-full h-full object-cover rounded-radius-rounded" />
                </div>

                <div className="flex flex-col gap-2 items-center flex-1">
                  <h3 className="typo-heading-medium text-primary-100">{team.teamName}</h3>
                  <div className="typo-heading-medium text-primary">{team.score.toLocaleString()} pts</div>
                  <span className="bg-primary-900 text-primary-200 typo-body-small-bold rounded-radius-sm px-4 py-1">
                    {team.solvedCount} challenges
                  </span>
                  <p className="typo-body-xsmall text-neutral-200">Last solved: {team.lastSolvedAt}</p>
                </div>

                {/* Team Members Section - 맨 아래 고정 */}
                <div className="bg-neutral-700 rounded-radius-md py-4 px-6 w-full flex flex-col gap-4 mt-auto">
                  <div className="flex items-center justify-between">
                    <h4 className="typo-body-xsmall-bold text-neutral-300">Team Members</h4>
                  </div>
                  <div>
                    {(() => {
                      // 3명 이하일 때는 세로 배치
                      if (team.members.length <= 3) {
                        return (
                          <div className="flex flex-col gap-2">
                            {team.members.map((member, memberIndex) => {
                              const isLastItem = memberIndex < team.members.length - 1;
                              
                              return (
                                <div key={member.nickname}>
                                  <div className="flex justify-between items-center">
                                    <span className="typo-body-xsmall text-primary-100">{member.nickname}</span>
                                    <span className="typo-body-small-bold text-primary">{member.score.toLocaleString()}</span>
                                  </div>
                                  {isLastItem && <Divider className="border-neutral-500 my-2" />}
                                </div>
                              );
                            })}
                          </div>
                        );
                      }
                      
                      // 4명 이상일 때는 2열 그리드
                      return (
                        <div className="flex flex-col gap-2">
                          {Array.from({ length: Math.ceil(team.members.length / 2) }, (_, rowIndex) => {
                            const leftMember = team.members[rowIndex * 2];
                            const rightMember = team.members[rowIndex * 2 + 1];
                            const isLastRow = rowIndex === Math.ceil(team.members.length / 2) - 1;
                            
                            return (
                              <div key={rowIndex}>
                                <div className="grid grid-cols-2 gap-4">
                                  {/* 왼쪽 멤버 */}
                                  <div className="flex justify-between items-center">
                                    <span className="typo-body-xsmall text-primary-100 truncate pr-2">{leftMember.nickname}</span>
                                    <span className="typo-body-small-bold text-primary flex-shrink-0">{leftMember.score.toLocaleString()}</span>
                                  </div>
                                  
                                  {/* 오른쪽 멤버 */}
                                  <div className="flex justify-between items-center">
                                    {rightMember ? (
                                      <>
                                        <span className="typo-body-xsmall text-primary-100 truncate pr-2">{rightMember.nickname}</span>
                                        <span className="typo-body-small-bold text-primary flex-shrink-0">{rightMember.score.toLocaleString()}</span>
                                      </>
                                    ) : (
                                      <div></div>
                                    )}
                                  </div>
                                </div>
                                
                                {/* 행 사이 구분선 */}
                                {!isLastRow && <Divider className="border-neutral-500 my-2" />}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </Card>
              );
            })}
          </div>

          {/* Other Teams */}
          <div className="space-y-4 mb-10">
            {otherTeams.map((team) => (
              <Card key={team.teamName} className="bg-neutral-800 border-2 border-neutral-700 gradient-3-hover rounded-3xl p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-900 rounded-radius-sm flex items-center justify-center">
                      <span className="typo-heading-small text-primary-100">{team.rank}</span>
                    </div>
                    <div>
                      <h3 className="typo-heading-small">{team.teamName}</h3>
                      <div className="flex items-center gap-2 typo-body-xsmall text-primary-300">
                        <span>{team.solvedCount} challenges</span>
                        <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
                        <span>Last solved: {team.lastSolvedAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="typo-body-large-bold text-primary">{team.score.toLocaleString()} pts</div>
                </div>
              </Card>
            ))}
          </div>

          {hasMoreTeams && (
            <div className="text-center">
              <Button 
                variant="primary" 
                size="small"
                onClick={() => setShowAllTeams(!showAllTeams)}
              >
                {showAllTeams ? 'Show Less' : `View More (${leaderboardData.length - 10} more teams)`}
              </Button>
            </div>
          )}
        </MaxWidthContainer>
      </section>

      {/* First Blood Section */}
      <section className="py-20 bg-neutral-800">
        <MaxWidthContainer>
          <div className="flex items-center gap-4 mb-10">
            <IcoCrownFilled className="w-6 h-6 text-primary" />
            <h2 className="typo-heading-medium text-primary-200">First Blood</h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 mb-10">
            {firstBloodCategories.map((category) => {
              const isActive = selectedCategory === category.name;
              
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`
                    flex items-center justify-center gap-2 px-6 py-2 h-12 rounded-radius-sm
                    transition-all duration-200 cursor-pointer
                    ${isActive 
                      ? 'gradient-2 text-primary-100' 
                      : 'bg-neutral-800 text-neutral-400 hover:bg-primary-900 hover:text-neutral-300'
                    }
                  `}
                >
                  <span className={`typo-heading-xsmall ${isActive ? 'text-primary-100' : 'text-neutral-400'}`}>
                    {category.name}
                  </span>
                  <div 
                    className={`
                      w-6 h-6 rounded-radius-sm flex items-center justify-center typo-body-small
                      ${isActive 
                        ? 'bg-primary-800 border border-primary-500' 
                        : 'bg-neutral-600 border border-neutral-600'
                      }
                    `}
                  >
                    <span className={isActive ? 'text-primary-100' : 'text-neutral-400'}>
                      {category.count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* First Blood List */}
          <div className="flex flex-col gap-4">
            {mockFirstBloods
              .filter(firstBlood => selectedCategory === 'All' || firstBlood.category === selectedCategory)
              .map((firstBlood) => (
              <div key={firstBlood.challengeName} className="bg-background border-2 border-neutral-700 rounded-radius-lg p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-radius-sm bg-primary flex items-center justify-center">
                      {(() => {
                        const IconComponent = getCategoryIcon(firstBlood.category);
                        return <IconComponent className="w-6 h-6" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="typo-heading-small">{firstBlood.challengeName}</h3>
                      <span className="typo-body-small text-neutral-100">{firstBlood.category}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="typo-body-large text-primary">+{firstBlood.points}</div>
                    <div className="typo-body-xsmall text-neutral-200">points</div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary-100 rounded-full"></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="typo-body-medium-bold text-neutral-50">{firstBlood.user}</span>
                        <span className="typo-body-small text-primary-300">from {firstBlood.teamName}</span>
                      </div>
                      <p className="typo-body-xsmall text-neutral-100">First Blood Winner</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <IcoTimerLined2 className="w-4 h-4 text-neutral-200" />
                    <div className="text-right typo-body-xsmall text-neutral-200">
                      <div>14 : 23 : 45</div>
                      <div>{firstBlood.timestamp}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthContainer>
      </section>
    </div>
  );
}

export default LeaderboardPage;