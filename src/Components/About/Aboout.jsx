import React from 'react'

export default function Aboout() {
    return (
        <div className='flex flex-wrap  lg:flex-row items-center justify-start p-4'>
            <div className='w-[92%] lg:w-[80%]  text-center p-1 bg-[rgba(255,255,255,0.06)] rounded-[10px]' >
                <h2 className='text-[30px] m-4 font-bold'>About Me</h2>

                <p className='p-2 m-4 text-[12px] sm:text-base md:text-md lg:text-lg' >Hi there! I’m Rakesh Kundu, a 8th‑semester ECE student at ABACUS Institute of Engineering and Management and a passionate programmer bridging the gap between hardware and software. With expertise in Python, MicroPython, JavaScript, and modern web frameworks like React, Redux, and Tailwind CSS—enhanced by smooth animations with GSAP—I build sleek, user‑friendly front‑ends and immersive web experiences. On the hardware side, I dive into IoT projects, from integrating weather APIs with custom sensor rigs to real‑time data visualizations on Raspberry Pi, all within my favorite playground: Linux. I thrive on tackling end‑to‑end projects that empower users—whether it’s dynamic weather apps, interactive dashboards, or platforms for my college coding club. As I seek my first industry role, I’m eager to collaborate with experts, gain hands‑on experience, and grow into a full‑stack or IoT specialist. When I’m not coding or soldering, you’ll find me exploring new Linux tools, reading about embedded systems, or experimenting with UI animations—always learning, always creating. Let’s connect and build something amazing together!</p>
            </div>
        </div>
    )
}
