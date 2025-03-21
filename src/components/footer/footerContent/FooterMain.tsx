import React from "react";

const FooterMain: React.FC = () => {
  return (
   <div className="px-4 md:px-[255px] pb-20">
     <div className="bg-greylight p-[60px] rounded-[16px] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo & Contact */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/favicon.png" alt="" />
          <button className="mt-12 px-[24px] py-[15px] text-normal bg-greynormal text-white rounded-[8px]">
            Contact Us
          </button>
        </div>

        {/* Links */}
        <div className="text-center md:text-left">
          <h3 className="text-[15px] font-medium text-greynormal">LINKS</h3>
          <ul className="mt-6 space-y-4 text-grey">
            <li><a href="#" className="text-grey hover:text-greynormal duration-500">All Giftcards</a></li>
            <li><a href="#" className="text-grey hover:text-greynormal duration-500">Appstore</a></li>
            <li><a href="#" className="text-grey hover:text-greynormal duration-500">Shopping</a></li>
          </ul>
        </div>

        {/* Payment Methods */}
        <div className="text-center md:text-left">
          <h3 className="text-[15px] font-medium text-greynormal">PAYMENT METHODS</h3>
          <div className="mt-6 flex justify-start gap-1">
            <img src="/payment-methods/btc.png" alt="Bitcoin" className="w-8 md:w-12 h-8" />
            <img src="/payment-methods/momo.png" alt="MTN Money" className="w-8 md:w-12 h-8" />
            <img src="/payment-methods/ethereum.png" alt="Ethereum" className="w-8 md:w-12 h-8" />
            <img src="/payment-methods/binance.png" alt="Binance" className="w-8 md:w-12 h-8" />
            <img src="/payment-methods/tether.png" alt="Tether" className="w-8 md:w-12 h-8" />
            <img src="/payment-methods/ripple.png" alt="Ripple" className="w-8 md:w-12 h-8" />
            <img src="/payment-methods/solana.png" alt="Solana" className="w-8 md:w-12 h-8" />
          </div>
        </div>
      </div>
    </div>
   </div>
  );
};

export default FooterMain;
