import { DynamicPsdHeatMap } from "./DynamicPsdHeatMap";
import { useEffect, useState } from "react";

const SCALER_HEIGHT = 25;

const PSDComponent = ({
  heatmapRMSHeight,
  min,
  max,
  direction,
  minFreq,
  maxFreq,
  saturation,
  intervalSpeed,
  isAnimating,
  setisAnimating,
}) => {
  const [newSiteData, setNewSiteData] = useState(null);

  useEffect(() => {
    let timeouts = []; // This should be inside useEffect

    const fetchData = async () => {
      if (isAnimating) {
        const response = await fetch("./ChannelsData.json");
        const ChannelsData = await response.json();
        const value_uMeter_array = [];
        const PSD_Power_array = [];
        console.log("999:" + ChannelsData);
        for (let index = 0; index < ChannelsData[0].data.SitesCount; index++) {
          value_uMeter_array.push(
            ChannelsData[0].data.depth[index].value_uMeter
          );
          PSD_Power_array.push(ChannelsData[0].data.depth[index].PSD_Power);
        }

        const PSD_Power_array_2 = PSD_Power_array.map((array) => {
          const new_array = array.map((array2) => {
            return array2[0];
          });
          return new_array;
        });

        const addPSDDataWithDelay = (
          value_uMeter_array,
          PSD_Power_array_2,
          delay
        ) => {
          value_uMeter_array.forEach((item, index) => {
            let timeout = setTimeout(() => {
              setNewSiteData({
                depth: item / 1000,
                stride: 1 / 3,
                startFreq: 0,
                psd: PSD_Power_array_2[index],
              });

              if (index === value_uMeter_array.length - 1) {
                timeouts.forEach(clearTimeout);
              }
            }, delay * (index + 1));

            timeouts.push(timeout);
          });
        };

        addPSDDataWithDelay(value_uMeter_array, PSD_Power_array_2, 1000);
      }
    };

    fetchData();

    // Cleanup function in useEffect will clear all timeouts
    return () => timeouts.forEach(clearTimeout);
  }, [isAnimating]); // Watch for changes in isAnimating

  return (
    <>
      <div>
        <DynamicPsdHeatMap
          xDirection={direction}
          showLegend={true}
          saturation={saturation}
          widgetSize={{ width: 500, height: heatmapRMSHeight + SCALER_HEIGHT }}
          viewPort={{
            freqRange: [minFreq, maxFreq],
            depthRange: [max, min],
          }}
          newSiteData={newSiteData}
        />
      </div>
    </>
  );
};

export default PSDComponent;
