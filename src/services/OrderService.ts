import $api from "../http";
import { AxiosResponse } from "axios";
import { OrderResponse, OrderStatus } from "../models/response/OrderResponse";
import { ExpandAutopartsResponse } from "../store/basket";

export default class OrderService {
    static async getAllOrders(): Promise<AxiosResponse<OrderResponse[]>> {
        return $api.get<OrderResponse[]>('/orders');
    }
    static async getOrdersById(userId: string): Promise<AxiosResponse<OrderResponse[]>> {
        return $api.post<OrderResponse[]>('/orders/:id', {userId});
    }
    static async makeNewOrder(userId: string, autoparts: ExpandAutopartsResponse[]): Promise<AxiosResponse<OrderResponse[]>> {
        return $api.post<OrderResponse[]>('/orders/new', {autoparts, userId});
    }
    static async statusСhange(orderId: string, newStatus: OrderStatus): Promise<AxiosResponse<OrderResponse[]>> {
        return $api.patch<OrderResponse[]>('/orders/changeStatus', {orderId, newStatus});
    }
}