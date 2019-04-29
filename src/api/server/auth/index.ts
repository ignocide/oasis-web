import getConfig from 'next/config';
import axios, { setToken, isInvalidError, basicAuthOption } from '../oasis'
import primaryAxios from 'axios'
import qs from 'querystring'
import cookieUtil, { COOKIE_KEYS } from "../../../lib/cookies";
const { publicRuntimeConfig } = getConfig();

interface ISignUpForm {
  username: string,
  password: string
}

export const signUp = (signUpForm: ISignUpForm) => {
  return axios.post('/uua/user', signUpForm)
}

interface ILoginForm {
  username: string,
  password: string
}

export const login = (loginForm: ILoginForm) => {
  return axios.post('/uua/oauth/token', qs.stringify({
    ...loginForm,
    grant_type: 'password'
  }), basicAuthOption)
}

interface IRefreshTokenForm {
  refresh_token: string
}

export const refresh = (refreshTokenForm: IRefreshTokenForm) => {
  return primaryAxios.post('/uua/oauth/token', {
    ...refreshTokenForm,
    grant_type: 'refresh_token'
  }, basicAuthOption)
}

interface ICheckTokenForm {
  token: string
}

export const checkToken = (checkTokenForm: ICheckTokenForm) => {
  return primaryAxios.post(`${publicRuntimeConfig.serverUrl}/uua/oauth/check_token`, qs.stringify({
    ...checkTokenForm
  }), basicAuthOption).then(response => {
    return response.data
  }).catch((error) => {
    const status = error.status || (error.response ? error.response.status : null);
    const data = error.response ? error.response.data : null;
    const config = error.config
    if (isInvalidError(status, data)) {
      const refreshToken = cookieUtil.get(COOKIE_KEYS.REFRESH_TOKEN)
      return this.refresh({ refresh_token: refreshToken }).then((response) => {
        const { access_token, refresh_token } = response
        setToken(access_token)
        cookieUtil.set(COOKIE_KEYS.ACCESS_TOKEN, access_token);
        cookieUtil.set(COOKIE_KEYS.REFRESH_TOKEN, refresh_token);
        return primaryAxios.post(`${publicRuntimeConfig.serverUrl}/uua/oauth/check_token`, qs.stringify({
          ...checkTokenForm
        }), basicAuthOption)
      })
    }
    else {
      const err = { status, data };
      return Promise.reject(err);
    }
  })
}