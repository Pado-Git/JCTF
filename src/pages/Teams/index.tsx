import { MaxWidthContainer, CategoryFilter } from '@/+shared/components';
import { MyTeam, TeamMember, Competitions } from '@/teams/layout';
import { useTeamsPage } from './index.hooks';

export function TeamsPage() {
  const {
    myTeam,
    activeTab,
    tabCategories,
    changeActiveTab,
    isLoading,
    error,
  } = useTeamsPage();


  if (isLoading) {
    return (
      <>
        <div className="gradient-3 pt-20 pb-14">
          <MaxWidthContainer>
            <h1 className="typo-heading-large text-primary-50">Team Info</h1>
            <p className="typo-body-medium text-primary-100">Loading...</p>
          </MaxWidthContainer>
        </div>
        <div className='bg-neutral-800 py-16'>
          <MaxWidthContainer>
            <div className="flex justify-center items-center h-64">
              <div className="text-primary-100">Loading team data...</div>
            </div>
          </MaxWidthContainer>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="gradient-3 pt-20 pb-14">
          <MaxWidthContainer>
            <h1 className="typo-heading-large text-primary-50">Team Info</h1>
            <p className="typo-body-medium text-primary-100">Error loading team data</p>
          </MaxWidthContainer>
        </div>
        <div className='bg-neutral-800 py-16'>
          <MaxWidthContainer>
            <div className="flex justify-center items-center h-64">
              <div className="text-error">{error}</div>
            </div>
          </MaxWidthContainer>
        </div>
      </>
    );
  }

  if (!myTeam) {
    return (
      <>
        <div className="gradient-3 pt-20 pb-14">
          <MaxWidthContainer>
            <h1 className="typo-heading-large text-primary-50">Team Info</h1>
            <p className="typo-body-medium text-primary-100">No team found</p>
          </MaxWidthContainer>
        </div>
        <div className='bg-neutral-800 py-16'>
          <MaxWidthContainer>
            <div className="flex justify-center items-center h-64">
              <div className="text-primary-100">You are not part of any team</div>
            </div>
          </MaxWidthContainer>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Page Header */}
      <div className="gradient-3 pt-20 pb-14">
        <MaxWidthContainer>
        <h1 className="typo-heading-large text-primary-50">
          Team Info
        </h1>
        <p className="typo-body-medium text-primary-100">
          Manage your team and compete together
        </p>
        </MaxWidthContainer>
      </div>

      <div className='bg-neutral-800 py-16'>
      <MaxWidthContainer>
        <div className="flex flex-col gap-14 bg-neutral-900 rounded-radius-lg border border-neutral-600 p-10">
          <MyTeam team={myTeam} />
          <CategoryFilter
            categories={tabCategories}
            data={[]}
            selected={activeTab}
            onSelect={changeActiveTab}
            getItemCategory={() => ''}
            isAll={false}
            isCountExist={false}
          />

          {activeTab === 'Members' && <TeamMember team={myTeam} />}

          {activeTab === 'Competitions' && <Competitions team={myTeam} />}
        </div>
      </MaxWidthContainer>
      </div>
    </>
  );
}