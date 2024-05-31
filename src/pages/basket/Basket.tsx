import { useContext, useEffect, useState } from "react";

import { Context } from "../../main";

import styles from './Basket.module.scss';
import { ExpandAutopartsResponse } from "../../store/basket";
import { Minus, Plus } from "lucide-react";
import { AutopartsResponse } from "../../models/response/AutopartsResponse";
import { Button } from "@mui/material";

export default function Basket() {
    const {basket, store} = useContext(Context);
    const [basketItems, setBasketItems] = useState<ExpandAutopartsResponse[]>([])
    const [quantity, setQuantity] = useState<number>(0)
    useEffect(() => {
        setBasketItems(basket.basketItems)
    }, [basketItems, quantity])

    function removeItemFromBasket (id: string) {
        setQuantity(quantity => quantity + 1)
        basket.removeItem(id);
    }

    function addItemToBasket (item: AutopartsResponse) {
        setQuantity(quantity => quantity + 1)
        basket.addItem(item)
    }

    if(basket.basketItems.length < 1) {
        return (
            <div className={styles.basketList}>Корзина пуста</div>
        )
    }
    return (
        <div className={styles.basketList}>
            <div className={styles.basketContainer}>
                {basket.basketItems.map((item, i) => (
                    <div className={styles.list_item} key={i}>
                        <div className={styles.item_title}>{item.item.title}</div>
                        <div>
                            <div className={styles.item_changeQuantity}>
                                <Plus onClick={() => addItemToBasket(item.item)}></Plus>
                                <div className={styles.item_quantity}>{item.quantity}</div>
                                <Minus onClick={() => removeItemFromBasket(item.item.autopartId)}></Minus>
                            </div>
                            <p className={styles.item_quantity}>{item.quantity * item.item.price} рублей</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.totalPrice}>
                {/* <input type="text" placeholder="Введите ФИО" className={styles.inputName}/> */}
                <p>Итоговая цена: {basket.getTotalPrice()}</p>
                {/* @ts-ignore */}
                <Button variant="contained" onClick={() => basket.makeNewOrder(store.user.id, basketItems)}>Отправить заказ</Button>
            </div>
        </div>
    )
}
