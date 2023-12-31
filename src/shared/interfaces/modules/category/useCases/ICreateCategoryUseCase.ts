export interface ICreateCategoryUseCase {
    execute(name: string, description: string, unitId: string, token: string): Promise<void>;
}
