import { Plant } from "./Plant";

export class  Zone {
  id!: number;
  name!: string;
  runtimeHours!: number;
  runtimeMinutes!: number;
  runtimePerWeek!: number;
  imagePath!: string;
  season!: string;
  totalPlants!: number;
  totalGalPerWeek!: number;
  totalGalPerMonth!: number;
  totalGalPerYear!: number;
  seasonId!: number;
  plants!: Plant[] | null;
}
