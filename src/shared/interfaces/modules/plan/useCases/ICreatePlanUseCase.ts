export interface ICreatePlanUseCase {
    execute(name: string, price: string): Promise<void>;
}
