const ProfileInput = () => {
  return (
    <div className="py-4">
      <input
        type="text"
        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
        placeholder="Create a new room"
      />
      <button className="w-full h-10 mt-2 bg-indigo-500 hover:bg-indigo-800 text-white rounded-lg">
        Create
      </button>
    </div>
  );
};

export default ProfileInput;
