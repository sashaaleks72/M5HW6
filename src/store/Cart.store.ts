import { makeAutoObservable } from "mobx";

export type CartItem = {
    id: number;
    title: string;
    quantity: number;
    imageUrl: string;
    price: number;
};

export class Cart {
    cartItems: CartItem[] = [];

    get totalSum(): number {
        let total: number = 0;

        for (const item of this.cartItems) {
            total += item.price * item.quantity;
        }

        return total;
    }

    constructor() {
        makeAutoObservable(this);

        const cartFromLocalStorage = localStorage.getItem("cart");

        if (cartFromLocalStorage)
            this.cartItems = JSON.parse(cartFromLocalStorage);
    }

    addToCart(id: number, title?: string, imageUrl?: string, price?: number) {
        const index = this.cartItems.findIndex((item) => item.id === id);

        if (index !== -1) {
            this.cartItems[index].quantity++;
        } else {
            if (title && imageUrl && price) {
                this.cartItems.push({
                    id,
                    title,
                    quantity: 1,
                    imageUrl,
                    price,
                });
            }
        }

        localStorage.setItem("cart", JSON.stringify(this.cartItems));
    }

    decFromCart(id: number) {
        const index = this.cartItems.findIndex((item) => item.id === id);

        if (index !== -1) {
            this.cartItems[index].quantity--;

            if (this.cartItems[index].quantity === 0)
                this.cartItems.splice(index, 1);
        }

        localStorage.setItem("cart", JSON.stringify(this.cartItems));
    }

    delFromCart(id: number) {
        const index = this.cartItems.findIndex((item) => item.id === id);

        if (index !== -1) this.cartItems.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(this.cartItems));
    }
}
