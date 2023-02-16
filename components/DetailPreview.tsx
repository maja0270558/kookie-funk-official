import { Center, Image as MantineImage, Tabs } from "@mantine/core";
import { IconDeviceDesktop, IconDeviceMobile } from "@tabler/icons";
import React from "react";
import { DetailLayout } from "./DetailLayout";
import GalleryImage from "./GalleryImage";
import { useState } from "react";
import classNames from "classnames";

const DetailPreview = (props: {
    src: string;
    nailSrc: string;
    title: string;
    desc: string;
}) => {
    const [isMobile, setIsMobile] = useState(false);
    const sectionItems = Array(20)
        .fill(0)
        .map((v, i) => i)
        .map((value, index) => {
            return (
                <GalleryImage
                    className={"h-[120px] w-[120px] pointer-events-none"}
                    path={props.nailSrc}
                    id={index.toString()}
                />
            );
        });

    return (
        <div className=" relative">
            <Tabs
                className="mb-8 bg-base-100 sticky top-14 lg:top-0 z-50"
                defaultValue="desktop"
                onTabChange={(v) => {
                    const mobile = v == "mobile";
                    setIsMobile(mobile);
                }}
            >
                <Tabs.List>
                    <Tabs.Tab value="desktop">
                        <IconDeviceDesktop size={16} />
                    </Tabs.Tab>
                    <Tabs.Tab value="mobile">
                        <IconDeviceMobile size={16} />
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs>
            {!isMobile && (
                <DetailLayout
                    image={props.src}
                    title={props.title ?? ""}
                    content={props.desc ?? ""}
                    otherSection={sectionItems}
                ></DetailLayout>
            )}
            {isMobile && (
                <Center>
                    <div className="mockup-phone">
                        <div className="camera"></div>
                        <div className="display">
                            <div className="artboard phone-2 flex overflow-auto ">
                                <div className="max-w-full">
                                    <DetailLayout
                                        forceMobile={true}
                                        image={props.src}
                                        title={props.title ?? ""}
                                        content={props.desc ?? ""}
                                        otherSection={sectionItems}
                                    ></DetailLayout>
                                </div>
                            </div>
                        </div>
                    </div>
                </Center>
            )}
        </div>
    );
};

export default DetailPreview;
