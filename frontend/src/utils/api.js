// ===============================
// API CONFIG
// ===============================

// CHANGE THIS when deployed
const API_BASE =
  import.meta?.env?.VITE_API_URL || "http://localhost:10000";

// ===============================
// TOKEN HELPERS
// ===============================

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function clearToken() {
  localStorage.removeItem("token");
}

// ===============================
// GENERIC REQUEST
// ===============================

async function request(path, options = {}) {
  const token = getToken();

  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API error");
  }

  return res.json();
}

// ===============================
// AUTH
// ===============================

export function login(username, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function signup(username, password) {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function me() {
  return request("/auth/me");
}

// ===============================
// CHAT (REST)
// ===============================

export function fetchChannels() {
  return request("/chat/channels");
}

export function fetchMessages(channelId) {
  return request(`/chat/messages/${channelId}`);
}

export function sendMessage(channelId, message) {
  return request(`/chat/send`, {
    method: "POST",
    body: JSON.stringify({ channelId, message }),
  });
}

// ===============================
// POSTS (REDDIT)
// ===============================

export function fetchPosts() {
  return request("/posts");
}

export function createPost(data) {
  return request("/posts", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function addComment(postId, text) {
  return request(`/posts/${postId}/comment`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}

// ===============================
// AI SEARCH (MULTI-AI READY)
// ===============================

export function aiSearch(query, mode = "auto") {
  return request("/search", {
    method: "POST",
    body: JSON.stringify({ query, mode }),
  });
}

// mode can be:
// "auto" | "gemini" | "openai" | "mistral"

// ===============================
// ADMIN / MODERATION
// ===============================

export function runCommand(command) {
  return request("/admin/command", {
    method: "POST",
    body: JSON.stringify({ command }),
  });
}

export function setUserRole(username, role) {
  return request("/admin/role", {
    method: "POST",
    body: JSON.stringify({ username, role }),
  });
}

// ===============================
// WEBSOCKET (REAL-TIME CHAT)
// ===============================

export function createChatSocket(channelId) {
  const token = getToken();
  const wsUrl = API_BASE.replace("http", "ws");

  return new WebSocket(
    `${wsUrl}/chat/ws/${channelId}?token=${token}`
  );
}
