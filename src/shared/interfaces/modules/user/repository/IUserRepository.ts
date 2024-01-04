import { IUser } from "../IUser";

export interface IUserRepository {
    create(user: Partial<IUser>): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | null>;
    findById(id: string): Promise<IUser | null>;
    verifyEmailById(id: string): Promise<void>;
    updateByCustomerId(user: Partial<IUser>): Promise<void>;
    update(user: Partial<IUser>, userId: string): Promise<void>;
    findByCustomerId(customerId: string): Promise<IUser | null>;
}