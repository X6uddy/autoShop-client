import $api from "../http";
import { AxiosResponse } from "axios";
import { OrderResponse } from "../models/response/OrderResponse";

export default class OrderService {
    static async getAllOrders(): Promise<AxiosResponse<OrderResponse[]>> {
        return $api.get<OrderResponse[]>('/orders');
    }
    static async getOrdersById(userId: string): Promise<AxiosResponse<OrderResponse[]>> {
        return $api.post<OrderResponse[]>('/orders/:id', {userId});
    }
    static async makeNewOrder(login: string, autoparts: string[]): Promise<AxiosResponse<OrderResponse[]>> {
        return $api.post<OrderResponse[]>('/orders/new', {autoparts, login});
    }
}