import { IProduct } from "../product/IProduct";

export interface ICategory {
  id: string;
  name: string;
  description: string;
  products: IProduct[]
  isAvailable: boolean;
  userId: string;
  unitId: string;
}