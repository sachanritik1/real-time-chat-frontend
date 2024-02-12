import { LOGO_SVG } from "../constants";
import UserBox from "./UserBox";
import ProfileBox from "./ProfileBox";
import ProfileInput from "./ProfileInput";

const SideBar = () => {
  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
      <div className="flex flex-row items-center justify-center h-12 w-full">
        <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
          {LOGO_SVG}
        </div>
        <div className="ml-2 font-bold text-2xl">QuickChat</div>
      </div>
      <UserBox />
      <ProfileBox />
      <ProfileInput />
    </div>
  );
};

export default SideBar;
