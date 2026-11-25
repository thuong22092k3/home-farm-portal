import type { ApiEntity } from "../types/base.type";

export type FarmerHarvestsRES = {
  harvests: ApiEntity[];
  qualityChecks: ApiEntity[];
  upcomingPlots: ApiEntity[]
};
