import { IPlan } from "../IPlan";

export interface IPlanRepository {
    create(plan: Partial<IPlan>): Promise<void>;
    findByName(name: string): Promise<IPlan | null>;
    findById(id: string): Promise<IPlan | null>;
    findByStripeId(stripeId: string): Promise<IPlan | null>;
    findAll(): Promise<IPlan[] | []>;
}