import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <noscript>
            Si estás viendo este mensaje significa que
            <strong>JavaScript ha sido deshabilitado en tu navegador</strong>, porfavor habilita
            Javascript para seguir buscando la mejor comida.
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
