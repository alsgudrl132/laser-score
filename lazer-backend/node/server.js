// server.js
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3009 }, () => {
  console.log("WebSocket 서버가 3009번 포트에서 실행 중");
});

wss.on("connection", (ws) => {
  console.log("클라이언트 연결됨");

  // 메시지 수신 시
  ws.on("message", (message) => {
    console.log("받은 메시지:", message.toString());

    // 받은 메시지를 모든 클라이언트에게 다시 전송
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`서버에서 받은 메시지: ${message}`);
      }
    });
  });

  // 연결 종료 시
  ws.on("close", () => {
    console.log("클라이언트 연결 종료됨");
  });

  // 초기 인사
  ws.send("서버에 연결되었습니다!");
});
