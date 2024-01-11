export interface IChangeBannerImageUseCase {
    execute(token: string, bannerColor: string, file: Express.Multer.File | undefined | null, menuId: string): Promise<void>;
}
