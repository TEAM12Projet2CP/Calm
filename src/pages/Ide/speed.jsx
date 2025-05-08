import { useRef, useState } from "react";
import { useSpeedStore } from "./speedStore.jsx"; 

const Speed = (props) => {
  const speed = useSpeedStore(state => state.speed);
  const setSpeed = useSpeedStore(state => state.setSpeed);

  const trackRef = useRef(null);
  const circleRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [circlePosition, setCirclePosition] = useState(22.22); // Adjusted for 1x

  const handleMouseMove = (e) => {
    if (!trackRef.current) return;
    const trackRect = trackRef.current.getBoundingClientRect();
    let newPosition = e.clientX - trackRect.left;
    newPosition = Math.max(0, Math.min(newPosition, trackRect.width));
    setCirclePosition(newPosition);

   const speedRange = 2 - 0.5; // 1.5
   const newSpeed = 0.5 + (newPosition / trackRect.width) * speedRange;
   setSpeed(newSpeed);
   
   props.onSpeedChange?.(newSpeed)
  };




  const handleMouseDown = (e) => {
    setIsDragging(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTrackClick = (e) => {
    handleMouseMove(e);
    handleMouseDown(e);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        className="myBar"
        ref={trackRef}
        onMouseDown={handleTrackClick}
        style={{
          height: "4px",
          width: "200px",
          backgroundColor: "#1BE985",
          borderRadius: "240px",
          margin: "10px 0",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <div
          ref={circleRef}
          className="circle"
          style={{
            position: "absolute",
            left: `${circlePosition}px`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "22px",
            height: "22px",
            backgroundColor: "#1BE985",
            borderRadius: "50%",
            cursor: "grab",
            userSelect: "none",
          }}
          onMouseDown={handleMouseDown}
        />
      </div>
      <div style={{ color: "white", fontSize: "19px", margin: "5px" }}>
        Speed: {speed.toFixed(1)}x
      </div>
    </div>
  );
};

export default Speed;
