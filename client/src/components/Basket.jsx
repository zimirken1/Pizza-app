import React, {useContext, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import BasketItem from './BasketItem'
import {Context} from "../index";
import {Button} from "react-bootstrap";
import {createOrder} from "../http/orderAPI";
import "../styles/Basket.css"

const Basket = observer(() => {
    const {basket, user} = useContext(Context)
    const [active, setActive] = useState(false)

    useEffect(()=> {
        if(basket.isNull() === true) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [basket.isNull()])
    const order = () => {
        const order = JSON.parse(localStorage.getItem('basket'))
        console.log(order)
        createOrder(order).then(data => basket.clearBasket())
    }

    return (
        <div className={"basket-wrapper"}>
            <h1>Корзина</h1>
            {basket.items.map((item, index) => (
                <BasketItem key={item.id} item={item} onRemove={() => basket.removeItem(index)}/>
            ))}
            <div>
                Итого к оплате:
                <strong>
                    {Math.floor(basket.total)} BYN
                </strong>
            </div>
            <div>
                {user.isAuth ?
                    <div>
                        <Button
                            className={"mt-2"}
                            variant={"success"
                        }
                                onClick={order}
                                disabled={active}
                        >
                            Заказать
                        </Button>
                    </div>
                    :
                    <div style={{color: "darkred", textAlign: "justify", fontSize: "18px", margin: 10}}>
                        Для того, чтобы сделать заказ, нужно авторизироваться или зарегистрироваться
                    </div>
                }
            </div>
        </div>
    )
})

export default Basket

