import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_SERVER_URL } from "../utils/socketConfigs";
import {
  UseWebSocketReturn,
  WebSocketMessage,
} from "../interfaces/web-sockets.interface";

export const useWebSocket = (trackingNumber: string): UseWebSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [updates, setUpdates] = useState<WebSocketMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const trackingNumberRef = useRef<string>(trackingNumber);

  useEffect(() => {
    trackingNumberRef.current = trackingNumber;
  }, [trackingNumber]);

  useEffect(() => {
    if (!trackingNumber) {
      setError("No se ha proporcionado un número de seguimiento");
      return;
    }

    const WEBSOCKET_URL = SOCKET_SERVER_URL;

    const socketInstance = io(WEBSOCKET_URL, {
      reconnectionDelayMax: 10000,
      transports: ["websocket", "polling"],
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      setIsConnected(true);
      setError(null);
      console.log(`WebSocket conectado: ${socketInstance.id}`);
      socketInstance.emit("subscribe", trackingNumber);
    });

    socketInstance.on("connect_error", (err) => {
      setIsConnected(false);
      setError(`Error de conexión: ${err.message}`);
      console.error("Error de conexión:", err);
    });

    socketInstance.on("subscribed", (data) => {
      console.log("Suscripción exitosa:", data);
    });

    socketInstance.on("status-update", (data: WebSocketMessage) => {
      console.log("Actualización de estado recibida:", data);

      if (data.trackingNumber === trackingNumberRef.current) {
        setUpdates((prevUpdates) => [data, ...prevUpdates]);
      }
    });

    socketInstance.on("disconnect", (reason) => {
      setIsConnected(false);
      console.log(`Desconectado: ${reason}`);
    });

    socketInstance.on("error", (err) => {
      setError(`Error de WebSocket: ${err}`);
      console.error("Error de WebSocket:", err);
    });

    return () => {
      if (socketInstance) {
        socketInstance.emit("unsubscribe", trackingNumber);
        socketInstance.disconnect();
        console.log("Conexión WebSocket cerrada");
      }
    };
  }, [trackingNumber]);

  return {
    socket,
    isConnected,
    updates,
    error,
  };
};
