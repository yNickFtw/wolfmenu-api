export interface IUserService {
    canUserCreateUnit(userId: string): Promise<boolean>;
    canUserCreateACategory(unitId: string): Promise<boolean>;
    canUserCreateAProductToCategory(unitId: string, categoryId: string): Promise<boolean>;
}