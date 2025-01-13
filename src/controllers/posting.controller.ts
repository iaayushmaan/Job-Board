import { Request, Response } from "express";
import Posting from "../models/posting.model";
import postingRepository from "../repositories/posting.repository";

export default class PostingController {
  async create(req: Request, res: Response) {
    if (!req.body.title) {
      res.status(400).send({
        message: "Title can not be empty!",
      });
      return;
    }

    try {
      const posting: Posting = req.body;
      const savedPosting = await postingRepository.save(posting);

      res.status(201).send(savedPosting);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving postings.",
        err,
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const title = typeof req.query.title === "string" ? req.query.title : "";

    try {
      const postings = await postingRepository.retrieveAll({ title: title });

      res.status(200).send(postings);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving postings.",
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const posting = await postingRepository.retrieveById(id);

      if (posting) res.status(200).send(posting);
      else
        res.status(404).send({
          message: `Cannot find Posting with id=${id}.`,
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Posting with id=${id}.`,
      });
    }
  }

  async update(req: Request, res: Response) {
    let posting: Posting = req.body;
    posting.id = parseInt(req.params.id);

    try {
      const num = await postingRepository.update(posting);

      if (num == 1) {
        res.send({
          message: "Posting was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Posting with id=${posting.id}. Maybe Posting was not found or req.body is empty!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Posting with id=${posting.id}.`,
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await postingRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "Posting was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Posting with id=${id}. Maybe Posting was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Posting with id==${id}.`,
      });
    }
  }
}
