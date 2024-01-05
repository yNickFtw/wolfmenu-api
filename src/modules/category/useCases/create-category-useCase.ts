import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { ICreateCategoryUseCase } from "../../../shared/interfaces/modules/category/useCases/ICreateCategoryUseCase";
import { ICategoryRepository } from "../../../shared/interfaces/modules/category/repository/ICategoryRepository";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { IUnitRepository } from "../../../shared/interfaces/modules/unit/repository/IUnitRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { ICategory } from "../../../shared/interfaces/modules/category/ICategory";

@injectable()
export default class CreateCategoryUseCase implements ICreateCategoryUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("CategoryRepository")
        private CategoryRepository: ICategoryRepository,
        @inject("UnitRepository")
        private UnitRepository: IUnitRepository,
        @inject("JWTService")
        private JWTService: IJWTService
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(name: string, token: string): Promise<void> {
        if (!name) {
            const error: IAppError = {
                statusCode: 400,
                message: "Preencha o nome da categoria."
            };

            throw error;
        }

        const { userId } = this.JWTService.decodeToken(token, true);

        const category: Partial<ICategory> = {
            name,
            userId
        }
        
        await this.CategoryRepository.create(category);

        return;
    }
}
