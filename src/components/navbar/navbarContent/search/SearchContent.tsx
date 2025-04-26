import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GiftCardItem } from "../../../../context/Type";
import { BiLoaderCircle } from "react-icons/bi";

interface SearchContentProps {
  query: string;
  results: GiftCardItem[];
  isLoading: boolean;
  onClose: () => void;
}

const SearchContent: React.FC<SearchContentProps> = ({ query, results, isLoading,onClose}) => {
  const navigate = useNavigate();

  // Filter results matching the query
  const filteredResults = Array.isArray(results) ? results.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  ) : [];

  return (
    <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="fixed z-50 w-full max-h-60 overflow-y-auto px-4 md:px-[100px] py-4 left-0 top-32 md:top-24 mt-3 md:mt-2  bg-white border rounded shadow-md">
      {isLoading ? (
        <div className="flex items-center justify-center p-4 gap-2">
          <BiLoaderCircle className="animate-spin text-gray-500" />
          <span className="text-gray-500">Searching...</span>
        </div>
      ) : filteredResults.length > 0 ? (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {filteredResults.map((item) => (
            <li 
              key={item._id} 
              className=" p-1 md:p-3 hover:bg-gray-50 cursor-pointer border border-greylight rounded"
              onClick={() => {
                navigate(`/gift-cards/${item._id}`);
                onClose();
              }}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <img
                  src={item.image || item.media[0]?.image || "/placeholder.jpg"}
                  alt={item.name}
                  className="w-12 h-12 object-contain rounded-md"
                />
                <div className="flex-1 items-start min-w-0">
                  <p className="font-medium truncate text-xs md:text-sm">{item.name}</p>
                  <div className="flex items-center gap-2 text-xs md:text-sm -mt-3">
                    <span className="text-gray-400">
                      ${item.pricing.length > 0 ? Math.min(...item.pricing) : "N/A"}
                    </span>
                    <span className={`${item.inStock ? "text-green-500" : "text-red-500"}`}>
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-4 text-center text-gray-500">
          {query ? "No results found" : "Start typing to search"}
        </div>
      )}
    </motion.div>
  );
};

export default SearchContent;