import { IAppError } from '../../interfaces/globals/IAppError';
import { ICategoryRepository } from '../../interfaces/modules/category/repository/ICategoryRepository';
import { IPlanRepository } from '../../interfaces/modules/plan/repository/IPlanRepository'
import { IProductRepository } from '../../interfaces/modules/product/repository/IProductRepository';
import { IUnitRepository } from '../../interfaces/modules/unit/repository/IUnitRepository';
import { IUserRepository } from '../../interfaces/modules/user/repository/IUserRepository'
import { IPlanManagerService } from './IPlanManagerService'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class PlanManagerService implements IPlanManagerService {

    constructor(
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("PlanRepository")
        private PlanRepository: IPlanRepository,
        @inject("UnitRepository")
        private UnitRepository: IUnitRepository,
        @inject("CategoryRepository")
        private CategoryRepository: ICategoryRepository,
        @inject("ProductRepository")
        private ProductRepository: IProductRepository
    ) {

    }

    public async canUserCreateAUnit(plan: string, planStatus: string, userId: string): Promise<boolean> {
        const userUnitiesQtd = await this.UnitRepository.countAllUnitiesOfUserByUserId(userId);

        const planDB = await this.PlanRepository.findByName(plan);

        if (!planDB) {
            const error: IAppError = {
                statusCode: 404,
                message: "Plano não encontrado."
            };

            throw error;
        }

        if (userUnitiesQtd >= planDB?.quantityLimitUnities) {
            return false;
        } else if (userUnitiesQtd <= planDB.quantityLimitUnities && planStatus !== "ACTIVE") {
            return false
        } else {
            return true
        }
    }


    public async canUserCreateAProductWithCategoryId(plan: string, planStatus: string, categoryId: string): Promise<boolean> {
        const productsQtd = await this.ProductRepository.countAllProductsByCategoryId(categoryId);

        const planDB = await this.PlanRepository.findByName(plan);

        if (!planDB) {
            const error: IAppError = {
                statusCode: 404,
                message: "Plano não encontrado."
            };

            throw error;
        }

        if (productsQtd >= planDB?.quantityLimitProduct) {
            return false;
        } else if (productsQtd <= planDB.quantityLimitProduct && planStatus !== "ACTIVE") {
            return false
        } else {
            return true
        }
    }

    public async canUserCreateACategoryByUnit(plan: string, planStatus: string, unitId: string): Promise<boolean> {
        const categoriesQtd = await this.CategoryRepository.countCategoriesByUnitId(unitId);

        const planDB = await this.PlanRepository.findByName(plan);

        if (!planDB) {
            const error: IAppError = {
                statusCode: 404,
                message: "Plano não encontrado."
            };

            throw error;
        }

        if (categoriesQtd >= planDB.quantityLimitCategory) {
            return false;
        } else if (categoriesQtd <= planDB.quantityLimitCategory && planStatus !== "ACTIVE") {
            return false
        } else {
            return true
        }
    }

    public async canUserCreateAUserWithUnitId(plan: string, planStatus: string, userId: string, unitId: string): Promise<boolean> {
        return false
    }

    public async canUserCreateLinkToUnitId(plan: string, planStatus: string, userId: string, unitId: string): Promise<boolean> {
        return false
    }

}