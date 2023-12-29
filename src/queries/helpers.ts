import type { StartDate } from "@/queries/get-seasonals/query-result";
import type { Season } from '@/queries/common-types';

export const startDateFormat = (date: StartDate): string => {
  const day = date.day?.toString().padStart(2, '0') ?? '??';
  const month = date.month?.toString().padStart(2, '0') ?? '??';
  const year = date.year?.toString() ?? '????';

  return `${day}.${month}.${year}`;
}

export const monthToSeason = (month: number): Season => {
  if ([12,  1,  2].includes(month)) return 'WINTER';
  if ([ 3,  4,  5].includes(month)) return 'SPRING';
  if ([ 6,  7,  8].includes(month)) return 'SUMMER';
  if ([ 9, 10, 11].includes(month)) return 'FALL';
  return 'WINTER';
}
