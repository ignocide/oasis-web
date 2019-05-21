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

  set(key: COOKIE_KEYS, value): void {
    const _key: any = key;

    console.log("여기까진 오겠지?",typeof window)
    if (this.isServer()) {
      console.log("여기까진 오겠지?")
      if (!this.ctx) {
        throw new Error("has no ctx");
        return;
      }
      console.log("여기까진 오겠지?")
      Nookies.set(this.ctx, _key, value, this.defaultNookieOptions);
    }
    else {
      console.log("이게 펄스임?")
      Cookies.set(_key, value, this.defaultCookieOptions);
    }
  }

  get(key: COOKIE_KEYS): any {
    const _key: any = key;
    if (this.isServer()) {
      if (!this.ctx) {
        throw new Error("has no ctx");
        return null;
      }
      let cookies = Nookies.get(this.ctx) || {};
      return cookies[_key] || null;
    }
    else {
      return Cookies.get(_key);
    }
  }

  destroy(key: COOKIE_KEYS): void {
    if (!this.ctx) {
      throw new Error("has no ctx");
      return;
    }
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