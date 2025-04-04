import { GoPlusCircle } from "react-icons/go";
import { RxMinusCircled } from "react-icons/rx";
import { FiTrash2 } from "react-icons/fi";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItem = ({ item, onIncrease, onDecrease, onRemove }: CartItemProps) => {
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
        
        {/* Remove button */}
        <button 
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 ml-4"
          aria-label="Remove item"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;