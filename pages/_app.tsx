import { FontProvider, PopupProvider, PortalProvider } from "@boxfoxs/bds-web";
import styled from "@emotion/styled";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { Provider as AlertProvider, positions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import "../styles/globals.scss";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
};

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>경쟁사 상품 대시보드</title>
        <link
          type="stylesheet"
          href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css"
        />
        <link
          type="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@100;200;300;400;500;600;700;800;900&display=swap"
        />
      </Head>
      <AlertProvider template={AlertTemplate} {...options}>
        <RecoilRoot>
          <QueryClientProvider client={client}>
            <FontProvider fontFamily={() => "inherit"}>
              <PortalProvider>
                <PopupProvider>
                  <RootContainer>
                    <Component {...pageProps} />
                  </RootContainer>
                </PopupProvider>
              </PortalProvider>
            </FontProvider>
          </QueryClientProvider>
        </RecoilRoot>
      </AlertProvider>
    </React.Fragment>
  );
}

const RootContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background: rgb(249, 249, 249);
  *::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    display: none;
  }
  min-height: 100vh;
  transition: background 300ms;
  width: 100vw;
  overflow: hidden;
`;

export default MyApp;
