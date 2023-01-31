import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../components/Layout";
import { store } from "..//store";
import { Provider } from "react-redux";

// mantine
import { MantineProvider } from "@mantine/core";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";
import ErrorBoundary from "../components/ErrorBoundary";

// Grabs the full Tailwind CSS object
const fullConfig = resolveConfig(tailwindConfig);

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider
            // Provider options are not required but can be useful in situations where
            // you have a short session maxAge time. Shown here with default values.
            session={pageProps.session}
        >
            <Provider store={store}>
                <Layout>
                    <MantineProvider
                        withGlobalStyles
                        withNormalizeCSS
                        theme={{
                            components: {
                                RichTextEditor: {
                                    classNames: {
                                        root: "bg-base-300 border-base-100",
                                        toolbar: "bg-base-300 border-base-100 ",
                                        controlsGroup: "",
                                        control:
                                            "text-base-content border-base-100",
                                        content:
                                            "bg-base-300 text-base-content",
                                        typographyStylesProvider: "prose",
                                        linkEditor: "",
                                        linkEditorSave:
                                            "bg-base-100 text-base-content",
                                        linkEditorInput:
                                            "bg-base-100 text-base-content",
                                        linkEditorExternalControl:
                                            "bg-base-100 text-base-content",
                                    },
                                },
                            },
                            /** Put your mantine theme override here */
                        }}
                    >
                        <ErrorBoundary>
                            <Component {...pageProps} />
                        </ErrorBoundary>
                    </MantineProvider>
                </Layout>
            </Provider>
        </SessionProvider>
    );
}

export default MyApp;
