interface INews {
  title: string;
  link: string;
  description: string;
  author: string;
  pubDate: Date;
}

class News implements INews {
  title: string;
  link: string;
  description: string;
  author: string;
  pubDate: Date;


  constructor(news: INews = {}) {
    this.title = news.title;
    this.link = news.link;
    this.description = news.description;
    this.pubDate = news.pubDate ? new Date(news.pubDate) : null;
  }

  getDateString() {
    if (!this.pubDate) {
      return '';
    }
    else {
      return '1';
    }
  }
}


export { INews };
export default News;