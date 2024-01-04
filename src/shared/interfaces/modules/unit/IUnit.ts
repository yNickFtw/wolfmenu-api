import { IUser } from "../user/IUser";

export interface IUnit {
    id: string;
    name: string;
    slug: string;
    cnpj: string;
    address: string;
    district: string;
    city: string;
    state: string;
    zip_code: string;
    userId: string;
    avatarImage: string;
    avatarImageFilename: string;
    user: Partial<IUser>;
}