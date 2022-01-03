import { Request, Response } from "express";
import { RatingDto } from "../models/Rating";
import { RatingService } from "../services/RatingService";

class RatingController {

  public async getRatings(req: Request, res: Response) {
    const ratingService = new RatingService();

    const ratings = await ratingService.getRatings();
    if (ratings.length === 0) {
      res.status(404).json({ message: "There are no products" });
      return;
    }

    res.json(ratings);
  }

}

export { RatingController };
