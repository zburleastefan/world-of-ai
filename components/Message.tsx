import { DocumentData } from "@firebase/firestore";

type Props = {
    message:  DocumentData,
};

function Message({message}: Props) {
    const isChatGPT = message.user.name === "ChatGPT"; 
    const messageNewLine = message.text.replace(/\\n/g, "\n");

    return (
        <div className={`flex-col items-center justify-start flex overflow-auto text-start ${isChatGPT && "text-white"} ${!isChatGPT && "text-white/70"}`}>
            <p className="text-base">
                { isChatGPT ? (
                    <div className="new-line">
                        {messageNewLine}
                    </div>
                ) : (
                    <div>
                        {message.text}
                    </div>
                )}
            </p>           
        </div>
    )
};

export default Message;