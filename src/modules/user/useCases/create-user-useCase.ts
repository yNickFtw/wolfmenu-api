import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { ICreateUserUseCase } from "../../../shared/interfaces/modules/user/useCases/ICreateUserUseCase";
import { IUserRepository } from '../../../shared/interfaces/modules/user/repository/IUserRepository';
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { ISMTPService } from "../../../shared/services/SMTPService/ISMTPService";
import { IBCryptService } from "../../../shared/services/BCryptService/IBCryptService";
import { IUser } from "../../../shared/interfaces/modules/user/IUser";

@injectable()
export default class CreateUserUseCase implements ICreateUserUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("BCryptService")
        private BCryptService: IBCryptService,
        @inject("SMTPService")
        private SMTPService: ISMTPService
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(firstName: string, lastName: string, email: string, password: string, confirmPassword: string): Promise<void> {
        if(!firstName || !lastName || !email || !password || !confirmPassword) {
            const error: IAppError = {
                statusCode: 400,
                message: "Preencha todos os campos."
            };

            throw error;
        };

        if(password !== confirmPassword) {
            const error: IAppError = {
                statusCode: 400,
                message: "As senhas devem ser iguais."
            };

            throw error;
        }

        const userExists = await this.UserRepository.findByEmail(email);

        if(userExists) {
            const error: IAppError = {
                statusCode: 400,
                message: "Já existe um usuário com este e-mail."
            };

            throw error;
        };
        
        const passwordHash = await this.BCryptService.encryptPassword(password);

        const user: Partial<IUser> = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: passwordHash,
            isVerified: false,
        }

        const userCreated = await this.UserRepository.create(user);

        const payload = {
            userIdEmail: userCreated.id
        }

        const token = this.JWTService.generateToken(payload, "5d")

        let html = `
        <h1>Olá, ${firstName}!</h1>
        <h2>Verifique seu email clicando no link abaixo:</h2>
        <h3>${process.env.CLIENT_URL}/verify/email?token=${token}</h3>
        `

        await this.SMTPService.send(email, 'Verificação de email na WolfMenu!.', html)

        return;
    }
}
