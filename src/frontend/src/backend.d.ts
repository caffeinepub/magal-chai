import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MenuItem {
    id: bigint;
    name: string;
    isAvailable: boolean;
    description: string;
    category: string;
    isVegan: boolean;
    priceCents: bigint;
}
export interface Order {
    id: bigint;
    customerName: string;
    status: string;
    contact: string;
    totalAmountCents: bigint;
    items: Array<OrderItem>;
}
export interface OrderItem {
    quantity: bigint;
    menuItemId: bigint;
}
export interface backendInterface {
    addMenuItem(name: string, description: string, priceCents: bigint, category: string, isVegan: boolean, isAvailable: boolean): Promise<MenuItem>;
    getAllMenuItems(): Promise<Array<MenuItem>>;
    getAllOrders(): Promise<Array<Order>>;
    getMenuItemsByCategory(category: string): Promise<Array<MenuItem>>;
    getOrderById(id: bigint): Promise<Order>;
    placeOrder(customerName: string, contact: string, items: Array<OrderItem>, totalAmountCents: bigint): Promise<Order>;
    updateOrderStatus(id: bigint, newStatus: string): Promise<void>;
}
