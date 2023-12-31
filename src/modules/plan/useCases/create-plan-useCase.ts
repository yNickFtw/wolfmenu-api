import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { ICreatePlanUseCase } from "../../../shared/interfaces/modules/plan/useCases/ICreatePlanUseCase";
import { IPlanRepository } from "../../../shared/interfaces/modules/plan/repository/IPlanRepository";
import { IPlan } from "../../../shared/interfaces/modules/plan/IPlan";

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

    public async execute(name: string, price: string, stripeId: string, quantityLimitUnities: number, quantityLimitLinks: number, quantityLimitProduct: number, quantityLimitCategory: number): Promise<void> {
        if(!name || !price || !stripeId || !quantityLimitUnities || !quantityLimitCategory || !quantityLimitProduct || !quantityLimitLinks) {
            const error: IAppError = {
                statusCode: 400,
                message: "Preencha todos os campos!"
            };

            throw error;
        }

        const planExistsByName = await this.PlanRepository.findByName(name);

        if(planExistsByName) {
            const error: IAppError = {
                statusCode: 400,
                message: "Já existe um plano com este nome"
            };

            throw error;
        }

        const planExistsByStripeId = await this.PlanRepository.findByStripeId(stripeId);

        if(planExistsByStripeId) {
            const error: IAppError = {
                statusCode: 400,
                message: "Já existe um plano com este StripeID"
            };

            throw error;
        }

        const plan: Partial<IPlan> = {
            name: name,
            price: price,
            stripeId: stripeId,
            quantityLimitUnities: quantityLimitUnities,
            quantityLimitCategory: quantityLimitCategory,
            quantityLimitProduct: quantityLimitProduct,
            quantityLimitLinks: quantityLimitLinks
        }

        await this.PlanRepository.create(plan);

        return
    }
}
