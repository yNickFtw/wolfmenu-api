export interface ICreateCategoryUseCase {
    execute(name: string, unitId: string, token: string): Promise<void>;
}
