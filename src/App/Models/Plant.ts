export interface Plant {
  id: number;
  type: string;
  name: string;
  galsPerWk: number;
  quantity: number;
  emittersPerPlant: number;
  emitterGPH: number;
  timeStamp: Date;
  zoneId: number;
}
