import { Request, Response } from "express";
import { CreateRatingDto, UpdateRatingDto } from "../models/Rating";
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
    if (!ratingDto.userReview) {
      res.status(400).json({ message: "You need to specify review" });
      return;
    }

    const newRating = await ratingService.createRating(ratingDto);
    res.status(201).json(newRating);
  }

  public async updateRating(req: Request, res: Response) {
    const ratingService = new RatingService();
    const ratingDto: UpdateRatingDto = req.body;
    const ratingId = req.params.id as unknown as number;

    if (!ratingDto.productId) {
      res.status(400).json({ message: "You need to specify productId" });
      return;
    }
    if (!ratingDto.userRating) {
      res.status(400).json({ message: "You need to specify rating" });
      return;
    }
    if (!ratingDto.userReview) {
      res.status(400).json({ message: "You need to specify review" });
      return;
    }

    const updatedRating = await ratingService.updateRating(ratingId, ratingDto);
    res.json(updatedRating);
  }

  public async deleteRating(req: Request, res: Response) {
    const ratingService = new RatingService();
    const ratingId = req.params.id as unknown as number;
    if (!ratingId) {
      res.status(400).json({ message: "You need to specify ratingId" });
      return;
    }

    const deletedRating = await ratingService.deleteRating(ratingId);
    if (!deletedRating) {
      res
        .status(404)
        .json({ message: "There is no rating with that id mate." });
      return;
    }
    res.status(204).json({ message: "Rating deleted" });
  }

  public async getRatingById(req: Request, res: Response) {
    const ratingService = new RatingService();
    const ratingId = req.params.id as unknown as number;
    if (!ratingId) {
      res.status(400).json({ message: "There is no rating with that id" });
      return;
    }

    const rating = await ratingService.getRatingById(ratingId);
    res.json(rating);
  }
}

export { RatingController };
