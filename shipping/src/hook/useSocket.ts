import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_SERVER_URL } from "../utils/socketConfigs";


interface WebSocketMessage {
  trackingNumber: string;
  location: string;
  created_at: string;
  status: string;
}

interface UseWebSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  updates: WebSocketMessage[];
  error: string | null;
}

export const useWebSocket = (trackingNumber: string): UseWebSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [updates, setUpdates] = useState<WebSocketMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Guardar una referencia para el número de seguimiento actual
  const trackingNumberRef = useRef<string>(trackingNumber);

  useEffect(() => {
    // Actualizar la referencia cuando cambie el trackingNumber
    trackingNumberRef.current = trackingNumber;
  }, [trackingNumber]);

  useEffect(() => {
    if (!trackingNumber) {
      setError("No se ha proporcionado un número de seguimiento");
      return;
    }

    // Obtener la URL del servidor WebSocket desde las variables de entorno
    const WEBSOCKET_URL = SOCKET_SERVER_URL;

    // Inicializar la conexión Socket.io
    const socketInstance = io(WEBSOCKET_URL, {
      reconnectionDelayMax: 10000,
      transports: ["websocket", "polling"],
    });

    setSocket(socketInstance);

    // Configurar los event listeners
    socketInstance.on("connect", () => {
      setIsConnected(true);
      setError(null);
      console.log(`WebSocket conectado: ${socketInstance.id}`);

      // Suscribirse al número de seguimiento actual
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

    // Función de limpieza
    return () => {
      if (socketInstance) {
        // Cancelar la suscripción antes de desconectar
        socketInstance.emit("unsubscribe", trackingNumber);
        socketInstance.disconnect();
        console.log("Conexión WebSocket cerrada");
      }
    };
  }, [trackingNumber]); // Se volverá a ejecutar si cambia el trackingNumber

  return {
    socket,
    isConnected,
    updates,
    error,
  };
};
