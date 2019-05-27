import { action, observable } from 'mobx';
import Playlist from '../../vo/woofer/playlist';
import playlistsRepository from '../../api/server/woofer/playlistRepository';
import YoutubeVideo from "../../vo/woofer/youtubeVideo";
import { default as Video, IVideo } from "../../vo/woofer/video";
import { getStore } from "../index";
import PlayerStore from "./playerStore";


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
    let response: any = await playlistsRepository.fetch(playlistId);
    this.videos = response.items.map((video) => new Video(video));
    this.playlist = new Playlist(response);
    let store: PlayerStore = getStore('playerStore');
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
    let store: PlayerStore = getStore('playerStore');
    store.setList(this.videos);
  }

}

export default PlaylistStore;