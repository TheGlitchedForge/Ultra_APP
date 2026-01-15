export default function RoleBadge({ role }) {
  const colors = {
    admin: "bg-red-600",
    mod: "bg-indigo-500",
    user: "bg-gray-600"
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded ${colors[role]}`}>
      {role.toUpperCase()}
    </span>
  );
}
