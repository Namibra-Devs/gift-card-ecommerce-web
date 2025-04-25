import { useState, useRef, useEffect, ChangeEvent } from "react";
import SearchContent from "./SearchContent";
import { GiftCardItem } from "../../../../context/Type";  // Import GiftCard interface
import axios from "axios";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<GiftCardItem[]>([]);
  const searchRef = useRef<HTMLDivElement | null>(null);
  let debounceTimer: NodeJS.Timeout | null = null;

  // Fetch search results from API (Debounced)
  const fetchResults = async (query: string) => {
    setIsLoading(true);

    if (query.length < 2) {
      setResults([]);
      return;
    }
    
    try {
      const { data } = await axios.get(`https://gift-card-ecommerce-api.onrender.com/search?query=${query}`);
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results", error);
    }finally {
      setIsLoading(false);
    }
  };

  // Handle input change with debounce
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => fetchResults(value), 300); // 300ms delay
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <>
      {/* Search Bar */}
      <div ref={searchRef} className="flex flex-1 max-w-md w-full mx-auto">
        <div className="w-[566px] bg-greylight flex items-center gap-2 px-[24px] py-[10px] rounded-[8px]">
          <img src="icons/search.png" alt="Search icon" className="h-4 " />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setIsDropdownOpen(true)}
            className="w-full bg-transparent focus:outline-none placeholder-greynegative"
          />
        </div>

        {isDropdownOpen && searchQuery && <SearchContent query={searchQuery} results={results} isLoading={isLoading} />}
      </div>
    </>
  );
};

export default Search;
