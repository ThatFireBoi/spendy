import React, { useState, useEffect } from "react";

export const DigitalClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return <div>{time.toLocaleTimeString()}</div>;
};
