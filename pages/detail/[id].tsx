import React, { useRef } from "react";
import useSWR from 'swr'
import Image from "next/image";


import PostEditor from "../../components/RichTextEditor";
import editor from "../../components/TipTapEditor";
import { useState } from 'react';
import { TypographyStylesProvider } from '@mantine/core';


import { useRouter } from 'next/router'
import { Editor } from "@tiptap/react";
import "keen-slider/keen-slider.min.css"

import { useKeenSlider } from 'keen-slider/react' // import from 'keen-slider/react.es' for to get an ES module

const works = () => {
    const router = useRouter()
    const { id } = router.query
    const tiptapEditor: Editor | null = editor()
    const detail = `path to data files to supply the data that will be passed into templates.`
    const [ref] = useKeenSlider<HTMLDivElement>({
        loop: false,
        mode: "free",
        slides: {
            perView: "auto",
            spacing: 12,
        },
    })
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
    const cellSize = 150
    const carousel = useRef<HTMLDivElement>(null);

    const handleDrag = (e: DragEvent) => {
        if (carousel.current) {
            carousel.current.scrollLeft = e.pageX;
        }
    };



    return (
        <div className="flex flex-col p-4" >
            <div className="flex flex-row  place-content-center min-h-screen">
                <div className="flex flex-col lg:flex-row flex-1 ">
                    <div className="relative flex flex-auto justify-center min-w-[368]">
                        <Image
                            alt=""
                            // src={"/profile.jpg"}
                            src={"/1.jpeg"}
                            width="0"
                            height="0"
                            sizes="100vw"
                            className="object-contain lg:object-contain w-auto h-auto aspect-auto"
                        />
                    </div>

                    <div className="flex lg:flex-1">
                        <div className="flex lg:items-end editor">
                            <TypographyStylesProvider className="text-base-content">
                                <div dangerouslySetInnerHTML={{ __html: tiptapEditor?.getHTML() ?? "" }} />
                            </TypographyStylesProvider>
                            {id}
                        </div>
                    </div>

                </div>
            </div>


            <div className="pt-4">
                <PostEditor editor={tiptapEditor}></PostEditor>
            </div>

            <div className="pt-4">
                <div ref={ref} className="keen-slider max-w-screen " style={{ maxHeight: cellSize, minHeight: cellSize }}>

                    <div className="keen-slider__slide" style={{ maxWidth: cellSize, minWidth: cellSize, maxHeight: cellSize, minHeight: cellSize }}>
                        <img src="/1.jpeg" className="object-cover h-48 w-48" />
                    </div>
                    <div className="keen-slider__slide" style={{ maxWidth: cellSize, minWidth: cellSize, maxHeight: cellSize, minHeight: cellSize }}>
                        <img src="/2.jpeg" className="object-cover h-48 w-48" />
                    </div>
                    <div className="keen-slider__slide" style={{ maxWidth: cellSize, minWidth: cellSize, maxHeight: cellSize, minHeight: cellSize }}>
                        <img src="/4k.jpg" className="object-cover h-48 w-48" />
                    </div>
                    <div className="keen-slider__slide" style={{ maxWidth: cellSize, minWidth: cellSize, maxHeight: cellSize, minHeight: cellSize }}>
                        <img src="/profile.jpg" className="object-cover h-48 w-48" />
                    </div>
                    <div className="keen-slider__slide" style={{ maxWidth: cellSize, minWidth: cellSize, maxHeight: cellSize, minHeight: cellSize }}>
                        <img src="/work1.jpeg" className="object-cover h-48 w-48" />
                    </div>
                    <div className="keen-slider__slide" style={{ maxWidth: cellSize, minWidth: cellSize, maxHeight: cellSize, minHeight: cellSize }}>
                        <img src="/1.jpeg" className="object-cover h-48 w-48" />
                    </div>
                    <div className="keen-slider__slide" style={{ maxWidth: cellSize, minWidth: cellSize, maxHeight: cellSize, minHeight: cellSize }}>
                        <img src="/2.jpeg" className="object-cover h-48 w-48" />
                    </div>
                    <div className="keen-slider__slide" style={{ maxWidth: cellSize, minWidth: cellSize, maxHeight: cellSize, minHeight: cellSize }}>
                        <img src="/4k.jpg" className="object-cover h-48 w-48" />
                    </div>
                    <div className="keen-slider__slide" style={{ maxWidth: cellSize, minWidth: cellSize, maxHeight: cellSize, minHeight: cellSize }}>
                        <img src="/profile.jpg" className="object-cover h-48 w-48" />
                    </div>
                    <div className="keen-slider__slide" style={{ maxWidth: cellSize, minWidth: cellSize, maxHeight: cellSize, minHeight: cellSize }}>
                        <img src="/work1.jpeg" className="object-cover h-48 w-48" />
                    </div>
                    <div className="keen-slider__slide" style={{ maxWidth: cellSize, minWidth: cellSize, maxHeight: cellSize, minHeight: cellSize }}>
                        <img src="/1.jpeg" className="object-cover h-48 w-48" />
                    </div>
                    <div className="keen-slider__slide" style={{ maxWidth: cellSize, minWidth: cellSize, maxHeight: cellSize, minHeight: cellSize }}>
                        <img src="/2.jpeg" className="object-cover h-48 w-48" />
                    </div>
                    <div className="keen-slider__slide" style={{ maxWidth: cellSize, minWidth: cellSize, maxHeight: cellSize, minHeight: cellSize }}>
                        <img src="/4k.jpg" className="object-cover h-48 w-48" />
                    </div>
                    <div className="keen-slider__slide" style={{ maxWidth: cellSize, minWidth: cellSize, maxHeight: cellSize, minHeight: cellSize }}>
                        <img src="/profile.jpg" className="object-cover h-48 w-48" />
                    </div>
                    <div className="keen-slider__slide" style={{ maxWidth: cellSize, minWidth: cellSize, maxHeight: cellSize, minHeight: cellSize }}>
                        <img src="/work1.jpeg" className="object-cover h-48 w-48" />
                    </div>
                    <div className="keen-slider__slide" style={{ maxWidth: cellSize, minWidth: cellSize, maxHeight: cellSize, minHeight: cellSize }}>
                        <img src="/1.jpeg" className="object-cover h-48 w-48" />
                    </div>
                    <div className="keen-slider__slide" style={{ maxWidth: cellSize, minWidth: cellSize, maxHeight: cellSize, minHeight: cellSize }}>
                        <img src="/2.jpeg" className="object-cover h-48 w-48" />
                    </div>
                    <div className="keen-slider__slide" style={{ maxWidth: cellSize, minWidth: cellSize, maxHeight: cellSize, minHeight: cellSize }}>
                        <img src="/4k.jpg" className="object-cover h-48 w-48" />
                    </div>
                    <div className="keen-slider__slide" style={{ maxWidth: cellSize, minWidth: cellSize, maxHeight: cellSize, minHeight: cellSize }}>
                        <img src="/profile.jpg" className="object-cover h-48 w-48" />
                    </div>
                    <div className="keen-slider__slide" style={{ maxWidth: cellSize, minWidth: cellSize, maxHeight: cellSize, minHeight: cellSize }}>
                        <img src="/work1.jpeg" className="object-cover h-48 w-48" />
                    </div>
                </div>
            </div>


        </div>

    )

};


export default works;
