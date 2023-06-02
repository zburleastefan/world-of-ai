'use client'
import { PhotoIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "react-tooltip";
import Link from "next/link";
import SquigglyLines from "../components/SquigglyLines";
import MainHeader from "../components/MainHeader";
import { authContext } from "../context/AuthContext";

function Home() {
    const welcomeText ='Hello and welcome';
  
return (
    <>
        <MainHeader/>
        <div className="flex flex-col items-center bg-[#476ec2] bg-no-repeat bg-center bg-cover place-items-center bg-[url('/aiImg.svg')] justify-start h-screen w-screen overflow-y-auto overflow-x-hidden p-3 text-white">
            <h3 className="text-white justify-between items-center text-center p-3 opacity-80">{welcomeText} <span className="font-semibold hover:underline hover:text-[#11A37F] hover:opacity-100">{authContext?.currentUser?.displayName || authContext?.currentUser?.email}</span>!</h3>
            <Link 
                href="/generateimage" 
                className="md:hover:scale-105 transition duration-700 hover:shadow-amber-500/80 bg-[url('/iguanashirt.svg')] bg-[#1ef1f8] bg-no-repeat bg-center bg-contain border 
                border-t border-transparent rounded-3xl flex p-3 m-2 md:m-5 justify-center items-center hover:shadow-lg"
            >
                <div className="mx-auto max-w-4xl text-center items-center flex text-3xl font-display font-serif md:text-5xl font-bold tracking-normal text-white ">
                    <PhotoIcon className='inline-block h-11 w-11 m-2 text-white hover:text-[#11A37F]'/>
                    <span className="font-mono text-5xl">AI</span>{" "}
                    <span className="relative ml-2 whitespace-nowrap text-[#3290EE]">
                        <SquigglyLines />
                        <span className="relative">Image</span>
                    </span>
                </div>
            </Link>
            <Link 
                href="/texttospeech" 
                className="md:hover:scale-105 transition duration-700 hover:shadow-amber-500/80 bg-[url('/iguanashirt.svg')] bg-[#9c33ff] bg-no-repeat bg-left bg-contain border 
                border-t border-transparent rounded-3xl flex p-3 m-2 md:m-5 justify-center items-center hover:shadow-lg"
            >
                <div className="mx-auto max-w-4xl text-center items-center flex text-3xl font-display font-serif md:text-5xl font-bold tracking-normal text-white ">
                    <SpeakerWaveIcon className='inline-block h-11 w-11 m-2 text-white hover:text-[#11A37F]'/>
                    <span className="font-mono text-5xl">AI</span>{" "}
                    <span className="relative ml-2 whitespace-nowrap text-[#3290EE]">
                        <SquigglyLines />
                        <span className="relative">Speech</span>
                    </span>
                </div>
            </Link> 
            <Tooltip id='tooltip' className='text-white font-sans text-xs rounded-full justify-center p-1 text-center bg-white/30 absolute' />
        </div>
    </>
  )
};

export default Home;