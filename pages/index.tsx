import React from "react";

const home = () => {
    return (
        <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 items-center max-h-screen">
            <div className="p-8">
                <div className="mx-auto max-w-xl text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                        KOOKIE FUNK.
                    </h2>

                    <div className="text-gray-500 md:mt-4 md:block">
                        <p>
                            Hi，我是曲奇放克，這是一個正經的網站，相關合作歡迎詢問。
                        </p>
                        <br></br>
                        <p>
                            『
                            在創作的路上，逐漸學會挖掘自己的內心，進一步的了解自己，才會明白自己喜歡什麼、不喜歡什麼、討厭什麼、害怕什麼，唯有如此，也才能多放過自己一點。
                            』
                        </p>
                    </div>
                </div>
            </div>

            <img
                alt="funk"
                src="https://scontent-tpe1-1.xx.fbcdn.net/v/t1.6435-9/87069518_1559089714245860_1648573392128835584_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=ZX012cSb0s8AX__Ylsl&_nc_ht=scontent-tpe1-1.xx&oh=00_AfDyN39biIFh_grs0YwRXP8vWSbKLhhx3JwgggNZ5GnuGg&oe=639BC718"
                className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-[30px] md:h-[calc(100%_-_4rem)] md:rounded-[60px]"
            />
        </section>
    );
};

export default home;
