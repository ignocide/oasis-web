import youtubeUtil from './youtube';

describe('utils/youtube', () => {
  test('getVideoIdFromUrl', () => {
    const url = 'https://www.youtube.com/watch?v=kG3VJJVplHk';
    const videoId = youtubeUtil.getVideoIdFromUrl(url);
    expect('kG3VJJVplHk').toEqual(videoId);
  });
});