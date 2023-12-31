import { Plant } from "./Plant";

export interface Zone {
  id: string;
  name: string;
  runtimeHours: number;
  runtimeMinutes: number;
  runtimePerWeek: number;
  imagePath: string;
  season: string;
  totalPlants: number;
  totalGalPerWeek: string;
  totalGalPerMonth: string;
  totalGalPerYear: string;
  plants: Plant[] | null;
}
