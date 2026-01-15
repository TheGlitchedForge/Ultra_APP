export function ChannelList({ channels, onSelect }) {
  return (
    <ul>
      {channels.map((c) => (
        <li
          key={c.id}
          onClick={() => onSelect(c)}
          className="p-2 hover:bg-gray-700 cursor-pointer rounded"
        >
          #{c.name}
        </li>
      ))}
    </ul>
  );
}
