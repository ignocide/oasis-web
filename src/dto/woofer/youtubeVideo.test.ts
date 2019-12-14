import YoutubeVideo from './youtubeVideo';

describe('vo/woofer/youtubeVideo', () => {
  test('constructor', () => {
    const mock = {
      id: {
        kind: 'video',
        videoId: 'abc-video'
      },
      snippet: {
        title: '치즈 - 어떻게 생각해',
        description: '어떻게 생각해',
        thumbnails: {
          high: {
            url: 'https://host.domain'
          }
        }
      }
    };

    const youtubeVideo = new YoutubeVideo(mock);


    expect(youtubeVideo.kind).toEqual(mock.id.kind);
    expect(youtubeVideo.videoId).toEqual(mock.id.videoId);
    expect(youtubeVideo.title).toEqual(mock.snippet.title);
    expect(youtubeVideo.thumbnail).toEqual(mock.snippet.thumbnails.high.url);
    expect(youtubeVideo.description).toEqual(mock.snippet.description);
  });
});
