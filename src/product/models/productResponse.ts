import { IProduct } from "./product";

export interface IProductsResponse { 
    products: IProduct[]; 
    total: number; 
    skip: number; 
    limit: number; 
}
