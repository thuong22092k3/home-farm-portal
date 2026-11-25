import type { ApiEntity } from "../types/base.type";

export type FarmerReportsRES = {
  totalRevenue: number;
  actualYieldKg: number;
  diaryUpdates: number;
  completedOrders: number;
  plots: ApiEntity[]
};
