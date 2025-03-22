import React from "react";

const brands = [
  { name: "Amazon", logo: "/brandlogos/Amazon.png" },
  { name: "Adidas", logo: "/brandlogos/Adidas.png" },
  { name: "Spotify", logo: "/brandlogos/Spotify.png" },
  { name: "Apple", logo: "/brandlogos/Apple.png" },
  { name: "Etc...", logo: "" }, // Placeholder text
];

const AvailableBrands: React.FC = () => {
  return (
    <div className="px-4 md:px-[255px] py-20">
      <h2 className="text-[20px] font-medium text-greynormal mb-16">Available Brands</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 place-self-auto md:place-items-center  w-full">
        {brands.map((brand, index) => (
          <div
            key={index} 
            className="w-[150px] h-[150px] rounded-full flex items-center bg-greylight">
            {brand.logo ? (
              <div className="flex justify-center items-center w-full"><img src={brand.logo} alt={brand.name} className="max-h-8"/></div>
            ) : (
              <span className="text-greynormal font-medium text-lg text-center w-full">{brand.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableBrands;