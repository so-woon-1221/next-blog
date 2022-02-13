import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import { RecoilRoot } from "recoil";
import Footter from "../components/Footter";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Header />
        <div
          style={{ maxWidth: "calc(768px + 1rem)", margin: "0 auto" }}
          className="px-0 py-6"
        >
          <Component {...pageProps} />
        </div>
        <Footter />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
