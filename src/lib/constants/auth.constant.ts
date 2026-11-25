import type { PortalRole } from "@/data/api/types/base.type";

export const PORTAL_ROLE_HEADER = "x-portal-role";
export const PROTOTYPE_USER_ID_HEADER = "x-user-id";

export const PROTOTYPE_USER_IDS: Record<PortalRole, string> = {
  farmer: process.env.NEXT_PUBLIC_HOME_FARM_FARMER_ID ?? "user-farmer",
  admin: process.env.NEXT_PUBLIC_HOME_FARM_ADMIN_ID ?? "user-admin"
};
