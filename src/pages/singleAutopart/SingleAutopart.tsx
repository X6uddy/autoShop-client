import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

import { AutopartsResponse } from "../../models/response/AutopartsResponse";
import AutopartService from "../../services/AutopartsService";
import styles from './SingleAutopart.module.scss';
import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { CheckSquare2Icon } from "lucide-react";
import { Context } from "../../main";

export function SingleAutopart() {
    const {autopartId} = useParams();
    const {basket} = useContext(Context);
    const [autopart, setAutopart] = useState<AutopartsResponse[]>([])
    const [loading, setLoading] = useState(true);
    const [basketStatus, setBasketStatus] = useState<boolean>(false)
    const [quantityOnBasket, setQuantityOnBasket] = useState<number>(0);
    useEffect(() => {
        const fetchAutopart = async () => {
            try {
                const response = await AutopartService.getAutopartById(autopartId!);
                setAutopart(response.data)
                toast.success('Заказы пользователя найдены')
            } catch (e) {
                console.log(e);
                toast.error('Ошибка!')
            }
            finally {
                setLoading(false);
            }
        }
        fetchAutopart();
        const existingItemIndex = basket.basketItems.findIndex(item => item.item.autopartId === autopartId)
        if(basket.basketItems.find(item => item.item.autopartId === autopartId)){
            if (existingItemIndex !== -1) {
                setQuantityOnBasket(basket.basketItems[existingItemIndex].quantity)
            }
            setBasketStatus(true)
        }else{
            setBasketStatus(false)
        }
    }, [basket.basketItems, basketStatus, quantityOnBasket])
    function addItemToBasket (item: AutopartsResponse) {
        basket.addItem(item);
        setBasketStatus(true)
        setQuantityOnBasket(quantityOnBasket => quantityOnBasket + 1)
    }

    if(loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className={styles.autopart_box}>
            <div className={styles.autopart__photo}>
                <img src={autopart[0].imageUrl} alt={autopart[0].title} />
            </div>

            <div className={styles.info}>
                <div><span>Название: </span>{autopart[0].title}</div>
                <div><span>Цена: </span>{autopart[0].price} рублей</div>
                <div><span>Вес запчасти: </span>{autopart[0].weight} кг</div>
                <div><span>Наличие: </span>{autopart[0].quantitOnHand} штук</div>
                <div><span>Совместимость: </span>{autopart[0].compatability.map((item,i) => (
                    <div style={{marginLeft: '10px'}} key={i}><span>{i+1}. </span>{item}<br/></div>
                ))}</div>
                <div><span>Описание: </span>{autopart[0].description}</div>
                {basketStatus ? 
                    <Button 
                        variant="contained"
                        onClick={() => addItemToBasket(autopart[0])}
                    >
                        Добавить в корзину
                        <p style={{margin: '0', marginLeft: '10px', marginRight: '10px'}}>{quantityOnBasket}</p>
                        {basketStatus ? <CheckSquare2Icon/> : <ShoppingBasketIcon/>}
                    </Button>
                    :
                    <Button variant="contained" onClick={() => addItemToBasket(autopart[0])}>
                        Добавить в корзину
                        {basketStatus ? <CheckSquare2Icon/> : <ShoppingBasketIcon/>}
                    </Button>
                }
            </div>
        </div>
    )
}

export default observer(SingleAutopart)
