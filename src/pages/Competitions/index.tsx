import { CategoryFilter, MaxWidthContainer } from '@/+shared/components';
import CompetitionCard from '@/competition/components/CompetitionCard';
import { useCompetitions } from './index.hooks';

export function Competitions() {
  const {
    selectedTab,
    setSelectedTab,
    filteredCompetitions,
    statusCategories,
    competitionsWithStatus,
    isLoading,
    error,
  } = useCompetitions();

  // 로딩 상태
  if (isLoading) {
    return (
      <MaxWidthContainer className="py-20" innerProps={{ className: "gap-8" }}>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading competitions...</p>
        </div>
      </MaxWidthContainer>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <MaxWidthContainer className="py-20" innerProps={{ className: "gap-8" }}>
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-destructive mb-2">Failed to load competitions</h3>
          <p className="text-muted-foreground">
            Please try refreshing the page or contact support if the problem persists.
          </p>
        </div>
      </MaxWidthContainer>
    );
  }
  
  return (
    <MaxWidthContainer className="py-20" innerProps={{ className: "gap-8" }}>
      {/* Status Tabs */}
      <CategoryFilter 
        categories={statusCategories}
        data={competitionsWithStatus}
        selected={selectedTab}
        onSelect={setSelectedTab}
        getItemCategory={(competition) => competition.status}
        isAll={true}
      />

      {/* Competitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCompetitions.map((competition) => (
          <CompetitionCard
            key={competition.id}
            competition={competition}
          />
        ))}
      </div>

      {filteredCompetitions.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-foreground mb-2">No competitions found</h3>
          <p className="text-muted-foreground">
            No competitions match your current filter. Try selecting a different tab.
          </p>
        </div>
      )}
    </MaxWidthContainer>
  );
}

export default Competitions;