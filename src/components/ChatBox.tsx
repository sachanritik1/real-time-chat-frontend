import SideBar from "./SideBar";
import Chat from "./Chat";
import ChatInput from "./ChatInput";

const ChatBox = () => {
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <SideBar />
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  {Array.from("helloworld").map((_, i) => (
                    <Chat left={i % 2 === 0} key={i} />
                  ))}
                </div>
              </div>
            </div>
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
