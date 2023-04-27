export interface IRssFeed {
  id?: string
  name: string
  url: string | string[]
  refresh: number
  notifyOn: 'email'
}

export interface IRssFeedNotify {
  userAgent?: string
  skipFirstLoad?: boolean
}