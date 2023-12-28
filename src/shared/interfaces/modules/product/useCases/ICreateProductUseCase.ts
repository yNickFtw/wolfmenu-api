import { Express } from "express";

export interface ICreateProductUseCase {
    execute(name: string, description: string, price: string, categoryId: string, file: Express.Multer.File): Promise<void>;
}
