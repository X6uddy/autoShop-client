import { IUser } from "../IUser";

export type orderStatus = 'not confirmed' | 'confirmed' | 'assembling' | 'in delivery' | 'delivered';

export interface OrderResponse {
    orderId: string,
    userId: string,
    purchasedAutoParts: string[];
    orderTime: string;
    status: orderStatus;
    user?: IUser;
}