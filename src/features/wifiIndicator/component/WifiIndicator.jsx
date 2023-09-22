import wifiOff from "../../../assets/icons/wifi-off.svg";
import wifiOn from "../../../assets/icons/wifi.svg";
import { useEffect, useState } from "react";
import signalRService from "../../../services/SignalRService";
import { WifiConnection } from "../../../constants/constants";
const WifiIndicator = () => {
  const [status, setStatus] = useState(false);
  useEffect(() => {
    signalRService.connect();

    signalRService.connection.on(WifiConnection, (message) => {
      console.log("msg wifi:" + message);
      setStatus(message.status);
    });
  }, []);
  if (status) {
    return <img src={wifiOn}></img>;
  }
  return <img src={wifiOff}></img>;
};

export default WifiIndicator;
