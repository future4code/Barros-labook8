import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostInputDTO } from "../model/post";

export class PostController {

  constructor(private postBusiness:PostBusiness){}

  public createPost = async (req: Request, res: Response) => {
    try {
      const { photo, description, type, createdAt, authorId } = req.body;

      const input: PostInputDTO = {
        photo,
        description,
        type,
        createdAt,
        authorId,
      };
    
      await this.postBusiness.createPost(input);

      res.status(201).send({ message: "Post criado!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
    
  };

  public getPost = async (req: Request, res: Response):Promise<void> => {
    
    try {
      const id = req.params.id 
      console.log(id)
      
      const posts = await this.postBusiness.getPost(id)

       res.status(201).send(posts)
    } catch (error: any) {
       res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }
}
