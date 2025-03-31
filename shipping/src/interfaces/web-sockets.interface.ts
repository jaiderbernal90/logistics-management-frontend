import { Socket } from "socket.io-client";

export interface WebSocketMessage {
  trackingNumber: string;
  location: string;
  created_at: string;
  status: string;
}

export interface UseWebSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  updates: WebSocketMessage[];
  error: string | null;
}
