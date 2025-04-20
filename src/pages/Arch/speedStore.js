import { useRef } from "react";

export const speedRef = { current: 1 }; // default speed is 1x

export const setSpeed = (newSpeed) => {
  speedRef.current = newSpeed;
};