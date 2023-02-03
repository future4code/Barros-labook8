import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserInputDTO } from "../model/user";

export class UserController {

  constructor(private userBusiness: UserBusiness) { }

  public createUser = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      const input: UserInputDTO = {
        name,
        email,
        password,
      };

      await this.userBusiness.createUser(input);

      res.status(201).send({ message: "Usuário criado!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const name = req.query.name
      const users = await this.userBusiness.getUsers()

      res.status(201).send(users)
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }
}
