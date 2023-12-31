export interface IFetchLoggedUserUseCase {
    execute(token: string): Promise<IUser>;
}
