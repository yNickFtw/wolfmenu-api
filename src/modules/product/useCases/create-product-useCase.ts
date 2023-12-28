import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { ICreateProductUseCase } from "../../../shared/interfaces/modules/product/useCases/ICreateProductUseCase";
import { Express } from "express";
import { IFirebaseService } from "../../../shared/services/FirebaseService/IFirebaseService";

@injectable()
export default class CreateProductUseCase implements ICreateProductUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("FirebaseService")
        private FirebaseService: IFirebaseService        
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(name: string, description: string, price: string, categoryId: string, file: Express.Multer.File): Promise<void> {
        // Lógica do Caso de Uso

        await this.FirebaseService.uploadImage('testeimage', 'products', file)
        
        return
    }
}
