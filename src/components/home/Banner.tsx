import React from "react";

const Banner: React.FC = () => {
  return (
    <div className="col-span-2 sm:col-span-2 md:col-span-3 max-h-[340px] bg-greylight overflow-hidden px-3 md:px-6 py-6  text-center rounded-[16px]">
      <div className="flex items-center justify-between">

        <div className="w-[35%] md:w-[45%]">
          <img src="/gift-group.png" alt="Gift Card Group" className="w-[200px] md:w-full" />
        </div>

        <div className=" text-center flex flex-col items-center gap-3">
          <h2 className="text-[16px] md:text-[24px] tracking-tight leading-tight font-medium text-greynormal">
            The Perfect Gift, Delivered Instantly.
          </h2>
          <p className="hidden md:block text-grey text-[14px] font-normal mx-2">
            Browse our collection and find the perfect gift for your loved ones
          </p>
          <button className="px-3 md:px-6 py-3 w-fit text-[13px] md:text-[14px] bg-black text-white rounded-[8px]">
            Explore Shopping Gift Cards
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
