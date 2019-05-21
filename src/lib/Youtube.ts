import getConfig from 'next/config';
import * as gapi from 'gapi'
const { publicRuntimeConfig: config } = getConfig();

class Youtube {
  _gapi: gapi = null;
  lastQuery: string = null;
  nextToken: string = null;

  constructor() {

  }

  init() {
    if (typeof window !== 'undefined') {
      this._gapi = window.gapi;
      let initGapi: Function = () => {
        // 2. Initialize the JavaScript client library.
        this._gapi.client.init(config.woofer).then(() => {
          return this._gapi.client.load('youtube', 'v3');
        }, function (reason) {
          console.log('Error: ' + reason.result);
        });
      };

      // 1. Load the JavaScript client library.
      this._gapi.load('client', initGapi);
      console.log("!");
    }
  }

  searchList(query: string): Promise<any> {

    let opts: any = {
      q: query,
      part: 'snippet',
      type: 'video',
      beforeQuery: true,
      maxResults: 20,
      videoSyndicated: true,
      videoEmbeddable: true
    };

    if (query === this.lastQuery) {
      opts.pageToken = this.nextToken;
    }

    return new Promise((res, rej) => {
      this._gapi.client.youtube.search.list(opts).execute(function (response) {
        // nextToken: response.nextPageToken,
        //   list: response.items,
        let { nextPageToken, items } = response;
        this.nextToken = nextPageToken;
        res(items);
      });
    });
  }
}


export default new Youtube();