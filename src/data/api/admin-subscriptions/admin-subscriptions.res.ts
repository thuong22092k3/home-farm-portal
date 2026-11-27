import type { ApiEntity } from "../types/base.type";

export type SubscriptionPlanRES = ApiEntity & {
  id: string;
  name: string;
  type: string;
  durationMonths: number;
  priceMultiplier: number;
  status?: string;
  minimumYieldKg?: number;
  includesCertificate?: boolean;
  includesFarmVisit?: boolean;
};

export type AdminSubscriptionsRES = SubscriptionPlanRES[];
