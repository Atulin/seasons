export interface QueryResult {
    data: Data;
}

export interface Data {
    Page: Page;
}

export interface Page {
    media: Media[];
}

export interface Media {
    startDate: StartDate;
    title: Title;
}

export interface Title {
    romaji: string;
    english?: string;
}

export interface StartDate {
    year: number;
    month?: number;
    day?: number;
}
