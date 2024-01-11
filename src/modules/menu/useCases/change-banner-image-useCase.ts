import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IChangeBannerImageUseCase } from "../../../shared/interfaces/modules/menu/useCases/IChangeBannerImageUseCase";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IMenuRepository } from "../../../shared/interfaces/modules/menu/repository/IMenuRepository";
import { IFirebaseService } from "../../../shared/services/FirebaseService/IFirebaseService";
import { v4 as uuidv4 } from 'uuid'
import sharp from "sharp";
import { IMenu } from "../../../shared/interfaces/modules/menu/IMenu";

@injectable()
export default class ChangeBannerImageUseCase implements IChangeBannerImageUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("MenuRepository")
        private MenuRepository: IMenuRepository,
        @inject("FirebaseService")
        private FirebaseService: IFirebaseService
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, bannerColor: string, file: Express.Multer.File | undefined | null, menuId: string): Promise<void> {
        if (!file && !bannerColor) {
            const error: IAppError = {
                statusCode: 400,
                message: "Você precisa adicionar ou uma imagem ou uma cor para o banner."
            };

            throw error;
        }

        const { userId } = this.JWTService.decodeToken(token, true);

        const menu = await this.MenuRepository.findById(menuId);

        if (!menu) {
            const error: IAppError = {
                statusCode: 404,
                message: "Cardápio não encontrado"
            };

            throw error;
        }

        if (menu.userId !== userId) {
            const error: IAppError = {
                statusCode: 403,
                message: "Você não tem permissão para editar este menu"
            };

            throw error;
        }

        let filename: string;
        let banner: string;

        if (file) {
            if (menu.banner !== null) {
                await this.FirebaseService.deleteImage(menu.bannerFilename!, 'banners');
            }

            filename = uuidv4();
            const compressedImageBuffer = await sharp(file!.buffer).jpeg({ quality: 80 }).toBuffer();

            banner = await this.FirebaseService.uploadImage(filename, 'banners', compressedImageBuffer, file.mimetype);

            const menuEdited: Partial<IMenu> = {
                banner: banner,
                bannerFilename: filename,
                bannerColor: bannerColor
            }

            await this.MenuRepository.edit(menuEdited, menuId);

            return
        } else {
            const menuEdited: Partial<IMenu> = {
                bannerColor: bannerColor
            }

            await this.MenuRepository.edit(menuEdited, menuId);

            return;
        }
    }
}
