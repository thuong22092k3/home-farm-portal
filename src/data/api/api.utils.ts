import type { ApiEntity } from "@/data/api/types/base.type";

export function apiEntities(value:unknown):ApiEntity[]{
  if(Array.isArray(value)) return value.filter((item):item is ApiEntity=>Boolean(item)&&typeof item==="object");
  if(!value||typeof value!=="object") return [];
  return Object.values(value).flatMap((item)=>Array.isArray(item)?item:[]).filter((item):item is ApiEntity=>Boolean(item)&&typeof item==="object");
}
export function apiNumber(value:unknown){const number=Number(value??0);return Number.isFinite(number)?number:0;}
export function formatMoney(value:unknown){return new Intl.NumberFormat("vi-VN",{notation:"compact",maximumFractionDigits:1}).format(apiNumber(value))+"đ";}
export function formatDate(value:unknown){if(!value)return "Chưa cập nhật";const date=new Date(String(value));return Number.isNaN(date.getTime())?String(value):new Intl.DateTimeFormat("vi-VN").format(date);}
export function text(value:unknown,fallback="—"){return value===undefined||value===null||value===""?fallback:String(value);}
