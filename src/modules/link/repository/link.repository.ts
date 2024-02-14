import { ILink } from "../../../shared/interfaces/modules/link/ILink";
import { ILinkRepository } from "../../../shared/interfaces/modules/link/repository/ILinkRepository";
import { Link } from "../entity/link.schema";

export default class LinkRepository implements ILinkRepository {
    public async create(link: Partial<ILink>): Promise<void> {
        await Link.create({ ...link });

        return;
    }

    public async countLinksByUnitId(unitId: string): Promise<number> {
        const count = await Link.count({ where: { unitId: unitId } });

        return count;
    }

    public async findAllLinksByUnitId(unitId: string): Promise<ILink[] | []> {
        const links = await Link.findAll({ where: { unitId: unitId }, order: [[
            "position", "ASC"
        ]] })

        return links as unknown as ILink[]
    }

    public async updatePositionByLinkId(linkId: string, position: number): Promise<void> {
        await Link.update({ position }, { where: { id: linkId } });

        return;
    }
}