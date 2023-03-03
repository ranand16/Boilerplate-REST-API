import UserModel, { UserInput } from "../models/user.model";

export default async function createUser(input: UserInput) {
    try {
        return await UserModel.create(input)
    } catch(e: any) {
        throw new Error(e);
    }
}