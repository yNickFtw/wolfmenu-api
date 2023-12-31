import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IFetchLoggedUserUseCase } from "../../../shared/interfaces/modules/user/useCases/IFetchLoggedUserUseCase";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { IUser } from "../../../shared/interfaces/modules/user/IUser";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";

@injectable()
export default class FetchLoggedUserUseCase implements IFetchLoggedUserUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("JWTService")
        private JWTService: IJWTService
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string): Promise<IUser> {
        // Lógica do Caso de Uso
        const { userId } = this.JWTService.decodeToken(token, true)

        if(!userId) {
            const error: IAppError = {
                statusCode: 401,
                message: "Sessão expirada, faça login novamente!"
            }

            throw error;
        }

        const user = await this.UserRepository.findById(userId);

        if (!user) {
            const error: IAppError = {
                statusCode: 401,
                message: "Sessão expirada, faça login novamente",
            };

            throw error;
        }

        return { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, planUser: user.planUser, planStatus: user.planStatus, profileImage: user.profileImage } as IUser;
    }
}
