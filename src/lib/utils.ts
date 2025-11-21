import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// <CHANGE> Add AD to BS (Bikram Sambat) date conversion function
export function convertADtoBS(adDate: string | Date): string {
  const date = typeof adDate === "string" ? new Date(adDate) : adDate;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // AD to BS conversion formula
  let bsYear = year + 56;
  let bsMonth = month + 9;
  const bsDay = day - 16;

  if (bsMonth > 12) {
    bsMonth -= 12;
    bsYear += 1;
  }

  return `${bsYear}-${String(bsMonth).padStart(2, "0")}-${String(
    bsDay
  ).padStart(2, "0")}`;
}

// <CHANGE> Add BS to AD (Gregorian) date conversion function
export function convertBStoAD(bsDate: string): string {
  const [year, month, day] = bsDate.split("-").map(Number);

  const adYear = year + 56;
  let adMonth = month - 4;
  const adDay = day;

  if (adMonth <= 0) {
    adMonth += 12;
  }

  const date = new Date(adYear, adMonth - 1, adDay);
  return date.toISOString().split("T")[0];
}

// <CHANGE> Get today's date in BS format
export function getTodayInBS(): string {
  return convertADtoBS(new Date());
}
