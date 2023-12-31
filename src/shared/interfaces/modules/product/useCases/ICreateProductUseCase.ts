export interface ICreateProductUseCase {
    execute(name: string, description: string, price: string, categoryId: string, unitId: string, file: any, token: string): Promise<void>;
}
