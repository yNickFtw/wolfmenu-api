export interface ICreateUnitUseCase {
    execute(name: string, slug: string, token: string): Promise<void>;
}
