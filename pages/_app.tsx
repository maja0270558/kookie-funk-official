import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../components/Layout";
import { store } from "..//store";
import { Provider } from "react-redux";
import ErrorBoundary from "../components/ErrorBoundary";

// mantine
import { ColorScheme, LoadingOverlay, MantineProvider } from "@mantine/core";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";
import { NotificationsProvider } from "@mantine/notifications";

// Grabs the full Tailwind CSS object
const fullConfig = resolveConfig(tailwindConfig);

function MyApp({ Component, pageProps }: AppProps) {
    const forest = "forest";
    const light = "lemonade";
    const dark = "dark";
    const lofi = "lofi";
    const cupcake = "cupcake";

    let themeMap = new Map([
        [`${forest}`, "dark"],
        [`${dark}`, "dark"],
        [`${light}`, "light"],
        [`${lofi}`, "light"],
        [`${cupcake}`, "light"],
    ]);
    const currentTheme = light;
    const mantineTheme: ColorScheme = themeMap.get(
        `${currentTheme}`
    ) as ColorScheme;
    let primaryColor = "#66DC5A";

    return (
        <SessionProvider
            // Provider options are not required but can be useful in situations where
            // you have a short session maxAge time. Shown here with default values.
            session={pageProps.session}
        >
            <Provider store={store}>
                <div className="relative" data-theme={currentTheme}>
                    <MantineProvider
                        withGlobalStyles
                        withNormalizeCSS
                        theme={{
                            colorScheme: mantineTheme,
                            primaryColor: "lime",
                        }}
                    >
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
        </SessionProvider>
    );
}

export default MyApp;
