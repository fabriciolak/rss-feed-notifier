import { randomUUID } from 'crypto'
import { IRssFeed, IRssFeedNotify } from './@types/Feed'

const DEFAULT_AU = "Chrome/112.0.5615.138 RssFeedNotify/0.0.4"

export class RssFeedNotify {
  private readonly userAgent: string
  private readonly skipFirstLoad: boolean

  public list: IRssFeed[] = []

  constructor({ userAgent, skipFirstLoad }: IRssFeedNotify) {
    this.userAgent = userAgent || DEFAULT_AU
    this.skipFirstLoad = skipFirstLoad || false
  }

  add(...data: IRssFeed[]) {
    for (const feed of data) {
      if (this.list.some(f => f.name.toLowerCase() === feed.name.toLowerCase())) {
        throw new Error(`Feed with same name ${feed.name} already exists. Skipping...`)
      }

      feed.id = randomUUID()
      this.list.push(feed)
    }
  }

  remove(name: string) {
    if(name === undefined || name === null) {
      throw new Error('To remove, select a feed by name')
    }

    const newList = this.list.filter((feed) => feed.name.toLowerCase() !== name.toLowerCase())

    if (this.list.length === newList.length) {
      throw new Error(`No Feed with name ${name} was found`)
    }

    this.list = newList
  }
}