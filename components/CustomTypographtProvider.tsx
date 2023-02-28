import { TypographyStylesProvider } from "@mantine/core";
import React from "react";

type CustomTypographtProps = {
    content: string;
};

function CustomTypographtProvider({ content }: CustomTypographtProps) {
    return (
        <TypographyStylesProvider className="text-base-content w-full">
            <div
                className="prose-img:rounded-sm break-all custom-render-html"
                dangerouslySetInnerHTML={{
                    __html: content,
                }}
            />
        </TypographyStylesProvider>
    );
}

export default CustomTypographtProvider;
