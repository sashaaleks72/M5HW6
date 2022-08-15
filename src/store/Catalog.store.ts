import { makeAutoObservable } from "mobx";
import ProductDto from "../dtos/ProductDto";

export class Catalog {
    productList: ProductDto[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    delProductById(id: number) {
        const index = this.productList.findIndex(
            (product) => product.id === id
        );

        if (index != -1) this.productList.splice(index, 1);
    }
}
