import React, { useRef } from "react";
import useSWR from 'swr'
import Image from "next/image";


import PostEditor from "../../components/RichTextEditor";
import editor from "../../components/TipTapEditor";
import { useState } from 'react';
import { TypographyStylesProvider } from '@mantine/core';


import { useRouter } from 'next/router'
import { Editor } from "@tiptap/react";



const works = () => {
    const router = useRouter()
    const { id } = router.query
    const tiptapEditor: Editor | null = editor()
    const detail = `path to data files to supply the data that will be passed into templates.`
    // const { data, error, isLoading } = useSWR('/api/get/works', (url) => fetch(url).then(res => res.json()));

    // if (error) return <div>failed to load</div>
    // if (isLoading) return (

    //     <div className="flex items-center justify-center space-x-2 min-h-full">
    //         <div className="w-4 h-4 rounded-full animate-pulse dark:bg-primary"></div>
    //         <div className="w-4 h-4 rounded-full animate-pulse dark:bg-primary"></div>
    //         <div className="w-4 h-4 rounded-full animate-pulse dark:bg-primary"></div>
    //     </div>

    // )


    // const compoment = data.data.map((workData: WorksData) => <Gallery works={workData} />);
    const initialValue =
        '<p>Your initial <b>html value</b> or an empty string to init editor without value</p>';
    const [value, onChange] = useState(initialValue);
    const [detailvalue, onDetailChange] = useState(initialValue);

    const carousel = useRef<HTMLDivElement>(null);

    const handleDrag = (e: DragEvent) => {
        if (carousel.current) {
            carousel.current.scrollLeft = e.pageX;
        }
    };



    return (
        <div className="flex flex-col" >
            <div className="flex flex-row  place-content-center min-h-screen p-2">
                <div className="flex flex-col lg:flex-row flex-1 ">
                    <div className="relative flex flex-auto justify-center min-w-[368]">
                        <Image
                            alt=""
                            // src={"/profile.jpg"}
                            src={"/1.jpeg"}
                            width="0"
                            height="0"
                            sizes="100vw"
                            className="object-contain lg:object-contain w-auto h-auto aspect-auto p-2"
                        />
                    </div>

                    <div className="flex lg:flex-1 p-8">
                        <div className="flex lg:items-end editor">
                            <TypographyStylesProvider className="text-base-content">
                                <div dangerouslySetInnerHTML={{ __html: tiptapEditor?.getHTML() ?? "" }} />
                            </TypographyStylesProvider>
                            {id}
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex flex-1 p-8">
                <div className="flex flex-1">

                </div>
            </div>

            <PostEditor editor={tiptapEditor}></PostEditor>

            <div className="flex flex-1 p-2">
                <div className="flex flex-row space-x-4 scroll-smooth overflow-x-scroll" ref={carousel} onDrag={(e) => {
                    if (carousel.current) {
                        console.log(carousel.current.scrollLeft);
                        carousel.current.scrollLeft = e.pageX;
                    }
                }}>

                    <img src="/1.jpeg" className=" object-cover w-36 h-36" />
                    <img src="/2.jpeg" className=" object-cover w-36 h-36" />
                    <img src="/1.jpeg" className=" object-cover w-36 h-36" />
                    <img src="/2.jpeg" className=" object-cover w-36 h-36" />
                    <img src="/profile.jpg" className=" object-cover w-36 h-36" />
                    <img src="/1.jpeg" className=" object-cover w-36 h-36" />
                    <img src="/2.jpeg" className=" object-cover w-36 h-36" />
                    <img src="/1.jpeg" className=" object-cover w-36 h-36" />
                    <img src="/2.jpeg" className=" object-cover w-36 h-36" />
                    <img src="/profile.jpg" className=" object-cover w-36 h-36" />  <img src="/1.jpeg" className=" object-cover w-36 h-36" />
                    <img src="/2.jpeg" className=" object-cover w-36 h-36" />
                    <img src="/1.jpeg" className=" object-cover w-36 h-36" />
                    <img src="/2.jpeg" className=" object-cover w-36 h-36" />
                    <img src="/profile.jpg" className=" object-cover w-36 h-36" />

                </div>
            </div>
        </div>

    )

};


export default works;
