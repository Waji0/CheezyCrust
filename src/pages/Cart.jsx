import { Link } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../store/cartSlice";
import MenuItem from "../components/MenuItems";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotal);

  return (
    <div className="my-6 flex flex-col items-center gap-4">
      <BackBtn to={"/menu"}>Back to menu</BackBtn>
      <h2 className="text-3xl">Cart</h2>
      {cartItems.length ? (
        <>
          <ul className="my-4 w-full flex flex-col gap-4">
            {
              cartItems.map(item => {
                return <li key={item.id}>
                  <MenuItem item={item}/>
                </li>
              })
            }
          </ul>
          <div className="flex text-2xl px-4 w-full font-semibold items-center justify-between">
            <span>Total price</span>
            <span className="text-[#FF9E00]">€{totalPrice}</span>
          </div>
          <Link to={"/checkout"} className="btn btn-sm md:btn-md w-44 bg-gradient-to-r from-[#FF9E00] to-[#FFB347] text-[#240046] font-semibold tracking-wide text-base shadow-md hover:ring-[#FF9E00] hover:from-[#FFA931] hover:to-[#FFD580] transform transition duration-300 ease-in-out">
            Checkout
          </Link>
        </>
      ) : (
        <h3 className="text-2xl">No items in the cart</h3>
      )}
    </div>
  );
};

export default Cart;
