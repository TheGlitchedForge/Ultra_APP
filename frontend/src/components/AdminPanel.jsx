import { useState } from "react";

export default function AdminPanel({ users, onRoleChange, onCommand }) {
  const [command, setCommand] = useState("");

  return (
    <div className="p-4 bg-gray-800 h-full text-white">

      <h2 className="font-bold mb-3">🛠 Admin Panel</h2>

      {/* Slash commands */}
      <input
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="/ban username"
        className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-sm mb-3"
      />

      <button
        onClick={() => {
          onCommand(command);
          setCommand("");
        }}
        className="w-full bg-indigo-600 hover:bg-indigo-700 py-1 rounded text-sm"
      >
        Execute
      </button>

      <hr className="my-4 border-gray-700" />

      {/* Role management */}
      <h3 className="text-sm font-semibold mb-2">User Roles</h3>

      {users.map((u) => (
        <div key={u.username} className="flex items-center justify-between mb-2">
          <span className="text-sm">{u.username}</span>

          <select
            value={u.role}
            onChange={(e) => onRoleChange(u.username, e.target.value)}
            className="bg-gray-900 border border-gray-700 text-sm rounded px-2 py-1"
          >
            <option value="user">User</option>
            <option value="mod">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      ))}
    </div>
  );
}
