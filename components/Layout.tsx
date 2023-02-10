import { ReactNode } from "react";
import Sidebar from "./Sidebar";
/// Redux import
import { useSelector } from "react-redux";
import { RootState } from "../store";
import classNames from "classnames";
import { Middleware, SWRConfig, SWRHook } from "swr";
import { useState } from "react";
import { LoadingOverlay } from "@mantine/core";
type Props = {
    children: ReactNode;
};

export const Layout = ({ children }: Props) => {
    const [requestCount, setRequestCount] = useState(0);

    const logger: Middleware =
        (useSWRNext: SWRHook) => (key, fetcher, config) => {
            let nextFetcher = fetcher;
            if (fetcher) {
                nextFetcher = (...args: unknown[]) => {
                    setRequestCount((prev) => prev + 1);
                    const started = Date.now();
                    const label =
                        typeof key === "function"
                            ? key()
                            : Array.isArray(key)
                            ? key.join(", ")
                            : key;
                    console.log("SWR Request", label);
                    const response = fetcher(...args);
                    if (response instanceof Promise) {
                        return response.then((result) => {
                            console.log(
                                "SWR Request complete",
                                label,
                                "elapsed",
                                Date.now() - started,
                                "ms"
                            );
                            setRequestCount((prev) => prev - 1);
                            return result;
                        });
                    } else {
                        console.log(
                            "SWR Request complete",
                            label,
                            "elapsed",
                            Date.now() - started,
                            "ms"
                        );
                        setRequestCount((prev) => prev - 1);
                        return response;
                    }
                };
            }

            return useSWRNext(key, nextFetcher, config);
        };

    return (
        <Sidebar>
            <div className="relative min-h-full">
                <LoadingOverlay
                    loaderProps={{ size: "lg", variant: "dots" }}
                    overlayOpacity={0.3}
                    visible={requestCount > 0}
                    overlayBlur={1}
                />
                <SWRConfig value={{ use: [logger] }}>{children}</SWRConfig>
            </div>
        </Sidebar>
    );
};
