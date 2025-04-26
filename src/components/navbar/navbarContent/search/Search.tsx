import { useState, useRef, useEffect, ChangeEvent } from "react";
import SearchContent from "./SearchContent";
import { GiftCardItem } from "../../../../context/Type";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<GiftCardItem[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch search results from API (Debounced)
  const fetchResults = async (query: string) => {
    if (query.length < 2) {
      setResults([]);
      setIsDropdownOpen(false);
      return;
    }

    setIsLoading(true);
    setIsDropdownOpen(true);

    try {
      const response = await axios.get(`${apiUrl}/gift-cards/?query=${query}`);
      setResults(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching search results", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced input change handler
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);

    // Clear previous timer
    if (debounceTimer) clearTimeout(debounceTimer);

    // Set new timer
    debounceTimer = setTimeout(() => fetchResults(value), 300);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let debounceTimer: NodeJS.Timeout;

  return (
    <div ref={searchRef} className="flex flex-1 max-w-md w-full mx-auto relative">
      <div className="w-[566px] bg-greylight flex items-center gap-2 px-[24px] py-[10px] rounded-[8px] hover:bg-greylight">
        <img src="icons/search.png" alt="Search" className="h-4" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => searchQuery && setIsDropdownOpen(true)}
          className="w-full bg-transparent focus:outline-none placeholder-greynegative"
        />
      </div>

      {isDropdownOpen && (
        <SearchContent 
          query={searchQuery} 
          results={results} 
          isLoading={isLoading} 
          onClose={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default Search;