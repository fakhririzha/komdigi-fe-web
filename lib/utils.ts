import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/id"

dayjs.extend(relativeTime)
dayjs.locale("id")

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const timeAgo = (date: Date | string | number) => {
  const d = typeof date === "number" ? dayjs.unix(date) : dayjs(date)
  return d.fromNow(true) + " yang lalu."
}

export function intToDate(dateInt: number): Date {
  const str = dateInt.toString()

  if (str.length === 8) {
    const year = str.slice(0, 4)
    const month = str.slice(4, 6)
    const day = str.slice(6, 8)

    return new Date(Number(year), Number(month) - 1, Number(day))
  }

  if (str.length === 10) return new Date(dateInt * 1000)
  if (str.length === 13) return new Date(dateInt)

  return new Date(NaN)
}

export const formatDate = (date: Date | string | null | number): string => {
  if (!date) return "-"
  // Accepts date as unix seconds, string (ISO or other), or Date object
  const d =
    typeof date === "number"
      ? dayjs.unix(date)
      : typeof date === "string"
        ? dayjs(date)
        : dayjs(date)
  return d.format("DD MMM YYYY")
}

export const formatDateTime = (date: number | string | null): string => {
  if (!date) return "-"
  const d = typeof date === "number" ? dayjs.unix(date) : dayjs(date)
  return d.format("DD MMM YYYY HH:mm:ss")
}

export const formatCoordinates = (
  lat: number | null,
  lng: number | null
): string => {
  if (lat === null || lng === null) return "-"
  return `${lat}, ${lng}`
}

export const isPdfFile = (fileName: string): boolean => {
  const ext = fileName.toLowerCase().split(".").pop()
  return ext === "pdf"
}

export const isImageFile = (fileName: string): boolean => {
  const ext = fileName.toLowerCase().split(".").pop()
  return ["jpg", "jpeg", "png", "gif", "webp", "bmp"].includes(ext || "")
}
