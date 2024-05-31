import { makeAutoObservable } from "mobx";
import { AutopartsResponse } from "../models/response/AutopartsResponse";
import OrderService from "../services/OrderService";
import toast from "react-hot-toast";

export interface ExpandAutopartsResponse {
    item: AutopartsResponse;
    quantity: number;
}

const BASKET_STORAGE_KEY = "basketItems";

export default class Basket {
    basketItems = [] as ExpandAutopartsResponse[];

    constructor() {
        makeAutoObservable(this);
        this.loadBasket();
    }

    saveBasket() {
        localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(this.basketItems));
    }

    loadBasket() {
        const savedBasket = localStorage.getItem(BASKET_STORAGE_KEY);
        if (savedBasket) {
            this.basketItems = JSON.parse(savedBasket);
        }
    }

    addItem(item: AutopartsResponse) {
        const existingItemIndex = this.basketItems.findIndex(cartItem => cartItem.item.autopartId === item.autopartId);
        if (existingItemIndex !== -1) {
            this.basketItems[existingItemIndex].quantity += 1;
        } else {
            this.basketItems.push({
                quantity: 1,
                item: item
            });
        }
        this.saveBasket();
    }

    removeItem(id: string) {
        const itemIndex = this.basketItems.findIndex(cartItem => cartItem.item.autopartId === id);
        if (itemIndex !== -1) {
            if (this.basketItems[itemIndex].quantity === 1) {
                this.basketItems.splice(itemIndex, 1);
            } else {
                this.basketItems[itemIndex].quantity -= 1;
            }
            this.saveBasket();
        }
    }

    async makeNewOrder(login: string, autoparts: ExpandAutopartsResponse[]) {
      console.log(login, autoparts)
      try {
        await OrderService.makeNewOrder(login, autoparts);
        toast.success('Заказ успешно отправлен')
      } catch (e) {
        console.log(e);
        // @ts-ignore   
        toast.error(`${e.response?.data?.message}`);
    }
    }

    getTotalPrice() {
        return this.basketItems.reduce((total, item) => total + (item.item.price * item.quantity), 0);
    }
}
