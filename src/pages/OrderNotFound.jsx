import { useRouteError } from "react-router-dom";
import BackBtn from "../components/BackBtn.jsx";

const OrderNotFound = () => {
  const error = useRouteError();
  return (
    <div className="text-center my-6">
      <BackBtn to={"/menu"}>Back to menu</BackBtn>
      <h2 className="text-3xl">{(error).message}</h2>
    </div>
  );
};

export default OrderNotFound;
