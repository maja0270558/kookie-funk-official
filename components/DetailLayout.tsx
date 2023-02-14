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
                className="object-contain max-h-[90vh] lg:object-left-bottom w-full h-auto aspect-auto  drop-shadow-md"
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
        <div className="flex flex-col p-8">
            <div className="flex flex-col p-4 min-h-[85vh] justify-evenly ">
                <Center>
                    <div className="flex flex-col lg:flex-row flex-1 lg:gap-10 ">
                        <div className="block align-middle m-auto min-w-[70vh] ">
                            {compomentImage}
                        </div>

                        <div className=" mt-2 flex flex-1  min-w-[30%]">
                            <div className="flex flex-1 lg:items-end">
                                {compomentTitle}
                            </div>
                        </div>
                    </div>
                </Center>
            </div>

            <div className=" lg:items-end lg:mt-8">{compomentDesc}</div>

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
