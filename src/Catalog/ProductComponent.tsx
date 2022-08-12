import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cart } from "../App";
import ProductDto from "../dtos/ProductDto";
import { getProductById } from "../http/fetches";

const ProductComponent = observer((): JSX.Element => {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductDto>();

    useEffect(() => {
        const init = async () => {
            const recievedProduct = await getProductById(id);
            setProduct(recievedProduct);
        };

        init();
    }, []);

    return (
        <div>
            <div className="fs-2 text-center mb-2">Product description</div>
            <div className="fs-4 mb-2">
                <b>Title: </b>
                {product?.title}
            </div>
            <div className="fs-4 mb-2">
                <b>Price: </b>
                {product?.price}
            </div>
            <div className="fs-4 mb-2">
                <b>Quantity: </b>
                {product?.quantity}
            </div>
            <div className="text-center mb-4">
                <img src={product?.imageUrl} alt="product" />
            </div>
            <div className="text-center">
                <div
                    className="btn btn-primary"
                    onClick={() => {
                        if (product)
                            cart.addToCart(
                                product?.id,
                                product?.title,
                                product?.imageUrl,
                                product?.price
                            );
                    }}
                >
                    Add to cart
                </div>
            </div>
        </div>
    );
});

export default ProductComponent;
