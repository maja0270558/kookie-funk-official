import React from "react";
import useSWR from "swr";
import { WorksData } from "./api/get/works";
import GalleryImage from "../components/GalleryImage";
import Error from "next/error";
import createFetcher from "../helper/Fetcher";

const works = () => {
    const { data, error, isLoading } = useSWR("/api/get/works", (url) =>
        createFetcher(url)
    );

    if (error)
        return <Error statusCode={404} title="Something going wrong here :(" />;
    if (isLoading) return <div className=""></div>;

    const emptyView = (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">There's nothing here</h1>
                    <p className="py-6">
                        已乃僧忽他出，數日不返，探其篋笥，空空如也。
                    </p>
                    <button className="btn btn-primary">Back to home</button>
                </div>
            </div>
        </div>
    );

    if (data instanceof Array) if (data.length <= 0) return emptyView;

    const compoment =
        data instanceof Array &&
        data.map((workData: WorksData) => {
            return (
                <div className="mx-auto px-4 py-8" key={workData.section_name}>
                    <div className="uppercase pb-4 pl-4 prose">
                        <h2>{workData.section_name}</h2>
                    </div>
                    <div className="gap-y-4 gap-x-4 grid grid-cols-fill">
                        {workData.imgs.map((value) => {
                            return (
                                <GalleryImage
                                    key={value.id}
                                    path={value.img}
                                    id={value.id.toString()}
                                />
                            );
                        })}
                    </div>
                </div>
            );
        });

    return compoment ? <div>{compoment}</div> : emptyView;
};

export default works;
