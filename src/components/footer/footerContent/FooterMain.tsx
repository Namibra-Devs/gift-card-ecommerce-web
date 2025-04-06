import React from "react";

const FooterMain: React.FC = () => {
  return (
   <div className="px-4 md:px-[255px] pb-20">
     <div className="bg-greylight px-4 py-14 md:p-[60px] rounded-[16px] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-3">
        {/* Logo & Contact */}
        <div className="flex flex-col items-start gap-6 md:gap-12">
          <img src="/favicon.png" alt="PrepaidBanc" />
          <button type="button" className="hidden md:block px-[24px] py-[15px] font-medium bg-greynormal hover:bg-greynegative hover:text-greynormal duration-700 text-white rounded-[8px]">
            Contact Us
          </button>
          <a href="/" className="block md:hidden text-grey font-normal">email@email.com</a>
        </div>

        {/* Links */}
        <div className="text-left mt-6 md:mt-auto">
          <h3 className="text-[15px] font-medium text-greynormal">LINKS</h3>
          <ul className="mt-6 space-y-6 text-grey">
            <li><a href="#" className="text-grey hover:text-greynormal duration-500">All Giftcards</a></li>
            <li><a href="#" className="text-grey hover:text-greynormal duration-500">Appstore</a></li>
            <li><a href="#" className="text-grey hover:text-greynormal duration-500">Shopping</a></li>
          </ul>
        </div>

        {/* Payment Methods */}
        <div className="text-left mt-6 md:mt-0">
          <h3 className="text-[15px] font-medium text-greynormal">PAYMENT METHODS</h3>
          <div className="mt-6 flex justify-start gap-1">
            <img src="/payment-methods/btc.png" alt="Bitcoin" className="w-8 md:w-12" />
            <img src="/payment-methods/momo.png" alt="MTN Money" className="w-8 md:w-12" />
            <img src="/payment-methods/ethereum.png" alt="Ethereum" className="w-8 md:w-12" />
            <img src="/payment-methods/binance.png" alt="Binance" className="w-8 md:w-12" />
            <img src="/payment-methods/tether.png" alt="Tether" className="w-8 md:w-12" />
            <img src="/payment-methods/ripple.png" alt="Ripple" className="w-8 md:w-12" />
            <img src="/payment-methods/solana.png" alt="Solana" className="w-8 md:w-12" />
          </div>
        </div>
      </div>
    </div>
   </div>
  );
};

export default FooterMain;
