import PlaylistItem from './PlaylistItem';

describe('vo/woofer/PlaylistItem', () => {
  test('constructor', () => {
    const mock = {
      id: 7,
      videoId: 'abcd',
      title: 'title',
      thumbnail: 'thumbnail',
      description: 'description',
      createdAt: '2019-04-16T08:08:43.000Z',
      updatedAt: '2019-04-16T08:08:43.000Z',
    };
    const playItem = new PlaylistItem(mock);

    expect(playItem.id).toEqual(mock.id);
    expect(playItem.videoId).toEqual(mock.videoId);
    expect(playItem.title).toEqual(mock.title);
    expect(playItem.thumbnail).toEqual(mock.thumbnail);
    expect(playItem.description).toEqual(mock.description);
    expect(playItem.createdAt).toEqual(mock.createdAt);
    expect(playItem.updatedAt).toEqual(mock.updatedAt);
  });

});
