import { MaxWidthContainer, CategoryFilter } from '@/+shared/components';
import { MyTeam, TeamMember, Competitions } from '@/teams/layout';
import { useTeamsPage } from './index.hooks';

export function TeamsPage() {
  const {
    // State
    myTeam,
    activeTab,
    tabCategories,
    
    // Handlers
    changeActiveTab,
  } = useTeamsPage();

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
          <MyTeam team={myTeam!} className="mb-14" />
          <CategoryFilter
            categories={tabCategories}
            data={[]}
            selected={activeTab}
            onSelect={changeActiveTab}
            getItemCategory={() => ''}
            isAll={false}
            isCountExist={false}
          />

          {activeTab === 'Members' && <TeamMember team={myTeam!} />}

          {activeTab === 'Competitions' && <Competitions team={myTeam!  } />}
        </div>
      </MaxWidthContainer>
      </div>
    </>
  );
}