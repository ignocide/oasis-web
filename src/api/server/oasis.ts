import axios from 'axios'
import cookieUtil, { COOKIE_KEYS } from "../../lib/cookies";
import qs from 'querystring';

interface ITokenResponseForm {
  access_token: string
  token_type: string
  refresh_token: string
  expires_in: number
  scope: string
  id: number
  jti: number
}

const instance = axios.create({
  baseURL: process.env.serverUrl
});

export const basicAuthOption = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    Authorization: `Basic ${process.env.basicToken}`
  }
}

export const isInvalidError = function (statusCode: any, e: any) {
  if (statusCode === 400 && e.error === 'invalid_token' && e.error_description === 'Token has expired') {
    return true
  }
  else {
    return false
  }
}
instance.interceptors.response.use(
  response => {
    return response.data
  },
  (error) => {
    const status = error.status || (error.response ? error.response.status : null);
    const data = error.response ? error.response.data : null;
    const config = error.config
    return new Promise((res, rej) => {
      if (isInvalidError(status, data)) {
        const refreshToken = cookieUtil.get(COOKIE_KEYS.REFRESH_TOKEN)
        instance.post('/uua/oauth/token', qs.stringify({
          refresh_token: refreshToken,
          grant_type: 'refresh_token'
        }), basicAuthOption).then((response: any) => {
          const { access_token, refresh_token } = response
          setToken(access_token)
          cookieUtil.set(COOKIE_KEYS.ACCESS_TOKEN, access_token);
          cookieUtil.set(COOKIE_KEYS.REFRESH_TOKEN, refresh_token);
          config.headers.Authorization = `Bearer ${access_token}`;
          return instance.request(config)
        })
      }
      else {
        const err = { status, data };
        return rej(err);
      }
    })
  },
);

export const setToken = (accessToken?: string) => {
  if (!!accessToken) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }
  else {
    instance.defaults.headers.common['Authorization'] = `Basic ${process.env.basicToken}`;
  }
};
const urlReg = new RegExp('(:.+?((?=\\/)|$))', 'g');

export const urlBuilder = function (url, params = {}) {
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

export default instance