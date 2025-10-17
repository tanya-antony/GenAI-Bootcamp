import React from "react";

const themeStyles = {
  blue: {
    bgMain: "bg-gradient-to-b from-indigo-800 via-blue-900 to-indigo-800",
    bgButton: "bg-blue-600/30",
    bgButtonHover: "hover:bg-blue-600/50",
    bgRecent: "bg-blue-700/20 hover:bg-blue-600/30",
    border: "border-blue-400/30",
  },
  indigo: {
    bgMain: "bg-gradient-to-b from-indigo-800 via-indigo-900 to-blue-800",
    bgButton: "bg-indigo-600/30",
    bgButtonHover: "hover:bg-indigo-600/50",
    bgRecent: "bg-indigo-700/20 hover:bg-indigo-600/30",
    border: "border-indigo-400/30",
  },
  emerald: {
    bgMain: "bg-gradient-to-b from-emerald-800 via-emerald-900 to-blue-800",
    bgButton: "bg-emerald-600/30",
    bgButtonHover: "hover:bg-emerald-600/50",
    bgRecent: "bg-emerald-700/20 hover:bg-emerald-600/30",
    border: "border-emerald-400/30",
  },
};

function Sidebar({
  title,
  subtitle,
  themeColor = "blue",
  newChatLabel = "+ New Chat",
  recentChats = [],
  footerNote = "Not a substitute for professional advice.",
  year = new Date().getFullYear(),
  appName = "CivicConnect AI",
}) {
  const theme = themeStyles[themeColor] || themeStyles.blue;

  return (
    <aside
      className={`w-60 ${theme.bgMain} text-gray-100 flex flex-col justify-between border-r ${theme.border} backdrop-blur-md shadow-lg`}
    >
      {/* Top Section */}
      <div>
        {/* Header */}
        <div className={`p-6 border-b ${theme.border}`}>
          <h1 className="text-2xl font-bold text-blue-200 drop-shadow-sm">
            {title}
          </h1>
          <p className="text-sm text-blue-100/80">{subtitle}</p>
        </div>

        {/* Chat Section */}
        <div className="p-4 space-y-2 text-sm overflow-y-auto">
          <button
            className={`w-full ${theme.bgButton} ${theme.bgButtonHover} px-3 py-2 rounded-xl text-left transition-all duration-300 shadow-sm`}
          >
            {newChatLabel}
          </button>

          <div className="mt-4 opacity-90 space-y-2">
            <p className="font-medium uppercase text-xs text-blue-300/80">
              Recent
            </p>

            {recentChats.length > 0 ? (
              recentChats.map((chat, idx) => (
                <div
                  key={idx}
                  className={`${theme.bgRecent} px-3 py-2 rounded-xl cursor-pointer transition-all duration-300 border border-white/10 hover:translate-x-1`}
                >
                  {chat}
                </div>
              ))
            ) : (
              <p className="text-xs text-blue-200/60 italic">
                No recent chats
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`p-4 border-t ${theme.border} text-sm text-blue-200/90`}>
        © {year} {appName}
        <br />
        <span className="text-xs text-blue-200/60">{footerNote}</span>
      </div>
    </aside>
  );
}

export default Sidebar;
