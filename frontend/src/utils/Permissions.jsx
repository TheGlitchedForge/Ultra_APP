export function canExecute(role, command) {
  if (role === "admin") return true;

  if (role === "mod") {
    return !command.startsWith("/ban");
  }

  return false;
}
