import { useState, useRef } from "react";
import { PSDComponent, HgYAxis, HgXAxis } from "../features/PSD";
import { Popover } from "antd";
import Form from "react-bootstrap/Form";
const PSD = () => {
  const [intervalSpeed, setintervalSpeed] = useState(3000);
  const [heatmapRMSHeight, setheatmapRMSHeight] = useState(400);
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(25);
  const [direction, setdirection] = useState("rtl");
  const [minFreq, setminFreq] = useState(0.1);
  const [maxFreq, setmaxFreq] = useState(300);
  const [saturation, setsaturation] = useState(50);
  const [isAnimating, setisAnimating] = useState(false);
  const maxDepthInputRef = useRef(null);
  const minDepthInputRef = useRef(null);
  const maxFreqInputRef = useRef(null);
  const minFreqInputRef = useRef(null);
  const ltrDirectionRef = useRef(false);
  const saturationRef = useRef(null);
  const handleClick = () => {
    if (maxDepthInputRef.current.value.trim().length > 0)
      setmax(parseInt(maxDepthInputRef.current.value));
    console.log("val:" + maxDepthInputRef.current.value);
    if (minDepthInputRef.current.value.trim().length > 0)
      setmin(parseInt(minDepthInputRef.current.value));
    if (minFreqInputRef.current.value.trim().length > 0)
      setminFreq(parseFloat(minFreqInputRef.current.value));
    if (maxFreqInputRef.current.value.trim().length > 0)
      setmaxFreq(parseFloat(maxFreqInputRef.current.value));
    if (saturationRef.current.value.trim().length > 0)
      setsaturation(parseFloat(saturationRef.current.value));
    if (ltrDirectionRef.current.checked) {
      console.log("checkbox: " + ltrDirectionRef.current.checked);
      setdirection("ltr");
    } else {
      setdirection("rtl");
      console.log("checkbox: " + ltrDirectionRef.current.checked);
    }
  };

  const parameterForm = (
    <div className="card" style={{ width: "26rem" }}>
      <div className="card-body">
        <h5 className="card-title">Chart Parameters</h5>
        <div className="input-group mb-1">
          <div className="input-group mb-1">
            <span className="input-group-text" id="basic-addon1">
              Min Depth
            </span>
            <input
              type="number"
              className="form-control"
              placeholder="min depth"
              aria-label="min"
              aria-describedby="basic-addon1"
              id="minDepth"
              ref={minDepthInputRef}
            />
          </div>
          <div className="input-group mb-1">
            <span className="input-group-text" id="basic-addon1">
              Max Depth
            </span>
            <input
              type="number"
              className="form-control"
              placeholder="max depth"
              aria-label="max"
              aria-describedby="basic-addon1"
              id="maxDepth"
              ref={maxDepthInputRef}
            />
          </div>
          <div className="input-group mb-1">
            <span className="input-group-text" id="basic-addon1">
              Min Freq
            </span>
            <input
              type="number"
              className="form-control"
              placeholder="min frequency"
              aria-label="minFreq"
              aria-describedby="basic-addon1"
              id="minFreq"
              ref={minFreqInputRef}
            />
          </div>
          <div className="input-group mb-1">
            <span className="input-group-text" id="basic-addon1">
              Max Freq
            </span>
            <input
              type="number"
              className="form-control"
              placeholder="max frequency"
              aria-label="maxFreq"
              aria-describedby="basic-addon1"
              id="maxFreq"
              ref={maxFreqInputRef}
            />
          </div>
          <div className="input-group mb-1">
            <span className="input-group-text" id="basic-addon1">
              Saturation
            </span>
            <input
              type="number"
              className="form-control"
              placeholder="saturation"
              aria-label="saturation"
              aria-describedby="basic-addon1"
              id="saturation"
              ref={saturationRef}
            />
          </div>
          <div className="input-group mb-1">
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="ltr direction"
              ref={ltrDirectionRef}
            />
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleClick}
          >
            Update Parameters
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={() => setisAnimating((prev) => !prev)}
      >
        {isAnimating ? "Stop Animation" : "Start Animation"}
      </button>

      <Popover content={parameterForm} trigger="click">
        <button className="btn btn-danger btn-sm m-1">
          Parameter Settings
        </button>
      </Popover>

      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {ltrDirectionRef.current.checked && (
          <div>
            <HgYAxis
              direction={direction}
              max={max}
              min={min}
              height={heatmapRMSHeight}
              step={0.5}
            />
          </div>
        )}

        <div>
          <PSDComponent
            isAnimating={isAnimating}
            setisAnimating={setisAnimating}
            intervalSpeed={intervalSpeed}
            heatmapRMSHeight={heatmapRMSHeight}
            min={min}
            max={max}
            direction={direction}
            minFreq={minFreq}
            maxFreq={maxFreq}
            saturation={saturation}
          />
        </div>
        {!ltrDirectionRef.current.checked && (
          <div>
            <HgYAxis
              direction={direction}
              max={max}
              min={min}
              height={heatmapRMSHeight}
              step={0.5}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PSD;
