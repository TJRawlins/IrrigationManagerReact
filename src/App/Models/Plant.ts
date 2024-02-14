export class Plant {
  id!: number;
  type!: string;
  name!: string;
  galsPerWk!: number;
  quantity!: number;
  emittersPerPlant!: number;
  emitterGPH!: number;
  timeStamp!: Date | null;
  zoneId!: number;
}
