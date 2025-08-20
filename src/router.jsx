import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Order, { orderLoader } from "./pages/Order.jsx";
import RootLayout from "./components/RootLayout.jsx";
import OrderNotFound from "./pages/OrderNotFound.jsx";
import NotFound from "./pages/NotFound.jsx";



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route index={true} element={<Home />}/>
            <Route path="/menu" element={<Menu />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/checkout" element={<Checkout />}/>
            <Route errorElement={<OrderNotFound />} loader={orderLoader} path="/order/:orderId" element={<Order />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

export default router;