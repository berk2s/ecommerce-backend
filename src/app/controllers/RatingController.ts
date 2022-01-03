import { Request, Response } from "express";
import { RatingDto } from "../models/Rating";
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

    const createRatingDto: RatingDto = req.body;
    if (!createRatingDto.productId) {
      res.status(400).json({ message: "You need to specify productId" });
      return;
    }
    if (!createRatingDto.userRating) {
      res.status(400).json({ message: "You need to specify userRating" });
      return;
    }
    if (!createRatingDto.userReview) {
      res.status(400).json({ message: "You need to specify userReview" });
      return;
    }

    const newRating = await ratingService.createRating(createRatingDto);

    res.status(201).json(newRating);
  }
}

export { RatingController };
