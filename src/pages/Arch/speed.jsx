import { useRef, useState, useEffect } from "react";

// adjust path if needed
import { speedRef, setSpeed } from "./speedStore";

const Speed = (props) => {
  const trackRef = useRef(null);
  const circleRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [circlePosition, setCirclePosition] = useState(66.67); // Start at 1x

  const handleMouseMove = (e) => {
    if (!trackRef.current) return;
    const trackRect = trackRef.current.getBoundingClientRect();
    let newPosition = e.clientX - trackRect.left;
    newPosition = Math.max(0, Math.min(newPosition, trackRect.width));
    setCirclePosition(newPosition);
    const speed = 0.5 + (newPosition / trackRect.width) * 1.5;
    setSpeed(speed);
    props.onSpeedChange && props.onSpeedChange(speed);
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
        Speed: {speedRef.current.toFixed(1)}x
      </div>
    </div>
  );
};

export default Speed;


