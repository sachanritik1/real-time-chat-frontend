import { useRef } from "react";

const ProfileInput = () => {
  const roomIdRef = useRef<HTMLInputElement>(null);
  const handleCreateRoom = async () => {
    const res = await fetch("http://localhost:8080/create/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId: roomIdRef.current?.value }),
    });
    const json = await res.json();

    console.log(json);
  };

  return (
    <div className="py-4">
      <input
        ref={roomIdRef}
        type="text"
        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
        placeholder="Type room id here..."
      />
      <button
        onClick={handleCreateRoom}
        className="w-full h-10 mt-2 bg-indigo-500 hover:bg-indigo-800 text-white rounded-lg"
      >
        Create Room
      </button>
    </div>
  );
};

export default ProfileInput;
