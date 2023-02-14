import { Center, Skeleton, TypographyStylesProvider } from "@mantine/core";
import { ReactNode, useState } from "react";
import Image from "next/image";
import { Carousel } from "@mantine/carousel";
import classNames from "classnames";
type Props = {
    image: string;
    title: string;
    content: string;
    otherSection: JSX.Element[] | null;
    mediaQuery?: string;
};

export const DetailLayout = ({
    mediaQuery,
    image,
    title,
    content,
    otherSection,
}: Props) => {
    const [imgIsLoading, setImgIsLoading] = useState(true);
    const lquerry = mediaQuery ?? "lg";

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
                className={`object-contain max-h-[90vh] ${lquerry}:object-left-bottom w-full h-auto aspect-auto  drop-shadow-md`}
                priority={true}
            />
        </Skeleton>
    );

    const compomentTitle = (
        <TypographyStylesProvider className="text-base-content prose-lg">
            <div
                dangerouslySetInnerHTML={{
                    __html: title,
                }}
            />
        </TypographyStylesProvider>
    );

    const compomentDesc = (
        <TypographyStylesProvider className="text-base-content prose-lg">
            <div
                dangerouslySetInnerHTML={{
                    __html: content,
                }}
            />
        </TypographyStylesProvider>
    );

    return (
        <div
            className={`flex flex-col mt-14 ${lquerry}:mt-0 m-4 ${lquerry}:p-8`}
        >
            <div
                className={`flex flex-col min-h-[65vh] ${lquerry}:min-h-[85vh] justify-evenly`}
            >
                <Center>
                    <div
                        className={`flex flex-col ${lquerry}:flex-row flex-1 ${lquerry}:gap-10`}
                    >
                        <div
                            className={`block align-middle m-auto w-full ${lquerry}:w-auto ${lquerry}:min-w-[70vh]`}
                        >
                            {compomentImage}
                        </div>
                        <div
                            className={`mt-2 flex flex-1 ${lquerry}:min-w-[30%]`}
                        >
                            <div className={`flex flex-1 ${lquerry}:items-end`}>
                                {compomentTitle}
                            </div>
                        </div>
                    </div>
                </Center>
            </div>
            <div className={`${lquerry}:items-end ${lquerry}:mt-8`}>
                {compomentDesc}
            </div>
            <div className="p-2">
                <Carousel
                    withIndicators
                    height={120}
                    slideSize="120px"
                    slideGap="md"
                    dragFree
                    align="center"
                    mx="auto"
                    containScroll="trimSnaps"
                    withControls={false}
                >
                    {otherSection?.map((element, index) => {
                        return (
                            <Carousel.Slide key={index}>
                                {element}
                            </Carousel.Slide>
                        );
                    })}
                </Carousel>
            </div>
        </div>
    );
};
