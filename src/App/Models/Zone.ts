import { Plant } from "./Plant";

export class Zone {
  id: number = 0;
  name: string = "";
  runtimeHours: number = 0;
  runtimeMinutes: number = 0;
  runtimePerWeek: number = 0;
  imagePath: string = "";
  season: string = "";
  totalPlants: number = 0;
  totalGalPerWeek: number = 0;
  totalGalPerMonth: number = 0;
  totalGalPerYear: number = 0;
  seasonId: number = 0;
  plants!: Plant[];
}
