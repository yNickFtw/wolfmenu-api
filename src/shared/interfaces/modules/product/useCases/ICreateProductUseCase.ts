export interface ICreateProductUseCase {
    execute(name: string, description: string, categoryId: string, file: Express.Multer.File, token: string): Promise<void>;
}
