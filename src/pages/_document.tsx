import Document, { Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <html lang="ko">
      <Head>
        <meta name="viewport" content="width=device-width,height=device-height,user-scalable=no,minimal-ui, viewport-fit=cover, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <script src="https://apis.google.com/js/api.js"></script>
      </Head>
      <body>
      <Main />
      <div id={'floater-container'} />
      <NextScript />
      </body>
      </html>
    );
  }
}

export default MyDocument;