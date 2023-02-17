import { ReactNode } from "react";
import Sidebar from "./Sidebar";
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
                    const started = Date.now();
                    const label =
                        typeof key === "function"
                            ? key()
                            : Array.isArray(key)
                            ? key.join(", ")
                            : key;

                    typeof label === "string" &&
                        !label.toLowerCase().includes("detail?") &&
                        !label.toLowerCase().includes("works") &&
                        setRequestCount((prev) => prev + 1);

                    const response = fetcher(...args);
                    if (response instanceof Promise) {
                        return response.then((result) => {
                            typeof label === "string" &&
                                !label.toLowerCase().includes("detail?") &&
                                !label.toLowerCase().includes("works") &&
                                setRequestCount((prev) => prev - 1);
                            return result;
                        });
                    } else {
                        typeof label === "string" &&
                            !label.toLowerCase().includes("detail?") &&
                            !label.toLowerCase().includes("works") &&
                            setRequestCount((prev) => prev - 1);
                        return response;
                    }
                };
            }

            return useSWRNext(key, nextFetcher, config);
        };

    return (
        <div>
            <LoadingOverlay
                className=""
                loaderProps={{ size: "xl", variant: "dots" }}
                overlayOpacity={0.3}
                visible={requestCount > 0}
                overlayBlur={1}
            />
            <Sidebar>
                <div className="relative min-h-full top-14 lg:top-0">
                    <SWRConfig value={{ use: [logger] }}>{children}</SWRConfig>
                </div>
            </Sidebar>
        </div>
    );
};
