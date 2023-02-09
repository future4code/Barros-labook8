import { user} from "../model/user";

export interface UserRepository {
    insertUser(user: user): unknown;
    getUsers(): Promise<user[]>
}