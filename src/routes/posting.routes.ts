import { Router } from "express";
import PostingController from "../controllers/posting.controller";

class PostingRoutes {
  router = Router();
  controller = new PostingController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Posting
    this.router.post("/", this.controller.create);

    // Retrieve all Postings
    this.router.get("/", this.controller.findAll);

    // Retrieve a single Posting with id
    this.router.get("/:id", this.controller.findOne);

    // Update a Posting with id
    this.router.put("/:id", this.controller.update);

    // Delete a Posting with id
    this.router.delete("/:id", this.controller.delete);
  }
}

export default new PostingRoutes().router;
