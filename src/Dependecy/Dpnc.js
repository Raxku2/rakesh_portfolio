import { useEffect, useState } from "react"
// side = 'l', url = '', ProjectName = 'nam', Desc = 'description'
const SkillsList = [
    ['Python', 91],
    ['MicroPython', 72],
    ['C Programming', 97],
    ['Arduino', 95],
    ['JavaScript', 80],
    ['HTML', 93],
    ['CSS', 74],
    ['Tailwind CSS', 80],
    ['GSAP',51],
    ['React', 85],
    ['Express js', 30],
    ['Bootstrap', 87],
    ['Git & GitHub', 62],
    ['NGINX', 22],
    ['Bash Script', 48],
]

const DisPlayProjects = [
        
    ['Fake API', 'Fake API is a lightweight and flexible dummy API designed to make API handling in frontend projects smooth and efficient. It provides structured test data, allowing developers to integrate and test APIs without relying on a real backend. This project also serves as a learning tool for exploring and practicing technologies like Node.js, Express.js, ', 'https://fake-api-4waa.onrender.com/', 'r'],
    ['Pico Weather API', 'A lightweight weather API using a Raspberry Pi Pico W and a DHT11 sensor. This project provides real-time temperature, humidity, heat index, and dew point readings via a local web server. Access sensor data over Wi-Fi using a simple HTTP request. Perfect for DIY weather monitoring!  ', 'https://github.com/rax-2/Pico-Weather-API-elc', 'l'],
    ['Pro Weather', ' Pro Weather: A React/Redux app for real-time weather & 6-day forecasts via OpenWeather API.', 'https://pro-weather-psi.vercel.app/', 'r'],
]

const Name = "Rakesh Kundu"
const Bio = " | ECE Student & WebDev/IoT Enthusiast | Python · React · MicroPython · Linux |"
const BackGroundColor = ' rgba(255,255,255,0.059)'
const HovColor = 'rgba(255,255,255,0.158)'

export { SkillsList, Name, Bio, BackGroundColor, HovColor, DisPlayProjects }
