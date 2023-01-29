import React from "react";
import Gallery from "../components/Gallery";
import useSWR from 'swr'
import { WorksData } from "./api/get/works";
import GalleryImage from "../components/GalleryImage";


const works = () => {
    const { data, error, isLoading } = useSWR('/api/get/works', (url) => fetch(url).then(res => res.json()));

    if (error) return <div>failed to load</div>
    if (isLoading) return (
        <div className="flex items-center justify-center space-x-2 min-h-full">
            <div className="w-4 h-4 rounded-full animate-pulse dark:bg-primary"></div>
            <div className="w-4 h-4 rounded-full animate-pulse dark:bg-primary"></div>
            <div className="w-4 h-4 rounded-full animate-pulse dark:bg-primary"></div>
        </div>
    )

    const compoment = data.data.map((workData: WorksData) => {
        return (
            <div className="mx-auto px-4 py-8">
                <div className="uppercase pb-4 pl-4 prose">
                    <h2>{workData.section_name}</h2>
                </div>
                <div className="gap-y-4 gap-x-4 grid grid-cols-fill">
                    {workData.imgs.map((value) => {
                        return <GalleryImage path={value.img} id={value.id.toString()} />;
                    })}
                </div>
            </div>
        )
    })

    return compoment ? <div>{compoment}</div> : <div>Loading...</div>;
};

export default works;
