export interface IAddLinkUseCase {
    execute(token: string, unitId: string, title: string, url: string): Promise<void>;
}
