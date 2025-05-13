import { useRef, useState, useEffect } from "react";
import { useSpeedStore } from "./speedStore.jsx";

const Speed = ({ onSpeedChange }) => {
  const speed = useSpeedStore((state) => state.speed);
  const setSpeed = useSpeedStore((state) => state.setSpeed);
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [circlePosition, setCirclePosition] = useState(0);

  // Initialize circle position based on speed
  useEffect(() => {
    if (trackRef.current) {
      const trackWidth = trackRef.current.offsetWidth;
      const initialPosition = ((speed - 0.5) / 1.5) * trackWidth;
      setCirclePosition(initialPosition);
    }
  }, [speed]);

  const handleMouseMove = (e) => {
    if (!isDragging || !trackRef.current) return;
    const trackRect = trackRef.current.getBoundingClientRect();
    let newPosition = e.clientX - trackRect.left;
    newPosition = Math.max(0, Math.min(newPosition, trackRect.width));
    setCirclePosition(newPosition);

    // Calculate new speed (0.5 to 2)
    const newSpeed = 0.5 + (newPosition / trackRect.width) * 1.5;
    setSpeed(newSpeed);
    onSpeedChange?.(newSpeed);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        ref={trackRef}
        style={{
          height: "4px",
          width: "200px",
          backgroundColor: "#1BE985",
          borderRadius: "240px",
          margin: "10px 0",
          cursor: "pointer",
          position: "relative",
        }}
        onClick={(e) => {
          const trackRect = trackRef.current.getBoundingClientRect();
          const newPosition = e.clientX - trackRect.left;
          const newSpeed = 0.5 + (newPosition / trackRect.width) * 1.5;
          setSpeed(newSpeed);
        }}
      >
        <div
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