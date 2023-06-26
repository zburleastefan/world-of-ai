'use client'
import { toast } from 'react-hot-toast';
import { FormEvent, useState } from "react";
import SquigglyLines from './SquigglyLines';
import { HomeModernIcon } from '@heroicons/react/24/solid';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase/firebaseConfig";

declare const window: any;
function GenerateSpeechFromText() {
    const [prompt, setPrompt] = useState("");
    const [textListCounter, setTextListCounter] = useState(false);
    const placeholdermsg = "Generate AI audio from text...";
    
    const [messages] = useCollection(auth && query(
        collection(db, "users", auth?.currentUser?.email!, "Text", auth?.currentUser?.uid!, 'textList'),
        orderBy("createdAt","desc"),
    ));  

    const handlePrompt = (promptMessage: string) => {
        setPrompt(promptMessage);
        playAudio(promptMessage);

    }

    const playAudio = (msg: string) => {
        if ('speechSynthesis' in window) {
            // Speech Synthesis is supported 🎉
            toast.success('Speech Synthesis is supported 🎉');
            let audioUtterance = new SpeechSynthesisUtterance(msg);
            speechSynthesis.speak(audioUtterance);
        } else {
            toast.error('Speech Synthesis is not Supported 😞');
            return;
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!prompt) return;
        const notification = toast.loading('AI is thinking...');

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
        setPrompt(""); 
            
        playAudio(userInput);

        await fetch("/api/sendBase64ToDb", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: userInput,
                audio: '',
                auth,
            }),     
        }).then(() => {
            toast.success('Success!', { 
                id: notification,})
        }).catch((error) => {
            toast.error(JSON.stringify(error), { 
                id: notification,});
        })
    };

return (
        <>
            <header className="flex flex-col w-screen px-1 md:px-10">
                <div className="flex m-1 md:m-3 items-center text-center justify-between">
                    <Link href="/" className="tooltip text-white" data-tooltip-id="tooltip" data-tooltip-content="Home"  data-tooltip-place='bottom'>
                        <HomeModernIcon 
                            className='h-8 w-8 md:h-14 md:w-14 text-white hover:text-[#11A37F]'
                        />     
                    </Link>
                    <div className="text-3xl font-display font-serif md:text-5xl font-bold tracking-normal text-slate-400/90 ">
                        <span className="font-mono text-5xl">AI</span>{" "}
                        <span className="relative whitespace-nowrap text-[#3290EE]">
                            <SquigglyLines />
                            <span className="relative">Speech</span>
                        </span>
                        {" "}Generator
                    </div>
                </div>
                <div className="flex items-center justify-center from-white via-white dark:from-black dark:via-black">
                    <a
                        className="text-gray-400 text-xs font-mono"
                        href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API?ref=assemblyai.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                         powered by <span className='text-white/90 font-serif text-base'>Assembly AI</span>{' '}
                    </a>
                </div>
                <Tooltip anchorSelect=".tooltip" id='tooltip' className='text-white font-sans text-xs rounded-full justify-center p-1 text-center bg-white/30 absolute'/>
            </header>
            
            <div className="overflow-y-auto overflow-x-hidden bg-center bg-contain bg-[url('/aiSpeakingGirl.svg')] bg-neutral-400 w-screen h-full">
                <div className="px-1 md:px-10 overflow-y-auto overflow-x-hidden w-screen flex flex-col">
                    <form id="form" onSubmit={handleSubmit} className="p-1 flex shadow-md shadow-red-800/80 rounded-full">
                        <input 
                            id="text"
                            type='text'
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder={placeholdermsg} 
                            className="flex-1 rounded-xl p-0 md:p-2 bg-transparent md:w-96 text-yellow-500 font-bold border placeholder:text-yellow-500 placeholder:font-bold"
                        />
                        <button 
                            id="generate"
                            type="submit"
                            onClick={() => {
                                setTextListCounter(true)
                            }}
                            disabled={!prompt || !auth || prompt == " "} 
                            className="bg-[#11A37F] hover:opacity-50 inline-block text-white w-[70px] md:w-auto
                            rounded-2xl disabled:bg-gray-300 disabled:cursor-not-allowed font-bold md:p-2 ml-1 md:ml-2"
                        >
                            Generate Audio
                        </button>
                        <button type="button" onClick={() => setTextListCounter(current => !current)} className="text-white hidden md:inline-block w-[50px] md:w-auto border rounded-2xl  md:p-2 md:ml-2">
                            {textListCounter ? 'Hide' : 'Show'} Audio
                        </button>
                    </form>
                    <div className={`px-5 overflow-y-auto overflow-x-hidden ${textListCounter ? 'visible' : 'invisible'}`}>
                        {messages?.empty && (
                            <div>
                                <div className="text-yellow-500 text-center mt-2 ">
                                    <div className="flex mx-auto justify-center mt-2 animate-bounce ">
                                        <p className="my-auto">No text in database.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!messages?.empty && (
                            <div className="justify-center m-2">
                                {messages?.docs.map((message) => (
                                    <li key={message.id} className={`flex  p-1 justify-center items-center`}>
                                        <button onClick={() => handlePrompt(message.data().prompt)} className="text-yellow-500 border rounded-2xl px-1 text-center md:hover:scale-105 xl:scale-95 transition duration-700 border-t hover:shadow-md hover:shadow-amber-500/80">
                                            {message.data().prompt}
                                        </button>
                                    </li>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default GenerateSpeechFromText;