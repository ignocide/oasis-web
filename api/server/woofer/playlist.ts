import instance, { urlBuilder } from '../oasis'

export const fetchPlaylists = () => {
    return instance.get('/woofer/playlists')
}


interface IPlayListFetchParams {
    playlistId: number
}

export const fetchPlaylist = (playListFetchParams: IPlayListFetchParams) => {
    return instance.get(urlBuilder('/woofer/playlist/:playlistId', playListFetchParams))
}