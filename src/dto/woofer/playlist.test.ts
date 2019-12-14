import Playlist from './playlist';

describe('vo/woofer/Playlist', () => {
  test('constructor', () => {
    const mock = {
      id: 7,
      name: '추가된 플레이리스트',
      isDefault: true,
      createdAt: '2019-04-16T08:08:43.000Z',
      updatedAt: '2019-04-16T08:08:43.000Z',
    };
    const playlist = new Playlist(mock);

    expect(playlist.id).toEqual(mock.id);
    expect(playlist.name).toEqual(mock.name);
    expect(playlist.createdAt).toEqual(new Date(mock.createdAt));
    expect(playlist.updatedAt).toEqual(new Date(mock.updatedAt));
  });

  test('constructor2', () => {
    const mock = {
      id: 7,
      name: '추가된 플레이리스트',
      isDefault: true,
    };
    const playlist = new Playlist(mock);

    expect(playlist.id).toEqual(mock.id);
    expect(playlist.name).toEqual(mock.name);
    expect(playlist.createdAt).toBeNull();
    expect(playlist.updatedAt).toBeNull();
  });
});