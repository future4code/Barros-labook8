import { PostRepository } from "../../business/PostRepository";
import { CustomError } from "../../error/customError";
import { post } from "../../model/post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase implements PostRepository {
  insert(post: post): Promise<void> {
    throw new Error("Method not implemented.");
  }

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

  public getPost = async (): Promise<post[]> => {
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
