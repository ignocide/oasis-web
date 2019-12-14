import PlaylistStore from './playlistStore';

let playlistStore: any= null;
beforeAll(() => {
  playlistStore = new PlaylistStore(false);
});

describe('playlistStore', () => {
  test('constructor', () => {
    expect(playlistStore.playlist).toEqual(null);
  });
});
