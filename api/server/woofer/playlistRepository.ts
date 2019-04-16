import instance, { urlBuilder } from '../oasis';
import { AxiosInstance } from 'axios';
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

  fetchList() {
    return instance.get('/woofer/playlists');
  }

  create(form: IPlaylistCreateForm) {
    return instance.post('/woofer/playlists',form);
  }

  remove(playlistId: number) {
    return instance.delete(`/woofer/playlists/${playlistId}`);
  }
}

export default new PlaylistRepository();