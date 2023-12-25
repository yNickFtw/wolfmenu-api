export interface IUserService {
    checkUserPlan(userId: string): Promise<string>
}