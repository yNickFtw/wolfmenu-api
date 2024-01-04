import { IUser } from "../../../shared/interfaces/modules/user/IUser";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { User } from "../entity/user.schema";

export default class UserRepository implements IUserRepository {
    public async create(user: Partial<IUser>): Promise<IUser> {
        const userCreated = await User.create({ ...user });

        return userCreated as unknown as IUser;
    }

    public async findByEmail(email: string): Promise<IUser | null> {
        const user = await User.findOne({ where: { email: email } });

        return user as unknown as IUser;
    }

    public async findById(id: string): Promise<IUser | null> {
        const user = await User.findOne({ where: { id: id } });

        return user as unknown as IUser;
    }

    public async verifyEmailById(id: string): Promise<void> {
        await User.update({ isVerified: true }, { where: { id: id } });

        return
    }

    public async updateByCustomerId(user: Partial<IUser>): Promise<void> {
        await User.update(user, { where: { customerId: user.customerId } });

        return;
    }

    public async update(user: Partial<IUser>, userId: string): Promise<void> {
        await User.update(user, { where: { id: userId } });

        return;
    }

    public async findByCustomerId(customerId: string): Promise<IUser | null> {
        const user = await this.findByCustomerId(customerId);

        return user as unknown as IUser;
    }
}