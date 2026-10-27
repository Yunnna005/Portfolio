interface FilterButtonsProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const ALL_CATEGORIES = "All";

const categories = [ALL_CATEGORIES, "Software Development", "Games Development"];

export default function FilterButtons({
  selectedCategory,
  setSelectedCategory,
}: FilterButtonsProps) {
  return (
    <div className="filter-buttons" role="group" aria-label="Filter projects">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className="filter-button"
          aria-pressed={selectedCategory === category}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
