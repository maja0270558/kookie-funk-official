import "../styles/globals.css";
import NextApp, { AppProps, AppContext } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../components/Layout";
import { store } from "..//store";
import { Provider } from "react-redux";
import ErrorBoundary from "../components/ErrorBoundary";
// mantine
import {
    ColorScheme,
    ColorSchemeProvider,
    MantineProvider,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import Head from "next/head";
import { RouterTransition } from "../components/RouterTransition";
import { useState } from "react";
import { getCookie, setCookie } from "cookies-next";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
    const { Component, pageProps } = props;
    const [colorScheme, setColorScheme] = useState<ColorScheme>(
        props.colorScheme
    );

    const light = "light";
    const dark = "dark";

    let themeMap = new Map([
        [dark, { colorScheme: "dark", primaryColor: "lime" }],
        [light, { colorScheme: "light", primaryColor: "lime" }],
    ]);

    const mantinePrimaryColor: string = themeMap.get(`${colorScheme}`)
        ?.primaryColor as ColorScheme;

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme =
            value || (colorScheme === "dark" ? "light" : "dark");
        setColorScheme(nextColorScheme);
        setCookie("mantine-color-scheme", nextColorScheme, {
            maxAge: 60 * 60 * 24 * 30,
        });
    };

    return (
        <SessionProvider
            // Provider options are not required but can be useful in situations where
            // you have a short session maxAge time. Shown here with default values.
            session={pageProps.session}
        >
            <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <Provider store={store}>
                    <div className="relative" data-theme={colorScheme}>
                        <Head>
                            <title>KookieFunk</title>
                            <meta name="description" content="KOOKIE FUNK 曲奇放克 插畫 / 動畫
                                        / 繪畫教學 / Youtube相關 歡迎各種合作來信詢問 a88115146@gmail.com" key="desc" />
                        </Head>
                        <MantineProvider
                            withGlobalStyles
                            withNormalizeCSS
                            theme={{
                                loader: "dots",
                                colorScheme: colorScheme,
                                primaryColor: mantinePrimaryColor,
                            }}
                        >
                            <RouterTransition />

                            <Layout>
                                <ErrorBoundary>
                                    <NotificationsProvider>
                                        <Component {...pageProps} />
                                    </NotificationsProvider>
                                </ErrorBoundary>
                            </Layout>
                        </MantineProvider>
                    </div>
                </Provider>
            </ColorSchemeProvider>
        </SessionProvider>
    );
}

App.getInitialProps = async (appContext: AppContext) => {
    const appProps = await NextApp.getInitialProps(appContext);
    return {
        ...appProps,
        colorScheme:
            getCookie("mantine-color-scheme", appContext.ctx) || "light",
    };
};
