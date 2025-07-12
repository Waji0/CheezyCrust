import { useSelector } from "react-redux";
import { selectItemQuantity } from "../store/cartSlice";

const withQuantity = (Component) => {
  const WithQuantityComponent = (props) => {
    const { item } = props;
    const quantity = useSelector(selectItemQuantity(item));

    const cartItem = {
      ...item,
      quantity
    };

    return <Component item={ cartItem } />
  }
  return WithQuantityComponent;
}

export default withQuantity;