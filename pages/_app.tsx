import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Layout from "@/components/Layout";
import { getApp } from "firebase/app";
import { app, initializeFirebaseApp } from "@/firebase";
import { AuthProvider } from "@/context/AuthContext";
config.autoAddCss = false;

initializeFirebaseApp();
export default function App({ Component, pageProps }: AppProps) {
  console.log(getApp());
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
