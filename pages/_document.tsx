import Document, { Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <html lang="ko">
      <Head>
        <link href="https://unpkg.com/ionicons@4.5.5/dist/css/ionicons.min.css" rel="stylesheet" />
      </Head>
      <body>
      <Main />
      <NextScript />
      </body>
      </html>
    );
  }
}

export default MyDocument