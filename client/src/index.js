import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import PizzaStore from "./store/PizzaStore";
import BasketStore from "./store/BasketStore";
import OrderStore from "./store/OrderStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <Context.Provider value={{
        user: new UserStore(),
        pizza: new PizzaStore(),
        basket: new BasketStore(),
        order: new OrderStore()
    }}>
        <App />
    </Context.Provider>,
)
