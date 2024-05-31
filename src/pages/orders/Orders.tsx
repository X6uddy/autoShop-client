import { useState } from "react"
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import UserService from "../../services/UserService";
import { IUser } from "../../models/IUser"
import styles from './Orders.module.scss';
import profileImg from '/public/profile.png';

export default function Orders() {
    const [users, setUsers] = useState<IUser[]>([]);

    async function getUsers() {
        try {
            const response = await UserService.getAllUsers();
            setUsers(response.data);
            toast.success('Список пользователей получен')
        } catch (e) {
            console.log(e);
            toast.error('Недостаточно прав доступа!')
        }
    }
    
    return (
        <div className={styles.order}>
            <h1>Клиенты</h1>
            <div className={styles.header}> 
                <br/>
                На этой страницы вы можете посмотреть список всех зарегистрированных пользователей.
                <br/>
                При клике на пользователя вы будете перенаправлены на страницу заказов данного пользователя.
            </div>
            <Button
                variant="contained"
                onClick={getUsers} 
                sx={{
                    mt: '20px'
                }}
            > 
                Вывести список пользователей 
            </Button>
            <ul className={styles.orderList}>
                {users.map((user, i) => (
                    <li key={i} className={styles.orderList__item}>
                        <Link to={`/orders/${user.userId}`}>
                            <img src={profileImg} alt="profile image" />
                            <p> {user.email}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
