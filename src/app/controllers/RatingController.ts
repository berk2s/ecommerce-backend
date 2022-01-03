import { Request, Response } from "express";
import { CreateRatingDto } from "../models/Rating";
import { RatingService } from "../services/RatingService";

class RatingController {
  public async getRatings(req: Request, res: Response) {
    const ratingService = new RatingService();

    const ratings = await ratingService.getRatings();
    if (ratings.length === 0) {
      res.status(404).json({ message: "There are no ratings" });
      return;
    }
    res.json(ratings);
  }
  public async createRating(req: Request, res: Response) {
    const ratingService = new RatingService();
    const ratingDto: CreateRatingDto = req.body;
    if (!ratingDto.productId) {
      res.status(400).json({ message: "You need to specify productId" });
      return;
    }
    if (!ratingDto.userRating) {
      res.status(400).json({ message: "You need to specify rating" });
      return;
    }
    const newRating = await ratingService.createRating(ratingDto);
    res.status(201).json(newRating);
  }
}

export { RatingController };
