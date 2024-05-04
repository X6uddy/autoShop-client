import { IUser } from "../IUser";

export type OrderStatus = 'not confirmed' | 'confirmed' | 'assembling' | 'in delivery' | 'delivered';

export interface OrderResponse {
    orderId: string,
    userId: string,
    purchasedAutoParts: string[];
    orderTime: string;
    status: OrderStatus;
    user?: IUser;
}