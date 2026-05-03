import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format an ISO date string (YYYY-MM-DD) to a readable date string.
 * This is deterministic and works consistently on both server and client.
 * Uses DD/MM/YYYY format for consistency.
 */
export function formatDateString(isoDate: string): string {
  try {
    // Parse YYYY-MM-DD format
    const [year, month, day] = isoDate.split('-')
    if (!year || !month || !day) {
      return isoDate
    }
    // Return as DD/MM/YYYY for consistency
    return `${day}/${month}/${year}`
  } catch {
    return isoDate
  }
}
