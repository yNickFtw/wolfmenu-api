export interface IDashboardInfoUseCase {
    execute(token: string, unitId: string): Promise<DashboardInfoDTO>;
}
