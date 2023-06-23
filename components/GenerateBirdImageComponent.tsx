'use client'
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import SquigglyLines from './SquigglyLines';
import { HomeModernIcon } from '@heroicons/react/24/solid';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';
import { auth, db } from "../firebase/firebaseConfig";
import Image from "next/image";
import { NextPage } from "next";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "@firebase/firestore";
import { rapidApiGenerateBirdAiImg } from "../utils/rapidApiGenerateBirdAiImg";

let base64String: string = '';
const GenerateBirdImageComponent: NextPage= () => {
    const [prompt, setPrompt] = useState<string>('');
    const placeholdermsg = "Describe your birds. Warning: birds only!";

    const [imageUrls] = useCollection(auth && query(
        collection(db, "users", auth?.currentUser?.email!, "Images", auth?.currentUser?.uid!, "birdImageList"),
        orderBy("createdAt","desc"),
    ));
    
    const hideContent = (itemId: string, prompt: string) => {
        const btn = document.getElementById(`btn&${itemId}`);
        const box = document.getElementById(`box&${itemId}`);
    
        if (box?.style.display === 'none') {
            box!.style.display = 'flex';
            btn!.textContent = "Hide image : '" + prompt + "'";
        } else {
            box!.style.display = 'none';
            btn!.textContent = "Show image : '" + prompt + "'";
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!prompt) return;
        const notification = toast.loading('AI image generator is thinking...');

        let userInput = prompt.trim();
        while (userInput[0] == ' ') {
            userInput = userInput.trim();
        }
        
        if (!userInput || userInput ==' ') {
            toast.error("You entered only white spaces. Please type in a valid message!", { 
              id: notification,});
            setPrompt("");
            return;
        }
        setPrompt('');

        await rapidApiGenerateBirdAiImg(userInput).then((response) => {
          base64String = response.result;
          if (response.error) {
            toast.error(response.error.message, { 
              id: notification,});
          }
        }).catch((error) => toast.error(error, {id: notification}));
          
        toast.loading('Sending image to database...', { 
          id: notification,});

        await fetch("/api/sendBase64ToDb", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              prompt: userInput, 
              auth: auth,
              base64Image: base64String
          }),     
        }).then(async (response) => {
          toast.success('Success!', { 
              id: notification,});
        }).catch(error => toast.error( error, { 
          id: notification}));
    };
    
    return (
        <>
          <header className="flex flex-col w-screen px-1 md:px-10">
              <div className="flex m-1 md:m-3 text-white items-center text-center justify-between">
                  <Link href="/" className="tooltip" data-tooltip-id="tooltip" data-tooltip-content="Home"  data-tooltip-place='bottom'>
                      <HomeModernIcon 
                          className='h-8 w-8 md:h-14 md:w-14 hover:text-[#11A37F]'
                      />     
                  </Link>
                  <div className="text-3xl font-display font-serif md:text-5xl font-bold tracking-normal text-slate-400/90 ">
                    <span className="font-mono text-5xl">AI</span>{" "}
                    <span className="relative whitespace-nowrap text-[#ee4b45]">
                        <SquigglyLines />
                        <span className="relative">Bird Image</span>
                    </span>
                    {" "}Generator
                  </div>
              </div>
              <div className="flex items-center justify-center from-white via-white dark:from-black dark:via-black">
                <a
                  className="text-gray-400 text-xs font-mono"
                  href="https://rapidapi.com/OpenedAI/api/dall-e-bird-images-from-text"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  powered by <span className='text-white/90 font-serif text-base'>RapidAPI DALL-E Bird Images from Text</span>
                </a>
              </div>
              <Tooltip anchorSelect=".tooltip" id='tooltip' className='text-black font-sans text-xs rounded-full justify-center p-1 text-center bg-white/30 absolute'/>
          </header>

          <div className="overflow-y-auto overflow-x-hidden bg-center bg-cover bg-[url('/birdImageGenerator.svg')] bg-[#ee4b45]/30 w-screen h-full">
            <div className="overflow-y-auto overflow-x-hidden">
              <div className="px-1 md:px-10 overflow-y-auto overflow-x-hidden flex flex-col">
                <form id="form" onSubmit={handleSubmit} className="p-1 flex shadow-md shadow-red-800/80 rounded-full">
                    <input 
                        id="text"
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={placeholdermsg} 
                        className="flex-1 rounded-xl p-0 md:p-2 bg-transparent md:w-96 text-yellow-500 font-bold border placeholder:text-yellow-500 placeholder:font-bold"
                    />
                    <button 
                        id="generate"
                        type="submit"
                        disabled={!prompt || !auth || prompt == " " || prompt == ""} 
                        className="bg-[#11A37F] hover:opacity-50 inline-block text-black w-[70px] md:w-auto
                        rounded-2xl disabled:bg-gray-300 disabled:cursor-not-allowed font-bold  md:p-2 ml-1 md:ml-2"
                    >
                        Generate Image
                    </button>
                </form>

                <div className={`overflow-hidden justify-center items-center flex flex-col mt-1 `}>
                  <div className="grid grid-col-1">
                    <div className="overflow-y-auto overflow-x-hidden">
                      {imageUrls?.empty && (
                        <div>
                          <div className="text-yellow-500 text-center mt-10 ">
                            <div className="flex mx-auto justify-center mt-6 animate-bounce">
                              <p className="my-auto">Database is empty!.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {!imageUrls?.empty && (
                        <div className="items-center flex flex-col overflow-y-auto overflow-x-hidden font-semibold">
                          { imageUrls?.docs.map((item) => (
                            <ul id={item.id}  key={item.id} className="flex flex-col items-center overflow-hidden" >
                                <a href={`#${item.id}`} id={`btn&${item.id}`} className="text-yellow-500 cursor-pointer border rounded-xl font-bold my-1 p-1 px-2 hover:scale-95 duration-700 ease-in-out transition hover:text-red-500 hover:shadow-red-500 hover:shadow-inner" onClick={() => {hideContent(item.id, item.data().prompt)}}>
                                  Show image : &apos;{item.data().prompt}&apos;
                                </a>
                                <div id={`box&${item.id}`} style={{display:"none"}} className={`flex flex-col items-center`}>
                                    <div className="tracking-tight grid grid-cols-1 text-yellow-500 justify-center overflow-hidden">
                                      <li className={`flex p-2 md:px-6 justify-center`}>
                                          <figure className={`relative flex flex-col items-center justify-start text-center hover:scale-95 transition duration-1000 ease-in-out rounded-2xl p-6 shadow-xl shadow-slate-900/10 border `}>
                                              <figcaption className="relative border-slate-100/50 space-y-1 hover:scale-110 ease-in-out duration-700">
                                                <Image 
                                                  src={`data:image/jpeg;base64,${item.data().base64Image}`}
                                                  alt='photo' 
                                                  width={500} height={500} 
                                                  className='h-auto w-52 rounded-2xl bg-white bg-blend-saturation object-contain'
                                                />
                                              </figcaption>
                                          </figure>
                                      </li>
                                    </div>
                                </div>
                            </ul>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}

export default GenerateBirdImageComponent;