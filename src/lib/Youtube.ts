import getConfig from 'next/config';
import { gapi } from 'gapi';
import YoutubeVideo from "../vo/woofer/youtubeVideo";

const { publicRuntimeConfig: config } = getConfig();

class Youtube {
  _gapi: gapi = null;
  lastQuery: string = null;

  constructor() {

  }

  init() {
    if (typeof window !== 'undefined') {
      this._gapi = window.gapi;
      let initGapi = () => {
        // 2. Initialize the JavaScript client library.
        this._gapi.client.init(config.woofer).then((resp) => {
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

  searchList(query: string):Promise<any> {

    let opts: any = {
      q: query,
      part: 'snippet',
      type: 'video',
      beforeQuery: true,
      maxResults: 20
    };

    if (query === this.lastQuery) {
      opts.pageToken = this.nextToken;
    }

    return new Promise((res, rej) => {
      this._gapi.client.youtube.search.list(opts).execute(function (response) {
        // nextToken: response.nextPageToken,
        //   list: response.items,
        let { nextPageToken, items } = response;
        res(items);
      });
    });
  }
}


export default new Youtube();