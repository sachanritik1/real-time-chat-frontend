const ChatProfileButton = ({
  roomId,
  joinRoom,
  setRoomId,
}: {
  roomId: string;
  joinRoom: Function;
  setRoomId: Function;
}) => {
  const handleJoinRoom = () => {
    console.log(`Joining room ${roomId}`);
    joinRoom(roomId);
    setRoomId(roomId);
  };
  return (
    <button
      onClick={handleJoinRoom}
      className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
    >
      <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
        {roomId[0]}
      </div>
      <div className="ml-2 text-sm font-semibold">{roomId}</div>
    </button>
  );
};

export default ChatProfileButton;
