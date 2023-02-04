import { user} from "../model/user";

export interface UserRepository {
    insertUser(user: user): unknown;
   // insert(user: user):Promise<void>
    getUsers(): Promise<user[]>
}