import { Registers, memory, Alu1, IP ,queue } from "../pages/Ide/index.jsx";
import { TwosComplement } from "./ALU.js";
import { gsap } from "gsap";
import IOUnit from "./IO_Unit.js";
import { Register } from "./Register.js";
import { opValue } from "./Sequencer.js";
import {cacheResult} from "./Adressing.js"
import { useSpeedStore } from '../pages/Ide/speedStore.jsx';
// import { 
// Register } from "./Register.js";
////////////////////////////////////////////////
function Dec2bin(dec){
    return ("00000000" + (parseInt(dec, 10)).toString(2)).substr(-8);
}
export function binaryToDecimalNumber(binaryStr) {
    return parseInt(binaryStr, 2);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
// Ensure receiveWriteValue is globally accessible
// Ensure receiveWriteValue is globally accessible
function showWritePopup() {
    return new Promise((resolve) => {
        let popup = window.open("", "Write to Register", "width=400,height=300");

        popup.document.write(`
            <h2>Write to Register</h2>
            <label>Enter Value (number or string):</label>
            <input type="text" id="registerValue">
            <button onclick="submitValue()">Write</button>

            <script>
                function submitValue() {
                    let value = document.getElementById('registerValue').value.trim();
                    if (value !== "") {
                        window.opener.resolveWriteValue(value);
                        window.close();
                    } else {
                        alert("Please enter a non-empty value.");
                    }
                }
            </script>
        `);

        // Store resolve function globally so it can return the value to the main window
        window.resolveWriteValue = (value) => {
            resolve(value); // Pass value as string (can be parsed later if needed)
        };
    });
}




window.receiveWriteValue = function(value) {
    const ioUnit = memory.ioUnit;

    if (!isNaN(value)) {
        value = parseInt(value, 10);
        ioUnit.writeToBuffer(0, value);
        // Resume instruction execution
        if (typeof window.writeCallback === "function") {
            window.writeCallback();
            window.writeCallback = null; // Clear the callback after execution
        }
    } else {
    }
};



/////////////////animations to test////////////////////
const IounitToBus={
    value:"",
    target:".ball",
    time:3000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball", {height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.221,y:h*0.39,opacity:"0"}, {opacity:"1",duration:1/useSpeedStore.getState().speed*1,});
    gsap.fromTo(".ball", {x:w*0.221,y:h*0.39}, {y:h*0.46 ,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
    },
}
const BusToIO = {
    value: "",
    target: ".ball",
    time: 3000/useSpeedStore.getState().speed*1,
    anim: (val, h, w) => {
        gsap.fromTo(".ball", 
            { height: "2.812%", width: "1.4%", borderRadius: "50%", x: w * 0.221, y: h * 0.46, opacity: "0" }, 
            { opacity: "1", duration: 1 /useSpeedStore.getState().speed*1}
        );
        gsap.fromTo(".ball", 
            { x: w * 0.221, y: h * 0.46 }, 
            { y: h * 0.39, duration: 1/useSpeedStore.getState().speed*1, delay: 1/useSpeedStore.getState().speed*1 } // Moves upward, opposite of IOTOBUS
        );
        gsap.to(".ball", { opacity: "0", duration: 1/useSpeedStore.getState().speed*1, delay: 2 /useSpeedStore.getState().speed*1});
    },
};

const BusToRual1={
    value:"",
    target:".ball",
    time:3000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    ///depart: ( 54% , 24,45% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.143,y:h*0.56,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed*1});
    gsap.fromTo(".ball",{x:w*0.143,y:h*0.56},{y:h*0.625 ,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
},}

const Rual1ToBus={
    value:"",
    target:".ball",
    time:3000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    ///depart: ( 54% , 24,45% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.143,y:h*0.625,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed*1});
    gsap.fromTo(".ball",{x:w*0.143,y:h*0.625},{ y:h*0.56,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
  },}
  
  const BusToRual2={
    value:"",
    target:".ball",
    time:3000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    ///depart: ( 54% , 35,2% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.299,y:h*0.56,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed*1});
    gsap.fromTo(".ball",{x:w*0.299,y:h*0.56},{y:h*0.625 ,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
  },}
  
  const BusToRegisters={
    value:"",
    target:".ball",
    time:3000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    ///depart: ( 53.7% , 47.8% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.481,y:h*0.555,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed*1});
    gsap.fromTo(".ball",{x:w*0.481,y:h*0.555},{y:h*0.58 ,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
  },}

  const RegistersToBus={
    value:"",
    target:".ball",
    time:3000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    ///depart: ( 53.7% , 47.8% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.481,y:h*0.58,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed*1});
    gsap.fromTo(".ball",{x:w*0.481,y:h*0.58},{y:h*0.555 ,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
  },}

  const IrToDecoder={
    value:"",
    target:".ball",
    time:3000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    ///depart: ( 59% , 78.2% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.644,y:h*0.708,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed*1});
    gsap.fromTo(".ball",{x:w*0.644,y:h*0.708},{y:h*0.725 ,duration:1,delay:1/useSpeedStore.getState().speed*1});
    gsap.to(".ball",{opacity:"0" ,duration:1,delay:2/useSpeedStore.getState().speed*1});
  },}
  
  const DecoderToSequencer={
    value:"",
    target:".ball",
    time:3000,
    anim:(val,h,w)=>{
    ///depart: ( 59% , 78.2% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.644,y:h*0.813,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed*1});
    gsap.fromTo(".ball",{x:w*0.644,y:h*0.813},{y:h*0.827 ,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
  },}
  
  const QueueToIr={
    value:"",
    target:".ball",
    time:3000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    ///depart: ( 64.9% , 64.2% )  W:1.4% ,H:2.812
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.726,y:h*0.6638,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed*1});
    gsap.fromTo(".ball",{x:w*0.726,y:h*0.6638},{x:w*0.711 ,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
  },}
  
  const BusToQueue={
    value:"",
    target:".ball",
    time:4000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    ///depart: ( 79.1% , 53.6% )  W:1.4% ,H:2.812
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.931,y:h*0.56,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed*1});
    gsap.fromTo(".ball",{x:w*0.931,y:h*0.56},{y:h*0.6638 ,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1});
    gsap.to(".ball",{x:w*0.921 ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:3/useSpeedStore.getState().speed*1});
  },}
  
  const BusToAcc={
    value:"",
    target:".ball",
    time:4000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    ///depart: ( 39.7% , 54% )  W:1.4% ,H:2.812
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.361,y:h*0.56,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed*1});
    gsap.fromTo(".ball",{x:w*0.361,y:h*0.56},{y:h*0.923 ,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1});
    gsap.to(".ball",{x:w*0.282 ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:3/useSpeedStore.getState().speed*1});
  },}
  const AccToBus={
    value:"",
    target:".ball",
    time:4000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    ///depart: ( 39.7% , 54% )  W:1.4% ,H:2.812
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.282,y:h*0.923,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed*1});
    gsap.fromTo(".ball",{x:w*0.282,y:h*0.923},{x:w*0.361 ,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1});
    gsap.to(".ball",{y:h*0.56 ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:3/useSpeedStore.getState().speed*1});
  },}
  
  const AluToAcc={
    value:"",
    target:".ball",
    time:3000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    ///depart: ( 30.3% , 83.5% )  W:1.4% ,H:2.812
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.226,y:h*0.863,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed*1});
    gsap.fromTo(".ball",{x:w*0.226,y:h*0.863},{y:h*0.877 ,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
  },}
  
  const MdrToBus={
    value:"",
    target:".ball",
    time:3000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    ///depart: ( 51.8% , 43.2% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.539,y:h*0.445,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed*1});
    gsap.fromTo(".ball",{x:w*0.539,y:h*0.445},{y:h*0.465 ,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
  },}

  const BusToMdr={
    value:"",
    target:".ball",
    time:3000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    ///depart: ( 51.8% , 43.2% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.539,y:h*0.465,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed*1});
    gsap.fromTo(".ball",{x:w*0.539,y:h*0.465},{y:h*0.445 ,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
  },}
  
  const AdrToBus={
    value:"",
    target:".ball",
    time:3000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    ///depart: ( 66.3% , 25.4% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.784,y:h*0.137,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed*1});
    gsap.fromTo(".ball",{x:w*0.784,y:h*0.137},{y:h*0.18 ,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
  },}
  
  const IpToAdr={
    value:"",
    target:".ball",
    time:3000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    ///depart: ( 69% , 13.7% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.746,y:h*0.26,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed*1});
    gsap.fromTo(".ball",{x:w*0.746,y:h*0.26},{y:h*0.46 ,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
  },}
  
  /////////////data bus animations/////////////////:
  
  const MdrTOQue={
    value:"",
    target:".box-data",
    time:3000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1/useSpeedStore.getState().speed*1})
    gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.874,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1})
    gsap.to(".box-data",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
  },}
  
  const MdrToReg={
    value:"",
    target:".box-data",
    time:3000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1/useSpeedStore.getState().speed*1})
  gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.44,duration:1,delay:1/useSpeedStore.getState().speed*1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
  },}

  const RegToMdr={
    value:"",
    target:".box-data",
    time:3000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.44,opacity:"0"},{opacity:"1",duration:1/useSpeedStore.getState().speed*1})
  gsap.fromTo(".box-data",{x:w*0.44},{x:w*0.497,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
  },}
  let queueExitToReg={
    value:"",
    target:".box-data",
    time:3000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
        gsap.fromTo(".box-data",{x:w*0.68,opacity:"0"},{opacity:"1",duration:1/useSpeedStore.getState().speed*1})
        gsap.fromTo(".box-data",{x:w*0.68},{x:w*0.44,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1})
        gsap.to(".box-data",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
    }
}
  const MdrToIO={
    value:"",
    target:".box-data",
    time:3000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1/useSpeedStore.getState().speed*1})
  gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.182,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
  },}
  const IOToMdr={
    value:"",
    target:".box-data",
    time:3000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.182,opacity:"0"},{opacity:"1",duration:1/useSpeedStore.getState().speed*1})
  gsap.fromTo(".box-data",{x:w*0.182},{x:w*0.497,duration:1/useSpeedStore.getState().speed*1,delay:1/useSpeedStore.getState().speed*1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*1,delay:2/useSpeedStore.getState().speed*1});
  },}
  const MdrToRual1={
    value:"",
    target:".box-data",
    time:3000/useSpeedStore.getState().speed*1,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1/useSpeedStore.getState().speed})
  gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.262,duration:1/useSpeedStore.getState().speed,delay:1/useSpeedStore.getState().speed})
  gsap.to(".box-data",{opacity:"0" ,duration:1/useSpeedStore.getState().speed,delay:2/useSpeedStore.getState().speed*1});
  },}

  const RegToRual1={
    value:"",
    target:".box-data",
    time:3000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.44,opacity:"0"},{opacity:"1",duration:1/useSpeedStore.getState().speed})
    gsap.fromTo(".box-data",{x:w*0.44},{x:w*0.262,duration:1/useSpeedStore.getState().speed,delay:1/useSpeedStore.getState().speed})
    gsap.to(".box-data",{opacity:"0" ,duration:1/useSpeedStore.getState().speed,delay:2/useSpeedStore.getState().speed});
    },}

