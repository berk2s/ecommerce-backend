export interface PropertyDto {
  id: number;
  brand: string
  model: string
  colour: string
  memory: string
  mass: string
  cpu: string
  graphicCard: string
  disk: string
}

export interface CreatePropertyDto {
  brand: string
  model: string
  colour: string
  memory: string
  mass: string
  cpu: string
  graphicCard: string
  disk: string
}

export interface UpdatePropertyDto {
  brand?: string
  model?: string
  colour?: string
  memory?: string
  mass?: string
  cpu?: string
  graphicCard?: string
  disk?: string
}
