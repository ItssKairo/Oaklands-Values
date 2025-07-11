'use client';

interface FilterControlsProps {
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  sortOrder: string;
  onSortChange: (order: string) => void;
  availableCategories: string[];
}

export default function FilterControls({
  categoryFilter,
  onCategoryChange,
  sortOrder,
  onSortChange,
  availableCategories,
}: FilterControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">

      <div className="relative flex-grow">
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="block w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg py-2.5 pl-3 pr-10 text-sm font-medium text-white focus:outline-none focus:border-[var(--accent-purple)] focus:ring-1 focus:ring-[var(--accent-purple)] appearance-none transition-all duration-[var(--animation-duration-fast)]"
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {availableCategories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}s
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
          </svg>
        </div>
      </div>


      <div className="relative flex-grow">
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          className="block w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg py-2.5 pl-3 pr-10 text-sm font-medium text-white focus:outline-none focus:border-[var(--accent-purple)] focus:ring-1 focus:ring-[var(--accent-purple)] appearance-none transition-all duration-[var(--animation-duration-fast)]"
          aria-label="Sort order"
        >
          <option value="value-desc">Value (High to Low)</option>
          <option value="value-asc">Value (Low to High)</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="change-desc">Change (High to Low)</option>
          <option value="change-asc">Change (Low to High)</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}