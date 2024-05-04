import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { AutopartsResponse } from "../../models/response/AutopartsResponse";
import AutopartService from "../../services/AutopartsService";

import styles from './Autoparts.module.scss';
import { CardItem } from "../../components/cardItem/CardItem";
import { observer } from "mobx-react-lite";


export function Autoparts() {
    const [autoparts, setAutoparts] = useState<AutopartsResponse[]>([])
    useEffect(() => {
        const fetchAutoparts = async () => {
            try {
                const response = await AutopartService.getAllAutoparts();
                console.log(response.data)
                setAutoparts(response.data)
                toast.success('Заказы пользователя найдены')
            } catch (e) {
                console.log(e);
                toast.error('Ошибка!')
            }
        }
        fetchAutoparts();
    }, [])
    return (
        <ul className={styles.list}>
            {autoparts.map((part, i) => (
                <CardItem key={i} part={part}/>
            ))}
        </ul>
    )
}

export default observer(Autoparts)
