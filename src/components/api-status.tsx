import { CloudOff, CloudSun } from "lucide-react";

export function ApiStatus({ connected, error }: { connected: boolean; error?: string }) {
  return <div className={`mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[.13em] ${connected ? "text-[#47765a]" : "text-[#a76731]"}`}>{connected ? <CloudSun className="size-3.5" /> : <CloudOff className="size-3.5" />}{connected ? "Dữ liệu trực tiếp · home-farm-api" : `Đang dùng dữ liệu dự phòng${error ? ` · ${error}` : ""}`}</div>;
}
