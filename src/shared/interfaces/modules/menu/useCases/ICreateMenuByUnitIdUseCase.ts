export interface ICreateMenuByUnitIdUseCase {
    execute(token: string, description: string, bannerColor: string, file: Express.Multer.File | undefined, unitId: string): Promise<void>;
}
