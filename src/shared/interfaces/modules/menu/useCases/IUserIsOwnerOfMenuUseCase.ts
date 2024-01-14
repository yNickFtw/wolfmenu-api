export interface IUserIsOwnerOfMenuUseCase {
    execute(token: string, menuId: string): Promise<boolean>;
}
