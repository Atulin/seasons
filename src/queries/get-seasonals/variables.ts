export interface Variables {
    season: Season,
    year: number,
    page: number,
    perPage: number
}

export type Season = 'SUMMER'|'FALL'|'WINTER'|'SPRING';
