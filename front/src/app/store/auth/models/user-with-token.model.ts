import { UserModel } from ".";

export interface UserWithTokenModel {
    user: UserModel;
    token: string;
}