import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { AutopartsResponse } from "../../models/response/AutopartsResponse";
import AutopartService from "../../services/AutopartsService";
import { Link } from "react-router-dom";

export default function Autoparts() {
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
        <ul>
            {autoparts.map((part, i) => (
                <li key={i}>
                    <Link to={`autoparts/:${part.autopartId}`}>
                        <div>
                            <div><span>Название: </span>{part.title}</div>
                            <span></span>
                            <span></span>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
