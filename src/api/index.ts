import getConfig from 'next/config';
import axios from 'axios';
import cookieUtil, { COOKIE_KEYS } from '../lib/cookies';
import qs from 'querystring';

const { publicRuntimeConfig } = getConfig();

// interface ITokenResponseForm {
//   access_token: string
//   token_type: string
//   refresh_token: string
//   expires_in: number
//   scope: string
//   id: number
//   jti: number
// }

export const basicAuthOption = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    Authorization: `Basic ${publicRuntimeConfig.basicToken}`
  }
};


const instance = axios.create({
  baseURL: publicRuntimeConfig.serverUrl,
  headers: {
    common: { ...basicAuthOption.headers }
  }
});


export const isInvalidError = function (statusCode: any, e: any) {
  return statusCode === 400 && e.error === 'invalid_token' && e.error_description === 'Token has expired';
};

instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const status = error.status || (error.response ? error.response.status : null);
    const data = error.response ? error.response.data : null;
    const config = error.config;
    if (isInvalidError(status, data)) {
      const refreshToken = cookieUtil.get(COOKIE_KEYS.REFRESH_TOKEN);
      return axios.post('/uua/oauth/token', qs.stringify({
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      }), basicAuthOption).then((response: any) => {
        const { access_token, refresh_token } = response.data;
        setToken(access_token);
        config.headers.Authorization = `Bearer ${access_token}`;
        cookieUtil.set(COOKIE_KEYS.ACCESS_TOKEN, access_token);
        cookieUtil.set(COOKIE_KEYS.REFRESH_TOKEN, refresh_token);
        return instance.request(config);
      });
    }
    else {
      const err = { status, data };
      return Promise.reject(err);
    }
  },
);

export const setToken = (accessToken?: string) => {
  if (accessToken) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }
  else {
    instance.defaults.headers.common['Authorization'] = `Basic ${publicRuntimeConfig.basicToken}`;
  }
};

const urlReg = new RegExp('(:.+?((?=\\/)|$))', 'g');

export const urlBuilder = function (url: string, params: any = {}) {
  const matches = url.match(urlReg);
  if (matches) {
    for (const match of matches) {
      const key = match.replace(':', '');
      const value = params[key];
      if (value) {
        url = url.replace(match, value);
      }
    }
  }

  return url;
};

export default instance;