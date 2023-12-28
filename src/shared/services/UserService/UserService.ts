import { inject, injectable } from 'tsyringe';
import { IUserService } from './IUserService'
import { IUserRepository } from '../../interfaces/modules/user/repository/IUserRepository';
import { IUnitRepository } from '../../interfaces/modules/unit/repository/IUnitRepository';

@injectable()
export default class UserService implements IUserService {
    

    constructor(
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("UnitRepository")
        private UnitRepository: IUnitRepository,
    ) {
    }

    public async canUserCreateUnit(userId: string): Promise<boolean> {
        return true;
    }

    public async canUserCreateACategory(unitId: string): Promise<boolean> {
        return true   
    }

    public async canUserCreateAProductToCategory(unitId: string, categoryId: string): Promise<boolean> {
        return true;
    }
}