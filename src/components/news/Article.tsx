import React from 'react';
import Link from 'next/link'
import '../../style/news/article.scss'

const Article = ({ article }) => {
  const openWindow = () => {
    window.open(article.link);
  }
  return <div className={'article'} onClick={openWindow}>
    <div className={'article-title'}>{article.title}</div>
    <p className={'article-description'}>{article.description + "..."}</p>
  </div>
}


export default Article;