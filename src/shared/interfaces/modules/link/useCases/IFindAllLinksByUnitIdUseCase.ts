export interface IFindAllLinksByUnitIdUseCase {
    execute(token: string, unitId: string): Promise<ILink[] | []>;
}
