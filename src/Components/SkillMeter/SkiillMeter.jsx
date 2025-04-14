import React, { useContext, useState, useEffect } from 'react'
import { DataContext } from '../../Context/DataContext'

function Status(num) {
    if (num <= 30) {
        return "Noob";
    } else if (num <= 50 && num > 30) {
        return "Beginner";
    } else if (num <= 70 && num > 50) {
        return "Intermediate";
    } else if (num <= 90 && num > 70) {
        return "Pro";
    } else if (num <= 100 && num > 90) {
        return "Legend";
    } else {
        return "Out of range"; // For numbers outside 20-100
    }
}

function Colors(num) {
    if (num <= 30) {
        return `rgb(212, 49, 0)`;
    } else if (num <= 70 && num > 30) {
        return `rgb(227, 151, 0)`;
    } else if (num <= 100 && num > 70) {
        return `rgba(28, 208, 0)`;
    } else {
        return `rgba(128, 128, 128, 0.8)`; // Gray for out-of-range values
    }
}

export default function SkiillMeter({ Name = '', num = 0 }) {
    const [isLoading, setIsLoading] = useState(true);
    const { BackGroundColor } = useContext(DataContext)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Set loading to false after 2 seconds
        }, 600); 
        return () => clearTimeout(timer); // Cleanup timer
    }, []);

    const [Bar, setBar] = useState(0)
    
    const targetNumber = num
    let currentNumber = 0; // Start from 0
    const duration = 2000; // 2 seconds duration
    const intervalTime = 20; // Time interval for each increment (50ms)
    const steps = duration / intervalTime; // Total number of steps
    const increment = targetNumber / steps; // How much to increment each step
    useEffect(() => {

        const interval = setInterval(() => {
            currentNumber += increment; // Increment the number
            if (currentNumber >= targetNumber) {
                clearInterval(interval); // Stop the interval when the target is reached
                currentNumber = targetNumber; // Ensure it exactly matches the target
            }
            setBar(Math.round(currentNumber));
        }, intervalTime);
    }, [])

    return (
        <div
            className={` w-[100%] lg:w-[45%]  bg-slate-600 m-1 p-1 rounded-[8px] opacity-0 transition-opacity duration-1000 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'
                } `}
            style={{ backgroundColor: BackGroundColor }}
        >
            <p className='text-left p-2 font-bold'>{Name}</p>
            <div className="flex items-center justify-center" >

                <div className='w-[90%] m-1 rounded h-[28px] p-0 ' style={{ backgroundColor: BackGroundColor }}>

                    <div className={`rounded h-[100%] p-0 flex items-center justify-center font-semibold overflow-hidden ${num > 90 ? 'glowing-div' : ''
                        }`}
                        style={{ width: `${Bar}%`, backgroundColor: Colors(num) }}>
                        {Status(num)}
                    </div>

                </div>
            </div>
        </div>
    )
}
