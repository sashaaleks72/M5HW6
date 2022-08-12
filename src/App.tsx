import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import CartComponent from "./Cart/CartComponent";
import CartItemComponent from "./Cart/CartItemComponent";
import CatalogComponent from "./Catalog/CatalogComponent";
import CatalogItemComponent from "./Catalog/CatalogItemComponent";
import ProductComponent from "./Catalog/ProductComponent";
import ProductDto from "./dtos/ProductDto";
import HeaderComponent from "./Header/HeaderComponent";
import { getProducts } from "./http/fetches";
import { Cart } from "./store/Cart.store";

export const cart = new Cart();

const App = observer(() => {
    const [products, setProductList] = useState<ProductDto[]>([]);

    useEffect(() => {
        const init = async () => {
            const products: ProductDto[] = await getProducts();

            setProductList(products);
        };

        init();
    }, []);

    return (
        <BrowserRouter>
            <HeaderComponent />
            <div className="container">
                <Routes>
                    <Route
                        path="/catalog"
                        element={
                            <CatalogComponent>
                                {products.map((item, index) => (
                                    <CatalogItemComponent
                                        key={index}
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        quantity={item.quantity}
                                        imageUrl={item.imageUrl}
                                    />
                                ))}
                            </CatalogComponent>
                        }
                    />
                    <Route path="/catalog/:id" element={<ProductComponent />} />
                    <Route
                        path="/cart"
                        element={
                            <CartComponent>
                                {cart.cartItems.map((item, index) => (
                                    <CartItemComponent
                                        key={index}
                                        id={item.id}
                                        price={item.price}
                                        title={item.title}
                                        imageUrl={item.imageUrl}
                                        quantity={item.quantity}
                                    />
                                ))}
                            </CartComponent>
                        }
                    />
                    <Route
                        path="*"
                        element={<Navigate replace to="/catalog" />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
});

export default App;
