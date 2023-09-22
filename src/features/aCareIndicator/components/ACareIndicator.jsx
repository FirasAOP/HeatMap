import cloudOff from "../../../assets/icons/cloud-off.svg";
import cloud from "../../../assets/icons/cloud.svg";
import { useEffect, useState } from "react";
import { AlphaCareStatusApiUrl } from "../../../constants/constants"; 

const ACareIndicator = () => {
  const [status, setStatus] = useState(false);
  const source = "EU";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${AlphaCareStatusApiUrl}?source=${source}`
        );
        const data = await response.json();
        setStatus(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (status) {
    return <img src={cloud}></img>;
  }
  return <img src={cloudOff}></img>;
};

export default ACareIndicator;
