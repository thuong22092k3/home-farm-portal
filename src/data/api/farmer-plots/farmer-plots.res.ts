import type { ApiEntity } from "../types/base.type";

export type FarmerPlotRES = ApiEntity & {
  id: string;
  farmId: string;
  cropType: string;
  season: string;
  price: number;
  status: string;
  expectedHarvestAt?: string;
};

export type FarmerPlotsRES = FarmerPlotRES[];
