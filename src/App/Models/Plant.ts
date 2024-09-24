export class Plant {
  id: number = 0;
  type: string = "";
  name: string = "";
  galsPerWk: number = 0;
  quantity: number = 0;
  emittersPerPlant: number = 0;
  emitterGPH: number = 0;
  timeStamp: Date | null = null;
  imagePath: string = "";
  age: number = 0;
  hardinessZone: number = 1;
  harvestMonth: string = "";
  exposure: string = "";
  notes: string = "";
  zoneId: number = 0;
}
