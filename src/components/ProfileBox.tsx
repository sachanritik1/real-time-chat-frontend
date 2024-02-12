import ChatProfileButton from "./ChatProfileButton";

const ProfileBox = () => {
  return (
    <div>
      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Active Conversations</span>
          <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
            4
          </span>
        </div>
        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-64 overflow-y-auto">
          {Array.from("helloworld").map((_, i) => (
            <ChatProfileButton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
