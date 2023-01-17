import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../components/Layout";
import { store } from "..//store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider
            // Provider options are not required but can be useful in situations where
            // you have a short session maxAge time. Shown here with default values.
            session={pageProps.session}
        >
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />{" "}
                </Layout>
            </Provider>
        </SessionProvider>
    );
}

export default MyApp;
