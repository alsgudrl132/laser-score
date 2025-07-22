"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const socketRef = useRef<WebSocket | null>(null); // ✅ 타입 명시

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:3009");

    socketRef.current.onopen = () => {
      console.log("✅ 서버에 연결됨");
    };

    socketRef.current.onmessage = (event) => {
      console.log("📩 받은 메시지:", event.data);
      setMessages((prev) => [...prev, event.data]);
    };

    socketRef.current.onclose = () => {
      console.log("❌ 서버 연결 종료됨");
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(input);
      setInput("");
    }
  };

  return (
    <div className="bg-black min-h-screen w-screen flex justify-center items-center text-white">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-96 h-96 flex flex-col">
        <h2 className="text-lg font-semibold mb-4 text-center">
          💬 WebSocket 채팅
        </h2>

        <div className="flex-1 overflow-y-auto bg-gray-900 p-2 rounded text-sm mb-4">
          {messages.map((msg, i) => (
            <div key={i}>📨 {msg}</div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지 입력"
            className="flex-1 p-2 rounded bg-gray-700 text-white placeholder-gray-400 outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
