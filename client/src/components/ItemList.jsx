import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import Item from "./Item";
import "../styles/ItemList.css"

const ItemList = observer(() => {
    const {pizza} = useContext(Context)

    return (
        <div className={"item-list-wrapper"}>
            {pizza.pizzas.map(pizza =>
                <Item key={pizza._id} pizza={pizza}/>
            )}
        </div>
    );
});

export default ItemList;