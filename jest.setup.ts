import { setConfig } from 'next/config';
// import {JSDOM} from 'jsdom';
//
// export interface Global {
//   document: Document;
//   window: Window;
//   fetch: GlobalFetch;
// }
//
// declare var global: Global;
//
// const documentHTML = '<!doctype html><html><body><div id="root"></div></body></html>';
// const { window }= new JSDOM(documentHTML);
// global.window = document.window;

const config = require('./config.json');

setConfig({
  publicRuntimeConfig: config
});
// Make sure you can use "publicRuntimeConfig" within tests.
module.exports = {
  globals: {
    'ts-jest': {
      'tsConfig': 'tsconfig.test.json',
      diagnostics: false
    }
  }
};