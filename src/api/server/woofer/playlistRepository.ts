import instance from '../oasis';
import { AxiosInstance } from 'axios';
import YoutubeVideo from "../../../vo/woofer/youtubeVideo";
// import { IBoardCreateForm, ITaskCreateForm, ITaskUpdateStepForm } from '../../../store/boardStore';
//
// export const fetchPlaylists = () => {
//   return instance.get('/woofer/playlists');
// };
//
//
// interface IPlayListFetchParams {
//   playlistId: number
// }
//
// export const fetchPlaylist = (playListFetchParams: IPlayListFetchParams) => {
//   return instance.get(urlBuilder('/woofer/playlist/:playlistId', playListFetchParams));
// };
export interface IPlaylistCreateForm {
  name: string
}

class PlaylistRepository {
  axios: AxiosInstance;

  constructor() {
    this.axios = instance;
  }

  fetch(playlistId: number) {
    console.log(`/woofer/playlists/${playlistId}`)
    return this.axios.get(`/woofer/playlists/${playlistId}`);
  }

  fetchList() {
    return this.axios.get('/woofer/playlists');
  }

  create(form: IPlaylistCreateForm) {
    return this.axios.post('/woofer/playlists', form);
  }

  remove(playlistId: number) {
    return this.axios.delete(`/woofer/playlists/${playlistId}`);
  }

  addVideo(playlistId: number, video: YoutubeVideo): any {
    return this.axios.post(`/woofer/playlists/${playlistId}/videos`,video);
  }
}

export default new PlaylistRepository();