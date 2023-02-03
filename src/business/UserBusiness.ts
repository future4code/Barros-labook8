import { CustomError, InvalidEmail, InvalidName } from "../error/customError";
import { user, UserInputDTO } from "../model/user";
import { UserRepository } from "./UserRepository";

export class UserBusiness {

  constructor(private userDatabase: UserRepository) { }

  public createUser = async (input: UserInputDTO) => {
    try {
      let message = "Success!"
      const { name, email, password } = input

      if (!name || !email || !password) {
        throw new CustomError(400, '"name", "email" and "password" must be provided')
      }
      if (name.length < 4) {
        throw new InvalidName();
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }

      const id: string = Date.now().toString()

      const user: user = {
        id,
        name,
        email,
        password
      }
      await this.userDatabase.insertUser(user);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)

    }
  };

  public getUsers = async () => {
    try {
      return await this.userDatabase.getUsers();

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)

    }
  }
}
