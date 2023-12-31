export interface IPlanManagerService {
    canUserCreateAUnit(plan: string, planStatus: string, userId: string): Promise<boolean>;
    canUserCreateAUserWithUnitId(plan: string, planStatus: string, userId: string, unitId: string): Promise<boolean>;
    canUserCreateACategoryByUnit(plan: string, planStatus: string, unitId: string): Promise<boolean>;
    canUserCreateAProductWithCategoryId(plan: string, planStatus: string, categoryId: string): Promise<boolean>;
    canUserCreateLinkToUnitId(plan: string, planStatus: string, userId: string, unitId: string): Promise<boolean>;
}