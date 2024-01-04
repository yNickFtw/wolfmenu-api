import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IFindAllCategoriesByUnitIdUseCase } from "../../../shared/interfaces/modules/category/useCases/IFindAllCategoriesByUnitIdUseCase";
import { IUnitRepository } from "../../../shared/interfaces/modules/unit/repository/IUnitRepository";
import { ICategoryRepository } from "../../../shared/interfaces/modules/category/repository/ICategoryRepository";
import { ICategory } from "../../../shared/interfaces/modules/category/ICategory";

@injectable()
export default class FindAllCategoriesByUnitIdUseCase implements IFindAllCategoriesByUnitIdUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("CategoryRepository")
        private CategoryRepository: ICategoryRepository,
        @inject("UnitRepository")
        private UnitRepository: IUnitRepository
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, unitId: string): Promise<any> {
        // Lógica do Caso de Uso
        const categories = await this.CategoryRepository.findAllCategoriesByUnitId(unitId);

        return categories;

    }
}
