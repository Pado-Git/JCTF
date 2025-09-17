import { MaxWidthContainer } from '@/+shared/components';
import { IcoCrownFilled, IcoTimerLined2 } from '@/+shared/assets/icons';
import { getCategoryIcon } from '@/challenge/utils/categoryIcons';
import { useFirstBloodSection } from './index.hooks';

export function FirstBloodSection() {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    firstBloodCategories, 
    filteredFirstBloods 
  } = useFirstBloodSection();

  return (
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
          {filteredFirstBloods.map((firstBlood) => (
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
  );
}
