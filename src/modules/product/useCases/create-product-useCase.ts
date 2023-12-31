import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { ICreateProductUseCase } from "../../../shared/interfaces/modules/product/useCases/ICreateProductUseCase";
import { IProductRepository } from "../../../shared/interfaces/modules/product/repository/IProductRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { container } from "tsyringe";
import PlanManagerService from "../../../shared/services/PlanManagerService/PlanManagerService";
import { IPlanManagerService } from "../../../shared/services/PlanManagerService/IPlanManagerService";
import { IUnitRepository } from "../../../shared/interfaces/modules/unit/repository/IUnitRepository";
import { IProduct } from "../../../shared/interfaces/modules/product/IProduct";
import { v4 as uuidv4 } from 'uuid';
import { IFirebaseService } from "../../../shared/services/FirebaseService/IFirebaseService";

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

    public async execute(name: string, description: string, price: string, categoryId: string, unitId: string, file: any, token: string): Promise<void> {
        if(!name || !description || !price || !categoryId) {
            const error: IAppError = {
                statusCode: 400,
                message: "Preencha todos campos."
            };

            throw error;
        }

        if(!file) {
            const error: IAppError = {
                statusCode: 400,
                message: "Você precisa adicionar uma imagem para o produto."
            };

            throw error;
        }

        const instanceOfPlanManagerService = container.resolve<IPlanManagerService>(PlanManagerService);

        const unit = await this.UnitRepository.findById(unitId);

        if(!unit) {
            const error: IAppError = {
                statusCode: 404,
                message: "Unidade não encontrada"
            };


            throw error;
        }

        const hasPermission = await instanceOfPlanManagerService.canUserCreateAProductWithCategoryId(unit.user.planUser!, unit?.user.planStatus!, categoryId)

        if(!hasPermission) {
            const error: IAppError = {
                statusCode: 403,
                message: "Você atingiu a quantidade máxima de produtos para esta categoria deste plano, quer fazer um upgrade?"
            };

            throw error
        }

        const { userId } = this.JWTService.decodeToken(token, true);

        const productImageFilename = uuidv4();

        const productImage = await this.FirebaseService.uploadImage(productImageFilename, 'products', file)

        const product: Partial<IProduct> = {
            name,
            description,
            price: parseFloat(price.replace(",", ".")),
            productImage: productImage,
            productImageFilename: productImageFilename,
            userId: userId
        }

        await this.ProductRepository.create(product);

        return;
    }
}
