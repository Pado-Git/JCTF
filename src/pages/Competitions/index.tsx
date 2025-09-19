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
  } = useCompetitions();
  
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