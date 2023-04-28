"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RssFeedNotify = void 0;
const crypto_1 = require("crypto");
const DEFAULT_AU = "Chrome/112.0.5615.138 RssFeedNotify/0.0.4";
class RssFeedNotify {
    constructor({ userAgent, skipFirstLoad }) {
        this.list = [];
        this.userAgent = userAgent || DEFAULT_AU;
        this.skipFirstLoad = skipFirstLoad || false;
    }
    add(...data) {
        for (const feed of data) {
            if (this.list.some(f => f.name.toLowerCase() === feed.name.toLowerCase())) {
                throw new Error(`Feed with same name ${feed.name} already exists. Skipping...`);
            }
            feed.id = (0, crypto_1.randomUUID)();
            this.list.push(feed);
        }
    }
    remove(name) {
        if (name === undefined || name === null) {
            throw new Error('To remove, select a feed by name');
        }
        const newList = this.list.filter((feed) => feed.name.toLowerCase() !== name.toLowerCase());
        if (this.list.length === newList.length) {
            throw new Error(`No Feed with name ${name} was found`);
        }
        this.list = newList;
    }
    info() {
        return {
            userAgent: this.userAgent,
            skipFirstLoad: this.skipFirstLoad
        };
    }
}
exports.RssFeedNotify = RssFeedNotify;
