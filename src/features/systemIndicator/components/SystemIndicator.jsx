import unconnected from "../../../assets/icons/unconnected.svg";
import connected from "../../../assets/icons/connected.svg";
import { useEffect, useState } from "react";
import signalRService from "../../../services/SignalRService";
import { SystemConnection } from "../../../constants/constants";
const SystemIndicator = () => {
  const [status, setStatus] = useState(false);
  useEffect(() => {
    signalRService.connect();
    signalRService.connection.on(SystemConnection, (message) => {
      console.log(message);
      setStatus(message.status);
    });
  }, []);
  if (status) {
    return (
      <span>
        <img src={connected}></img> NeuroOmega
      </span>
    );
  }
  return (
    <span>
      <img src={unconnected}></img> Not Connected
    </span>
  );
};

export default SystemIndicator;
