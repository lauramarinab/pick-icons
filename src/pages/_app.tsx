import React from "react";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import Head from "next/head";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Pick Icons</title>
        <meta property="og:title" content="Pick Icons" key="title" />
      </Head>
      <DefaultSeo
        openGraph={{
          title: "Pick Icons",
          description: "Beautiful hand-crafted SVG icons - download and copy SVG",
          type: "website",
          url: "https://pick-icons.vercel.app/",
          locale: "en_IE",
          site_name: "Pick Icons",
          images: [
            {
              url:
                "https://user-images.githubusercontent.com/38502071/98831563-02e2fc80-243c-11eb-935d-114c89b3ab0e.jpg",
              width: 800,
              height: 600,
              alt: "Pick Icons - Beautiful hand-crafted SVG icons - download and copy SVG",
            },
          ],
        }}
      />

      <Component {...pageProps} />
    </>
  );
};

export default App;
