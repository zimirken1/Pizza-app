import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, PIZZA_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, PROFILE_ROUTE, ABOUT_ROUTE} from "./utils/consts";
import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import PizzaPage from "./pages/PizzaPage";
import ProfilePage from "./pages/ProfilePage";
import About from "./pages/About";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: PROFILE_ROUTE + '/:id',
        Component: ProfilePage
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: PIZZA_ROUTE + '/:id',
        Component: PizzaPage
    },
    {
        path: ABOUT_ROUTE,
        Component: About
    },
]