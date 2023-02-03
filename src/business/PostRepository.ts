import { post } from "../model/post";

export interface PostRepository {
    insertPost(post: post): unknown;
    getPost(id: string): Promise<post[]>
    getAllPosts(): Promise<post[]>
}