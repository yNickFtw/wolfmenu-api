export interface ICreateCategoryUseCase {
    execute(name: string, token: string): Promise<void>;
}
