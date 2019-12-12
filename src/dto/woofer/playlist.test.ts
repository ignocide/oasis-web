import Playlist from './playlist';

describe('vo/woofer/Playlist', () => {
  test('constructor', () => {
    let mock = {
      id: 7,
      name: '추가된 플레이리스트',
      isDefault: true,
      createdAt: "2019-04-16T08:08:43.000Z",
      updatedAt: "2019-04-16T08:08:43.000Z",
    };
    let playlist = new Playlist(mock);

    expect(playlist.id).toEqual(mock.id);
    expect(playlist.name).toEqual(mock.name);
    expect(playlist.createdAt).toEqual(new Date(mock.createdAt));
    expect(playlist.updatedAt).toEqual(new Date(mock.updatedAt));
  });

  test('constructor2', () => {
    let mock = {
      id: 7,
      name: '추가된 플레이리스트',
      isDefault: true,
    };
    let playlist = new Playlist(mock);

    expect(playlist.id).toEqual(mock.id);
    expect(playlist.name).toEqual(mock.name);
    expect(playlist.createdAt).toBeNull();
    expect(playlist.updatedAt).toBeNull();
  });
});