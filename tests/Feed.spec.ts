import { beforeEach, describe, expect, it } from 'vitest'
import { RssFeedNotify } from '../src/Feed'
import { IRssFeed } from '../src/@types/Feed'

describe('Feed test', () => {
  let sut: RssFeedNotify
  
  beforeEach(() => {
    sut = new RssFeedNotify({
      userAgent: 'Chrome RssFeedNotify/0.0.4'
    })
  })
  
  it('Should be possible create a feed', () => {
    sut.add({
      name: 'Nintendo',
      url: 'https://www.nintendo.com',
      refresh: 6000,
      notifyOn: 'email'
    }, {
      name: 'Xbox',
      url: 'https://www.xbox.com',
      refresh: 6000,
      notifyOn: 'email'
    })

    expect(sut.list).toHaveLength(2)

    expect(sut.list).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          name: 'Nintendo',
          url: 'https://www.nintendo.com',
          refresh: 6000,
          notifyOn: 'email'
        }, {
          id: expect.any(String),
          name: 'Xbox',
          url: 'https://www.xbox.com',
          refresh: 6000,
          notifyOn: 'email'
        }
      ])
    )
  })
  
  it('should throw an error when trying to add a feed with the same name', () => {
    sut.add({
      name: 'Nintendo',
      url: 'https://www.nintendo.com',
      refresh: 6000,
      notifyOn: 'email'
    })

    expect(() => sut.add({
      name: 'Nintendo',
      url: 'https://www.xbox.com',
      refresh: 6000,
      notifyOn: 'email'
    })).toThrowError('Feed with same name Nintendo already exists. Skipping...')
  })
  
  it('Should be possible list a feed', () => {
    const feed: IRssFeed = {
      name: 'Nintendo',
      url: 'https://www.nintendo.com',
      refresh: 6000,
      notifyOn: 'email'
    }
    
    sut.add(feed)

    expect(sut.list).toHaveLength(1)

    expect(sut.list).toEqual(
      expect.arrayContaining([{
        id: expect.any(String),
        ...feed
      }])
    )
  })
  
  it('Should be possible remove a feed by name', () => {
    const feed: IRssFeed = {
      name: 'Nintendo',
      url: 'https://www.nintendo.com',
      refresh: 6000,
      notifyOn: 'email'
    }
    
    sut.add(feed)
    sut.remove('nintendo')
    
    expect(sut.list).toHaveLength(0)
    
    sut.add(feed)
    sut.remove('NINTENDO')
    
    expect(sut.list).toHaveLength(0)
  })
  
  it('Removing a nonexistent feed should throw an error', () => {
    const feed: IRssFeed = {
      name: 'Nintendo',
      url: 'https://www.nintendo.com',
      refresh: 6000,
      notifyOn: 'email'
    }
    
    sut.add(feed)
    
    // testing nonexistent feeds
    expect(() => sut.remove('Xbox')).toThrowError('No Feed with name Xbox was found')
    expect(() => sut.remove('')).toThrowError('No Feed with name  was found')
    
    // testing invalid feed names
    expect(() => sut.remove()).toThrowError('To remove, select a feed by name')

    // testing successful feed removal
    sut.remove('Nintendo')
    expect(sut.list).toHaveLength(0)
  })
})