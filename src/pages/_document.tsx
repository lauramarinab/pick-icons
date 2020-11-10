import React from "react";
import Document, { DocumentContext, Html, Head, Main, NextScript } from "next/document";
import { globalStyles } from "../globalStyles";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    const isProd = process.env.NODE_ENV === "production";

    return (
      <Html lang="en">
        <Head>
          {/* Global site tag (gtag.js) - Google Analytics */}
          {isProd && (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`} />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
                }}
              />
            </>
          )}
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto&family=Roboto+Mono:wght@200;400;700&display=swap"
            rel="stylesheet"
          />
          <title>Pick Icons</title>
        </Head>
        <body>
          {globalStyles}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
