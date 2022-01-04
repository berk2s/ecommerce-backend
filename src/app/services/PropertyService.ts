import { getManager } from "typeorm";
//import { Product } from "../entity/Product";
import { Property } from "../entity/Property";
import { PropertyDto, CreatePropertyDto, UpdatePropertyDto } from "../models/Property"

class PropertyService {
  constructor() {}

  public async getProperties() {
    const manager = getManager();

    const properties: Property[] = await manager.find(Property);

    let propertiesDto: PropertyDto[] = [];

    properties.forEach((property: Property) => {

      const propertyDto: PropertyDto = {
        id: property.id,
        brand: property.brand,
        model: property.model,
        colour: property.colour,
        memory: property.memory,
        mass: property.mass,
        cpu: property.cpu,
        graphicCard: property.graphicCard,
        disk: property.disk,
      };
      propertiesDto = [...propertiesDto, propertyDto];
    });
    return propertiesDto;
  }

  public async getPropertyById(propertyId: number) {
    const manager = getManager();

    const property = await manager.findOne(Property, propertyId);

    return property;
  }

  public async createProperty(createProductDto: CreatePropertyDto) {
    const manager = getManager();

    const property = new Property();
    property.brand = createProductDto.brand; // sağdaki postmandan
    property.model = createProductDto.model;
    property.colour = createProductDto.colour;
    property.memory = createProductDto.memory;
    property.mass = createProductDto.mass;
    property.cpu = createProductDto.cpu;
    property.graphicCard = createProductDto.graphicCard;
    property.disk = createProductDto.disk;

    const savedProduct = manager.save(property);

    return savedProduct;
  }

  public async updateProperty(propertyId: number, propertyDto: UpdatePropertyDto) {
    const manager = getManager();

    const property = await manager.findOne(Property, propertyId);

    if (property) {
      property.brand = propertyDto.brand;
      property.model = propertyDto.model;
      property.colour = propertyDto.colour;
      property.memory = propertyDto.memory;
      property.mass = propertyDto.mass;
      property.cpu = propertyDto.cpu;
      property.graphicCard = propertyDto.graphicCard;
      property.disk = propertyDto.disk;

      await manager.save(property);
    }

    return property;
  }

  public async deleteProperty(propertyId: number) {
    const manager = getManager();

    const property = await manager.findOne(Property, propertyId);

    if (property) {
      await manager.remove(property);
    }

    return property;
  }

}

export { PropertyService};
