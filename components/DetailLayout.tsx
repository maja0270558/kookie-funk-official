import { ReactNode } from "react";

type Props = {
    image: ReactNode;
    title: ReactNode;
    content: ReactNode;
    otherSection: ReactNode;
};

export const DetailLayout = ({
    image,
    title,
    content,
    otherSection,
}: Props) => {
    return (
        <div className="flex flex-col p-4">
            <div className="flex flex-row place-content-center">
                <div className="flex flex-col lg:flex-row flex-1 lg:gap-8">
                    <div className=" block m-auto align-middle">{image}</div>

                    <div className="flex lg:min-w-[30%] self-stretch">
                        <div className="flex flex-1 lg:items-end">{title}</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 lg:items-end">{content}</div>
            {otherSection}
        </div>
    );
};
