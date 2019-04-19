import * as Koa from 'koa';
import * as next from 'next';
import * as Router from 'koa-router';
import { IncomingMessage } from 'http';
import * as bodyParser from 'koa-bodyparser';

type Req = IncomingMessage & {
  session: any;
}
const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  // server.keys = ['key', 'keySid'];

  // server.use(session({
  //   store: redisStore({
  //     // Options specified here
  //   })
  // }));

  router.get('/woofer/playlists/:playlistId', async ctx => {
    await app.render(ctx.req, ctx.res, '/woofer/playlists', ctx.params);
  });

  // router.get('/p/:id', async ctx => {
  //   const { req, res } = ctx;
  //   const queryParams = { title: ctx.params.id }
  //   await app.render(ctx.req, ctx.res, '/post', queryParams)
  // })
  // router.get('/p/:id', (req, res) => {
  //   const actualPage = '/post'
  //   const queryParams = { title: req.params.id }
  //   app.render(req, res, actualPage, queryParams)
  // })

  // router.post('/api/login', async ctx => {
  //   const { body } = ctx.request;
  //   const { req, res, session } = ctx;

  //   if (!body) return res.status = 400;

  //   const { token } = body

  //   const decodedToken = await firebase.auth().verifyIdToken(token)

  //   session.user = decodedToken;
  //   session.token = token;

  //   res.body = decodedToken;
  // })

  // router.post('/api/logout', async ctx => {
  //   const { req, res, session } = ctx;

  //   delete session.user

  //   res.statusCode = 200;
  //   res.body = 'OK'
  // })

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });


  server.use(async (ctx, next) => {
    //@ts-ignore
    ctx.req.session = ctx.session;
    await next();
  });

  server.use(async (ctx, next) => {
    const { req, res, session } = ctx;

    ctx.res.statusCode = 200;
    await next();
  });


  server.use(bodyParser());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
}).catch(console.error);