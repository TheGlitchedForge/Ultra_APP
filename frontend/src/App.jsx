import LeftSidebar from "./components/LeftSidebar";

export default function App() {
  const user = { username: "admin" };

  const servers = [
    { id: 1, name: "Main" },
    { id: 2, name: "AI" }
  ];

  const channels = [
    { id: 1, name: "general" },
    { id: 2, name: "ai-chat" },
    { id: 3, name: "announcements" }
  ];

  return (
    <LeftSidebar
      user={user}
      servers={servers}
      channels={channels}
      onSelectChannel={(ch) => console.log("Selected:", ch)}
    />
  );
}
