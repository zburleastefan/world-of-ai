'use client'
import Link from 'next/link'
import SquigglyLines from './SquigglyLines'
import { HomeModernIcon } from '@heroicons/react/24/solid'
import { Tooltip } from 'react-tooltip';

function Header() {
  return (
    <header className=" flex-col justify-center p-3">
   
            <div className="flex m-3 space-x-2 md:space-x-5 items-center">
                <Link href="/" className="tooltip text-white flex mx-3 space-x-2 md:space-x-5 items-center" data-tooltip-id="tooltip" data-tooltip-content="Home"  data-tooltip-place='bottom'>
                    <HomeModernIcon 
                        className='h-8 w-8 md:h-14 md:w-14 text-white cursor-pointer hover:text-[#11A37F]'
                    />     
                </Link>
                
                <h1 className="mx-auto max-w-4xl text-3xl font-display font-serif md:text-5xl font-bold tracking-normal text-slate-400/90 ">
                    AI Image{" "}
                    <span className="relative whitespace-nowrap text-[#3290EE]">
                        <SquigglyLines />
                        <span className="relative">Generator</span>
                    </span>
                </h1>
            </div>

            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                <a
                    className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 text-gray-400 text-xs font-mono"
                    href="https://openai.com/product/dall-e-2"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    powered by <span className='text-white font-serif text-base'>DALL-E 2</span>{' '}
                </a>
            </div>
            <Tooltip anchorSelect=".tooltip" id='tooltip' className='text-white font-sans text-xs rounded-full justify-center p-1 text-center bg-white/30 absolute'/>
    </header>
  )
}

export default Header