import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Categories</h3>
      {categories.map((category) => (
        <div key={category} className="flex items-center space-x-2">
          <Checkbox
            id={category}
            checked={selectedCategories.includes(category)}
            onCheckedChange={() => onCategoryChange(category)}
          />
          <Label htmlFor={category}>{category}</Label>
        </div>
      ))}
    </div>
  );
}
