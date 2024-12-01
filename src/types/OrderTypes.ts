
import { Product } from "./ProductTypes";
import { Address, User } from "./userTypes";

export interface OrderState {
    orders: Order[];
    orderItem: OrderItem | null;
    currentOrder: Order | null;
    paymentOrder: any | null;
    loading: boolean;
    error: string | null;
    orderCanceled: boolean;
    orderStatus:string | null;
}

export interface Order {
    id:number;
    orderId: string;
    user: User;
    sellerId: number;
    orderItems: OrderItem[];
    orderDate: string;
    shippingAddress: Address;
    paymentDetails: any;
    totalMrpPrice: number;
    totalSellingPrice: number;
    discount?: number;
    orderStatus: OrderStatus;
    totalItem: number;
    deliverDate:string
    totalPageNumber:number;
}
export interface OrderList {
    Orders: Order[];
    totalPage:number;
}

export enum OrderStatus {
    PENDING = 'PENDING',
    PLACED = 'PLACED',
    CONFIRMED = 'CONFIRMED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export interface OrderItem{
    id:number;
    order: Order;
    product: Product;
    size: string;
    quantity: number;
    mrpPrice: number;
    sellingPrice: number;
    userId: number;
}