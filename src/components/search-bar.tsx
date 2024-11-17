import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <Input
      type="search"
      placeholder="Search products..."
      onChange={(e) => onSearch(e.target.value)}
      className="max-w-sm"
    />
  );
}
