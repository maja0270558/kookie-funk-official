import React from "react";
import useSWR from 'swr'
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

const works = () => {



    const content = `
# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading`
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

    return (
        <div className="flex-row min-h-full min-w-full bg-yello-50">
            <div className="flex flex-col lg:flex-row min-h-full bg-green-100">
                {/* Image PART */}

                <div className="flex grow-[1] lg:grow-[5] max-h-screen bg-blue-200">
                    <div className="flex items-center flex-1 justify-center bg-pink-300">
                        <Image
                            alt=""
                            src={"/2.jpeg"}
                            width="0"
                            height="0"
                            sizes="(max-width: 1024px) 90vw, 60vw"
                            className=" object-fill w-auto h-auto aspect-auto max-w-[768px] sm: min-w-[368px]"
                        />


                    </div>

                </div>
                {/* MARK PART */}

                <div className="flex grow-[5] lg:grow-[1] bg-slate-500">
                    <div className="flex flex-col lg:flex-col-reverse w-full bg-slate-600">
                        <div className=" editor">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-green-300 h-36"></div>
        </div>
    )

};

export default works;
