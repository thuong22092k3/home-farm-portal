import type { ApiEntity } from "../types/base.type";

export type AdminSettingsRES = ApiEntity & {
  platformFeePercent: number;
  payoutCycle: string;
  diaryUpdatesPerWeek: number;
  iotTemperatureMax: number;
  iotSoilMoistureMin: number
};
