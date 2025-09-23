import { CategoryFilter, MaxWidthContainer } from '@/+shared/components';
import { IcoCrownFilled, IcoTimerLined2 } from '@/+shared/assets/icons';
import { getCategoryIcon } from '@/challenge/utils/categoryIcons';
import { useFirstBloodSection } from './index.hooks';
import { mockFirstBloods } from '@/leaderboard/utils';
import { formatDate } from '@/challenge/utils';

export function FirstBloodSection() {
  const { 
    firstBloodCategories, 
    selectedCategory,
    setSelectedCategory,
    filteredData
  } = useFirstBloodSection();

  return (
    <section className="py-20 bg-neutral-800">
      <MaxWidthContainer innerProps={{ className: 'gap-10' }}>
        <div className="flex items-center gap-4">
          <IcoCrownFilled className="w-6 h-6 text-primary" />
          <h2 className="typo-heading-medium text-primary-200">First Blood</h2>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={firstBloodCategories}
          data={mockFirstBloods}
          getItemCategory={(firstBlood) => firstBlood.category}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* First Blood List */}
        <div className="flex flex-col gap-4">
          {filteredData.map((firstBlood) => (
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
                
                <div className="flex items-center gap-2 text-neutral-200">
                  <IcoTimerLined2 className="w-4 h-4" />
                  <div className="typo-body-xsmall">{formatDate(firstBlood.timestamp)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthContainer>
    </section>
  );
}
