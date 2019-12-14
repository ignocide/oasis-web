/* global gapi */

import Nookies from 'nookies';
import Cookies from 'js-cookie';

export enum COOKIE_KEYS {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token'
}

class CookieUtil {
  ctx: any;
  defaultCookieOptions: any = {
    maxAge: 30 * 24 * 60 * 60,
    expires: 30,
    path: '/',
  };
  defaultNookieOptions: any = {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  };
  static keys = COOKIE_KEYS;

  isServer(): boolean {
    return typeof window === 'undefined';
  }

  setCtx(ctx: any) {
    this.ctx = ctx;
  }

  set(key: COOKIE_KEYS, value: any): void {
    const _key: any = key;

    if (this.isServer()) {
      if (!this.ctx) {
        return;
      }
      Nookies.set(this.ctx, _key, value, this.defaultNookieOptions);
    }
    else {
      Cookies.set(_key, value, this.defaultCookieOptions);
    }
  }

  get(key: COOKIE_KEYS): any {
    const _key: any = key;
    if (this.isServer()) {
      if (!this.ctx) {
        return null;
      }
      const cookies = Nookies.get(this.ctx) || {};
      return cookies[_key] || null;
    }
    else {
      return Cookies.get(_key);
    }
  }

  destroy(key: COOKIE_KEYS): void {
    // console.log(this.ctx,this.isServer())
    // if (!this.ctx) {
    //   return;
    // }
    const _key: any = key;
    if (this.isServer()) {
      Nookies.destroy(this.ctx, _key, {});
    }
    else {
      Cookies.remove(_key);
    }
  }
}

const cookieUtil = new CookieUtil();
export default cookieUtil;