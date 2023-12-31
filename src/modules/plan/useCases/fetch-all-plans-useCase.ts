import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IFetchAllPlansUseCase } from "../../../shared/interfaces/modules/plan/useCases/IFetchAllPlansUseCase";
import { IPlanRepository } from "../../../shared/interfaces/modules/plan/repository/IPlanRepository";
import { IPlan } from "../../../shared/interfaces/modules/plan/IPlan";

@injectable()
export default class FetchAllPlansUseCase implements IFetchAllPlansUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("PlanRepository")
        private PlanRepository: IPlanRepository
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(): Promise<IPlan[] | []> {
        // Lógica do Caso de Uso

        const plans = await this.PlanRepository.findAll();

        return plans;
    }
}
