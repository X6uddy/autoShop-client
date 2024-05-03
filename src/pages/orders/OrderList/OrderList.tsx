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

export function OrderList() {
    const {clientId} = useParams();
    const [orders, setOrders] = useState<OrderResponse[]>([])
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
    return (
        <div>
            <ul className={styles.orders}>
                {orders.map((order, i) => (
                    <li key={i}>
                        <Accordion defaultExpanded>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon color="#fff"/>}
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
                                                {`${i+1})`} <Link to={`autoparts/${link}`}>{link}</Link>
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
                                    <Button>Cancel</Button>
                                    <Button>Agree</Button>
                                </AccordionActions>
                            </Accordion>
                        </Accordion>
                    </li>
                ))}
            </ul>
        </div>
    )
}
