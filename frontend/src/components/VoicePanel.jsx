export default function VoicePanel({
  inCall,
  muted,
  deafened,
  onJoin,
  onLeave,
  onMute,
  onDeafen
}) {
  return (
    <div className="h-16 bg-gray-900 border-t border-gray-700 flex items-center justify-between px-4">

      <div className="text-sm">
        {inCall ? (
          <span className="text-green-400">🔊 Voice Connected</span>
        ) : (
          <span className="text-gray-400">Not in voice</span>
        )}
      </div>

      <div className="flex space-x-3">
        {!inCall ? (
          <button
            onClick={onJoin}
            className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-sm"
          >
            Join
          </button>
        ) : (
          <>
            <button
              onClick={onMute}
              className={`px-3 py-1 rounded text-sm ${
                muted ? "bg-red-600" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {muted ? "Muted" : "Mute"}
            </button>

            <button
              onClick={onDeafen}
              className={`px-3 py-1 rounded text-sm ${
                deafened ? "bg-red-600" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              Deafen
            </button>

            <button
              onClick={onLeave}
              className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-sm"
            >
              Leave
            </button>
          </>
        )}
      </div>
    </div>
  );
}
