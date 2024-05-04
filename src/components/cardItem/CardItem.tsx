import { Link } from "react-router-dom";

import { AutopartsResponse } from "../../models/response/AutopartsResponse";
import styles from './CardItem.module.scss';

interface IAutopartsResponse {
    part: AutopartsResponse;
    key: number;
}

export function CardItem({part, key}: IAutopartsResponse) {
    return (
        <li key={key} className={styles.item}>
            <Link to={`/autoparts/${part.autopartId}`}>
                <div className={styles.box}>
                    <div className={styles.photo}>
                        <img src={part.imageUrl} alt={part.title} />
                    </div>
                    <div className={styles.card}>
                        <div><span>Название: </span>{part.title}</div>
                        <div><span>Цена: </span>{part.price}</div>
                        <div><span>Наличие: </span>{part.quantitOnHand ? 'В наличии' : 'Нет в наличии'}</div>
                    </div>
                </div>
            </Link>
        </li>
    )
}
