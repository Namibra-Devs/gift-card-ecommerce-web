import React from "react";

const Banner: React.FC = () => {
  return (
    <div className="col-span-1 sm:col-span-2 md:col-span-3 h-[340px] bg-greylight overflow-hidden p-6 text-center rounded-[16px]">
      <div className="flex items-center justify-between">
        <img
          src="/gift-group.png"
          alt="Gift Card Group"
          className="w-[300px]"
        />
        <div className="text-center flex flex-col items-center gap-3">
          <h2 className="text-[24px] font-medium text-greynormal">
            The Perfect Gift, Delivered Instantly.
          </h2>
          <p className="text-grey text-[13px] font-normal">
            Browse our collection and find the perfect gift for your loved ones
          </p>
          <button className="mt-3 px-6 py-3 w-fit bg-black text-white rounded-[8px]">
            Explore Shopping Gift Cards
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
