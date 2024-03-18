import type { MediaFormat } from '@/queries/common-types';

export interface QueryResult {
    data: Data;
}

export interface Data {
    Page: Page;
}

export interface Page {
    pageInfo: PageInfo;
    media: Medum[];
}

export interface Medum {
    id: number,
    title: Title;
    startDate: StartDate;
    nextAiringEpisode: NextAiringEpisode | null;
    coverImage: CoverImage;
    duration: number | null;
    siteUrl: string;
    format?: MediaFormat;
}

export interface CoverImage {
    color: null | string;
    medium: string;
}

export interface NextAiringEpisode {
    airingAt: number;
    episode: number;
    timeUntilAiring: number;
}

export interface StartDate {
    day: number | null;
    month: number | null;
    year: number;
}

export interface Title {
    english: null | string;
    romaji: string;
}

export interface PageInfo {
    currentPage: number;
    hasNextPage: boolean;
    total: number;
    lastPage: number;
}
