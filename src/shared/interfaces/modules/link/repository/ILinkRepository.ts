import { ILink } from "../ILink";

export interface ILinkRepository {
    create(link: Partial<ILink>): Promise<void>;
    countLinksByUnitId(unitId: string): Promise<number>;
    findAllLinksByUnitId(unitId: string): Promise<ILink[] | []>;
    updatePositionByLinkId(linkId: string, position: number): Promise<void>;
}