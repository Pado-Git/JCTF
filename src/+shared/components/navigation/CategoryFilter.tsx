interface CategoryFilterProps<T> {
  categories: string[];
  data: T[];
  selected: string;
  onSelect: (category: string) => void;
  getItemCategory: (item: T) => string | string[];
  isAll?: boolean;
  isCountExist?: boolean;
}

export function CategoryFilter<T>({
  categories,
  data,
  selected,
  onSelect,
  getItemCategory,
  isAll = true,
  isCountExist = true
}: CategoryFilterProps<T>) {

  const finalCategories = isAll ? ["All", ...categories] : categories;

  return (
    <div className="flex flex-wrap gap-4">
      {finalCategories.map((category) => {
        const count = category === "All"
          ? data.length
          : data.filter((item) => {
              const itemCategories = getItemCategory(item);
              if (Array.isArray(itemCategories)) {
                return itemCategories.includes(category);
              }
              return itemCategories === category;
            }).length;

        const isActive = selected === category;

        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`
              flex items-center justify-center gap-2 px-6 py-2 h-12 rounded-radius-sm
              transition-all duration-200 cursor-pointer
              ${
                isActive
                  ? 'gradient-2 text-primary-100'
                  : 'bg-neutral-800 text-neutral-400 hover:bg-primary-900 hover:text-neutral-300'
              }
            `}
          >
            <span
              className={`typo-heading-xsmall ${
                isActive ? 'text-primary-100' : 'text-neutral-400'
              }`}
            >
              {category === 'All' ? 'All' : category.slice(0,1).toUpperCase() + category.slice(1)}
            </span>

            {isCountExist &&
              <div
                className={`
                  w-6 h-6 rounded-radius-sm flex items-center justify-center typo-body-small
                  ${
                    isActive
                      ? 'bg-primary-800 border border-primary-500 text-primary-100'
                      : 'bg-neutral-600 border border-neutral-600 text-neutral-400'
                  }
                `}
              >
                {count}
              </div>
            }
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
