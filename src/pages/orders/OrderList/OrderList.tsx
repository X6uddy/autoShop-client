import { useEffect, useState } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import OrderService from "../../../services/OrderService";
import { OrderResponse } from "../../../models/response/OrderResponse";
import { Link } from "react-router-dom";
import styles from './OrderList.module.scss';
import StatusSelect from "../../../components/statusSelect/StatusSelect";

export function OrderList() {
    const {clientId} = useParams();
    const [orders, setOrders] = useState<OrderResponse[]>([])
    const [showStatusSelect, setShowStatusSelect] = useState(false);
    useEffect(() => {
        const fetchOrdersById = async () => {
            try {
                const response = await OrderService.getOrdersById(clientId!);
                console.log(response.data)
                setOrders(response.data)
                toast.success('Заказы пользователя найдены')
            } catch (e) {
                console.log(e);
                toast.error('Ошибка!')
            }
        }
        fetchOrdersById();
    }, [])
    console.log(orders)
    if(orders.length < 1) {
        return (
            <div style={{fontSize: '27px', color: '#fff', paddingTop: '30px'}}>
                У данного пользователя нет заказов. <br/>
                <Link to={'/orders'} style={{color: '#fff'}}>Вернитесь на страницу заказов</Link>
            </div>
        )
    }
    return (
        <div>
            {orders &&
                <ul className={styles.orders}>
                    {orders.map((order, i) => (
                        <li key={i}>
                            <Accordion defaultExpanded>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon stroke="white"/>}
                                        aria-controls={`${i}_name`}
                                        id={`${i}_name`}
                                        sx={{
                                            height: '100px',
                                            backgroundColor: '#000',
                                            color: '#fff'
                                        }}
                                    >
                                    {`${i+1}) `}    
                                    {order.orderId}
                                    </AccordionSummary>
                                    <AccordionDetails
                                    sx={{
                                            backgroundColor: '#000',
                                            color: '#fff'
                                        }}
                                    >
                                        Заказ оформлен: {order.orderTime}
                                        <ul className={styles.autoparts}>
                                            <br/>
                                            Детали:
                                            {order.purchasedAutoParts.map((link, i) => (
                                                <li key={i}>
                                                    {`${i+1})`} <Link to={`/autoparts/${link}`}>{link}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionDetails>
                                    <AccordionActions
                                        sx={{
                                            backgroundColor: '#000',
                                            color: '#fff'
                                        }}
                                    >
                                        <Button>Отменить заказ</Button>
                                        <Button onClick={() => setShowStatusSelect(true)}>Указать статус</Button>
                                        {showStatusSelect && (
                                            <StatusSelect orderId={order.orderId} status={order.status} key={i}/>
                                        )}
                                    </AccordionActions>
                                </Accordion>
                            </Accordion>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}
