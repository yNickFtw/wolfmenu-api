import { IProduct } from "../IProduct";

export interface ICreateProductUseCase {
    execute(name: string, description: string, price: string, categoryId: string, unitId: string, file: Express.Multer.File | undefined, token: string): Promise<IProduct>;
}
