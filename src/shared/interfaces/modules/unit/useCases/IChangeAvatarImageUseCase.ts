export interface IChangeAvatarImageUseCase {
    execute(token: string, file: Express.Multer.File | undefined | null, unitId: string): Promise<void>;
}
