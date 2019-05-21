import cookies from './Cookies';
import { Context } from 'koa';
import { createMockContext } from '@shopify/jest-koa-mocks';

let ctx: Context;
beforeAll(() => {
  ctx = createMockContext();
});

describe('lib/cookies', () => {
  test('isServer()', () => {
    console.log("window", !!window, cookies.isServer());
    expect(cookies.isServer()).toEqual(false);
  });

  test('setCtx()', () => {
    cookies.setCtx(ctx);

    expect(cookies.ctx).toEqual(ctx);
  });

  test.todo('set()');
});