const MdrToRual2={
    value:"",
    target:".box-data",
    time:3000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1/useSpeedStore.getState().speed})
    gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.106,duration:1/useSpeedStore.getState().speed,delay:1/useSpeedStore.getState().speed})
    gsap.to(".box-data",{opacity:"0" ,duration:1/useSpeedStore.getState().speed,delay:2/useSpeedStore.getState().speed});
    },}

  const RegToRual2={
    value:"",
    target:".box-data",
    time:3000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.44,opacity:"0"},{opacity:"1",duration:1/useSpeedStore.getState().speed})
  gsap.fromTo(".box-data",{x:w*0.44},{x:w*0.106,duration:1/useSpeedStore.getState().speed,delay:1/useSpeedStore.getState().speed})
  gsap.to(".box-data",{opacity:"0" ,duration:1/useSpeedStore.getState().speed,delay:2/useSpeedStore.getState().speed});
  },}

  const AccToMDR={
    value:"",
    target:".box-data",
    time:3000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.321,opacity:"0"},{opacity:"1",duration:1/useSpeedStore.getState().speed})
  gsap.fromTo(".box-data",{x:w*0.321},{x:w*0.497,duration:1,delay:1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/useSpeedStore.getState().speed,delay:2/useSpeedStore.getState().speed});
  },}
  const MDRToAcc={
    value:"",
    target:".box-data",
    time:3000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1/useSpeedStore.getState().speed})
  gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.321,duration:1/useSpeedStore.getState().speed,delay:1/useSpeedStore.getState().speed})
  gsap.to(".box-data",{opacity:"0" ,duration:1/useSpeedStore.getState().speed,delay:2/useSpeedStore.getState().speed});
  },}

  const AccToReg={
    value:"",
    target:".box-data",
    time:3000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.321,opacity:"0"},{opacity:"1",duration:1/useSpeedStore.getState().speed})
  gsap.fromTo(".box-data",{x:w*0.321},{x:w*0.44,duration:1/useSpeedStore.getState().speed,delay:1/useSpeedStore.getState().speed})
  gsap.to(".box-data",{opacity:"0" ,duration:1/useSpeedStore.getState().speed,delay:2/useSpeedStore.getState().speed});
  },}

  const RegToAcc={
    value:"",
    target:".box-data",
    time:3000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.44,opacity:"0"},{opacity:"1",duration:1})
  gsap.fromTo(".box-data",{x:w*0.44},{x:w*0.321,duration:1,delay:1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/useSpeedStore.getState().speed,delay:2/useSpeedStore.getState().speed});
  },}
  
  const MdrToADR={
    value:"",
    target:".box-data",
    time:3000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1/useSpeedStore.getState().speed})
  gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.705,duration:1/useSpeedStore.getState().speed,delay:1/useSpeedStore.getState().speed})
  gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2/useSpeedStore.getState().speed});
  },}

  const AccToADR={
    value:"",
    target:".box-data",
    time:3000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.321,opacity:"0"},{opacity:"1",duration:1/useSpeedStore.getState().speed})
  gsap.fromTo(".box-data",{x:w*0.321},{x:w*0.705,duration:1/useSpeedStore.getState().speed,delay:1/useSpeedStore.getState().speed})
  gsap.to(".box-data",{opacity:"0" ,duration:1/useSpeedStore.getState().speed,delay:2/useSpeedStore.getState().speed});
  },}


  const Rual1ToADR={
    value:"",
    target:".box-data",
    time:3000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.44,opacity:"0"},{opacity:"1",duration:1/useSpeedStore.getState().speed})
  gsap.fromTo(".box-data",{x:w*0.44},{x:w*0.705,duration:1/useSpeedStore.getState().speed,delay:1/useSpeedStore.getState().speed})
  gsap.to(".box-data",{opacity:"0" ,duration:1/useSpeedStore.getState().speed,delay:2/useSpeedStore.getState().speed});
  },}

  const BusToIr={
    value:"",
    target:".ball",
    time:4000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    ///depart: ( 79.1% , 53.6% )  W:1.4% ,H:2.812
    gsap.fromTo(".ball",{x:w*0.931,y:h*0.56,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed});
    gsap.fromTo(".ball",{x:w*0.931,y:h*0.56},{y:h*0.6638 ,duration:1/useSpeedStore.getState().speed,delay:1/useSpeedStore.getState().speed});
    gsap.to(".ball",{x:w*0.711 ,duration:1/useSpeedStore.getState().speed,delay:2/useSpeedStore.getState().speed});
    gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed,delay:3/useSpeedStore.getState().speed});
  },}

  //////////////// Adresse bus animations ///////////////////////////////
