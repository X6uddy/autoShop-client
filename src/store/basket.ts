import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";
import toast from "react-hot-toast";
import { AutopartsResponse } from "../models/response/AutopartsResponse";

export interface ExpandAutopartsResponse {
    item: AutopartsResponse;
    quantity: number;
}
export class Basket {
    basketItems = [] as ExpandAutopartsResponse[];

    constructor() {
        makeAutoObservable(this);
    }

    addItem(item: AutopartsResponse) {
      const existingItemIndex = this.basketItems.findIndex(cartItem => cartItem.item.autopartId === item.autopartId);
      if (existingItemIndex !== -1) {
        // Если товар уже есть в корзине, увеличиваем его количество
        this.basketItems[existingItemIndex].quantity += 1;
      } else {
        // Иначе добавляем новый товар в корзину
        this.basketItems.push({
            quantity: 1,
            item: item
        });
      }
    }
  
    removeItem(id: string) {
      const itemIndex = this.basketItems.findIndex(cartItem => cartItem.item.autopartId === id);
      if (itemIndex !== -1) {
        this.basketItems.splice(itemIndex, 1);
      }
    }
  
    get itemCount() {
      return this.basketItems.reduce((total, item) => total + item.quantity, 0);
    }
  
    get totalPrice() {
      return this.basketItems.reduce((total, item) => total + (item.item.price * item.quantity), 0);
    }
}
  
const cartStore = new Basket();

export default cartStore;