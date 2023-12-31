import Stripe from "stripe";

export interface ICreateSessionCheckoutUseCase {
    execute(token: string, planId: string): Promise<string | null>;
}
