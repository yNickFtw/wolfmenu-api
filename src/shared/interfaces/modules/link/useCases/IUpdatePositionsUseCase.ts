import { OrderLinkDTO } from "./OrderLinkDTO";

export interface IUpdatePositionsUseCase {
    execute(token: string, unitId: string, links: OrderLinkDTO[]): Promise<void>;
}
