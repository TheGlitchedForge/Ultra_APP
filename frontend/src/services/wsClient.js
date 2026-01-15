export const connectWS = (roomId, onMessage) => {
  const ws = new WebSocket(`${process.env.REACT_APP_WS_URL}/ws/${roomId}`);
  ws.onopen = () => console.log("WS connected 💬");
  ws.onmessage = (event) => onMessage(JSON.parse(event.data));
  return ws;
};
