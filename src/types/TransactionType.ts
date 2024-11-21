import { Order } from "./OrderTypes";
import { Seller } from "./SellerType";
import { User } from "./userTypes";

export interface Transaction{
    id: number;
    customer: User;
    order: Order;
    seller: Seller;
    createdAt: string;
}