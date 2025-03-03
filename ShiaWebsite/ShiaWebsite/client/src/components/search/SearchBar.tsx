import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setLocation(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="search"
        placeholder="Search texts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50"
      />
      <Button type="submit" size="icon" variant="ghost">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
