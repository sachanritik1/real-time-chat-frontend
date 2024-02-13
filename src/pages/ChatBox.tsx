import SideBar from "../components/SideBar";
import Chat from "../components/Chat";
import ChatInput from "../components/ChatInput";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ChatType } from "../constants";
import { SupportedOutgoingMessage } from "../constants";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom, wsAtom, currentRoomIdAtom } from "../store/store";
import DefaultChatPage from "../components/DefaultChatPage";

const ChatBox = () => {
  const user = useRecoilValue(userAtom);
  const currentRoomId = useRecoilValue(currentRoomIdAtom);
  const [chats, setChats] = useState<ChatType[]>([]);
  const [ws, setWs] = useRecoilState(wsAtom);
  console.log(chats);

  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
    setWs(socket);
    if (!ws) return;
    ws.onopen = () => {
      console.log("Connected to server");
    };
    ws.onmessage = (message) => {
      console.log(message.data);
      const outgoingMessage = JSON.parse(message.data);
      if (outgoingMessage.type === SupportedOutgoingMessage.AddChat) {
        setChats((prevChats) => [...prevChats, outgoingMessage.payload]);
      } else if (outgoingMessage.type === SupportedOutgoingMessage.UpdateChat) {
        const chat = chats.find(
          (c) => c.chatId == outgoingMessage.payload.chatId
        );
        const updatedChat = {
          ...chat,
          ...outgoingMessage.payload,
        };
        setChats([...chats, updatedChat]);
      } else {
        console.log("Unsupported Message Types");
      }
    };
    return () => {
      if (!ws) return;
      ws.onclose = () => {
        console.log("Disconnected from server");
      };
    };
  }, []);

  console.log("user", user);

  return user ? (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <SideBar />
        {currentRoomId ? (
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              {chats.length > 0 ? (
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                  <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                      {chats.map((chat) => (
                        <Chat
                          key={chat.chatId}
                          left={chat?.userId !== user?.userId}
                          chat={chat}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center my-auto italic font-semibold">
                  No Chats Yet
                </div>
              )}
              <ChatInput />
            </div>
          </div>
        ) : (
          <DefaultChatPage />
        )}
      </div>
    </div>
  ) : (
    <Navigate to="/signin" />
  );
};

export default ChatBox;
