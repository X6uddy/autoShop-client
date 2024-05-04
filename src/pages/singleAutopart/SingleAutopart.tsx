import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

import { AutopartsResponse } from "../../models/response/AutopartsResponse";
import AutopartService from "../../services/AutopartsService";
import styles from './SingleAutopart.module.scss';
import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";

export function SingleAutopart() {
    const {autopartId} = useParams();
    const [autopart, setAutopart] = useState<AutopartsResponse[]>([])
    const [loading, setLoading] = useState(true)
    console.log('auto', autopartId)
    useEffect(() => {
        const fetchAutopart = async () => {
            try {
                const response = await AutopartService.getAutopartById(autopartId!);
                console.log(response.data)
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
    }, [autopartId])

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
                    <div style={{marginLeft: '10px'}}><span>{i+1}. </span>{item}<br/></div>
                ))}</div>
                <div><span>Описание: </span>{autopart[0].description}</div>
                <Button variant="contained">
                    Добавить в корзину <ShoppingBasketIcon/>
                </Button>
            </div>
        </div>
    )
}

export default observer(SingleAutopart)
