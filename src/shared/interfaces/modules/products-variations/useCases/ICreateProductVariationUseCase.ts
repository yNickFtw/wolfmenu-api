export interface ICreateProductVariationUseCase {
    execute(name: string, description: string, price: string, productId: string, token: string): Promise<void>;
}
