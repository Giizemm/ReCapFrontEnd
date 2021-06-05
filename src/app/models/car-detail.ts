import { CarImage } from './car-image';

export interface CarDetail {
  id: number;
  name: string;
  colorName: string;
  dailyPrice: number;
  description: string;
  modelYear: number;
  findexPoints:number;
  carImages: CarImage[];
}
