import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IChangeAvatarImageUseCase } from "../../../shared/interfaces/modules/unit/useCases/IChangeAvatarImageUseCase";
import { IFirebaseService } from "../../../shared/services/FirebaseService/IFirebaseService";
import { IUnitRepository } from "../../../shared/interfaces/modules/unit/repository/IUnitRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import sharp from "sharp";
import { v4 as uuidv4 } from 'uuid'

@injectable()
export default class ChangeAvatarImageUseCase implements IChangeAvatarImageUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("UnitRepository")
        private UnitRepository: IUnitRepository,
        @inject("FirebaseService")
        private FirebaseService: IFirebaseService
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, file: Express.Multer.File | undefined | null, unitId: string): Promise<void> {
        if (!file) {
            const error: IAppError = {
                statusCode: 400,
                message: "Você precisa enviar alguma imagem para continuar."
            };

            throw error;
        }

        const { userId } = this.JWTService.decodeToken(token, true);

        const unit = await this.UnitRepository.findById(unitId);

        if (!unit) {
            const error: IAppError = {
                statusCode: 404,
                message: "Unidade não encontrada"
            }

            throw error;
        }

        if (unit.userId !== userId) {
            const error: IAppError = {
                statusCode: 403,
                message: "Você não tem permissão para mudar o avatar desta unidade."
            }

            throw error;
        }

        if (unit.avatarImage !== null) {
            await this.FirebaseService.deleteImage(unit.avatarImageFilename, 'avatars')
        }

        const filename = uuidv4();
        const compressedImageBuffer = await sharp(file.buffer).jpeg({ quality: 50 }).toBuffer();

        const avatarImage = await this.FirebaseService.uploadImage(filename, 'avatars', compressedImageBuffer, file.mimetype);

        await this.UnitRepository.editAvatar(avatarImage, filename, unitId);

        return
    }
}
