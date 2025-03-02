interface FilterButtonsProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function FilterButtons({
  selectedCategory,
  setSelectedCategory,
}: FilterButtonsProps) {
  return (
    <div className="filter-buttons">
      <button
        className={selectedCategory === "Software Development" ? "active" : ""}
        onClick={() => setSelectedCategory("Software Development")}
      >
        Software Development
      </button>
      <button
        className={selectedCategory === "Games Development" ? "active" : ""}
        onClick={() => setSelectedCategory("Games Development")}
      >
        Games Development
      </button>
    </div>
  );
}
