import { action, observable } from 'mobx';
import playlistsRepository from '../../api/woofer/playlistRepository';
import { getStore } from '../index';
import PlayerStore from './playerStore';
import Playlist from '../../dto/woofer/playlist';
import Video, { IVideo } from '../../dto/woofer/video';
import YoutubeVideo from '../../dto/woofer/youtubeVideo';
import PlaylistItem from '../../dto/woofer/playlistItem';


class PlaylistStore {
  @observable playlist?: Playlist = null;
  @observable videos?: Video[] = [];

  constructor(isServer: boolean, initialData: any = {}) {
    if (!isServer) {
    }
    this.playlist = initialData.playlist ? new Playlist(initialData.playlist) : null;
    this.videos = initialData.videos ? initialData.videos.map((video: any) => new Video(video)) : [];
  }

  @action
  async fetch(playlistId: number) {
    const response: any = await playlistsRepository.fetch(playlistId);
    this.videos = response.items.map((video: IVideo) => new Video(video));
    this.playlist = new Playlist(response);
    const store: PlayerStore = getStore('playerStore');
    store.setList(this.videos);
    store.setNextVideo();
    // this.playlist = response.playlists.map((playlist) => new Playlist(playlist))
  }

  @action
  async addVideo(youtubeVideo: YoutubeVideo) {
    const { id: playlistId } = this.playlist;
    const insertedVideo: IVideo = await playlistsRepository.addVideo(playlistId, youtubeVideo);
    const video = new Video(insertedVideo);
    this.videos = [...this.videos, video];
    const store: PlayerStore = getStore('playerStore');
    store.setList(this.videos);
  }

  @action
  async removeVideo(Video: PlaylistItem) {
    const { id: playlistItemId } = Video;
    const { id: playlistId } = this.playlist;
    await playlistsRepository.removeVideo(playlistId, playlistItemId);
    this.videos = this.videos.filter((video) => {
      return playlistItemId !== video.id;
    });
    const store: PlayerStore = getStore('playerStore');
    store.setList(this.videos);
  }

}

export default PlaylistStore;