const IPToMAR={
    value:"",
    target:".box-ADR",
    time:3000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-ADR",{x:w*0.753,opacity:"0"},{opacity:"1",duration:1/useSpeedStore.getState().speed})
    gsap.fromTo(".box-ADR",{x:w*0.753},{x:w*0.648,duration:1/useSpeedStore.getState().speed,delay:1/useSpeedStore.getState().speed})
    gsap.to(".box-ADR",{opacity:"0" ,duration:1/useSpeedStore.getState().speed,delay:2/useSpeedStore.getState().speed});
  },}

const ADRToMAR={
    value:"",
    target:".box-ADR",
    time:3000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-ADR",{x:w*0.712,opacity:"0"},{opacity:"1",duration:1/useSpeedStore.getState().speed})
    gsap.fromTo(".box-ADR",{x:w*0.712},{x:w*0.648,duration:1/useSpeedStore.getState().speed,delay:1/useSpeedStore.getState().speed})
    gsap.to(".box-ADR",{opacity:"0" ,duration:1/useSpeedStore.getState().speed,delay:2/useSpeedStore.getState().speed});
  },}
  
  ////////////////////////fitting animations//////////////////////
  const fitToRual1={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"20px",width:w*0.067,height:h*0.05,x:w*0.12,y:h*0.658,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"20px",width:w*0.067,height:h*0.05,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const infitToRual1={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.12,y:h*0.658,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
        // gsap.fromTo(".ball",{x:w*0.12,y:h*0.658,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
        gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed});
    },}
  const fitToRual2={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"20px",width:w*0.067,height:h*0.05,x:w*0.275,y:h*0.658,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"20px",width:w*0.067,height:h*0.05,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const fitToR2={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.666,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const infitToR2={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.666,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.666,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
        gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed});
    },}

  const fitToR1={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
      gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.6105,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed});
    //   gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
    //   gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
    },}
    const infitToR1={
        value:"",
        target:".ball",
        time:1000/useSpeedStore.getState().speed,
        anim:(val,h,w)=>{
            // gsap.fromTo(".ball",{x:w*0.442,y:h*0.6105,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
            // gsap.fromTo(".ball",{x:w*0.442,y:h*0.6105,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
            // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
            gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed});
        },}

  const fitToR3={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.7205,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}

  const infitToR3={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.7205,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.7205,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
        gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed});
    },}

  const fitToR4={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.7735,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}

  const infitToR4={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.7735,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.7735,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
        gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed});
    },}

  const fitToIdr={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.8277,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const infitToIdr={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.8277,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.8277,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
        gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed});
    },}
  const fitToBr={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.8815,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const infitToBr={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.8815,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.8815,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
        gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed});
    },}
  const fitToSr={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.9347,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const infitToSR={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.9347,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.9347,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
        gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed});
    },}
  const fitToIr={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.055,x:w*0.6,y:h*0.6495,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.055,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const fitToDecode={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.055,x:w*0.6,y:h*0.753,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.055,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const fitToSequencer={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.055,x:w*0.6,y:h*0.858,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.055,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const fitToAcc={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.07,height:h*0.055,x:w*0.1995,y:h*0.91,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.07,height:h*0.055,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const infitToAcc={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.1995,y:h*0.91,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
        // gsap.fromTo(".ball",{x:w*0.1995,y:h*0.91,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
        gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed});
    },}
  const fitToMdr={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.11,height:h*0.06,x:w*0.49,y:h*0.38,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.11,height:h*0.06,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const infitToMdr={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.49,y:h*0.38,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
        // gsap.fromTo(".ball",{x:w*0.49,y:h*0.38,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
        gsap.to(".ball",{opacity:"0" ,duration:1/useSpeedStore.getState().speed});
    },}
  const fitToMar={
    value:"",
    target:".ball",
    time:1000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.032,height:h*0.14,x:w*0.623,y:h*0.165,opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.032,height:h*0.14,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}

  const addanim={
    value:"",
    target:".ALU",
    time:2000/useSpeedStore.getState().speed,
    anim:(val,h,w)=>{
        gsap.fromTo(".ALU",{opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed});
        gsap.fromTo(".ALU",{opacity:"1"},{opacity:"0" ,duration:1/useSpeedStore.getState().speed,delay:1/useSpeedStore.getState().speed});
    },}

    const MCanim={
        value:"",
        target:".MC",
        time:2000/useSpeedStore.getState().speed,
        anim:(val,h,w)=>{
            gsap.fromTo(".MC",{opacity:"0"},{opacity:"1" ,duration:1/useSpeedStore.getState().speed});
            gsap.fromTo(".MC",{opacity:"1"},{opacity:"0" ,duration:1/useSpeedStore.getState().speed,delay:1/useSpeedStore.getState().speed});
        },}

////////////////////////////////////////////////




class InstructionADD{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.res=0;
        this.name="ADD";
        this.steps=[()=>{
            // this.res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.Rual2.setleft(TwosComplement(this.value2,8));
                Alu1.addBinary(8);
                
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.Rual2.setvalue(TwosComplement(this.value2,16));
                Alu1.addBinary(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"ADD",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}
class InstructionMOV00{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="MOV-RR";
        this.steps=[()=>{
            Registers[this.register1].setvalue(TwosComplement(this.value2,16));
        }
        ];
        this.buildanim=function(){
            if(this.register1=="000"){
                if(this.register2=="000"){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                        time:infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                        time:fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else if (this.register2=="001") {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                        time:infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                        time:fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                    
                }else if (this.register2=="2") {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                        time:infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                        time:fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                        time:infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:infitToR1.target,
                        time:infitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else if (this.register2=="4") {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                        time:infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                        time:AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                        time:AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                        time:fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                        time:infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                        time:fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                        time:infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                        time:fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                        time:infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                        time:fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }
            }else if (this.register1=="001") {
                if(this.register2=="000"){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                        time:infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        target:fitToR2.target,
                        time:fitToR2.time,
                        value:"value2",
                        anim:fitToR2.anim,
                    },
                ];
                }else if (this.register2=="001") {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                        time:infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                        time:fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                    
                }else if (this.register2=="2") {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                        time:infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                        time:fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                        time:infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                        time:fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                }else if (this.register2=="4") {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                        time:infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                        time:AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                        time:AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                        time:fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                        time:infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                        time:fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                        time:infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                        time:fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                        time:infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                        time:fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                }
            }else if (this.register1=="2") {
                if(this.register2=="000"){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                        time:infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                        time:fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }else if (this.register2=="001") {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                        time:infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                        time:fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                    
                }else if (this.register2=="2") {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                        time:infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                        time:fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                        time:infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                        time:fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }else if (this.register2=="4") {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                        time:infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                        time:AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                        time:AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                        time:fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                        time:infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                        time:fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                        time:infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                        time:fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                        time:infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                        time:fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }
            }else if (this.register1=="3") {
                if(this.register2=="000"){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                        time:infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                        time:fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }else if (this.register2=="001") {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                        time:infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                        time:fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                    
                }else if (this.register2=="2") {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                        time:infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                        time:fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                        time:infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                        time:fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }else if (this.register2=="4") {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                        time:infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                        time:AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                        time:AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                        time:fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                        time:infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                        time:fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                        time:infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                        time:fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                        time:infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                        time:fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }
            }else if (this.register1=="4") {
                if(this.register2=="000"){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                        time:infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                        time:RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                        time:BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                        time:fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }else if (this.register2=="001") {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                        time:infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                        time:RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                        time:BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                        time:fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                    
                }else if (this.register2=="2") {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                        time:infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                        time:RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                        time:BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                        time:fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                        time:infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                        time:RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                        time:BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                        time:fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }else if (this.register2=="4") {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                        time:infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                        time:fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                        time:infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                        time:RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                        time:BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                        time:fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                        time:infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                        time:RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                        time:BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                        time:fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                        time:infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                        time:RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                        time:BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                        time:fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }
            }else if (this.register1=="5") {
                if(this.register2=="000"){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                        time:infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                        time:fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }else if (this.register2=="001") {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                        time:infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                        time:fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                    
                }else if (this.register2=="2") {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                        time:infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                        time:fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                        time:infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                        time:fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }else if (this.register2=="4") {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                        time:infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                        time:AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                        time:AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                        time:fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                        time:infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                        time:fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                        time:infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                        time:fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                        time:infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                        time:fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }
            }else if (this.register1=="6") {
                if(this.register2=="000"){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                        time:infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                        time:fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }else if (this.register2=="001") {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                        time:infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                        time:fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                    
                }else if (this.register2=="2") {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                        time:infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                        time:fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                        time:infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                        time:fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }else if (this.register2=="4") {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                        time:infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                        time:AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                        time:AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                        time:fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                        time:infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                        time:fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                        time:infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                        time:fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                        time:infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                        time:fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }
            }else if (this.register1=="7") {
                if(this.register2=="000"){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                        time:infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                        time:fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }else if (this.register2=="001") {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                        time:infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                        time:fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                    
                }else if (this.register2=="2") {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                        time:infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                        time:fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                        time:infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                        time:fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }else if (this.register2=="4") {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                        time:infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                        time:AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                        time:AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                        time:fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                        time:infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                        time:fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                        time:infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                        time:fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                        time:infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                        time:fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }
            }
            
        }
    }
    
}
class InstructionMOV01{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.isimmed=0;
        this.name="MOV-RM";
        this.steps=[()=>{
            Registers[this.register1].setvalue(TwosComplement(this.value2,16));
        }
        ];
        this.buildanim=function(){
            if(this.register1=="0"){
                if(this.isimmed===1){
                    return[
                    {
                        value:"value2",
                        target:fitToR1.target,
                        time:fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else{
                return[{
                    value:"value2",
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"",
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"value2",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:"value2",
                    target:fitToR1.target,
                    time:fitToR1.time,
                    anim:fitToR1.anim,
                },
            ];}
            }else if (this.register1=="1") {
                if(this.isimmed===1){
                    return[
                    {
                        value:"value2",
                        target:fitToR2.target,
                        time:fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                }else{
                return[{
                    value:"value2",
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"",
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"value2",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:"value2",
                    target:fitToR2.target,
                    time:fitToR2.time,
                    anim:fitToR2.anim,
                },
            ];
        }
            }else if (this.register1==2) {
                if(this.isimmed===1){
                    return[
                    {
                        value:"value2",
                        target:fitToR3.target,
                        time:fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }else{
                return[{
                    value:"value2",
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"",
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"value2",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:"value2",
                    target:fitToR3.target,
                    time:fitToR3.time,
                    anim:fitToR3.anim,
                },
            ];}
            }else if (this.register1=="3") {
                if(this.isimmed===1){
                    return[
                    {
                        value:"value2",
                        target:fitToR4.target,
                        time:fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }else{
                return[{
                    value:"value2",
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"",
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"value2",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:"value2",
                    target:fitToR4.target,
                    time:fitToR4.time,
                    anim:fitToR4.anim,
                },
            ];}
            }else if (this.register1=="4") {
                if(this.isimmed===1){
                    return[
                    {
                        value:"value2",
                        target:BusToAcc.target,
                        time:BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                        time:fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }else{
                return[{
                    value:"value2",
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"",
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"value2",
                    target:MDRToAcc.target,
                    time:MDRToAcc.time,
                    anim:MDRToAcc.anim,
                },
                {
                    value:"value2",
                    target:BusToAcc.target,
                    time:BusToAcc.time,
                    anim:BusToAcc.anim,
                },
                {
                    value:"value2",
                    target:fitToAcc.target,
                    time:fitToAcc.time,
                    anim:fitToAcc.anim,
                },
            ];}
            }else if (this.register1=="5") {
                if(this.isimmed===1){
                    return[
                    {
                        value:"value2",
                        target:fitToBr.target,
                        time:fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }else{
                return[{
                    value:"value2",
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"",
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"value2",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:"value2",
                    target:fitToBr.target,
                    time:fitToBr.time,
                    anim:fitToBr.anim,
                },
            ];}
            }else if (this.register1=="6") {
                if(this.isimmed===1){
                    return[
                    {
                        value:"value2",
                        target:fitToIdr.target,
                        time:fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }else{
                return[{
                    value:"value2",
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"",
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"value2",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:"value2",
                    target:fitToIdr.target,
                    time:fitToIdr.time,
                    anim:fitToIdr.anim,
                },
            ];}
            }else if (this.register1=="7") {
                if(this.isimmed===1){
                    return[
                    {
                        value:"value2",
                        target:fitToSr.target,
                        time:fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }else{
                return[{
                    value:"value2",
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"",
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"value2",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:"value2",
                    target:fitToSr.target,
                    time:fitToSr.time,
                    anim:fitToSr.anim,
                },
            ];
            }}
        }
    }
}
class InstructionMOV10{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="MOV-MR";
        this.steps=[()=>{
            if(this.taille==1){
                let hexval=this.value2.toString(16);
                while(hexval.length<4){
                    hexval='0'+hexval;
                }
                memory.setRim(hexval.substring(0,2));
                memory.setRam( TwosComplement(this.addresse1+1,16));
                memory.write();
                memory.setRim(hexval.substring(2,4));
                memory.setRam( TwosComplement(this.addresse1,16));
                memory.write();
            }else{
            memory.setRim(this.value2.toString(16));
            memory.setRam(TwosComplement(this.addresse1,16));
            memory.write();
            }
        }
        ];
        this.buildanim=function(){
            if(this.register1=="000"){
                return[{
                    value:"value2",
                    target:infitToR1.target,
                    time:infitToR1.time,
                    anim:infitToR1.anim,
                },
                {
                    value:"",
                    target:RegistersToBus.target,
                    time:RegistersToBus.time,
                    anim:RegistersToBus.anim,
                },
                {
                    value:"value2",
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:"value2",
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:"WRITE",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
                
            ];
            }else if (this.register1=="001") {
                return[{
                    value:"value2",
                    target:infitToR2.target,
                    time:infitToR2.time,
                    anim:infitToR2.anim,
                },
                {
                    value:"",
                    target:RegistersToBus.target,
                    time:RegistersToBus.time,
                    anim:RegistersToBus.anim,
                },
                {
                    value:"value2",
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:"value2",
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:"WRITE",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }            
            ];
                
            }else if (this.register1=="2") {
                return[{
                    value:"value2",
                    target:infitToR3.target,
                    time:infitToR3.time,
                    anim:infitToR3.anim,
                },
                {
                    value:"",
                    target:RegistersToBus.target,
                    time:RegistersToBus.time,
                    anim:RegistersToBus.anim,
                },
                {
                    value:"value2",
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:"value2",
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:"WRITE",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
                
            ];
            }else if (this.register1=="3") {
                return[{
                    value:"value2",
                    target:infitToR4.target,
                    time:infitToR4.time,
                    anim:infitToR4.anim,
                },
                {
                    value:"",
                    target:RegistersToBus.target,
                    time:RegistersToBus.time,
                    anim:RegistersToBus.anim,
                },
                {
                    value:"value2",
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:"value2",
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:"WRITE",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
                
            ];
            }else if (this.register1=="4") {
                return[{
                    value:"value2",
                    target:infitToAcc.target,
                    time:infitToAcc.time,
                    anim:infitToAcc.anim,//we have to change animations here___________________________________
                },
                {
                    value:"",
                    target:AccToBus.target,
                    time:AccToBus.time,
                    anim:AccToBus.anim,
                },
                {
                    value:"value2",
                    target:AccToMDR.target,
                    time:AccToMDR.time,
                    anim:AccToMDR.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:"value2",
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:"WRITE",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
                
            ];
            }else if (this.register1=="5") {
                return[{
                    value:"value2",
                    target:infitToBr.target,
                    time:infitToBr.time,
                    anim:infitToBr.anim,
                },
                {
                    value:"",
                    target:RegistersToBus.target,
                    time:RegistersToBus.time,
                    anim:RegistersToBus.anim,
                },
                {
                    value:"value2",
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:"value2",
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:"WRITE",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if (this.register1=="6") {
                return[{
                    value:"value2",
                    target:infitToIdr.target,
                    time:infitToIdr.time,
                    anim:infitToIdr.anim,
                },
                {
                    value:"",
                    target:RegistersToBus.target,
                    time:RegistersToBus.time,
                    anim:RegistersToBus.anim,
                },
                {
                    value:"value2",
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:"value2",
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:"WRITE",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if (this.register1=="7") {
                return[{
                    value:"value2",
                    target:infitToSR.target,
                    time:infitToSR.time,
                    anim:infitToSR.anim,
                },
                {
                    value:"",
                    target:RegistersToBus.target,
                    time:RegistersToBus.time,
                    anim:RegistersToBus.anim,
                },
                {
                    value:"value2",
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:"value2",
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:"WRITE",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }
            
        }
    }
    
}
class InstructionMOV11{////the difference between them will be in the animation part
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.isimmed=true;
        this.name="MOV-MM";
        this.steps=[()=>{
            if(this.taille==1){
                let hexval=this.value2.toString(16);
                while(hexval.length<4){
                    hexval='0'+hexval;
                }
                memory.setRim(hexval.substring(0,2));
                memory.setRam(TwosComplement(this.addresse1+1,16));
                memory.write();
                memory.setRim(hexval.substring(2,4));
                memory.setRam(TwosComplement(this.addresse1,16));
                memory.write();
            }else{
            memory.setRim(this.value2.toString(16));
            memory.setRam(TwosComplement(this.addresse1,16));
            memory.write();
            }
        }
        ];
        this.buildanim=function(){
            if(this.isimmed==false){
                return[{
                    value:"addresse1",
                    target:infitToAcc.target,
                    time:infitToAcc.time,
                    anim:infitToAcc.anim,
                },
                {
                    value:"",
                    target:AccToBus.target,
                    time:AccToBus.time,
                    anim:AccToBus.anim,
                },
                {
                    value:"addresse1",
                    target:AccToADR.target,
                    time:AccToADR.time,
                    anim:AccToADR.anim,
                },
                {
                    value:"addresse1",
                    target:ADRToMAR.target,
                    time:ADRToMAR.time,
                    anim:ADRToMAR.anim,
                },
                {
                    value:"addresse1",
                    target:fitToMar.target,
                    time:fitToMar.time,
                    anim:fitToMar.anim,
                },
                {
                    value:"WRITE",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];}else{
                return[
                    {
                        value:"value2",
                        target:infitToMdr.target,
                        time:infitToMdr.time,
                        anim:infitToMdr.anim,
                    },
                    {
                        value:"WRITE",
                        target:MCanim.target,
                        time:MCanim.time,
                        anim:MCanim.anim,
                    }
                ];///animation of writing in MC/___________________________
            }
        }
    }
    
}


class InstructionSUB{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="SUB";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.Rual2.setleft(TwosComplement(this.value2,8));
                Alu1.subBinary(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.Rual2.setvalue(TwosComplement(this.value2,16));
                Alu1.subBinary(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"SUB",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionMUL{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="MUL";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.Rual2.setleft(TwosComplement(this.value2,8));
                Alu1.binaryMultiply(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.Rual2.setvalue(TwosComplement(this.value2,16));
                let R4MUL=Alu1.binaryMultiply(16);
                if(Alu1.Acc.getvalue().length>16){
                    Registers[3].setvalue(R4MUL);
                }
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"MUL",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionDIV{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="DIV";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.Rual2.setleft(TwosComplement(this.value2,8));
                let R4div=Alu1.DivBinary(8);
                Registers[3].setvalue(R4div);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.Rual2.setvalue(TwosComplement(this.value2,16));
                let R4div=Alu1.DivBinary(16);
                Registers[3].setvalue(R4div);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"DIV",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}
class InstructionAND{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="AND";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.Rual2.setleft(TwosComplement(this.value2,8));
                Alu1.andBinary(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.Rual2.setvalue(TwosComplement(this.value2,16));
                Alu1.andBinary(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"AND",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}
class InstructionOR{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="OR";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.Rual2.setleft(TwosComplement(this.value2,8));
                Alu1.orBinary(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.Rual2.setvalue(TwosComplement(this.value2,16));
                Alu1.orBinary(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"OR",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionXOR{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="XOR";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.Rual2.setleft(TwosComplement(this.value2,8));
                Alu1.xorBinary(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.Rual2.setvalue(TwosComplement(this.value2,16));
                Alu1.xorBinary(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"XOR",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionNOR{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="NOR";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.Rual2.setleft(TwosComplement(this.value2,8));
                Alu1.norBinary(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.Rual2.setvalue(TwosComplement(this.value2,16));
                Alu1.norBinary(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"NOR",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
}

class InstructionNAND{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="NAND";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.Rual2.setleft(TwosComplement(this.value2,8));
                Alu1.nandBinary(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.Rual2.setvalue(TwosComplement(this.value2,16));
                Alu1.nandBinary(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"NAND",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
}

class InstructionPUSH{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="PUSH";
        this.steps=[()=>{
            memory.setRim(this.value1);
            memory.pushval();
        }
        ];
        this.buildanim=function(){
            if(this.register1=="000"){
                return[{
                    value:this.value1,
                    target:fitToR1.target,
                    time:fitToR1.time,
                    anim:fitToR1.anim,
                },
                {
                    value:this.value1,
                    target:infitToR1.target,
                    time:infitToR1.time,
                    anim:infitToR1.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="001"){
                return[{
                    value:this.value1,
                    target:fitToR2.target,
                    time:fitToR2.time,
                    anim:fitToR2.anim,
                },
                {
                    value:this.value1,
                    target:infitToR2.target,
                    time:infitToR2.time,
                    anim:infitToR2.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="010"){
                return[{
                    value:this.value1,
                    target:fitToR3.target,
                    time:fitToR3.time,
                    anim:fitToR3.anim,
                },
                {
                    value:this.value1,
                    target:infitToR3.target,
                    time:infitToR3.time,
                    anim:infitToR3.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="011"){
                return[{
                    value:this.value1,
                    target:fitToR4.target,
                    time:fitToR4.time,
                    anim:fitToR4.anim,
                },
                {
                    value:this.value1,
                    target:infitToR4.target,
                    time:infitToR4.time,
                    anim:infitToR4.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="100"){
                return[{
                    value:this.value1,
                    target:fitToAcc.target,
                    time:fitToAcc.time,
                    anim:fitToAcc.anim,
                },
                {
                    value:this.value1,
                    target:infitToAcc.target,
                    time:infitToAcc.time,
                    anim:infitToAcc.anim,
                },
                {
                    value:this.value1,
                    target:AccToBus.target,
                    time:AccToBus.time,
                    anim:AccToBus.anim,
                },
                {
                    value:this.value1,
                    target:AccToMDR.target,
                    time:AccToMDR.time,
                    anim:AccToMDR.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="101"){
                return[{
                    value:this.value1,
                    target:fitToBr.target,
                    time:fitToBr.time,
                    anim:fitToBr.anim,
                },
                {
                    value:this.value1,
                    target:infitToBr.target,
                    time:infitToBr.time,
                    anim:infitToBr.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="110"){
                return[{
                    value:this.value1,
                    target:fitToIdr.target,
                    time:fitToIdr.time,
                    anim:fitToIdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToIdr.target,
                    time:infitToIdr.time,
                    anim:infitToIdr.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="111"){
                return[{
                    value:this.value1,
                    target:fitToSr.target,
                    time:fitToSr.time,
                    anim:fitToSr.anim,
                },
                {
                    value:this.value1,
                    target:infitToSR.target,
                    time:infitToSR.time,
                    anim:infitToSR.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }
        }
    }
}

class InstructionPOP{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="POP";
        this.steps=[()=>{
            memory.popval();
            Registers[this.register1].setvalue(memory.getRim());//the operand of pop can only be a register
        }
        ];
        this.buildanim=function(){
            if(this.register1=="000"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToR1.target,
                    time:fitToR1.time,
                    anim:fitToR1.anim,
                },
                {
                    value:this.value1,
                    target:infitToR1.target,
                    time:infitToR1.time,
                    anim:infitToR1.anim,
                },
            ];
            }else if(this.register1=="001"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToR2.target,
                    time:fitToR2.time,
                    anim:fitToR2.anim,
                },
                {
                    value:this.value1,
                    target:infitToR2.target,
                    time:infitToR2.time,
                    anim:infitToR2.anim,
                },
                ];
            }else if(this.register1=="010"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToR3.target,
                    time:fitToR3.time,
                    anim:fitToR3.anim,
                },
                {
                    value:this.value1,
                    target:infitToR3.target,
                    time:infitToR3.time,
                    anim:infitToR3.anim,
                },
            ];
            }else if(this.register1=="011"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToR4.target,
                    time:fitToR4.time,
                    anim:fitToR4.anim,
                },
                {
                    value:this.value1,
                    target:infitToR4.target,
                    time:infitToR4.time,
                    anim:infitToR4.anim,
                },
                //push animation
            ];
            }else if(this.register1=="100"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MDRToAcc.target,
                    time:MDRToAcc.time,
                    anim:MDRToAcc.anim,
                },
                {
                    value:"",
                    target:BusToAcc.target,
                    time:BusToAcc.time,
                    anim:BusToAcc.anim,
                },
                {
                    value:this.value1,
                    target:fitToAcc.target,
                    time:fitToAcc.time,
                    anim:fitToAcc.anim,
                },
                {
                    value:this.value1,
                    target:infitToAcc.target,
                    time:infitToAcc.time,
                    anim:infitToAcc.anim,
                },
                //push animation
            ];
            }else if(this.register1=="101"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToBr.target,
                    time:fitToBr.time,
                    anim:fitToBr.anim,
                },
                {
                    value:this.value1,
                    target:infitToBr.target,
                    time:infitToBr.time,
                    anim:infitToBr.anim,
                },
                //push animation
            ];
            }else if(this.register1=="110"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation of pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToIdr.target,
                    time:fitToIdr.time,
                    anim:fitToIdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToIdr.target,
                    time:infitToIdr.time,
                    anim:infitToIdr.anim,
                },
                //push animation
            ];
            }else if(this.register1=="111"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToSr.target,
                    time:fitToSr.time,
                    anim:fitToSr.anim,
                },
                {
                    value:this.value1,
                    target:infitToSR.target,
                    time:infitToSR.time,
                    anim:infitToSR.anim,
                },
                //push animation
            ];
            }
        }
    }
}

class InstructionBR{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="BR";
        this.steps=[(animations)=>{
            IP.setvalue(Dec2bin(this.addresse1));
            // console.log(`this is ip ${IP.getvalue()}`)
            /////we need to clear the queue from old instruction 
            queue.clear(animations);
            queue.fetchInstruction(animations,0,1,[],0);
            // console.log(`this is the queue ${queue.log()}`);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,1,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,2,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
        }
        ];
        this.buildanim=function(){
            return[];
        }
    }
}

class InstructionBE{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="BE";
        this.steps=[(animations)=>{
            
            if(Alu1.getFlags(0)==='1'){
                IP.setvalue(Dec2bin(this.addresse1));
            // console.log(`this is ip ${IP.getvalue()}`)
            /////we need to clear the queue from old instruction 
            queue.clear(animations);
            queue.fetchInstruction(animations,0,1,[],0);
            // console.log(`this is the queue ${queue.log()}`);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,1,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,2,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            }
            /////we need to clear the queue from old instruction 
        }
        ];
        this.buildanim=function(){
            return[];
        }
    }
}

class InstructionBNE{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="BNE";
        this.steps=[(animations)=>{
            if(Alu1.getFlags(0)==='0'){
                IP.setvalue(Dec2bin(this.addresse1));
            // console.log(`this is ip ${IP.getvalue()}`)
            /////we need to clear the queue from old instruction 
            queue.clear(animations);
            queue.fetchInstruction(animations,0,1,[],0);
            // console.log(`this is the queue ${queue.log()}`);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,1,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,2,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            }
            /////we need to clear the queue from old instruction 
        }
        ];
        this.buildanim=function(){
            return[];
        }
    }
}

class InstructionBS{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="BS";
        this.steps=[(animations)=>{
            if(Alu1.Acc.getvalue().toString().charAt(0)=='0'){
                IP.setvalue(Dec2bin(this.addresse1));
            // console.log(`this is ip ${IP.getvalue()}`)
            /////we need to clear the queue from old instruction 
            queue.clear(animations);
            queue.fetchInstruction(animations,0,1,[],0);
            // console.log(`this is the queue ${queue.log()}`);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,1,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,2,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            }
            /////we need to clear the queue from old instruction 
        }
        ];
        this.buildanim=function(){
            return[];
        }
    }
}

class InstructionBI{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="BI";
        this.steps=[(animations)=>{
            if(Alu1.Acc.getvalue().toString().charAt(0)==='1'){
                IP.setvalue(Dec2bin(this.addresse1));
            // console.log(`this is ip ${IP.getvalue()}`)
            /////we need to clear the queue from old instruction 
            queue.clear(animations);
            queue.fetchInstruction(animations,0,1,[],0);
            // console.log(`this is the queue ${queue.log()}`);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,1,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,2,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            }
            /////we need to clear the queue from old instruction 
        }
        ];
        this.buildanim=function(){
            return[];
        }
    }
}

class InstructionBIE{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="BIE";
        this.steps=[(animations)=>{
            if(Alu1.Acc.getvalue().toString().charAt(0)==='1' | Alu1.getFlags(0)==='1' ){
                IP.setvalue(Dec2bin(this.addresse1));
            // console.log(`this is ip ${IP.getvalue()}`)
            /////we need to clear the queue from old instruction 
            queue.clear(animations);
            queue.fetchInstruction(animations,0,1,[],0);
            // console.log(`this is the queue ${queue.log()}`);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,1,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,2,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            }
            /////we need to clear the queue from old instruction 
        }
        ];
        this.buildanim=function(){
            return[];
        }
    }
}

class InstructionBSE{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="BSE";
        this.steps=[(animations)=>{
            if(Alu1.Acc.getvalue().toString().charAt(0)==='0' | Alu1.getFlags(0)==='1' ){
                IP.setvalue(Dec2bin(this.addresse1));
            // console.log(`this is ip ${IP.getvalue()}`)
            /////we need to clear the queue from old instruction 
            queue.clear(animations);
            queue.fetchInstruction(animations,0,1,[],0);
            // console.log(`this is the queue ${queue.log()}`);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,1,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,2,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            }
            /////we need to clear the queue from old instruction 
        }
        ];
        this.buildanim=function(){
            return[];
        }    
    }
}

class InstructionSHL{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="SHL";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.SHL(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.SHL(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"SHL",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionSHR{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="SHR";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.SHR(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.SHR(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"SHR",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionROR{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="ROR";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.ROR(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.ROR(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"ROR",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionROL{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="ROL";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.ROL(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.ROL(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"ROL",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionNOT{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="NOT";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.NOT(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.NOT(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"NOT",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionNEG{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="NEG";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.NEG(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.NEG(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"NEG",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionPUSHA{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="PUSHA";
        this.steps=[()=>{
            memory.setRim(Registers[0]);
            memory.pushval();
            memory.setRim(Registers[1]);
            memory.pushval();
            memory.setRim(Registers[2]);
            memory.pushval();
            memory.setRim(Registers[3]);
            memory.pushval();
            memory.setRim(Registers[4]);
            memory.pushval();
            memory.setRim(Registers[5]);
            memory.pushval();
            memory.setRim(Registers[6]);
            memory.pushval();
            memory.setRim(Registers[7]);
            memory.pushval();
        }
        ];
        this.buildanim=function(){
            return [];
        }
    }
}

class InstructionPOPA{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="POPA";
        this.steps=[()=>{
            memory.popval();
            Registers[7].setvalue(memory.getRim());
            memory.popval();
            Registers[6].setvalue(memory.getRim());
            memory.popval();
            Registers[5].setvalue(memory.getRim());
            memory.popval();
            Registers[4].setvalue(memory.getRim());
            memory.popval();
            Registers[3].setvalue(memory.getRim());
            memory.popval();
            Registers[2].setvalue(memory.getRim());
            memory.popval();
            Registers[1].setvalue(memory.getRim());
            memory.popval();
            Registers[0].setvalue(memory.getRim());
        }
        ];
        this.buildanim=function(){}
    }
}
class InstructionREAD {
    constructor() {
        this.value1 = 0;
        this.value2 = 0;
        this.addresse1 = 0;
        this.register1 = 0;
        this.addresse2 = 0;
        this.register2 = 0;
        this.taille = 0;
        this.stepsNum = 1;
        this.name = "READ";

        
                this.steps = [
                    async () => {
                        const ioUnit = memory.ioUnit;
                        
                        if (!ioUnit.ioController.busy) {
                            ioUnit.ioController.busy = true;
        
                            // Create modal overlay
                            const modal = document.createElement('div');
                            modal.style.cssText = `
                                position: fixed;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background: rgba(0, 0, 0, 0.5);
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                z-index: 1000;
                            `;
        
                            // Create modal content
                            const modalContent = document.createElement('div');
                            modalContent.style.cssText = `
                                background: white;
                                padding: 20px;
                                border-radius: 8px;
                                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                                max-width: 400px;
                                width: 90%;
                            `;
        
                            // Add content
                            modalContent.innerHTML = `
                                <h2 style="color: #333; margin-bottom: 16px;">Enter Input Value</h2>
                                <input type="text" id="inputValue" style="
                                    width: 100%;
                                    padding: 8px;
                                    margin-bottom: 16px;
                                    border: 1px solid #ddd;
                                    border-radius: 4px;
                                    font-size: 14px;
                                " placeholder="Enter value...">
                                <button id="submitInput" style="
                                    background: #4CAF50;
                                    color: white;
                                    border: none;
                                    padding: 8px 16px;
                                    border-radius: 4px;
                                    cursor: pointer;
                                    font-size: 14px;
                                    transition: background 0.3s;
                                ">Submit</button>
                            `;
        
                            modal.appendChild(modalContent);
                            document.body.appendChild(modal);
        
                            // Add hover effect to button
                            const submitBtn = modalContent.querySelector('#submitInput');
                            submitBtn.addEventListener('mouseover', () => {
                                submitBtn.style.background = '#45a049';
                            });
                            submitBtn.addEventListener('mouseout', () => {
                                submitBtn.style.background = '#4CAF50';
                            });
        
                            // Handle input submission
                            return new Promise((resolve) => {
                                submitBtn.onclick = () => {
                                    const inputValue = modalContent.querySelector('#inputValue').value;
                                    document.body.removeChild(modal);
                                    ioUnit.writeToBuffer1(inputValue);
                                    this.resume();
                                    ioUnit.ioController.busy = false;
                                    resolve();
                                };
                            });
                        } else {
                            console.log("I/O Unit busy, READ delayed");
                            return false;
                        }
                    }
                ];
        
                
        // Animation sequence
        this.buildanim=function(){
            return[{
                value:"ADD",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }

    resume() {
        const ioUnit = memory.ioUnit;
        let value = ioUnit.readFromBuffer1(); // Could be string or number
        this.addresse1 = opValue;
        console.log("this is the value",this.addresse1);
        let baseAddress = parseInt(opValue, 10); // Starting address
    
        if (isNaN(value)) {
            // STRING CASE
            for (let i = 0; i < value.length; i++) {
                let charCode = value.charCodeAt(i); // ASCII code
                let hex = charCode.toString(16).toUpperCase().padStart(2, '0'); // Hex value
    
                memory.setRim(hex);
                memory.setRam(TwosComplement(baseAddress + i, 16)); // Increment address
                memory.write();
    
                console.log(`📝 Wrote char '${value[i]}' as ${hex} to address ${baseAddress + i}`);
            }
        } else {
            // NUMBER CASE
            let hexValue = parseInt(value).toString(16).toUpperCase();
            memory.setRim(hexValue);
            memory.setRam(TwosComplement(baseAddress, 16));
            memory.write();
            console.log("\n\n\n\n louai");
            memory.setRam(TwosComplement(baseAddress,16));
            memory.read(false);
            memory.getRim();
            console.log("kjkjkkj", String.fromCharCode(parseInt(memory.getRim(), 16)));

            console.log(`📝 Wrote number ${value} as hex ${hexValue} to address ${baseAddress}`);
        }
    
        ioUnit.ioController.busy = false;
        console.log(`✅ IO to CPU: Moved data ${value} from I/O buffer to memory.`);
    }
    
}

class InstructionWRITE {
    constructor() {
        this.value1 = 0;
        this.value2 = 0;
        this.addresse1 = 0;
        this.register1 = 0;
        this.addresse2 = 0;
        this.register2 = 0;
        this.taille = 0;
        this.stepsNum = 1;
        this.name = "WRITE";
                // ...existing constructor code...
        
                this.steps = [
                    async () => {
                        const ioUnit = memory.ioUnit;
                        
                        if (!ioUnit.ioController.busy) {
                            ioUnit.ioController.busy = true;
                            let temp = this.addresse1;
                            ioUnit.emptyBuffer();
                            
                            for (let index = 0; index < this.value2; index++) {
                                memory.setRam(TwosComplement(temp,16));
                                memory.read(false);
                                memory.getRim();
                                ioUnit.writeToBuffer(index, String.fromCharCode(parseInt(memory.getRim(), 16)));
                                temp++;
                            }
        
                            // Return a new Promise that resolves when the modal is closed
                            return new Promise((resolve) => {
                                // Create modal overlay
                                const modal = document.createElement('div');
                                modal.style.cssText = `
                                    position: fixed;
                                    top: 0;
                                    left: 0;
                                    width: 100%;
                                    height: 100%;
                                    background: rgba(0, 0, 0, 0.5);
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    z-index: 1000;
                                `;
        
                                // Create modal content
                                const modalContent = document.createElement('div');
                                modalContent.style.cssText = `
                                    background: white;
                                    padding: 20px;
                                    border-radius: 8px;
                                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                                    max-width: 400px;
                                    width: 90%;
                                `;
        
                                modalContent.innerHTML = `
                                    <h2 style="color: #333; margin-bottom: 16px;">Buffer Contents</h2>
                                    <p style="color: #666; margin-bottom: 20px;">${ioUnit.readFromBuffer()}</p>
                                    <button id="closeModal" style="
                                        background: #4CAF50;
                                        color: white;
                                        border: none;
                                        padding: 8px 16px;
                                        border-radius: 4px;
                                        cursor: pointer;
                                        font-size: 14px;
                                        transition: background 0.3s;
                                    ">Close</button>
                                `;
        
                                modal.appendChild(modalContent);
                                document.body.appendChild(modal);
        
                                const closeBtn = modalContent.querySelector('#closeModal');
                                closeBtn.addEventListener('mouseover', () => {
                                    closeBtn.style.background = '#45a049';
                                });
                                closeBtn.addEventListener('mouseout', () => {
                                    closeBtn.style.background = '#4CAF50';
                                });
        
                                // Close modal and resolve the promise
                                closeBtn.onclick = () => {
                                    document.body.removeChild(modal);
                                    ioUnit.ioController.busy = false;
                                    resolve(); // This will allow the instruction to continue
                                };
                            });
                        } else {
                            console.log("I/O Unit busy, WRITE delayed");
                            return false;
                        }
                    }
                ];
           
        // Animation sequence
        this.buildanim = function () {
            const ioUnit = memory.ioUnit;
            const animSteps = [];
        
            for (let i = 0; i < this.value2; i++) {
                const char = ioUnit.buffer[i];
                console.log("animation is here",this.value2);
               
                
                animSteps.push(
                    {
                        value: `WRITE: ${char}`,
                        target: addanim.target,
                        time: addanim.time,
                        anim: addanim.anim,
                    },
                    {
                        value: char,
                        target: MdrToBus.target,
                        time: MdrToBus.time,
                        anim: MdrToBus.anim,
                    },
                    {
                        value: char,
                        target: MdrToIO.target,
                        time: MdrToIO.time,
                        anim: MdrToIO.anim,
                    },
                    {
                        value: char,
                        target: BusToIO.target,
                        time: BusToIO.time,
                        anim: BusToIO.anim,
                    }
                );
            }
        
            return animSteps;
        };
    }

    resume() {
        const ioUnit = memory.ioUnit;
        
        let value = ioUnit.readFromBuffer(0);
        let register = parseInt(this.register1, 2);
        Registers[register].setvalue(TwosComplement(value, 16));

        ioUnit.ioController.busy = false;
        console.log(`✅ IO to CPU: Moved data ${value} from I/O buffer to CPU register R${register}.`);
    }
}


export {InstructionADD,InstructionMOV00,InstructionMOV01,InstructionMOV10,InstructionMOV11,InstructionSUB,InstructionMUL,InstructionDIV,InstructionBSE,InstructionBIE,InstructionBI,InstructionBS,InstructionBNE,InstructionBE,InstructionBR,InstructionPOP,InstructionPUSH,InstructionAND,InstructionOR,InstructionNAND,InstructionNOR,InstructionXOR,InstructionNEG,InstructionNOT,InstructionROL,InstructionROR,InstructionSHL,InstructionSHR,InstructionPOPA,InstructionPUSHA,InstructionREAD, InstructionWRITE}