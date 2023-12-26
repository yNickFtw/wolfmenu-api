export interface IStripeWebhookUseCase {
    execute(body: any, sig: any): Promise<any>;
}
