import { Center, Skeleton, TypographyStylesProvider } from "@mantine/core";
import { ReactNode, useState } from "react";
import Image from "next/image";
import { Carousel } from "@mantine/carousel";
import { renderToHTML } from "next/dist/server/render";
import CustomTypographtProvider from "./CustomTypographtProvider";
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

    const compomentImage = (className: string) => (
        <Skeleton visible={imgIsLoading}>
            <Image
                alt=""
                // src={"/profile.jpg"}
                src={image}
                width="500"
                height="500"
                onLoadingComplete={() => setImgIsLoading(false)}
                sizes="100vw"
                className={className}
                priority={true}
            />
        </Skeleton>
    );

    const compomentTitle = <CustomTypographtProvider content={title} />;

    const compomentDesc = <CustomTypographtProvider content={content} />;

    const mobileComponent = (
        <div className="flex flex-col mt-14 p-4 min-h-[100vh]">
            <></>
            <div className="flex flex-col mt-auto mb-2 overflow-hidden">
                <Center className="min-h-[80vh]">
                    <div className="flex flex-col flex-1">
                        <div className="block align-middle m-auto w-full ">
                            {compomentImage(
                                "object-contain w-[100vw] h-auto drop-shadow-md"
                            )}
                        </div>
                        <div className=" mt-2 flex flex-1">
                            <div className="flex flex-1">{compomentTitle}</div>
                        </div>
                    </div>
                </Center>
            </div>
            <div className="mt-auto">{compomentDesc}</div>
            <div className="place-self-end mt-auto">
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
        <div className="flex flex-col mt-14 lg:mt-0 p-4 lg:p-8 min-h-[100vh]">
            <></>
            <div className="flex flex-col mt-auto mb-2 overflow-hidden">
                <Center className="min-h-[80vh]">
                    <div className="flex flex-col lg:flex-row flex-1 lg:gap-10 ">
                        <div className="block align-middle m-auto w-full lg:w-auto  ">
                            {compomentImage(
                                "object-contain w-[100vw] lg:max-h-[80vh] lg:w-[40vw] h-auto drop-shadow-md"
                            )}
                        </div>
                        <div className=" mt-2 flex flex-1 lg:min-w-[30vw]">
                            <div className="flex flex-1 lg:items-end">
                                {compomentTitle}
                            </div>
                        </div>
                    </div>
                </Center>
            </div>
            <div className="lg:items-end mt-auto">{compomentDesc}</div>
            <div className="mt-auto pt-4">
                <Carousel
                    className=""
                    withIndicators
                    slideGap="md"
                    mx={"auto"}
                    slideSize={120}
                    dragFree
                    align="start"
                    containScroll="keepSnaps"
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
