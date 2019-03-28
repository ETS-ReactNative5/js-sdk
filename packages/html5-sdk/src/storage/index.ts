import { KinveyError } from 'kinvey-js-sdk/lib/errors';
import * as IndexedDB from './indexeddb';
import * as LocalStorage from './localstorage';
import * as SessionStorage from './sessionstorage';
import * as WebSQL from './websql';
import { StorageAdapter } from 'kinvey-js-sdk/lib/storage';

export enum StorageProvider {
  IndexedDB = 'IndexedDB',
  LocalStorage = 'LocalStorage',
  SessionStorage = 'SessionStorage',
  WebSQL = 'WebSQL'
};

export function getStorageAdapter(storageProvider = StorageProvider.WebSQL): StorageAdapter {
  if (storageProvider === StorageProvider.IndexedDB) {
    return IndexedDB;
  } else if (storageProvider === StorageProvider.LocalStorage) {
    return LocalStorage;
  } else if (storageProvider === StorageProvider.SessionStorage) {
    return SessionStorage;
  } else if (storageProvider === StorageProvider.WebSQL) {
    return WebSQL;
  }

  throw new KinveyError('You must override the default cache store.');
}
