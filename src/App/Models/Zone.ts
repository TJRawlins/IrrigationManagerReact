import { Plant } from "./Plant"

export interface Zone {
    id: string,
    name: string,
    runtimeHours: number,
    runtimeMinutes: number,
    runtimePerWeek: number,
    imagePath: string,
    season: string
    plants: Plant[] | null
}