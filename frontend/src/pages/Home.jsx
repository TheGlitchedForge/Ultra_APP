import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home({ user }) {
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);

  useEffect(() => {
    axios.get("/channels").then((r) => setChannels(r.data));
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar channels={channels} onSelectChannel={setCurrentChannel} />
      {currentChannel ? (
        <ChatWindow roomId={currentChannel.id} userId={user.id} />
      ) : (
        <div className="flex justify-center items-center text-2xl text-gray-400">
          Select a channel
        </div>
      )}
    </div>
  );
}
