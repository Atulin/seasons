export interface QueryResult {
   data: Data;
}

export interface Data {
   Media: Medum;
}

export interface Medum {
   characters: Characters;
}

export interface Characters {
   nodes: Character[];
}

export interface Character {
   id: number;
   image: Image;
   name: Name;
   siteUrl: string;
}

export interface Image {
   medium: string;
   large: string;
}

export interface Name {
   first: string;
   middle: any;
   last: string;
   full: string;
   native: string;
}
