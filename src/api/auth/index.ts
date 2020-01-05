import getConfig from 'next/config';
import axios, { basicAuthOption, isInvalidError, setToken } from '..';
import primaryAxios, { AxiosResponse } from 'axios';
import qs from 'querystring';
import cookieUtil, { COOKIE_KEYS } from '../../lib/cookies';

const { publicRuntimeConfig } = getConfig();

export interface ISignUpForm {
  username: string;
  password: string;
}

export const signUp = (signUpForm: ISignUpForm) => {
  return axios.post('/uua/user', signUpForm);
};

export interface ILoginForm {
  username: string;
  password: string;
}
export interface IAuthResponse {
  access_token: string
  refresh_token: string
}

export interface IRefreshTokenForm {
  refresh_token: string;
}

export interface ICheckTokenForm {
  token: string;
}

export interface IDecodedToken {
  user_name: string;
  authorities: string[];
  id: number;
}

export const login = async (loginForm: ILoginForm): Promise<IAuthResponse> => {
  let response: AxiosResponse<IAuthResponse> = await axios.post('/uua/oauth/token', qs.stringify({
    ...loginForm,
    grant_type: 'password'
  }), basicAuthOption);

  return response.data;
};

export const refresh = (refreshTokenForm: IRefreshTokenForm): Promise<AxiosResponse<IAuthResponse>> => {
  return primaryAxios.post('/uua/oauth/token', {
    ...refreshTokenForm,
    grant_type: 'refresh_token'
  }, basicAuthOption);
};

export const checkToken = async (checkTokenForm: ICheckTokenForm): Promise<IDecodedToken> => {
  let response: AxiosResponse<IDecodedToken> = null;
  try {
    response = await primaryAxios.post(`${publicRuntimeConfig.serverUrl}/uua/oauth/check_token`, qs.stringify({
      ...checkTokenForm
    }), basicAuthOption);

  } catch (error) {
    const status = error.status || (error.response ? error.response.status : null);
    const data = error.response ? error.response.data : null;
    const refreshToken = cookieUtil.get(COOKIE_KEYS.REFRESH_TOKEN);
    setToken(null);
    if (isInvalidError(status, data) && refreshToken) {
      const authResponse: AxiosResponse<IAuthResponse> = await refresh({
        refresh_token: refreshToken
      })

      let tokens: IAuthResponse = authResponse.data;
      cookieUtil.set(COOKIE_KEYS.ACCESS_TOKEN, tokens.access_token);
      cookieUtil.set(COOKIE_KEYS.REFRESH_TOKEN, tokens.refresh_token);
      setToken(tokens.access_token);


      response = await primaryAxios.post(`${publicRuntimeConfig.serverUrl}/uua/oauth/check_token`, qs.stringify({
        token: tokens.access_token
      }), basicAuthOption);
    }
  }
  return response.data;
};