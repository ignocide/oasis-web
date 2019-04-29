class PlayItem {
  id?: number
  videoId: string
  name: string
  thumbnail: string
  description: string
  createdAt: Date
  updatedAt: Date
  constructor(playitem:any = {}){
    this.id = playitem.id;
    this.videoId = playitem.videoId;
    this.name = playitem.name;
    this.thumbnail = playitem.thumbnail;
    this.description = playitem.description;
    this.createdAt = playitem.createdAt;
    this.updatedAt = playitem.updatedAt;
  }
}

export default PlayItem