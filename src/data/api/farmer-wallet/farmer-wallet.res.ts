import type { ApiEntity } from "../types/base.type";

export type FarmerWalletRES = {
  balance: number;
  entries: ApiEntity[];
  payouts: ApiEntity[]
};
