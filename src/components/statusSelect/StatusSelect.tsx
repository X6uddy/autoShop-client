import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { OrderStatus } from "../../models/response/OrderResponse";
import { useEffect, useState } from "react";
import OrderService from "../../services/OrderService";
import toast from "react-hot-toast";

interface IStatusSelect {
    orderId: string;
    status: OrderStatus;
    key: number;
}

export default function StatusSelect({orderId, status, key}: IStatusSelect) {
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(status);
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await OrderService.statusСhange(orderId, selectedStatus);
                // setSelectedStatus(res.data[0].status)
                console.log(res)
                toast.success('Статус успешно изменен')
            } catch (e) {
                console.log(e);
                toast.error('Ошибка!')
            }
        }
        fetchStatus()
    }, [selectedStatus])

    const handleStatusChange = (orderId: string, status: SelectChangeEvent) => {
        console.log('Stssssstus', orderId, status)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setSelectedStatus(status.target.value)
        console.log("Выбранный статус:", status);
    };
    return (
        <FormControl
            fullWidth
            sx={{
                backgroundColor: '#fff'
            }}
        >
            <InputLabel id={`demo-simple-select-label-${key}`}>Статус</InputLabel>
            <Select
                variant="outlined"
                labelId={`demo-simple-select-label-${key}`}
                id={`demo-simple-select-${key}`}
                value={selectedStatus}
                label="Статус"
                onChange={(e) => handleStatusChange(orderId, e)}
                MenuProps={{ PaperProps: { style: { backgroundColor: '#ffffff' } } }}
            >
                <MenuItem value="not confirmed">Не подтвержден</MenuItem>
                <MenuItem value="confirmed">Подтвержден</MenuItem>
                <MenuItem value="assembling">Сборка</MenuItem>
                <MenuItem value="in delivery">В доставке</MenuItem>
                <MenuItem value="delivered">Доставлен</MenuItem>
            </Select>
        </FormControl>
    )
}
