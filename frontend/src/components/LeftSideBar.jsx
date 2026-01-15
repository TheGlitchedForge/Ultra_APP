import ServerList from "./ServerList";
import ChannelList from "./ChannelList";
import UserPanel from "./UserPanel";

export default function LeftSidebar({ user, servers, channels, onSelectChannel }) {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      
      {/* Servers */}
      <ServerList servers={servers} />

      {/* Channels */}
      <div className="w-64 bg-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-700 font-bold">
          💬 Chat
        </div>

        <ChannelList channels={channels} onSelectChannel={onSelectChannel} />

        <UserPanel user={user} />
      </div>

    </div>
  );
}
