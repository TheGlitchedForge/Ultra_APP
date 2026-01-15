export default function MessageBubble({ message, userId }) {
  const isSelf = message.sender_id === userId;
  return (
    <div
      className={`p-2 m-1 rounded max-w-xl ${
        isSelf ? "bg-blue-500 text-white ml-auto" : "bg-gray-700 text-white"
      }`}
    >
      <div className="text-sm font-bold">{message.sender_id}</div>
      <div>{message.content}</div>
    </div>
  );
}
