import React, { useEffect, useRef } from "react";
import GitHubCalendar from "github-calendar";
import "github-calendar/dist/github-calendar-responsive.css";

const GitHubCalendarComponent = ({ username }) => {
    const calendarRef = useRef(null);

    useEffect(() => {
        if (username && calendarRef.current) {
            GitHubCalendar(calendarRef.current, username, {
                responsive: true,
                global_stats: false,
            });
            calendarRef.current.classList.add("dark-mode-calendar");
        }
    }, [username]);

    return (
        <>
            <div className="p-1  md:p-4 bg-[rgba(255,255,255,0.06)] m-2 rounded-[8px] w-[90%] md:w-auto ">
                < h2 className="text-center font-bold text-[12px] " >
                    {username ? `${username}'s GitHub Activity` : "GitHub Activity"
                    }
                </h2 >
                <div className="text-white  flex ">
                    <div ref={calendarRef} className="github-calendar transform scale-[0.9] md:scale-[1] w-[100%] md:w-auto h-auto text-[10px] font-medium"></div>
                </div>
            </div>
            
        </>
    );
};

export default GitHubCalendarComponent;
