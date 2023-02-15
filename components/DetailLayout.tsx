import { Center, Skeleton, TypographyStylesProvider } from "@mantine/core";
import { ReactNode, useState } from "react";
import Image from "next/image";
import { Carousel } from "@mantine/carousel";
import { renderToHTML } from "next/dist/server/render";
type Props = {
    forceMobile?: boolean;
    image: string;
    title: string;
    content: string;
    otherSection: JSX.Element[] | null;
};

export const DetailLayout = ({
    forceMobile,
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
        <TypographyStylesProvider className="text-base-content prose-lg break-all">
            <div
                dangerouslySetInnerHTML={{
                    __html: title,
                }}
            />
        </TypographyStylesProvider>
    );

    const compomentDesc = (
        <TypographyStylesProvider className="text-base-content prose-lg break-all">
            <div
                dangerouslySetInnerHTML={{
                    __html: content,
                }}
            />
        </TypographyStylesProvider>
    );

    const mobileComponent = (
        <div className="flex flex-col mt-14 p-4">
            <div className="flex flex-col justify-evenly">
                <Center>
                    <div className="flex flex-col flex-1">
                        <div className="block align-middle m-auto w-full ">
                            {compomentImage}
                        </div>
                        <div className=" mt-2 flex flex-1">
                            <div className="flex flex-1">{compomentTitle}</div>
                        </div>
                    </div>
                </Center>
            </div>
            <div className="">{compomentDesc}</div>
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

    const desktopComponent = (
        <div className="flex flex-col mt-14 lg:mt-0 p-4 lg:p-8">
            <div className="flex flex-col lg:min-h-[85vh] justify-evenly">
                <Center>
                    <div className="flex flex-col lg:flex-row flex-1 lg:gap-10 ">
                        <div className="block align-middle m-auto w-full lg:w-auto lg:min-w-[70vh] ">
                            {compomentImage}
                        </div>
                        <div className=" mt-2 flex flex-1 lg:min-w-[30%]">
                            <div className="flex flex-1 lg:items-end">
                                {compomentTitle}
                            </div>
                        </div>
                    </div>
                </Center>
            </div>
            <div className="lg:items-end lg:mt-8">{compomentDesc}</div>
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

    return <div>{forceMobile ? mobileComponent : desktopComponent}</div>;
};
