import PlayableVideo from './PlayableVideo';

describe('vo/woofer/PlayableVideo', () => {
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
    const playableVideo = new PlayableVideo(mock);

    expect(playableVideo.videoId).toEqual(mock.videoId);
    expect(playableVideo.title).toEqual(mock.title);
    expect(playableVideo.thumbnail).toEqual(mock.thumbnail);
    expect(playableVideo.description).toEqual(mock.description);
  });

});
