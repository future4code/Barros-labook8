import { UserRepository } from "../../business/UserRepository";
import { CustomError } from "../../error/customError";
import { user } from "../../model/user";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase implements UserRepository {
  insert(user: user): Promise<void> {
    throw new Error("Method not implemented.");
  }

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
}
