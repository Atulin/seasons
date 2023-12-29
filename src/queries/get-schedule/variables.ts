import type { Season } from '@/queries/common-types';

export interface Variables {
    season: Season,
    year: number,
    page: number,
    perPage: number
}
