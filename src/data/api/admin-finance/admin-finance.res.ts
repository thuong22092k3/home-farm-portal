import type { ApiEntity } from "../types/base.type";

export type AdminFinanceRES = {
  payments: ApiEntity[];
  payouts: ApiEntity[];
  gmv: number;
  platformRevenue: number;
  pendingPayoutAmount: number
};
