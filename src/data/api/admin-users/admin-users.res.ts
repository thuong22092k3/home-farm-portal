import type { ApiEntity } from "../types/base.type";

export type AdminUserRES = ApiEntity & {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  permissions?: string[];
};

export type AdminUsersRES = AdminUserRES[];
