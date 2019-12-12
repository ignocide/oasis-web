import oasis, { basicAuthOption, isInvalidError, setToken, urlBuilder } from './oasis';
import { AxiosInstance } from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig: config } = getConfig();

let instance: AxiosInstance = null;
beforeAll(() => {
  instance = oasis;
});

describe('api/oasis', () => {
  test('instance', () => {
    expect(instance.defaults.baseURL).toEqual(config.serverUrl);
    expect(instance.defaults.headers.common).toEqual(basicAuthOption.headers);
  });

  test('basicAuthOption', () => {
    expect(basicAuthOption).toHaveProperty('headers');
    expect(basicAuthOption.headers).toHaveProperty('Accept');
    expect(basicAuthOption.headers).toHaveProperty('Authorization');
    expect(basicAuthOption.headers).toHaveProperty('Content-Type');
  });

  test('isInvalidError', () => {
    let mock = {
      statusCode: 400,
      error: 'invalid_token',
      error_description: 'Token has expired'
    };

    expect(isInvalidError(400, mock)).toBe(true);
  });

  test('setToken', () => {
    const accessToken = 'access_token';

    setToken(accessToken);

    expect(instance.defaults.headers.common.Authorization).toEqual(`Bearer ${accessToken}`);

    setToken();

    expect(instance.defaults.headers.common.Authorization).toEqual(`Basic ${config.basicToken}`);

  });

  test('urlBuilder',() => {
    expect(urlBuilder('/users/:userId/items/:itemId',{
      userId: 1,
      itemId: 2,
    })).toEqual('/users/1/items/2')
  })
});