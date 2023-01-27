import {post} from "../model/post";

export interface PostRepository {
    insertPost(post:post): unknown;
    insert(post:post):Promise<void>
    getPost(): Promise<post[]>
}