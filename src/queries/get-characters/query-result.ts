export interface QueryResult {
   data: Data;
}

export interface Data {
   Media: Medum;
}

export interface Medum {
   characters: Characters;
   episodes: number;
   /**
    * Episode length in minutes
    */
   duration: number;
   nextAiringEpisode: AiringEpisode | null;
   title: Title;
}

export interface Title {
   romaji: string
}


export interface AiringEpisode {
   /**
    * Seconds until next episode
    */
   timeUntilAiring: number;
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
