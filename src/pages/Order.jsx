import { useLoaderData } from "react-router-dom";
import BackBtn from "../components/BackBtn.jsx";
import MenuItem from "../components/MenuItems.jsx";
import { onStoreReady } from "../utils/on-store-ready.js";
import { store } from "../store/store.js";


export const orderLoader = async ({ params }) => {
  const { orderId } = params;
  await onStoreReady();
  const { items } = store.getState().orders;
  const matchingOrder = items.find(item => item.id == orderId );
  if(!matchingOrder) {
    throw new Error(`Order #${orderId} not found`);
  }
  return matchingOrder;
}

const Order = () => {
  // const order = {
  //   items: [],
  //   total: 0,
  //   creditCardNum: "**** **** **** 1234",
  // };

  const order = useLoaderData();

  return (
    <div className="my-6">
      <BackBtn to={"/menu"}>Back to menu</BackBtn>
      <h2 className="text-3xl text-center my-4">Order #{order.id}</h2>
      <div className="card bg-[#240046]-100 p-4">
        <div className="card-body gap-8">
          <div className="mx-5 card-title">Items</div>
          {order.items.map((item) => {
            return <MenuItem key={item.id} readonly={true} item={item} />;
          })}
          <div className="card-title mx-5 flex justify-between">
            <span>Total:</span> <span>€{order.total}</span>
          </div>
          <div className="card-title mx-5 flex justify-between">
            <span>Paid with:</span> <span>{order.creditCardNum}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
