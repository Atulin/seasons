export interface QueryResult {
   data: Data;
}

export interface Data {
   Page: Page;
}

export interface Page {
   media: Medum[];
}

export interface Medum {
   id: number;
   title: Title;
}

export interface Title {
   romaji: string;
}
