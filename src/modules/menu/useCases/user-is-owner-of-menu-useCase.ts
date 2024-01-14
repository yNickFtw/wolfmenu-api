import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IUserIsOwnerOfMenuUseCase } from "../../../shared/interfaces/modules/menu/useCases/IUserIsOwnerOfMenuUseCase";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IMenuRepository } from "../../../shared/interfaces/modules/menu/repository/IMenuRepository";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";

@injectable()
export default class UserIsOwnerOfMenuUseCase implements IUserIsOwnerOfMenuUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("MenuRepository")
        private MenuRepository: IMenuRepository,
        @inject("UserRepository")
        private UserRepository: IUserRepository
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, menuId: string): Promise<boolean> {
        const { userId } = this.JWTService.decodeToken(token, true);
        
        const menu = await this.MenuRepository.findById(menuId);

        console.log("MENU AQUI: " + menu)

        if(!menu) {
            const error: IAppError = {
                statusCode: 404,
                message: "Menu não encontrado."
            }

            throw error;
        }

        if(menu?.userId !== userId) {
            return false;
        } else {
            return true;
        }
    }
}
