import { io, Socket } from "socket.io-client";

export interface StatusUpdateData {
  trackingNumber: string;
  status: string;
  location: string;
  timestamp: string;
  message?: string;
}

class SocketService {
  private socket: Socket | null = null;
  private static instance: SocketService;

  // Callbacks para manejar eventos
  private statusUpdateCallbacks: ((data: StatusUpdateData) => void)[] = [];
  private connectionCallbacks: ((connected: boolean) => void)[] = [];

  // Estado actual
  private connected = false;
  private currentTrackingNumber: string | null = null;

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  /**
   * Inicializa la conexión al servidor de WebSockets
   */
  public initialize(serverUrl: string): void {
    if (this.socket) {
      console.log("Socket connection already initialized");
      return;
    }

    console.log("Initializing socket connection to:", serverUrl);

    this.socket = io(serverUrl, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    });

    this.setupEventListeners();
  }

  /**
   * Configura los listeners para eventos del socket
   */
  private setupEventListeners(): void {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      console.log("Connected to socket server");
      this.connected = true;
      this.notifyConnectionChange(true);

      // Si hay un número de seguimiento activo, volver a suscribirse
      if (this.currentTrackingNumber) {
        this.subscribeToTracking(this.currentTrackingNumber);
      }
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
      this.connected = false;
      this.notifyConnectionChange(false);
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      this.notifyConnectionChange(false);
    });

    this.socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    this.socket.on("subscribed", (data) => {
      console.log("Successfully subscribed to tracking:", data.trackingNumber);
    });

    this.socket.on("unsubscribed", (data) => {
      console.log(
        "Successfully unsubscribed from tracking:",
        data.trackingNumber
      );
    });

    this.socket.on("status-update", (data: StatusUpdateData) => {
      console.log("Received status update:", data);
      this.notifyStatusUpdate(data);
    });
  }

  /**
   * Suscribe al cliente para recibir actualizaciones de un envío
   */
  public subscribeToTracking(trackingNumber: string): void {
    if (!this.socket || !this.connected) {
      console.warn("Cannot subscribe: Socket not connected");
      return;
    }

    // Si ya estamos suscritos a otro tracking, primero nos desuscribimos
    if (
      this.currentTrackingNumber &&
      this.currentTrackingNumber !== trackingNumber
    ) {
      this.unsubscribeFromTracking();
    }

    console.log("Subscribing to tracking:", trackingNumber);
    this.socket.emit("subscribe", trackingNumber);
    this.currentTrackingNumber = trackingNumber;
  }

  /**
   * Cancela la suscripción a actualizaciones de un envío
   */
  public unsubscribeFromTracking(): void {
    if (!this.socket || !this.currentTrackingNumber) return;

    console.log("Unsubscribing from tracking:", this.currentTrackingNumber);
    this.socket.emit("unsubscribe", this.currentTrackingNumber);
    this.currentTrackingNumber = null;
  }

  /**
   * Registra un callback para recibir actualizaciones de estado
   */
  public onStatusUpdate(
    callback: (data: StatusUpdateData) => void
  ): () => void {
    this.statusUpdateCallbacks.push(callback);

    // Devuelve una función para eliminar este callback
    return () => {
      this.statusUpdateCallbacks = this.statusUpdateCallbacks.filter(
        (cb) => cb !== callback
      );
    };
  }

  /**
   * Registra un callback para cambios en el estado de conexión
   */
  public onConnectionChange(
    callback: (connected: boolean) => void
  ): () => void {
    this.connectionCallbacks.push(callback);

    // Notifica inmediatamente con el estado actual
    callback(this.connected);

    // Devuelve una función para eliminar este callback
    return () => {
      this.connectionCallbacks = this.connectionCallbacks.filter(
        (cb) => cb !== callback
      );
    };
  }

  /**
   * Notifica a todos los callbacks registrados sobre una actualización de estado
   */
  private notifyStatusUpdate(data: StatusUpdateData): void {
    this.statusUpdateCallbacks.forEach((callback) => callback(data));
  }

  /**
   * Notifica a todos los callbacks registrados sobre un cambio en la conexión
   */
  private notifyConnectionChange(connected: boolean): void {
    this.connectionCallbacks.forEach((callback) => callback(connected));
  }

  /**
   * Cierra la conexión de socket
   */
  public disconnect(): void {
    if (this.socket) {
      this.unsubscribeFromTracking();
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }

  /**
   * Retorna si el socket está actualmente conectado
   */
  public isConnected(): boolean {
    return this.connected;
  }

  /**
   * Retorna el número de seguimiento al que estamos actualmente suscritos
   */
  public getCurrentTracking(): string | null {
    return this.currentTrackingNumber;
  }
}

export default SocketService.getInstance();
