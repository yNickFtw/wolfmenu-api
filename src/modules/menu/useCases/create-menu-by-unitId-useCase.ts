import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { ICreateMenuByUnitIdUseCase } from "../../../shared/interfaces/modules/menu/useCases/ICreateMenuByUnitIdUseCase";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { IMenuRepository } from "../../../shared/interfaces/modules/menu/repository/IMenuRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IUnitRepository } from "../../../shared/interfaces/modules/unit/repository/IUnitRepository";
import { v4 as uuidv4 } from 'uuid';
import sharp from "sharp";
import { IFirebaseService } from "../../../shared/services/FirebaseService/IFirebaseService";
import { IMenu } from "../../../shared/interfaces/modules/menu/IMenu";

@injectable()
export default class CreateMenuByUnitIdUseCase implements ICreateMenuByUnitIdUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("MenuRepository")
        private MenuRepository: IMenuRepository,
        @inject("UnitRepository")
        private UnitRepository: IUnitRepository,
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("FirebaseService")
        private FirebaseService: IFirebaseService
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, description: string, bannerColor: string, file: Express.Multer.File | undefined, unitId: string): Promise<void> {
        if (!description) {
            const error: IAppError = {
                statusCode: 400,
                message: "Adicione uma descrição para o cardápio"
            }

            throw error;
        }

        if (!bannerColor && !file) {
            const error: IAppError = {
                statusCode: 400,
                message: "Você precisa adicionar uma cor para o banner ou uma imagem."
            };

            throw error;
        }

        const { userId } = this.JWTService.decodeToken(token, true);

        const unit = await this.UnitRepository.findById(unitId);

        if (!unit) {
            const error: IAppError = {
                statusCode: 404,
                message: "Unidade não encontrada."
            };

            throw error;
        }

        if (unit.userId !== userId) {
            const error: IAppError = {
                statusCode: 403,
                message: "Você não tem permissão para criar uma cardápio para esta unidade."
            };

            throw error;
        }

        let bannerFilename = null;

        let compressedImageBuffer;
        let banner = null;

        if (file) {
            bannerFilename = uuidv4();
            compressedImageBuffer = await sharp(file.buffer).jpeg({ quality: 80 }).toBuffer();
            banner = await this.FirebaseService.uploadImage(bannerFilename, '/banners', compressedImageBuffer, file.mimetype)
        }

        const createdMenu: Partial<IMenu> = {
            description,
            banner: banner,
            bannerFilename: bannerFilename,
            bannerColor: bannerColor,
            unitId: unitId,
            userId: userId
        }

        await this.MenuRepository.create(createdMenu);

        return;
    }
}
