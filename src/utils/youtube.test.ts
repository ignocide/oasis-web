import youtubeUtil from './youtube';

describe('utils/youtube', () => {
  test('getVideoIdFromUrl', () => {
    let url = "https://www.youtube.com/watch?v=kG3VJJVplHk";
    let videoId = youtubeUtil.getVideoIdFromUrl(url);
    expect('kG3VJJVplHk').toEqual(videoId);
  });
});