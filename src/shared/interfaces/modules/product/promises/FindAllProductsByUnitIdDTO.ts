import { IProduct } from "../IProduct";

export interface FindAllProductsByUnitIdDTO {
    totalCount: number;
    products: IProduct[];
}