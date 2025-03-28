// React ICons
import { GoPlusCircle } from "react-icons/go";
import { RxMinusCircled } from "react-icons/rx";
interface CartItem {
  image: string;
  name: string;
  price: number;
  quantity: number;
}

const CartCard = ({ item }: { item: CartItem }) => {
  return (
    <div>
      <ul>
        <li className="flex justify-between py-[10px] px-[10px] rounded-[8px] border border-transparent hover:border hover:border-red-600 duration-700 border-b border-greylight">
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-1">

              {/* Product image */}
              <div className="w-20 h-10">
                <img src={item.image} alt="" className="" />
              </div>
              {/* Product Name and Price */}
              <div className="flex flex-col items-start gap-1">
                <span>{item.name}</span>
                <span className="text-greylightactive">${item.price}</span>
              </div>
            </div>

            {/* Product Actions */}
            <div className="flex items-center gap-2">
              <button type="button" title="Decrease quantity">
                <RxMinusCircled className="text-2xl" />
              </button>
              <span className="w-[46px] h-[41px] p-[10px] rounded-[8px] bg-greylight text-center">
                {item.quantity}
              </span>
              <button type="button" title="Increase quantity">
                <GoPlusCircle className="text-2xl" />{" "}
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CartCard;
