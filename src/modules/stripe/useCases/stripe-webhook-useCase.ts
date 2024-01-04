import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IStripeWebhookUseCase } from "../../../shared/interfaces/modules/stripe/useCases/IStripeWebhookUseCase";
import Stripe from "stripe";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { IPlanRepository } from "../../../shared/interfaces/modules/plan/repository/IPlanRepository";
import { IUser } from "../../../shared/interfaces/modules/user/IUser";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)


@injectable()
export default class StripeWebhookUseCase implements IStripeWebhookUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("PlanRepository")
        private PlanRepository: IPlanRepository
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(body: any, sig: any): Promise<any> {
        let event: any;

        try {
            event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_KEY!);

            if(event.type === "customer.subscription.created") {
                const planId = event.data.object.plan.id;
                const planStatus = event.data.object.status;
                const customerId = event.data.object.customer;
                
                const planUser = await this.PlanRepository.findByStripeId(planId);

                const userUpdated: Partial<IUser> = {
                    customerId: customerId,
                    planUser: planUser?.name,
                    planStatus: planStatus.toUpperCase()
                }

                await this.UserRepository.updateByCustomerId(userUpdated)
            }

            if(event.type === "customer.subscription.updated") {
                const planId = event.data.object.plan.id;
                const planStatus = event.data.object.status;
                const customerId = event.data.object.customer;
                
                const planUser = await this.PlanRepository.findByStripeId(planId);

                const userUpdated: Partial<IUser> = {
                    customerId: customerId,
                    planUser: planUser?.name,
                    planStatus: planStatus.toUpperCase()
                }

                await this.UserRepository.updateByCustomerId(userUpdated)
            }

            if(event.type === "customer.subscription.deleted") {
                const customerId = event.data.object.customer;

                await this.UserRepository.updateByCustomerId({ planUser: "Essential", planStatus: "ACTIVE", customerId: customerId });
                
                return;
            }

            if(event.type === "invoice.created") {
                const invoiceId = event.data.object.id
                
                if(event.data.object.status === "draft") {
                    await stripe.invoices.finalizeInvoice(invoiceId)
                    return
                }

                return
            }

            return;
        } catch (error: any) {
            const errorE: IAppError = {
                statusCode: 400,
                message: error.message
            }

            throw errorE
        }
    }
}
