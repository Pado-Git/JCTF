import { Trophy } from 'lucide-react';
import { CategoryFilter, useCompetitionStatus } from '@/+shared/components';
import CompetitionCard from '@/competition/components/CompetitionCard';
import { competitions } from '@/competition/data';
import { useCompetitions } from './index.hooks';

export function Competitions() {
  const {
    selectedTab,
    setSelectedTab,
    selectedCompetition,
    filteredCompetitions,
    statusCategories,
    handleCompetitionSelect,
  } = useCompetitions();

  return (
    <div className="bg-neutral-900">
      <div className="container mx-auto px-4 py-8">
        {/* Status Tabs */}
        <div className="mb-8">
          <CategoryFilter 
            categories={statusCategories}
            data={competitions}
            selected={selectedTab}
            onSelect={setSelectedTab}
            getItemCategory={(competition) => {
              const statusInfo = useCompetitionStatus(competition);
              return statusInfo.status;
            }}
            isAll={true}
          />
        </div>

        {/* Competitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCompetitions.map((competition) => (
            <CompetitionCard
              key={competition.id}
              competition={competition}
              isSelected={selectedCompetition === competition.id}
              onSelect={handleCompetitionSelect}
            />
          ))}
        </div>

        {filteredCompetitions.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No competitions found</h3>
            <p className="text-muted-foreground">
              No competitions match your current filter. Try selecting a different tab.
            </p>
          </div>
        )}
      </div>
      </div>
  );
}

export default Competitions;