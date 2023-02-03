import { CustomError } from "../../error/customError";
import { user } from "../../model/user";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase implements BaseDatabase {

    public insertUser = async (user: user): Promise<void> => {
        try {
            await UserDatabase.connection
                .insert({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                })
                .into("labook_users");
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    };

    public getUsers = async (): Promise<user[]> => {
        try {
            const allUsers = await UserDatabase.connection
                .select()
                .from("labook_users");
            return allUsers;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    };

    public findUser = async (id: string) => {
        try {
            const result = await UserDatabase.connection("labook_users")
                .select(id).where({ id })
            return result[0]
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

}
