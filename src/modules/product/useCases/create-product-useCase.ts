import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { ICreateProductUseCase } from "../../../shared/interfaces/modules/product/useCases/ICreateProductUseCase";
import { IProductRepository } from "../../../shared/interfaces/modules/product/repository/IProductRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { IUnitRepository } from "../../../shared/interfaces/modules/unit/repository/IUnitRepository";
import { IProduct } from "../../../shared/interfaces/modules/product/IProduct";
import { v4 as uuidv4 } from 'uuid';
import { IFirebaseService } from "../../../shared/services/FirebaseService/IFirebaseService";
import sharp from "sharp";

@injectable()
export default class CreateProductUseCase implements ICreateProductUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("ProductRepository")
        private ProductRepository: IProductRepository,
        @inject("UnitRepository")
        private UnitRepository: IUnitRepository,
        @inject("FirebaseService")
        private FirebaseService: IFirebaseService
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(name: string, description: string, categoryId: string, unitId: string, file: Express.Multer.File | undefined, token: string): Promise<IProduct> {
        if (!name || !description || !categoryId) {
            const error: IAppError = {
                statusCode: 400,
                message: "Preencha todos campos."
            };

            throw error;
        }

        if (!file) {
            const error: IAppError = {
                statusCode: 400,
                message: "Você precisa adicionar uma imagem para o produto."
            };

            throw error;
        }

        const unit = await this.UnitRepository.findById(unitId);

        if (!unit) {
            const error: IAppError = {
                statusCode: 404,
                message: "Unidade não encontrada."
            };

            throw error;
        }

        const { userId } = this.JWTService.decodeToken(token, true);

        const productImageFilename = uuidv4();
        const compressedImageBuffer = await sharp(file.buffer).jpeg({ quality: 80 }).toBuffer();
        const productImage = await this.FirebaseService.uploadImage(productImageFilename, 'products', compressedImageBuffer, file.mimetype)

        const product: Partial<IProduct> = {
            name,
            description,
            productImage: productImage,
            productImageFilename: productImageFilename,
            userId: userId,
            categoryId: categoryId,
            unitId: unitId
        }

        const productCreated = await this.ProductRepository.create(product);

        return product as IProduct
    }
}
