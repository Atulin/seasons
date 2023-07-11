export interface QueryResult {
  data: Data
}

export interface Data {
  Page: Page
}

export interface Page {
  pageInfo: PageInfo
  media: Medum[]
}

export interface PageInfo {
  currentPage: number
  hasNextPage: boolean
  total: number
  lastPage: number
}

export interface Medum {
  id: number
  title: Title
  siteUrl: string
  description?: string
  coverImage: CoverImage
  startDate: StartDate
  episodes: any
  duration?: number
  genres: string[]
  siteUrl: string
  studios: Studios
}

export interface Title {
  english: string | null
  native: string
  romaji: string
}

export interface CoverImage {
  large: string
}

export interface StartDate {
  day: number
  month: number
  year: number
}

export interface Studios {
  nodes: Node[]
}

export interface Node {
  name: string,
  siteUrl: string
}
