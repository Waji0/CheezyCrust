import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal, selectPizzasCount } from "../store/cartSlice";

const Header = () => {
  const [isFocused, setIsFocused] = useState(false);
  const PizzasCount = useSelector(selectPizzasCount);
  const CartTotal = useSelector(selectCartTotal);
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  return (
    <div className="navbar text-[#240046] bg-[#FF9E00] sticky top-0 z-40 gap-4">
      <Link to={"/"} className="btn btn-ghost text-xl">
        CheezyCrust
      </Link>
      <form className="flex-1 flex justify-end" onSubmit={(ev) => {
        ev.preventDefault();
        console.log('Submitting with orderId:', orderId); // Add this
        navigate(`/order/${orderId}`);
        setOrderId('');
      }} >
        <input
          name="orderId"
          required
          onChange={(ev) => {
            setOrderId(ev.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="text"
          value={orderId}
          placeholder={isFocused ? "Enter order#" : "Find your order"}
          className="input text-[#240046] input-bordered w-full md:w-auto"
        />
      </form>
      <div className="flex items-center">
        {
          CartTotal ? <div className="font-semibold gap-1 flex">
          <span className="hidden md:flex">Cart total: </span>
          <span>€{CartTotal}</span>{" "}
        </div> : null 
        }
        <Link
          to="/cart"
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle mr-2"
        >
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm indicator-item">{PizzasCount}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;


