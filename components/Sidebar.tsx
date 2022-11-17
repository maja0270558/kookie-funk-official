import React, { useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";
import CollapsIcon from "./icons/CollapseIcon";
/// Redux import
import { useSelector, useDispatch } from "react-redux";
import { clickCollapse } from "../slices/sidebarSlice";
import { RootState } from "../store";

const Sidebar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const collapse = useSelector(
        (state: RootState) => state.slider.toggleCollapse
    );
    interface MenuItem {
        label: string;
        link: string;
    }
    const menuItems: MenuItem[] = [
        { label: "home", link: "/home" },
        { label: "works", link: "/works" },
        { label: "store", link: "/store" },
        { label: "course", link: "/course" },
        { label: "contact", link: "/contact" },
    ];

    const wrapperClasses = classNames(
        "min-h-screen flex justify-between flex-col ease-in-out duration-300  min-w-full ",
        {
            ["w-80 pl-10 lg:pr-32"]: !collapse,
            ["w-20"]: collapse,
        }
    );

    const collapseIconClasses = classNames(
        "p-4 rounded bg-light-lighter absolute right-0 top-5 ease-in-out duration-300",
        {
            "rotate-180": collapse,
        }
    );

    const sideBarClasses = classNames(
        "pt-6 lg:pt-10 flex-col flex ease-in-out duration-300",
        {
            "opacity-0 invisible": collapse,
            "opacity-100": !collapse,
        }
    );

    const getLinkItemClasses = (isSelected: boolean) => {
        return classNames("uppercase mb-3 pl-1 rounded text-sm", {
            ["text-white bg-[#66DC5A]"]: isSelected,
            ["text-black bg-white hover:bg-lime-200"]: !isSelected,
        });
    };

    const profileImage = "/profile.jpg";

    return (
        <div className={wrapperClasses}>
            <div className="">
                <button
                    className={collapseIconClasses}
                    onClick={() => dispatch(clickCollapse())}
                >
                    <CollapsIcon />
                </button>
                <div className={sideBarClasses}>
                    <div className="pb-16">
                        <Image
                            className=""
                            src={profileImage}
                            alt={"profile"}
                            width={120}
                            height={0}
                        ></Image>
                    </div>

                    <div className="flex-grow w-24">
                        {menuItems.map(({ ...menu }) => {
                            const isSelected = router.pathname == menu.link;
                            return (
                                <Link href={`${menu.link}`}>
                                    <p
                                        className={getLinkItemClasses(
                                            isSelected
                                        )}
                                    >
                                        {menu.label}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                    <div className="absolute bottom-0">
                        {" "}
                        <Footer />{" "}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="text-gray-600 body-font">
            <div className="container  py-8 mx-auto  items-center sm:flex-row flex-col">
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                    <a className="text-gray-500">
                        <svg
                            fill="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                        >
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                        </svg>
                    </a>
                    <a className="ml-3 text-gray-500">
                        <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                        >
                            <rect
                                width="20"
                                height="20"
                                x="2"
                                y="2"
                                rx="5"
                                ry="5"
                            ></rect>
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                        </svg>
                    </a>
                    <a className="ml-3 text-gray-500">
                        <svg
                            fill="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                        >
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                        </svg>
                    </a>
                </span>
            </div>
        </footer>
    );
};

export default Sidebar;
