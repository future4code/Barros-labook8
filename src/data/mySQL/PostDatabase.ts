import { PostRepository } from "../../business/PostRepository";
import { CustomError } from "../../error/customError";
import { post } from "../../model/post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase implements PostRepository {

    //CRIA POST

    public insertPost = async (post: post): Promise<void> => {
        try {
            await PostDatabase.connection
                .insert({
                    id: post.id,
                    photo: post.photo,
                    description: post.description,
                    type: post.type,
                    created_at: post.createdAt,
                    author_id: post.authorId
                })
                .into("labook_posts");
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    };

    //BUSCA POST POR ID

    public getPost = async (idPost: string): Promise<post[]> => {
        try {
            const post = await PostDatabase.connection
                .select("photo", "description", "type")
                .from("labook_posts")
                .where("id", idPost)
            return post;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    };

    //BUSCA TODOS OS POSTS

    public getAllPosts = async (): Promise<post[]> => {
        try {
            const allPosts = await PostDatabase.connection
                .select()
                .from("labook_posts")
            return allPosts;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    };

    //BUSCA TODOS OS POSTS

    public getPostsFriends = async (): Promise<post[]> => {
        try {
            const allPosts = await PostDatabase.connection
                .select()
                .from("labook_posts")
            return allPosts;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    };
}
