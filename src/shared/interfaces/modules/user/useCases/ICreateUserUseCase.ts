export interface ICreateUserUseCase {
    execute(firstName: string, lastName: string, email: string, password: string, confirmPassword: string): Promise<void>;
}
