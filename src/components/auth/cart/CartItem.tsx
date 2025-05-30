import { GoPlusCircle } from "react-icons/go";
import { RxMinusCircled } from "react-icons/rx";
import { FiTrash2 } from "react-icons/fi";

interface CartItemProps {
  item: {
    giftCardId: string;
    price: number;
    quantity: number;
    name?: string;
    image?: string;
    isSaved?: boolean;
    isAvailable?: boolean;
    availableStock?: number;
  };
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  onSaveForLater?: () => void;
  onMoveToCart?: () => void;
}

const CartItem = ({ item, onIncrease, onDecrease, onRemove }: CartItemProps) => {
  console.log(item);
  return (
    <div className="bg-white flex justify-between items-center">
      <div className="flex items-center gap-2">
        {/* Product image */}
        <div className="w-20 h-10 flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Name and Price */}
        <div className="flex flex-col gap-1 -mb-2">
          <h3 className="font-medium -mb-0.5">{item.name}</h3>
          <p className="text-greylightactive">${item.price.toFixed(2)}</p>
          {item.isAvailable === false && (
            <p className="text-red-500 text-xs">
              {item.availableStock === 0 ? 'Out of stock' : `Only ${item.availableStock} available`}
            </p>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onDecrease}
            className="text-gray-600 hover:text-black"
            aria-label="Decrease quantity"
          >
            <RxMinusCircled className="text-2xl" />
          </button>

          <span className="w-10 p-[10px] rounded-[8px] bg-greylight text-center">{item.quantity}</span>

          <button
            onClick={onIncrease}
            className="text-gray-600 hover:text-black"
            aria-label="Increase quantity"
          >
            <GoPlusCircle className="text-2xl" />
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 ml-4">
          {/* Temporarily hide save for later until backend routes are implemented */}
          {/* {onSaveForLater && !item.isSaved && (
            <button
              onClick={onSaveForLater}
              className="text-blue-500 hover:text-blue-700 text-sm px-2 py-1 border border-blue-300 rounded"
              aria-label="Save for later"
            >
              Save for Later
            </button>
          )}

          {item.isSaved && onMoveToCart && (
            <button
              onClick={onMoveToCart}
              className="text-green-600 hover:text-green-800 text-sm px-2 py-1 border border-green-300 rounded"
              aria-label="Move to cart"
            >
              Move to Cart
            </button>
          )}

          {item.isSaved && !onMoveToCart && (
            <span className="text-green-600 text-sm px-2 py-1 bg-green-50 rounded">
              Saved
            </span>
          )} */}

          <button
            onClick={onRemove}
            className="text-red-500 hover:text-red-700"
            aria-label="Remove item"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;