export default function TypingIndicator({ users }) {
  if (!users.length) return null;
  return (
    <div className="p-1 text-sm text-gray-300">
      {users.join(", ")} is typing…
    </div>
  );
}
