import type { ApiEntity } from "../types/base.type";

export type AdminDashboardRES = {
  metrics: Record<string, number>;
  priorities: ApiEntity[]
};
