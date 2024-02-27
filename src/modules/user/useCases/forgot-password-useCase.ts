import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IForgotPasswordUseCase } from "../../../shared/interfaces/modules/user/useCases/IForgotPasswordUseCase";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { ISMTPService } from "../../../shared/services/SMTPService/ISMTPService";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";

@injectable()
export default class ForgotPasswordUseCase implements IForgotPasswordUseCase, IAppError {
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

    public async execute(email: string): Promise<void> {
        if(!email) {
            const error: IAppError = {
                statusCode: 400,
                message: "Preencha o campo do email"
            }

            throw error
        }


        const user = await this.UserRepository.findByEmail(email)

        if(!user) {
            return
        }

        const token = this.JWTService.generateToken({ email: user.email }, "1h")
        
        let templateHTML = `
        <h2>Olá, ${user?.firstName}</h2>
        <p>Não COMPARTILHE este link com NINGUÉM</p>
        <a href="${process.env.CLIENT_URL}/forgot/password?token=${token}" target="_blank"> </a>
        `

        await this.SMTPService.send(user.email, "Alteração de senha", templateHTML)

        return
    }
}
