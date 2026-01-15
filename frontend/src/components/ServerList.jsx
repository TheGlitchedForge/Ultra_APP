export default function ServerList({ servers }) {
  return (
    <div className="w-16 bg-gray-900 flex flex-col items-center py-3 space-y-3">
      {servers.map((s) => (
        <div
          key={s.id}
          className="w-12 h-12 rounded-full bg-gray-700 hover:bg-indigo-500 cursor-pointer flex items-center justify-center transition"
          title={s.name}
        >
          {s.name[0].toUpperCase()}
        </div>
      ))}
    </div>
  );
}
