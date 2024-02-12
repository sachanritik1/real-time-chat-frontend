import SideBar from "./SideBar";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatType, SupportedIncomingMessage } from "../constants";
import { SupportedOutgoingMessage } from "../constants";

const ChatBox = () => {
  const navigate = useNavigate();
  const [roomIds, setRoomIds] = useState<string[]>([]);
  const [roomId, setRoomId] = useState<string>("");
  const [chats, setChats] = useState<ChatType[]>([]);
  const ws = useRef<WebSocket | null>(null);
  console.log(chats);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");
    ws.current.onopen = () => {
      console.log("Connected to server");
    };
    ws.current.onmessage = (message) => {
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
      if (!ws.current) return;
      ws.current.onclose = () => {
        console.log("Disconnected from server");
      };
    };
  }, []);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("name");
    if (!userId || !name) {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("http://localhost:8080/rooms");
      const json = await response.json();
      console.log(json);
      setRoomIds(json.roomIds);
    };
    fetchRooms();
  }, []);

  const addChat = (message: string) => {
    if (message) {
      const newChat = {
        roomId,
        userId: localStorage.getItem("userId") || "",
        message,
      };
      const data = {
        type: SupportedIncomingMessage.SendMessage,
        payload: newChat,
      };
      if (!ws) return;
      ws.current?.send(JSON.stringify(data));
    }
  };

  const joinRoom = (roomId: string) => {
    const data = {
      type: SupportedIncomingMessage.JoinRoom,
      payload: {
        roomId: roomId,
        userId: localStorage.getItem("userId") || "",
        name: localStorage.getItem("name") || "",
      },
    };
    if (!ws) return;
    ws.current?.send(JSON.stringify(data));
  };

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <SideBar roomIds={roomIds} joinRoom={joinRoom} setRoomId={setRoomId} />
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  {chats.map((chat) => (
                    <Chat
                      key={chat.chatId}
                      left={chat?.userId !== localStorage.getItem("userId")}
                      chat={chat}
                    />
                  ))}
                </div>
              </div>
            </div>
            <ChatInput addChat={addChat} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
