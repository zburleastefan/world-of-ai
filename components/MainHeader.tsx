import React from 'react';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { Tooltip } from 'react-tooltip';
import Image from 'next/image';
import SquigglyLines from './SquigglyLines';
import userImage from '../public/defaultUser.svg';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';

function MainHeader() {
  return (
    <header className="flex flex-row  bg-black place-items-center sticky py-5 z-10 top-0 p-1 items-center justify-around">
        <button onClick={() => signOut(auth)} data-tooltip-id="tooltip" data-tooltip-content="Sign out"  data-tooltip-place='bottom' className='tooltip text-white'>
            <ArrowLeftOnRectangleIcon 
                className='h-8 w-8 md:h-14 md:w-14 text-white cursor-pointer hover:text-[#11A37F]'
            />     
        </button>
        <h1 className="text-4xl font-display text-center items-center font-serif md:text-6xl font-bold tracking-normal text-white/90 ">
                World of{" "}
            <span className="relative whitespace-nowrap text-[#3290EE]">
                <SquigglyLines />
                <span className="relative ">AI</span>
            </span>
        </h1>
        <Image 
            src={auth?.currentUser?.photoURL || userImage} 
            alt={'photo'} 
            width={200} height={200} 
            className='h-8 w-8 md:h-14 md:w-14 rounded-full bg-white bg-blend-saturation m-1'
        />
        <Tooltip anchorSelect=".tooltip" id='tooltip' className='text-white font-sans text-xs rounded-full justify-center p-1 text-center bg-white/30 absolute'/>
    </header>
  )
}

export default MainHeader;