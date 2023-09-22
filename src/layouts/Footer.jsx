import ACareIndicator from "../features/aCareIndicator/components/ACareIndicator";
import SystemIndicator from "../features/systemIndicator/components/SystemIndicator";
import WifiIndicator from "../features/wifiIndicator/component/wifiIndicator";
import "./Layout.css";
const Footer = () => {
  return (
    <div className="footer">
      <span className="wifiIndicator">
        <WifiIndicator />
      </span>
      <span className="aCareIndicator">
        <ACareIndicator />
      </span>
      <span className="systemIndicator">
        <SystemIndicator />
      </span>
    </div>
  );
};
export default Footer;
