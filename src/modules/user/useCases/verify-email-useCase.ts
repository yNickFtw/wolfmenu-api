import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IVerifyEmailUseCase } from "../../../shared/interfaces/modules/user/useCases/IVerifyEmailUseCase";
import { ISMTPService } from "../../../shared/services/SMTPService/ISMTPService";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { TokenExpiredError } from "jsonwebtoken";

@injectable()
export default class VerifyEmailUseCase implements IVerifyEmailUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("SMTPService")
        private SMTPService: ISMTPService,
        @inject("JWTService")
        private JWTService: IJWTService
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string): Promise<void> {
        try {
            if (!token) {
                const error: IAppError = {
                    statusCode: 400,
                    message: "Token não informado, tente novamente!"
                }

                throw error;
            }

            const decoded = this.JWTService.decodeToken(token, false);

            if(decoded) {
                const { userId } = decoded;

                const user = await this.UserRepository.findById(userId)

                if(!user) {
                    const error: IAppError = {
                        statusCode: 404,
                        message: "Usuário não encontrado"
                    };

                    throw error;
                }

                if(user!.isVerified) {
                    const error: IAppError = {
                        statusCode: 400,
                        message: "Seu email já foi verificado."
                    };

                    throw error;
                }

                await this.UserRepository.verifyEmailById(userId);

                let html = `
                <h1>Olá, ${user!.firstName}.</h1>
                <h1>Seu e-mail foi verificado com sucesso, seja bem-vindo a WolfMenu!</h1>
                `

                await this.SMTPService.send(user!.email, 'E-mail verificado com sucesso!', html)

                return;
            } else {
                const error: IAppError = {
                    statusCode: 400,
                    message: "Estamos passando por instabilidades, por favor tente novamente mais tarde."
                };

                throw error;
            }

        } catch (error: any) {
            if (error instanceof TokenExpiredError) {
                const errorE: IAppError = {
                    statusCode: 400,
                    message: "Token expirado, clique no botão abaixo para receber outro link de verificação!"
                };

                throw errorE;
            } else {
                const errorE: IAppError = {
                    statusCode: 400,
                    message: error.message
                };

                throw errorE;
            }
        }

    }
}
