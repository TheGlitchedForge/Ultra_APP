export default function UserPanel({ user }) {
  return (
    <div className="p-3 bg-gray-900 border-t border-gray-700 flex items-center">
      
      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold">
        {user.username[0].toUpperCase()}
      </div>

      <div className="ml-3 text-sm">
        <div className="font-semibold">{user.username}</div>
        <div className="text-xs text-green-400">
          ● Online
        </div>
      </div>

    </div>
  );
}
