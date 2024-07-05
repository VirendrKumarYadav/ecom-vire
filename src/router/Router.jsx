import { createBrowserRouter } from "react-router-dom"
import Home from "../componant/Home"
import Catalog from "../componant/Catalog"
import Register from "../componant/Signup"
import Login from "../componant/Login"
import Cart from "../componant/Cart"
import About from "../componant/About"
import Layout from "./Layout"
import ViewCards from "../elements/ViewCards"
import Order from "../componant/Order"
import NewOrderPage from "../componant/payment/NewOrder";
import ReviewOrder  from "../componant/payment/ReviewOrder"
import Confirmation from "../componant/payment/Confirmation"

const router = createBrowserRouter([

    {
        path: "/",
        element: <Layout />,
        children:
            [
                {
                    path: "/",
                    element: <Home />

                }, {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/signup",
                    element: <Register />
                },
                {
                    path: "/catalog",
                    element: <Catalog />
                },
                {
                    path: "/cart",
                    element: <Cart />
                },
                {
                    path: "/about",
                    element: <About />
                },
                {
                    path: "catalog/products/:id",
                    element: <ViewCards />
                },
                {
                    path: "/order/",
                    element: <Order />,

                },
                {
                    path: "/new-order",
                    element: <NewOrderPage />,
                },
                {
                    path: "/review-order",
                    element: < ReviewOrder/>,
                }
                ,
                {
                    path: "/order-confirmation",
                    element: <Confirmation />,
                }

            ]
    },



])
export default router;