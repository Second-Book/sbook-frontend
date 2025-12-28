"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/textbooks?query=${encodeURIComponent(query)}`);
  };
  
  return (
    <form onSubmit={handleSearch} className="flex max-w-2xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title, author..."
        className="flex-1 px-4 py-3 border rounded-l-lg"
      />
      <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-r-lg">
        Search
      </button>
    </form>
  );
}

