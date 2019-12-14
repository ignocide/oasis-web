import { useStaticRendering } from 'mobx-react';

import AuthStore from './auth';
import AppStore from './common/appStore';
import ToastrStore from './common/toastrStore';


const isServer = typeof window === 'undefined';
useStaticRendering(isServer);


const storeClasses: any = {
  auth: AuthStore,
  appStore: AppStore,
  toastrStore: ToastrStore,
};

const storeInstances: any = {};

function getStoreClass(key: string) {
  return storeClasses[key];
}

export function getStore(key: string) {
  return storeInstances[key] || null;
}

export function initializeStore(key: string, initialData: any = {}) {
  // Always make a new store if server, otherwise state is shared between requests
  const storeClass = getStoreClass(key);
  let store = getStore(key);
  if (!storeClass) {
    return null;
  }

  if (isServer) {
    store = new storeClass(isServer, initialData);
    storeInstances[key] = store;
  }
  if (!storeInstances[key]) {
    store = new storeClass(isServer, initialData);
    storeInstances[key] = store;
  }
  return store;
}

export function initializeStores(storeInitialValues: any = {}): any {
  Object.keys(storeClasses).forEach(key => {
    initializeStore(key, storeInitialValues[key] || {});
  });

  return getStores();
}

export function insertStores(stores: any = {}): any {
  Object.keys(stores).forEach((key) => {
    const storeClass = stores[key];
    let store = null;
    if (isServer) {
      // @ts-ignore
      store = new storeClass(isServer, {});
      storeInstances[key] = store;
    }
    if (!storeInstances[key]) {
      // @ts-ignore
      store = new storeClass(isServer, {});
      storeInstances[key] = store;
    }
    storeClasses[key] = stores[key];
  });

  return getStores();
}

export function insertClasses(stores: any = {}): any {
  Object.keys(stores).forEach((key) => {
    storeClasses[key] = stores[key];
  });
}

export function setStore(key: string, storeClass: { new(...args: any[]): any }): any {
  // Always make a new store if server, otherwise state is shared between requests
  let store = null;
  if (isServer) {
    store = new storeClass(isServer, {});
    storeInstances[key] = store;
  }
  if (!storeInstances[key]) {
    store = new storeClass(isServer, {});
    storeInstances[key] = store;
  }
  return store;
}


export function getStores() {
  return storeInstances;
}