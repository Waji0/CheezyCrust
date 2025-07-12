import { useDispatch, useSelector } from "react-redux";
import BackBtn from "../components/BackBtn.jsx";
import CreditCard from "../components/CreditCard.jsx";
import { resetCart, selectCartItems, selectCartTotal } from "../store/cartSlice.js";
import { formatPrice } from "../utils/price-util.js";
import { createOrderId } from "../utils/order-util.js";
import { createOrder } from "../store/ordersSlice.js";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const submitHandler = async (state) => {
            const orderId = createOrderId();
            dispatch(
              createOrder({
                id: orderId,
                items: cartItems,
                total: cartTotal,
                creditCardNum: state.number,
                state: 'pending'
              })
            );
            dispatch(resetCart());
            navigate(`/order/${orderId}`);
            
          };

  return (
    <div className="my-6">
      <BackBtn to={"/cart"}>Back to cart</BackBtn>
      <h2 className="text-3xl text-center my-4">Checkout Page</h2>
      {
        cartItems.length ? <div className="grid grid-cols-1 my-4 p-4 md:grid-cols-2 gap-8 card bg-[#240046]-600 shadow-xl">
        <section>
          <h2 className="text-2xl w-full text-center mb-4 card-title block">
            Order Summary
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {
                  cartItems.map(item => {
                    return <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>€{formatPrice(item.price * item.quantity)}</td>
                    </tr>
                  })
                }
                <tr className="font-semibold">
                  <td>Subtotal: </td>
                  <td></td>
                  <td>€{cartTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="text-2xl mb-4 card-title w-full block text-center">
            Payment Details
          </h2>
          <CreditCard submitHandler={submitHandler} />
        </section>
      </div> : <h3 className="text-2xl text-center">No items in the cart</h3>
      }
    </div>
  );
};

export default Checkout;
