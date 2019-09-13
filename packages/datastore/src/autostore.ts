import { Query } from '@progresskinvey/js-sdk-query';
import { Aggregation } from '@progresskinvey/js-sdk-aggregation';
import { DataStoreCache } from './cache';
import { DataStoreNetwork } from './network';
import { DataStore } from './datastore';

export class AutoStore<T> extends DataStore<T> {
  constructor(collectionName: string, options: any = { tag: undefined, useDeltaSet: false, useAutoPagination: false }) {
    super(collectionName);
  }

  async find(query?: Query, options: any = {}) {
    const cache = new DataStoreCache(this.collectionName, this.tag);

    if (query && !(query instanceof Query)) {
      throw new KinveyError('query is not an instance of the Query class.');
    }

    try {
      await this.pull(query, options);
      return cache.find(query);
    } catch (error) {
      if (error instanceof NetworkError) {
        return cache.find(query);
      }

      throw error;
    }
  }

  async count(query?: Query, options: any = {}) {
    if (query && !(query instanceof Query)) {
      throw new KinveyError('query is not an instance of the Query class.');
    }

    try {
      const network = new NetworkStore(this.collectionName);
      const count = await network.count(query, options).toPromise();
      return count;
    } catch (error) {
      if (error instanceof NetworkError) {
        const cache = new DataStoreCache(this.collectionName, this.tag);
        return cache.count(query);
      }

      throw error;
    }
  }

  async group(aggregation: Aggregation, options: any = {}) {
    if (!(aggregation instanceof Query)) {
      throw new KinveyError('aggregation is not an instance of the Aggregation class.');
    }

    try {
      const network = new NetworkStore(this.collectionName);
      const result = await network.group(aggregation, options).toPromise();
      return result;
    } catch (error) {
      if (error instanceof NetworkError) {
        const cache = new DataStoreCache(this.collectionName, this.tag);
        return cache.group(aggregation);
      }

      throw error;
    }
  }

  async findById(id: string, options: any = {}) {
    const cache = new DataStoreCache(this.collectionName, this.tag);

    try {
      const doc = await this.pullById(id, options);
      return doc;
    } catch (error) {
      if (error instanceof NetworkError) {
        return cache.findById(id);
      }

      throw error;
    }
  }
}
