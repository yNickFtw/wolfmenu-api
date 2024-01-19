import { IProduct } from "../IProduct";

export interface IFindAllProductsByCategoryIdDTO {
    totalCount: number;
    products: IProduct[];
}