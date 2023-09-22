import { HubConnectionBuilder } from "@microsoft/signalr";
import { SignalRUrl, connectionStarted } from "../constants/constants";
class SignalRService {
  constructor() {
    this.connection = null;
    this.messageHandlers = {};
  }
  async connect() {
    if (this.connection) return;

    this.connection = new HubConnectionBuilder().withUrl(SignalRUrl).build();

    try {
      await this.connection.start();
      //console.assert();
      this.connection.state === "Connected";
      signalRService.connection.invoke(connectionStarted, "called");
      console.log("SignalR connection established");
    } catch (error) {
      console.error("SignalR connection failed", error);
    }
  }
}

const signalRService = new SignalRService();
export default signalRService;
