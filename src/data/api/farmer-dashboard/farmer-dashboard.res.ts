import type { ApiEntity } from "../types/base.type";

export type FarmerDashboardRES = {
  metrics: Record<string, number>;
  latestReading?: ApiEntity;
  upcomingHarvests: ApiEntity[];
  tasks: ApiEntity[]
};
