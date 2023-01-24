import React from "react";
import useSWR from 'swr'
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

const works = () => {



    const content = `
1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa
1. You can use sequential numbers...
1. ...or keep all the numbers as 

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |
## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

`

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
                            <ReactMarkdown className="flex flex-col" remarkPlugins={[remarkGfm]}>
                                {detail}
                            </ReactMarkdown>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex flex-1 p-8">
                <div className="flex lg:items-end editor">
                    <ReactMarkdown className="flex flex-col" remarkPlugins={[remarkGfm]}>
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
            <div className="flex flex-1 p-2">
                <div className="carousel carousel-center w-full p-4 space-x-4  ">
                    <div className="carousel-item">
                        <img src="/1.jpeg" className=" object-cover w-36 h-36" />
                    </div>
                    <div className="carousel-item">
                        <img src="/2.jpeg" className=" object-cover w-36 h-36" />
                    </div>
                    <div className="carousel-item">
                        <img src="/profile.jpg" className=" object-cover w-36 h-36" />
                    </div>
                </div>
            </div>
        </div>

    )

};


export default works;
