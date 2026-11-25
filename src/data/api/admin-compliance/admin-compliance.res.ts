import type { ApiEntity } from "../types/base.type";

export type AdminComplianceRES = {
  qualityChecks: ApiEntity[];
  certifications: ApiEntity[];
  heldHarvests: ApiEntity[]
};
