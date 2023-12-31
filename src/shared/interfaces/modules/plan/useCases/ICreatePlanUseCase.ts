export interface ICreatePlanUseCase {
    execute(name: string, price: string, stripeId: string, quantityLimitUnities: number, quantityLimitLinks: number, quantityLimitProduct: number, quantityLimitCategory: number): Promise<void>;
}
