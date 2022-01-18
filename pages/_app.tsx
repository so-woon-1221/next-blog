import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Header />
        <div style={{ maxWidth: "768px", margin: "0 auto" }}>
          <Component {...pageProps} />
        </div>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
