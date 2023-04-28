import { IRssFeed, IRssFeedNotify } from './@types/Feed';
export declare class RssFeedNotify {
    private readonly userAgent;
    private readonly skipFirstLoad;
    list: IRssFeed[];
    constructor({ userAgent, skipFirstLoad }: IRssFeedNotify);
    add(...data: IRssFeed[]): void;
    remove(name: string): void;
    info(): {
        userAgent: string;
        skipFirstLoad: boolean;
    };
}
