import express from "express";
import { PostBusiness } from "../../business/PostBusiness";
import { PostDatabase } from "../../data/mySQL/PostDatabase";
import { PostController } from "../PostController";

export const postRouter = express.Router()

const postDatabase  = new PostDatabase()

const postBusiness = new PostBusiness(postDatabase)

const postController = new PostController(postBusiness)

postRouter.get("/get/:id",postController.getPost)

postRouter.post('/create', postController.createPost)

