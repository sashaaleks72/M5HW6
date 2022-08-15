import ProductDto from "../dtos/ProductDto";

const apiUrl = "http://localhost:5000";

export const getProducts = async (): Promise<ProductDto[]> => {
    const result: Response = await fetch(`${apiUrl}/products`);
    const response = await result.json();

    const products: ProductDto[] = response;

    return products;
};

export const getProductById = async (
    id: string | undefined
): Promise<ProductDto> => {
    const result: Response = await fetch(`${apiUrl}/products?id=${id}`);
    const response: ProductDto[] = await result.json();

    const product: ProductDto = response[0];

    console.log(product);
    return product;
};

export const delProductById = async (id: string | undefined): Promise<any> => {
    const requestOptions = {
        method: "DELETE",
    };
    
    await fetch(`${apiUrl}/products/${id}`, requestOptions);
};
