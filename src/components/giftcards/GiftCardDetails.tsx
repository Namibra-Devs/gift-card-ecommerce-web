import { useState } from "react";
// import BuyAsGiftModal from "./BuyAsGiftModal";

import { FaUser } from "react-icons/fa6";
import BuyAsGiftModal from "./BuyAsGiftModal";

import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/CartSlice'
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {useAuth} from "../../context/useAuth";
const GiftCardDetails = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const {isAuthenticated} = useAuth();

  const dispatch = useDispatch();
  // Get cart data from Redux store
  const {itemCount, total } = useSelector((state: RootState) => state.cart);

  interface GiftCard {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  }
  // Mock gift card data - replace with your actual data
  const giftCard: GiftCard = {
    id: 1,
    name: "Nintendo Gift Card",
    description: "A versatile gift card for Nintendo Switch games and content.",
    price: 50,
    image: "/nintendo-gift-card.png"
  };
  // State for collapsible sections
  const [expandedSections, setExpandedSections] = useState({
    description: true,
    howToRedeem: false,
    terms: false,
    reviews: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setShowCustomInput(false);
  };

  const handleCustomAmount = () => {
    setSelectedAmount(null);
    setShowCustomInput(true);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
  };

  const presetAmounts = [20, 25, 30];

  // Reviews data
  const reviews = [
    {
      id: 1,
      author: "Paul Amegah",
      date: new Date(2024, 9, 10), // October is month 9 (0-indexed)
      content: "Perfect Gift for Gamers – Instant Fun and Flexibility! Unleash the possibilities in your Nintendo Switch with PrepaidBanc Nintendo eShop gift card. This versatile",
      rating: 5
    },
    // Add more reviews as needed
  ];

  // Format date as "10 Oct 2024"
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };


  return (
    <div className="bg-white py-7 px-4 md:px-14">
      <div className="flex flex-col md:flex-row items-start justify-between gap-12">
        {/* Card Image */}
        <div className="w-full md:max-w-[50%] flex flex-col gap-8">
          <div className="bg-greylight p-12 md:p-24 flex items-center justify-center">
            <img src="/ninetendo-lg.png" alt="" />
          </div>
          {/* Smaller images */}
          <div className="flex items-center gap-3 w-full">
            <img
              src="/ninetendo-lg-mini.png"
              alt=""
              className="w-full h-14 object-cover"
            />
            <img
              src="/ninetendo-lg-mini.png"
              alt=""
              className="w-full h-14 object-cover"
            />
            <img
              src="/ninetendo-lg-mini.png"
              alt=""
              className="w-full h-14 object-cover"
            />
            <img
              src="/ninetendo-lg-mini.png"
              alt=""
              className="w-full h-14 object-cover"
            />
          </div>
        </div>

        <div className="w-full md:max-w-[50%]">
          {/* Header */}
          <h1 className="text-2xl font-medium text-greynormal mb-4">
            Nintendo Gift Card
          </h1>

          {/* Description Section */}
          <section className="mb-6 border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleSection("description")}
              className="flex justify-between items-center w-full text-left"
            >
              <h2 className="text-sm text-greynormal">Description</h2>
              <span className="text-gray-500">
                {expandedSections.description ? <img src="/icons/arrow-up.png" alt="Up" /> : <img src="/icons/arrow-down.png" alt="Down" />}
              </span>
            </button>

            {expandedSections.description && (
              <div className="mt-3 text-grey">
                <p className="mb-4">
                  Unlock the possibilities on your Nintendo Switch with a
                  Prepaid Nintendo eShop gift card. This versatile digital key
                  serves as your entry point to the universe of Nintendo:
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li>
                    Games:Access a vast range of games from
                    top franchises like Zelda, Mario Brothers, and Pokemon,
                    along with blockbuster new releases.
                  </li>
                  <li>
                    Demos and Trailers: Get a sneak peek into
                    your future gaming adventures with numerous game demos and
                    trailers available to view and try out.
                  </li>
                </ul>
              </div>
            )}
          </section>

          {/* Amount Selection Section */}
          <section className="mb-8 w-full">
            <h2 className="font-normal mb-4">Select Amount</h2>
            <div className="flex items-center flex-wrap md:flex-nowrap gap-2 md:gap-4 mb-6">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  className={`py-[10px] px-6 border rounded-[100px] text-center font-normal transition-colors ${
                    selectedAmount === amount
                      ? "border border-greynormal bg-greynormal text-white"
                      : "border-greylight hover:border-gray-500"
                  }`}
                >
                  ${amount}
                </button>
              ))}
              <div className="flex items-center gap-2 md:gap-4">
                <button
                  onClick={handleCustomAmount}
                  className={`py-[10px] px-6 border rounded-[100px] text-center font-normal transition-colors ${
                    showCustomInput || selectedAmount === null
                      ? "border border-greynormal bg-greynormal text-white"
                      : "border-greylight hover:border-gray-500"
                  }`}
                >
                  Customize
                </button>

                  <input
                    id="custom-price"
                    type="number"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="$5 - $1000 Max"
                    className="w-full py-2.5 px-3 border border-greylight bg-ninetendobggrey rounded-lg focus:border-red-500 focus:outline-none appearance-none [-moz-appearance:textfield]"
                    min="1"
                  />
              </div>

            </div>

            {/* {showCustomInput && (
              <div className="mb-4">
                <input
                  type="number"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  placeholder="Enter custom amount"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                  min="1"
                />
              </div>
            )} */}

              {/* Action Button */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-2 mb-16 mt-14 bg-greylight md:bg-transparent p-4 md:p-0">
              <button
              onClick={() => dispatch(addToCart({
                id: giftCard.id,
                name: giftCard.name,
                price: giftCard.price,
                image: giftCard.image
              }))}
              className="bg-greynormal hover:bg-red-700 text-white py-5 px-10 rounded-[6px] transition-colors">
                Add to cart
              </button>
              <button
                onClick={() => setShowGiftModal(true)}
                className="bg-white md:bg-transparent md:hover:bg-border md:border border-border text-graynormal py-5 px-10 rounded-[6px] transition-colors"
              >
                Buy as gift
              </button>
            </div>
          </section>

          {/* How to Redeem Section */}
          <section className="mb-6 border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleSection("howToRedeem")}
              className="flex justify-between items-center w-full text-left"
            >
              <h2 className="font-normal">How to Redeem</h2>
              <span className="text-gray-500">
              {expandedSections.howToRedeem ? <img src="/icons/arrow-up.png" alt="Up" /> : <img src="/icons/arrow-down.png" alt="Down" /> }
              </span>
            </button>

            {expandedSections.howToRedeem && (
              <div className="mt-3">
                <ol className="list-decimal pl-5 space-y-2 text-grey">
                  <li>
                    Visit the Nintendo eShop on your Nintendo Switch console
                  </li>
                  <li>Select "Enter Code" from the menu</li>
                  <li>Enter the 16-digit code from your gift card</li>
                  <li>Confirm and enjoy your credit!</li>
                </ol>
              </div>
            )}
          </section>

          {/* Terms and Conditions */}
          <section className="mb-6 border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleSection("terms")}
              className="flex justify-between items-center w-full text-left"
            >
              <h2 className="font-normal">Terms and Conditions</h2>
              <span className="text-gray-500">
              {expandedSections.terms ? <img src="/icons/arrow-up.png" alt="Up" /> : <img src="/icons/arrow-down.png" alt="Down" /> }
              </span>
            </button>

            {expandedSections.terms && (
              <div className="mt-3">
                <ul className="list-disc pl-5 space-y-2 text-grey">
                  <li>Valid only for Nintendo eShop purchases</li>
                  <li>No expiration date</li>
                  <li>Non-refundable and cannot be redeemed for cash</li>
                  <li>Valid only in the region where purchased</li>
                </ul>
              </div>
            )}
          </section>

          {/* Reviews Section */}
          <section className="mb-8">
            <button
              onClick={() => toggleSection("reviews")}
              className="flex justify-between items-center w-full text-left"
            >
              <h2 className="font-normal">Reviews</h2>
              <span className="text-gray-500">
              {expandedSections.reviews ? <img src="/icons/arrow-up.png" alt="Up" /> : <img src="/icons/arrow-down.png" alt="Down" />}
              </span>
            </button>

            {expandedSections.reviews && (
              <div className="space-y-6 mt-3">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="h-12 w-12 bg-greylight rounded-full flex items-center justify-center"> <img src="" alt="" /><FaUser className="text-lg"/></div>
                    <div className="">
                      <h3 className="font-normal text-sm translate-y-1">{review.author}</h3>
                      <span className="text-xs text-gray-500">
                        {formatDate(review.date)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Rating stars - optional */}
                  <div>
                    <img src="/icons/rate.png" alt="Rate" />
                  </div>
                  
                  {/* {review.rating && (
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  )} */}
                  
                  <p className="text-gray-500 text-xs whitespace-pre-line mt-2">
                    {review.content}
                  </p>
                </div>
              ))}
            </div>
            )}
          </section>

          {/* Final CTA */}
          <div className="mt-8 p-6 bg-red-50 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-3">
              Perfect Gift for Gamers – Instant Fun and Flexibility!
            </h2>
            <p className="mb-4">
              Unlock the possibilities on your Nintendo Switch with a Prepaid
              Nintendo eShop gift card.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Buy Now
            </button>
          </div>

          {/* Buy as Gift Modal */}
          <BuyAsGiftModal
            isOpen={showGiftModal}
            onClose={() => setShowGiftModal(false)}
            giftCard={giftCard}
          />          
        </div>

        {/* Mobile Add to Cart History or Checkout */}
        {isAuthenticated && itemCount > 0 && ( 
          <div className="fixed bottom-4 left-4 right-4 md:hidden max-w-full bg-white p-[16px] shadow-xl border border-greylight rounded-[8px]">
          <button
            className="bg-greynormal rounded-[6px] py-[12px] px-[16px] text-white text-xs w-full"
             title="Checkout, Items Selected and Total Amount">
            {itemCount} Item added<span className="font-semibold"> ${total.toFixed(2)} </span> Checkout!
          </button>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default GiftCardDetails;
