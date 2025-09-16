import { categories, mockChallenges } from '@/challenge/data';

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((category) => {
        const count = category.name === 'All' 
          ? mockChallenges.length 
          : mockChallenges.filter(c => c.category.name === category.name).length;
        const isActive = selected === category.name;
        
        return (
          <button
            key={category.name}
            onClick={() => onSelect(category.name)}
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
                {count}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
