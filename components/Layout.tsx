import { ReactNode } from "react";
import Sidebar from "./Sidebar";
/// Redux import
import { useSelector } from "react-redux";
import { RootState } from "../store";
import classNames from "classnames";

type Props = {
    children: ReactNode;
};

export const Layout = ({ children }: Props) => {
    const collapse = useSelector(
        (state: RootState) => state.slider.toggleCollapse
    );

    const slidebarClasses = classNames(
        "h-full z-10 fixed top-0 left-0 bg-white",
        {
            ["drop-shadow-none"]: collapse,
            ["drop-shadow-lg lg:drop-shadow-none"]: !collapse,
        }
    );

    const childrenClasses = classNames(
        "z-0 absolute top-0 ease-in-out duration-300 flex w-full",
        {
            ["pl-20"]: collapse,
            ["pl-20 lg:pl-80 opacity-50 lg:opacity-100"]: !collapse,
        }
    );

    const maskClasses = classNames(
        "absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-gray-400",
        {
            ["opacity-0"]: collapse,
            ["opacity-50 lg:opacity-0"]: !collapse,
        }
    );

    return (
        <div className="relative">
            <div className={slidebarClasses}>
                <Sidebar />
            </div>
            <div className={childrenClasses}>
                <div className={maskClasses}></div>
                {children}
            </div>
        </div>
    );
};
