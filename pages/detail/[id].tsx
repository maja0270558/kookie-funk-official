import React from "react";
import useSWR from 'swr'
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

const works = () => {



    const content = `---
## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


## Plugins

The killer feature of  is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).


### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.


### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O

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
        <div className="flex-row min-h-full min-w-full bg-yellow-200">
            <div className="flex flex-col lg:flex-row ">
                <div className="flex flex-0">
                    <div className="flex w-full bg-slate-600 justify-center">
                        <Image
                            className="p-4 bg-slate-400"
                            src={"/profile.jpg"}
                            alt={"profile"}
                            // 用來決定圖片的比例
                            width={450}
                            height={100}
                            priority={true}
                        ></Image>
                    </div>

                </div>
                <div className="flex flex-1 bg-slate-400">
                    <div className="flex flex-col lg:flex-col-reverse bg-stone-500 w-full">
                        <div className="bg-stone-400 editor">
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
