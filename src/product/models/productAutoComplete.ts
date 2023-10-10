import { IProduct } from "./product";

export interface IProductAutoComplete {
    extendProducts: Function;
    fillProducts: (val: string) => void;
    createProductDetail: (product: IProduct) => void;
    clear: Function;
}