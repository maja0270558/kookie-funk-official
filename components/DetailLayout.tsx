import { Center, Skeleton, TypographyStylesProvider } from "@mantine/core";
import { ReactNode, useState } from "react";
import Image from "next/image";
import { Carousel } from "@mantine/carousel";
type Props = {
    image: string;
    title: string;
    content: string;
    otherSection: JSX.Element[] | null;
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
                className="object-contain lg:object-left-bottom min-w-[368px] w-[70vh] h-auto aspect-auto max-h-[85vh]  drop-shadow-md"
                priority={true}
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
        <div className=" relative flex flex-col p-4 lg:p-20 min-h-full justify-evenly ">
            <div className=" flex flex-col grow place-content-center">
                <div className="flex flex-row">
                    <div className="flex flex-col lg:flex-row flex-1 lg:gap-20">
                        <div className="block align-middle m-auto">
                            {compomentImage}
                        </div>

                        <div className="flex flex-1 self-stretch min-w-[30%]">
                            <div className="flex flex-1 lg:items-end">
                                {compomentTitle}
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" lg:items-end lg:mt-8">{compomentDesc}</div>
            </div>
            <div className="place-self-end">
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
