import { CustomError } from "../error/customError";
import { post, PostInputDTO } from "../model/post";
import { PostRepository } from "./PostRepository";

export class PostBusiness {

  constructor(private postDatabase:PostRepository) {}

   
//CRIA POST

  public createPost = async (input: PostInputDTO) => {
    try {
      let message = "Success!"

      const { photo, description, type, createdAt, authorId} = input

      const postId: string = Date.now().toString()
      
      const post:post = {
            id:postId,
            photo,
            description,
            type,
            createdAt,
            authorId
      }

      await this.postDatabase.insertPost(post)
  } catch (error:any) {
      throw new CustomError(error.statusCode, error.message)
   }
  };

//BUSCA POST POR ID

  public getPost = async (id: string) => {

      try {      
    
      const postSelected = await this.postDatabase.getPost(id)
      
      if(!postSelected[0]){
        throw new CustomError(404, "Post not found")
      }

      const result = {
        id:postSelected[0].id,
        photo:postSelected[0].photo,
        description:postSelected[0].description,
        type:postSelected[0].type,
        createdAt:postSelected[0].createdAt,
        authorId:postSelected[0].authorId,
      }
      return postSelected;
       
    } catch (error: any) {
       throw new CustomError(error.statusCode, error.message)

    }
 }

//BUSCA TODOS OS POSTS

 public getAllPosts = async () => {

    try {      
    return await this.postDatabase.getAllPosts()
  
  } catch (error: any) {
     throw new CustomError(error.statusCode, error.message)
  
      }
    }

}