import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";


export default function Card({ msg, name, pos, active, index }) {
    const [show, setShown] = useState(false);

    const props3 = useSpring({
        background: "white",
        transform: show ? "scale(1.03)" : "scale(1.03)",
        // boxShadow: show
        // ? "0 30px 25px rgb(0 0 0 / 25%)"
        // : "0 20px 10px rgb(0 0 0 / 8%)"
    });

    return (
        <animated.div
            className="rounded-md w-[92vw] mx-auto max-w-[31rem] min-h-[260px] p-4 flex flex-col gap-4 justify-evenly m-2 shadow-2xl md:w-full md:p-6 md:border-6 lg:border-8 lg:min-w-[31rem]"
            style={props3}
            onMouseEnter={() => setShown(true)}
            onMouseLeave={() => setShown(false)}
        >
            <p className="text-base md:text-lg lg:text-xl">
                {msg}
            </p>
            <div>
            <h2 className="text-base md:text-lg lg:text-xl font-bold text-[#DF0000]">
                {name}
            </h2>
            <h2 className="text-xs md:text-[14px] lg:text-base">
                {pos}
            </h2>
            </div>

        </animated.div>
    )
}