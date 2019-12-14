import Video from './video';

describe('vo/woofer/youtubeVideo', () => {
  test('constructor', () => {
    const mock = {
      id: 1,
      videoId: 'video-id',
      title: '치즈 - 어떻게 생각해',
      description: '치즈의 어떻게 생각해',
      thumbnail: 'https://host.domain/image',
      createdAt: '2019-04-16T08:08:43.000Z',
      updatedAt: '2019-04-16T08:08:43.000Z',
    };

    const video = new Video(mock);


    expect(video.id).toEqual(mock.id);
    expect(video.videoId).toEqual(mock.videoId);
    expect(video.title).toEqual(mock.title);
    expect(video.description).toEqual(mock.description);
    expect(video.thumbnail).toEqual(mock.thumbnail);
    expect(video.createdAt).toEqual(new Date(mock.createdAt));
    expect(video.updatedAt).toEqual(new Date(mock.updatedAt));
  });
});
