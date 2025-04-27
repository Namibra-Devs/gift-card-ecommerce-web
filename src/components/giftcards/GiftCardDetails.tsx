import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { FaUser } from "react-icons/fa6";
import { FiArrowLeft } from "react-icons/fi";
import BuyAsGiftModal from "./BuyAsGiftModal";
import { useAuth } from "../../context/useAuth";
import { useCartContext } from '../../context/cart/CartContext';

interface GiftCardDetails {
  _id: string;
  name: string;
  description: string | { content: { title?: string; description: string }[] };
  pricing: number[];
  media: { image: string }[];
  stock: number;
  inStock: boolean;
  image?: string;
  min_price?: number;
  max_price?: number;
}

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const GiftCardDetails = () => {
  const { addToCart} = useCartContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [card, setCard] = useState<GiftCardDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cart state
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [cartMessage, setCartMessage] = useState('');

  // Collapsible sections
  const [expandedSections, setExpandedSections] = useState({
    description: true,
    howToRedeem: false,
    terms: false,
    reviews: true
  });

  // Fetch gift card details
  useEffect(() => {
    const fetchGiftCardDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/gift-cards/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.data.success) {
          setCard(response.data.data);
        } else {
          setError('Gift card not found');
        }
      } catch (err) {
        setError('Failed to load gift card details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGiftCardDetails();
  }, [id]);

  // Handle amount selection
  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setShowCustomInput(false);
    setCustomAmount("");
  };

  const handleCustomAmount = () => {
    setSelectedAmount(null);
    setShowCustomInput(true);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
  };

  // Toggle sections
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Add to cart API call
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0) {
      setCartMessage('Please select or enter a valid amount');
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      
      if (!card) {
        setCartMessage('Gift card details are not available.');
        return;
      }

      const response = await axios.post(
        `${apiUrl}/cart`,
          addToCart({
            giftCardId: card._id,
            price: selectedAmount || parseFloat(customAmount),
            quantity: 1,
            name: card.name,
            image: card.image
          }),
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        setCartMessage('Added to cart successfully!');
        setTimeout(() => setCartMessage(''), 3000);
      } else {
        setCartMessage(response.data.message || 'Failed to add to cart');
        setTimeout(() => setCartMessage(''), 3000);
      }
    } catch (err) {
      setCartMessage('Failed to add to cart. Please try again.');
      setTimeout(() => setCartMessage(''), 3000);
      console.error(err);
    }
  };

  // Format date for reviews
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      author: "Tyler Gobka Bright",
      date: new Date(2024, 9, 10),
      content: "Perfect Gift for Gamers - Instant Fun and Flexibility! Unleash the possibilities in your Nintendo Switch with PrepaidBanc Nintendo eShop gift card. This versatile",
      rating: 5
    }
  ];

  if (loading) return <div className="flex justify-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!card) return null;

  // Determine preset amounts - use pricing array if available, otherwise min/max
  const presetAmounts = card.pricing.length > 0 
    ? card.pricing 
    : [
        card.min_price || 20,
        card.min_price ? Math.floor((card.min_price + (card.max_price || 100)) / 2) : 50,
        card.max_price || 100
      ].filter((v, i, a) => a.indexOf(v) === i); // Remove duplicates

  return (
    <div className="bg-white py-7 px-4 md:px-24">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800"
      >
        <FiArrowLeft /> Back to all gift cards
      </button>
      <div className="flex flex-col md:flex-row items-start justify-between gap-12">
        {/* Card Image Section */}
        <div className="w-full md:max-w-[50%] flex flex-col gap-8">
          <div className="bg-greylight p-12 md:p-24 flex items-center justify-center">
            <img 
              src={card.media[0]?.image || card.image || '/placeholder.jpg'}
              alt={card.name}
              className="max-h-80 object-contain"
            />
          </div>
          
          {/* Thumbnail images */}
          <div className="flex items-center gap-3 w-full">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={card.media[0]?.image || card.image || '/placeholder.jpg'}
                alt=""
                className="w-full h-14 object-cover"
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:max-w-[50%]">
          <h1 className="text-2xl font-medium text-greynormal mb-4">
            {card.name}
          </h1>

          {/* Description Section */}
          <section className="mb-6 border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleSection("description")}
              className="flex justify-between items-center w-full text-left"
            >
              <h2 className="text-sm text-greynormal">Description</h2>
              <span className="text-gray-500">
                {expandedSections.description ? 
                  <img src="/icons/arrow-up.png" alt="Up" /> : 
                  <img src="/icons/arrow-down.png" alt="Down" />}
              </span>
            </button>

            {expandedSections.description && (
              <div className="mt-3 text-grey">
                {typeof card.description === 'string' ? (
                  <p>{card.description}</p>
                ) : (
                  <div>
                    {card.description?.content?.map((section: { title?: string; description: string }, index: number) => (
                      <div key={index} className="mb-4">
                        {section.title && <h3 className="font-semibold mb-2">{section.title}</h3>}
                        <div dangerouslySetInnerHTML={{ __html: section.description }} />
                      </div>
                    ))}
                  </div>
                )}
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

                {showCustomInput && (
                  <input
                    id="custom-price"
                    type="number"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder={`$${card.min_price || 5} - $${card.max_price || 1000} Max`}
                    className="min-w-44 py-2.5 px-3 border-2 border-greylight bg-ninetendobggrey rounded-lg focus:border-red-500 focus:outline-none appearance-none [-moz-appearance:textfield]"
                    min={card.min_price || 1}
                    max={card.max_price || 1000}
                  />
                )}
              </div>
            </div>

            {cartMessage && (
              <div className={`mb-4 text-sm ${
                cartMessage.includes('success') ? 'text-green-600' : 'text-red-600'
              }`}>
                {cartMessage}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-2 mb-16 mt-14 bg-greylight md:bg-transparent p-4 md:p-0">
              <button
                onClick={handleAddToCart}
                disabled={!selectedAmount && !customAmount}
                className={`bg-greynormal hover:bg-red-700 text-white py-5 px-10 rounded-[6px] transition-colors ${
                  (!selectedAmount && !customAmount) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
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
                {expandedSections.howToRedeem ? 
                  <img src="/icons/arrow-up.png" alt="Up" /> : 
                  <img src="/icons/arrow-down.png" alt="Down" />}
              </span>
            </button>

            {expandedSections.howToRedeem && (
              <div className="mt-3">
                <ol className="list-decimal pl-5 space-y-2 text-grey">
                  <li>Visit the Nintendo eShop on your Nintendo Switch console</li>
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
                {expandedSections.terms ? 
                  <img src="/icons/arrow-up.png" alt="Up" /> : 
                  <img src="/icons/arrow-down.png" alt="Down" />}
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
                {expandedSections.reviews ? 
                  <img src="/icons/arrow-up.png" alt="Up" /> : 
                  <img src="/icons/arrow-down.png" alt="Down" />}
              </span>
            </button>

            {expandedSections.reviews && (
              <div className="space-y-6 mt-3">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                    <div className="flex items-start gap-2 mb-2">
                      <div className="h-12 w-12 bg-greylight rounded-full flex items-center justify-center">
                        <FaUser className="text-lg"/>
                      </div>
                      <div className="">
                        <h3 className="font-normal text-sm translate-y-1">{review.author}</h3>
                        <span className="text-xs text-gray-500">
                          {formatDate(review.date)}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <img src="/icons/rate.png" alt="Rate" />
                    </div>
                    
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
            <button 
              onClick={handleAddToCart}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Buy as Gift Modal */}
        <BuyAsGiftModal
          isOpen={showGiftModal}
          onClose={() => setShowGiftModal(false)}
          giftCard={{
            ...card,
            description: typeof card.description === 'string' 
              ? card.description 
              : card.description?.content.map(section => section.description).join(' ') || ''
          }}
          selectedAmount={selectedAmount || (customAmount && !isNaN(parseFloat(customAmount)) ? parseFloat(customAmount) : null)}
        />          
      </div>
    </div>
  );
};

export default GiftCardDetails;