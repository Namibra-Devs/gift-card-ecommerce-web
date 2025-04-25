import React from "react";
import { motion } from "framer-motion";
import { GiftCardItem } from "../../../../context/Type";
import { BiLoaderCircle } from "react-icons/bi";

interface SearchContentProps {
  query: string;
  results: GiftCardItem[];
  isLoading: boolean;
}

const SearchContent: React.FC<SearchContentProps> = ({ query, results, isLoading }) => {

  // Filter results matching the query
  const filteredResults = results.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="fixed w-full h-60 px-4 md:px-[100px] py-4 left-0 top-32 md:top-24 mt-3 md:mt-2  bg-white border rounded shadow-md">
      
      {isLoading && <div className="flex items-center justify-center gap-1"><BiLoaderCircle className="animate-spin delay-700 text-grey" /> <p className="text-grey text-sm mt-3">Searching...</p></div>}

      {filteredResults.length > 0 ? (
        filteredResults.map((item) => (
          <div key={item._id} className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
            {/* Show first image in media[] */}
            <img
              src={item.media.length > 0 ? item.media[0].image : "/default-image.jpg"}
              alt={item.name}
              className="w-10 h-10 mr-3 rounded"
            />
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                From ${item.pricing.length > 0 ? Math.min(...item.pricing) : "N/A"}
              </p>
              <p className={`text-sm ${item.inStock ? "text-green-500" : "text-red-500"}`}>
                {item.inStock ? "In Stock" : "Out of Stock"}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="p-2 text-gray-500">No matching results</p>
      )}
    </motion.div>
  )
}

export default SearchContent