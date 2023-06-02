import ChatPage from "../../../components/ChatPage";

const Chat = async () =>  {
    return (
        <div 
            className="relative bg-[#476ec2] bg-no-repeat bg-center bg-cover object-scale-down place-items-center 
            bg-[url('/chatgptLogo.svg')] h-screen w-screen flex flex-col items-center justify-center text-center overflow-hidden"
        >      
            <ChatPage/>
        </div>
    )
}; 

export default Chat;