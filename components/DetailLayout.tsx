import { Center, Skeleton, TypographyStylesProvider } from "@mantine/core";
import { ReactNode, useState } from "react";
import Image from "next/image";

type Props = {
    image: string;
    title: string;
    content: string;
    otherSection: ReactNode | null;
};

export const DetailLayout = ({
    image,
    title,
    content,
    otherSection,
}: Props) => {
    const [imgIsLoading, setImgIsLoading] = useState(true);

    const compomentImage = (
        <Skeleton visible={imgIsLoading}>
            <Image
                alt=""
                // src={"/profile.jpg"}
                src={image}
                width="500"
                height="500"
                onLoadingComplete={() => setImgIsLoading(false)}
                sizes="100vw"
                className="object-contain w-auto h-auto aspect-auto min-h-[80vh] max-h-[85vh]  drop-shadow-md"
            />
        </Skeleton>
    );

    const compomentTitle = (
        <TypographyStylesProvider className="text-base-content prose-lg lg:min-w-full">
            <div
                dangerouslySetInnerHTML={{
                    __html: title,
                }}
            />
        </TypographyStylesProvider>
    );

    const compomentDesc = (
        <TypographyStylesProvider className="text-base-content prose-lg lg:min-w-full">
            <div
                dangerouslySetInnerHTML={{
                    __html: content,
                }}
            />
        </TypographyStylesProvider>
    );


    return (
        <div className="flex flex-col m-4 lg:p-20">
            <div className="flex flex-row place-content-center">
                <div className="flex flex-col lg:flex-row flex-1 lg:gap-20">

                    <div className="block align-middle m-auto">{compomentImage}</div>

                    <div className="flex flex-1 self-stretch min-w-[30%]">
                        <div className="flex flex-1 lg:items-end">{compomentTitle}</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 lg:items-end lg:mt-8">{compomentDesc}</div>
            {otherSection}
        </div>
    );
};
