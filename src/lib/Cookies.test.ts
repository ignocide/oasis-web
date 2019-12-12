import cookies from './cookies';
import { Context } from 'koa';
import { createMockContext } from '@shopify/jest-koa-mocks';

let ctx: Context;
beforeAll(() => {
  ctx = createMockContext();
});

describe('lib/cookies', () => {
  test('isServer()', () => {
    //test is on server
    expect(cookies.isServer()).toEqual(true);
  });

  test('setCtx()', () => {
    cookies.setCtx(ctx);

    expect(cookies.ctx).toEqual(ctx);
  });

  test.todo('set()');
});