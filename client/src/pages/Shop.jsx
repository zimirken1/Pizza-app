import React, {useContext, useEffect} from 'react';
import {Row, Col, Container} from "react-bootstrap";
import ItemList from "../components/ItemList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchPizzas} from "../http/pizzaAPI";
import Basket from "../components/Basket";
import "../styles/Shop.css"
import It from "moment/locale/it";

const Shop = observer(() => {
    const {pizza} = useContext(Context)

    useEffect(() => {
        fetchPizzas().then(data => pizza.setPizzas(data))
    })

    return (
        <div className={"shop-wrapper"}>
            <ItemList/>
            <Basket/>
        </div>
    );
});

export default Shop;