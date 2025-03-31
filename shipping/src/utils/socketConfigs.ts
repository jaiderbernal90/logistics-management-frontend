export const SOCKET_SERVER_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

export const SOCKET_EVENTS = {
  SERVER: {
    STATUS_UPDATE: "status-update",
    SUBSCRIBED: "subscribed",
    UNSUBSCRIBED: "unsubscribed",
    ERROR: "error",
  },

  CLIENT: {
    SUBSCRIBE: "subscribe",
    UNSUBSCRIBE: "unsubscribe",
  },
};

export const RECONNECTION_CONFIG = {
  ATTEMPTS: 5,
  DELAY: 3000,
};
