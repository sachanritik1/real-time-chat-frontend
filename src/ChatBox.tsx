import { useEffect, useRef } from "react";
import { Chat, SupportedIncomingMessage } from "./constants";

const ChatBox = () => {
  const chatRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const addChat = () => {
    const message = chatRef.current?.value;
    const name = nameRef?.current?.value;
    if (message) {
      const newChat = {
        roomId: "1",
        userId: name,
        message,
      };
      const data = {
        type: SupportedIncomingMessage.SendMessage,
        payload: newChat,
      };

      if (!ws) return;
      ws.current?.send(JSON.stringify(data));
      chatRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center  p-4 rounded-lg h-full w-screen mx-auto">
      <input
        className="py-2 px-4 rounded-lg my-4 bg-slate-500 text-white"
        type="text"
        placeholder="type name here..."
        ref={nameRef}
      />
      <button
        className="py-2 px-4 rounded-md text-white bg-gray-600 hover:bg-gray-800"
        onClick={joinRoom}
      >
        Join Room
      </button>
      <div className="my-4 flex gap-4">
        <input
          className="py-2 px-4 rounded-lg bg-slate-500 text-white"
          type="text"
          placeholder="type chat here..."
          ref={chatRef}
        />
        <button
          className="py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-800"
          onClick={addChat}
        >
          Add Chat
        </button>
      </div>
      {chats.length < 1 ? (
        <div>No chats Yet</div>
      ) : (
        <table className="min-w-[70%] ">
          <thead>
            <tr className="bg-gray-50 rounded-lg">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chat ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Upvotes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {chats.map((chat) => {
              const { chatId, roomId, message, name, upvotes } = chat;
              return (
                <tr key={chatId} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{chatId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{roomId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{message}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{upvotes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ChatBox;
