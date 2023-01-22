import React from "react";
import Gallery from "../components/Gallery";
import useSWR from 'swr'
import { WorksData } from "./api/get/works";


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

    const compoment = data.data.map((workData: WorksData) => <Gallery works={workData} />);

    return data ? <div>{compoment}</div> : <div>Loading...</div>;
};

export default works;
