import { Request, Response } from "express";
import { CreateRatingDto, UpdateRatingDto } from "../models/Rating";
import { RatingService } from "../services/RatingService";
import { PropertyService } from "../services/PropertyService";
import { CreatePropertyDto, UpdatePropertyDto } from "../models/Property"

class PropertyController {
  public async getProperties(req: Request, res: Response) {
    const propertyService = new PropertyService();

    const properties = await propertyService.getProperties();
    if (properties.length === 0) {
      res.status(404).json({ message: "There are no properties" });
      return;
    }
    res.json(properties);
  }
  public async createProperty(req: Request, res: Response) {
    const propertyService = new PropertyService();
    const PropertyDto: CreatePropertyDto = req.body;
    if (!PropertyDto.brand) {
      res.status(400).json({ message: "You need to specify brand" });
      return;
    }
    if (!PropertyDto.model) {
      res.status(400).json({ message: "You need to specify model" });
      return;
    }
    if (!PropertyDto.colour) {
      res.status(400).json({ message: "You need to specify colour" });
      return;
    }
    if (!PropertyDto.memory) {
      res.status(400).json({ message: "You need to specify memory" });
      return;
    }
    if (!PropertyDto.mass) {
      res.status(400).json({ message: "You need to specify mass" });
      return;
    }
    if (!PropertyDto.cpu) {
      res.status(400).json({ message: "You need to specify cpu" });
      return;
    }    if (!PropertyDto.graphicCard) {
      res.status(400).json({ message: "You need to specify graphicCard" });
      return;
    }
    if (!PropertyDto.disk) {
      res.status(400).json({ message: "You need to specify disk" });
      return;
    }


    const newProperty = await propertyService.createProperty(PropertyDto);
    res.status(201).json(newProperty);
  }

  public async updateProperty(req: Request, res: Response) {
    const propertyService = new PropertyService();
    const propertyDto: UpdatePropertyDto = req.body;
    const propertyId = req.params.id as unknown as number;

    // if (!ratingDto.productId) {
    //   res.status(400).json({ message: "You need to specify productId" });
    //   return;
    // }
    // if (!ratingDto.userRating) {
    //   res.status(400).json({ message: "You need to specify rating" });
    //   return;
    // }
    // if (!ratingDto.userReview) {
    //   res.status(400).json({ message: "You need to specify review" });
    //   return;
    // }

    const updatedProperty = await propertyService.updateProperty(propertyId, propertyDto);
    res.json(updatedProperty);
  }

  public async deleteProperty(req: Request, res: Response) {
    const propertyService = new PropertyService();
    const propertyId = req.params.id as unknown as number;
    if (!propertyId) {
      res.status(400).json({ message: "You need to specify propertyId" });
      return;
    }

    const deletedProperty = await propertyService.deleteProperty(propertyId);
    if (!propertyId) {
      res
        .status(404)
        .json({ message: "There is no property with that id m8." });
      return;
    }
    res.status(204).json({ message: "Property deleted" });
  }

  public async getPropertyById(req: Request, res: Response) {
    const propertyService = new PropertyService();
    const propertyId = req.params.id as unknown as number;
    if (!propertyId) {
      res.status(400).json({ message: "There is no property with that id" });
      return;
    }

    const property = await propertyService.getPropertyById(propertyId);
    res.json(property);
  }
}

export { PropertyController };
