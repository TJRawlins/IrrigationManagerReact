import { Plant } from "./Plant";

export interface Zone {
  id: string;
  name: string;
  runtimeHours: number;
  runtimeMinutes: number;
  runtimePerWeek: number;
  // startHours: number;
  // startMinutes: number;
  // endHours: number;
  // endMinutes: number;
  imagePath: string;
  season: string;
  totalPlants: number;
  totalGalPerWeek: string;
  totalGalPerMonth: string;
  totalGalPerYear: string;
  plants: Plant[] | null;
}
