import React from "react";
import { ChannelList } from "./ChannelList";

export default function Sidebar({ channels, onSelectChannel }) {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="font-bold text-xl mb-4">Channels</h2>
      <ChannelList channels={channels} onSelect={onSelectChannel} />
    </div>
  );
}
