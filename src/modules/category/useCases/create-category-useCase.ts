import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { ICreateCategoryUseCase } from "../../../shared/interfaces/modules/category/useCases/ICreateCategoryUseCase";
import { ICategoryRepository } from "../../../shared/interfaces/modules/category/repository/ICategoryRepository";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { IUnitRepository } from "../../../shared/interfaces/modules/unit/repository/IUnitRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { container } from "tsyringe";
import PlanManagerService from "../../../shared/services/PlanManagerService/PlanManagerService";
import { IPlanManagerService } from "../../../shared/services/PlanManagerService/IPlanManagerService";
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

    public async execute(name: string, description: string, unitId: string, token: string): Promise<void> {
        if (!name || !description || !unitId) {
            const error: IAppError = {
                statusCode: 400,
                message: "Preencha todos os campos."
            };

            throw error;
        }

        const { userId } = this.JWTService.decodeToken(token, true);

        const unit = await this.UnitRepository.findById(unitId);

        if (!unit) {
            const error: IAppError = {
                statusCode: 404,
                message: "Unidade não encontrada"
            };

            throw error;
        }

        const instanceOfPlanManagerService = container.resolve<IPlanManagerService>(PlanManagerService);

        const hasPermission = await instanceOfPlanManagerService.canUserCreateACategoryByUnit(unit.user.planUser!, unit.user.planStatus!, unitId)

        if(!hasPermission) {
            const error: IAppError = {
                statusCode: 403,
                message: "Você atingiu a quantidade máxima de categorias deste plano, quer fazer um upgrade?"
            };

            throw error;
        }

        const category: Partial<ICategory> = {
            name,
            description,
            unitId,
            userId
        }

        await this.CategoryRepository.create(category);

        return;
    }
}
