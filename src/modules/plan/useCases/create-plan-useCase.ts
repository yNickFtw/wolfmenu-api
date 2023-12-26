import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { ICreatePlanUseCase } from "../../../shared/interfaces/modules/plan/useCases/ICreatePlanUseCase";
import { IPlanRepository } from "../../../shared/interfaces/modules/plan/repository/IPlanRepository";

@injectable()
export default class CreatePlanUseCase implements ICreatePlanUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("PlanRepository")
        private PlanRepository: IPlanRepository
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(name: string, price: string): Promise<void> {
        if(!name || !price) {
            const error: IAppError = {
                statusCode: 400,
                message: "Preencha todos os campos!"
            };

            throw error;
        }

        const planExistsByName = await this.PlanRepository.findByName(name);

        

    }
}
