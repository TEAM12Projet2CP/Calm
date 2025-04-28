import { useSpeedStore } from "./speedStore.jsx"; 
import { Registers, memory, Alu1, IP ,queue } from "../pages/Ide";
import { TwosComplement } from "./ALU.js";
import { gsap } from "gsap";
// import { Register } from "./Register.js";

// Helper function to create animations with dynamic speed
function createAnimation(animationDef) {
  return {
    ...animationDef,
    anim: function(val, h, w) {
      // Get current speed every time animation runs
      const currentSpeed = useSpeedStore.getState().speed;
      const duration = 1 / currentSpeed;
      
      // Kill any existing animations for the target
      gsap.killTweensOf(animationDef.target);
      
      // Execute the animation with current speed
      animationDef.anim(val, h, w, currentSpeed);
    }
  };
}

////////////////////////////////////////////////
function Dec2bin(dec){
    return ("00000000" + (parseInt(dec, 10)).toString(2)).substr(-8);
}
const rawIounitToBus = {
  value: "",
  target: ".ball",
  time: () => 1000 / useSpeedStore.getState().speed,
  anim: (val, h, w, speed) => {
    gsap.fromTo(
      ".ball",
      {
        borderRadius: "10px",
        width: w * 0.1,
        height: h * 0.045,
        x: w * 0.442,
        y: h * 0.666,
        opacity: "0",
      },
      {
        opacity: "1",
        duration: 1 / speed,
      }
    );
  },
};

const ADRbusToDATABus={
    value:"",
    target:".ball",
    time:1800,
    anim:(val,h,w)=>{
    ///depart: ( 69% , 13.7% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.746,y:h*0.46,opacity:"0"},{opacity:"1" ,duration:1/(useSpeedStore.getState().speed)*0.5});
    gsap.fromTo(".ball",{x:w*0.746,y:h*0.46},{y:h*0.26 ,duration:1/(useSpeedStore.getState().speed)*0.8,delay:1/(useSpeedStore.getState().speed)*0.5});
    gsap.to(".ball",{opacity:"0" ,duration:1/(useSpeedStore.getState().speed)*0.5,delay:1/(useSpeedStore.getState().speed)*1.3});
  },}

  const CacheToADR={
    value:"",
    target:".box-data",
  time:1/useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.321,opacity:"0"},{opacity:"1",duration:1/(useSpeedStore.getState().speed)*1})
  gsap.fromTo(".box-data",{x:w*0.321},{x:w*0.705,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*2});
  },}

const Cacheanim={
        value:"",
        target:".Cache",
        time:3000,
        anim:(val,h,w)=>{
            gsap.fromTo(".Cache",{opacity:"0"},{opacity:"1" ,duration:1/(useSpeedStore.getState().speed)*1});
            gsap.fromTo(".Cache",{opacity:"1"},{opacity:"0" ,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*1});
        },}

const fitToCache={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.08,height:h*0.06,x:w*0.328,y:h*0.31,opacity:"0"},{opacity:"1" ,duration:1/(useSpeedStore.getState().speed)*1});
    //gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.11,height:h*0.06,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*:1});
    //gsap.to(".ball",{opacity:"0" ,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*:3});
  },}

const AccToCache={
  value:"",
  target:".box-data",
time:1/useSpeedStore.getState().speed*3000,
  anim:(val,h,w)=>{
  gsap.fromTo(".box-data",{x:w*0.321,opacity:"0"},{opacity:"1",duration:1/(useSpeedStore.getState().speed)*1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*2});
},}

const CacheToRual1={
  value:"",
  target:".box-data",
time:1/useSpeedStore.getState().speed*3000,
  anim:(val,h,w)=>{
  gsap.fromTo(".box-data",{x:w*0.321,opacity:"0"},{opacity:"1",duration:1/(useSpeedStore.getState().speed)})
gsap.fromTo(".box-data",{x:w*0.321},{x:w*0.106,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*1})
gsap.to(".box-data",{opacity:"0" ,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*2});
},}

const CacheToRual2={
  value:"",
  target:".box-data",
time:1/useSpeedStore.getState().speed*3000,
  anim:(val,h,w)=>{
  gsap.fromTo(".box-data",{x:w*0.321,opacity:"0"},{opacity:"1",duration:1/(useSpeedStore.getState().speed)})
gsap.fromTo(".box-data",{x:w*0.321},{x:w*0.262,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)})
gsap.to(".box-data",{opacity:"0" ,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*2});
},}
let queueExitToBus={
value:"",
target:".ball",
time:4000,
anim:(val,h,w)=>{
        gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.726,y:h*0.6638,opacity:"0"},{opacity:"1" ,duration:1/(useSpeedStore.getState().speed)*1});
        gsap.fromTo(".ball",{x:w*0.726,y:h*0.6638},{x:w*0.715 ,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*1});
        gsap.to(".ball",{y:h*0.555 ,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*2});
        gsap.to(".ball",{opacity:"0" ,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*3});
}
}

const MDRToCache={
value:"",
target:".box-data",
time:1/useSpeedStore.getState().speed*3000,
anim:(val,h,w)=>{
gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1/(useSpeedStore.getState().speed)*1})
gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.321,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*1})
gsap.to(".box-data",{opacity:"0" ,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*2});
},}

const CacheToMDR={
value:"",
target:".box-data",
time:1/useSpeedStore.getState().speed*3000,
anim:(val,h,w)=>{
gsap.fromTo(".box-data",{x:w*0.321,opacity:"0"},{opacity:"1",duration:1/(useSpeedStore.getState().speed)*1})
gsap.fromTo(".box-data",{x:w*0.321},{x:w*0.497,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*1})
gsap.to(".box-data",{opacity:"0" ,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*2});
},}

const CacheToReg={
value:"",
target:".box-data",
time:1/useSpeedStore.getState().speed*3000,
anim:(val,h,w)=>{
gsap.fromTo(".box-data",{x:w*0.321,opacity:"0"},{opacity:"1",duration:1/(useSpeedStore.getState().speed)*1})
gsap.fromTo(".box-data",{x:w*0.321},{x:w*0.44,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*1})
gsap.to(".box-data",{opacity:"0" ,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*2});
},}

const RegToCache={
value:"",
target:".box-data",
time:1/useSpeedStore.getState().speed*3000,
anim:(val,h,w)=>{
gsap.fromTo(".box-data",{x:w*0.44,opacity:"0"},{opacity:"1",duration:1/(useSpeedStore.getState().speed)*1})
gsap.fromTo(".box-data",{x:w*0.44},{x:w*0.321,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*1})
gsap.to(".box-data",{opacity:"0" ,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*2});
},}

const CacheToBus={
value:"",
target:".ball",
time:1/useSpeedStore.getState().speed*3000,
anim:(val,h,w)=>{
gsap.fromTo(".ball", {height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.36,y:h*0.39,opacity:"0"}, {opacity:"1",duration:1/(useSpeedStore.getState().speed)*1});
gsap.fromTo(".ball", {x:w*0.36,y:h*0.39}, {y:h*0.46 ,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*1});
gsap.to(".ball",{opacity:"0" ,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*2});
},
}

const BusToCache={
value:"",
target:".ball",
time:1/useSpeedStore.getState().speed*3000,
anim:(val,h,w)=>{
gsap.fromTo(".ball", {height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.36,y:h*0.46,opacity:"0"}, {opacity:"1",duration:1/(useSpeedStore.getState().speed)*1});
gsap.fromTo(".ball", {x:w*0.36,y:h*0.46}, {y:h*0.39 ,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*1});
gsap.to(".ball",{opacity:"0" ,duration:1/(useSpeedStore.getState().speed)*1,delay:1/(useSpeedStore.getState().speed)*2});
},
}

/////////////////animations to test////////////////////
const IounitToBus = {
  value: "",
  target: ".ball",
  time: () => 1000 / useSpeedStore.getState().speed,
  anim: (val, h, w) => {
    const speed = useSpeedStore.getState().speed;

    // Kill previous animations if speed changed (optional)
    gsap.killTweensOf(".ball");

    gsap.fromTo(
      ".ball",
      {
        borderRadius: "10px",
        width: w * 0.1,
        height: h * 0.045,
        x: w * 0.442,
        y: h * 0.666,
        opacity: "0",
      },
      {
        opacity: "1",
        duration: 1 / speed,
      }
    );
  },
};



const rawBusToRual1 = {
  value: "",
  target: ".ball",
  time: () => 3000 / useSpeedStore.getState().speed,
  anim: (val, h, w, speed) => {
    gsap.killTweensOf(".ball");

    gsap.fromTo(".ball", {
      height: "2.812%",
      width: "1.4%",
      borderRadius: "50%",
      x: w * 0.143,
      y: h * 0.56,
      opacity: "0"
    }, {
      opacity: "1",
      duration: 1 / speed
    });

    gsap.fromTo(".ball", {
      x: w * 0.143,
      y: h * 0.56
    }, {
      y: h * 0.625,
      duration: 1 / speed,
      delay: 1 / speed
    });

    gsap.to(".ball", {
      opacity: "0",
      duration: 1 / speed,
      delay: 2 / speed
    });
  }
};

const rawRual1ToBus = {
  value: "",
  target: ".ball",
  time: () => 3000 / useSpeedStore.getState().speed,
  anim: (val, h, w, speed) => {
    gsap.killTweensOf(".ball");

    gsap.fromTo(".ball", {
      height: "2.812%",
      width: "1.4%",
      borderRadius: "50%",
      x: w * 0.143,
      y: h * 0.625,
      opacity: "0"
    }, {
      opacity: "1",
      duration: 1 / speed
    });

    gsap.fromTo(".ball", {
      x: w * 0.143,
      y: h * 0.625
    }, {
      y: h * 0.56,
      duration: 1 / speed,
      delay: 1 / speed
    });

    gsap.to(".ball", {
      opacity: "0",
      duration: 1 / speed,
      delay: 2 / speed
    });
  }
};

  
  const BusToRual2={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    ///depart: ( 54% , 35,2% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.299,y:h*0.56,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    gsap.fromTo(".ball",{x:w*0.299,y:h*0.56},{y:h*0.625 ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}
  
  const BusToRegisters={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    ///depart: ( 53.7% , 47.8% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.481,y:h*0.555,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    gsap.fromTo(".ball",{x:w*0.481,y:h*0.555},{y:h*0.58 ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}

  const RegistersToBus={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    ///depart: ( 53.7% , 47.8% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.481,y:h*0.58,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    gsap.fromTo(".ball",{x:w*0.481,y:h*0.58},{y:h*0.555 ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}

  const IrToDecoder={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    ///depart: ( 59% , 78.2% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.644,y:h*0.708,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    gsap.fromTo(".ball",{x:w*0.644,y:h*0.708},{y:h*0.725 ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}
  
  const DecoderToSequencer={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    ///depart: ( 59% , 78.2% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.644,y:h*0.813,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    gsap.fromTo(".ball",{x:w*0.644,y:h*0.813},{y:h*0.827 ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}
  
  const rawQueueToIr = {
    value: "",
    target: ".ball",
    time: () => 3000 / useSpeedStore.getState().speed,
    anim: (val, h, w, speed) => {
      gsap.killTweensOf(".ball");
  
      gsap.fromTo(".ball", {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.726,
        y: h * 0.6638,
        opacity: "0"
      }, {
        opacity: "1",
        duration: 1 / speed
      });
  
      gsap.fromTo(".ball", {
        x: w * 0.726,
        y: h * 0.6638
      }, {
        x: w * 0.711,
        duration: 1 / speed,
        delay: 1 / speed
      });
  
      gsap.to(".ball", {
        opacity: "0",
        duration: 1 / speed,
        delay: 2 / speed
      });
    }
  };
  
  const QueueToIr = createAnimation(rawQueueToIr);
  
  const rawBusToQueue = {
    value: "",
    target: ".ball",
    time: () => 4000 / useSpeedStore.getState().speed,
    anim: (val, h, w, speed) => {
      gsap.killTweensOf(".ball");
  
      gsap.fromTo(".ball", {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.931,
        y: h * 0.56,
        opacity: "0"
      }, {
        opacity: "1",
        duration: 1 / speed
      });
  
      gsap.fromTo(".ball", {
        x: w * 0.931,
        y: h * 0.56
      }, {
        y: h * 0.6638,
        duration: 1 / speed,
        delay: 1 / speed
      });
  
      gsap.to(".ball", {
        x: w * 0.921,
        duration: 1 / speed,
        delay: 2 / speed
      });
  
      gsap.to(".ball", {
        opacity: "0",
        duration: 1 / speed,
        delay: 3 / speed
      });
    }
  };
  
  const BusToQueue = createAnimation(rawBusToQueue);
  
  
  const BusToAcc={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*4000,
    anim:(val,h,w)=>{
    ///depart: ( 39.7% , 54% )  W:1.4% ,H:2.812
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.361,y:h*0.56,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    gsap.fromTo(".ball",{x:w*0.361,y:h*0.56},{y:h*0.923 ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1});
    gsap.to(".ball",{x:w*0.282 ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
    gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*3});
  },}
  const AccToBus={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*4000,
    anim:(val,h,w)=>{
    ///depart: ( 39.7% , 54% )  W:1.4% ,H:2.812
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.282,y:h*0.923,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    gsap.fromTo(".ball",{x:w*0.282,y:h*0.923},{x:w*0.361 ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1});
    gsap.to(".ball",{y:h*0.56 ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
    gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*3});
  },}
  
  const AluToAcc={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    ///depart: ( 30.3% , 83.5% )  W:1.4% ,H:2.812
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.226,y:h*0.863,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    gsap.fromTo(".ball",{x:w*0.226,y:h*0.863},{y:h*0.877 ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}
  
  const MdrToBus={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    ///depart: ( 51.8% , 43.2% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.539,y:h*0.445,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    gsap.fromTo(".ball",{x:w*0.539,y:h*0.445},{y:h*0.465 ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}

  const BusToMdr={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    ///depart: ( 51.8% , 43.2% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.539,y:h*0.465,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    gsap.fromTo(".ball",{x:w*0.539,y:h*0.465},{y:h*0.445 ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}
  
  const AdrToBus={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    ///depart: ( 66.3% , 25.4% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.784,y:h*0.137,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    gsap.fromTo(".ball",{x:w*0.784,y:h*0.137},{y:h*0.18 ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}
  
  const IpToAdr={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    ///depart: ( 69% , 13.7% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.746,y:h*0.26,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    gsap.fromTo(".ball",{x:w*0.746,y:h*0.26},{y:h*0.46 ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1});
    gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}
  
  /////////////data bus animations/////////////////:
  
  const MdrTOQue={
    value:"",
    target:".box-data",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1/(  useSpeedStore.getState().speed)*1})
    gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.874,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1})
    gsap.to(".box-data",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}
  
  const MdrToReg={
    value:"",
    target:".box-data",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1/(  useSpeedStore.getState().speed)*1})
  gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.44,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}

  const RegToMdr={
    value:"",
    target:".box-data",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.44,opacity:"0"},{opacity:"1",duration:1/(  useSpeedStore.getState().speed)*1})
  gsap.fromTo(".box-data",{x:w*0.44},{x:w*0.497,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}
  let queueExitToReg={
    value:"",
    target:".box-data",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
        gsap.fromTo(".box-data",{x:w*0.68,opacity:"0"},{opacity:"1",duration:1/(  useSpeedStore.getState().speed)*1})
        gsap.fromTo(".box-data",{x:w*0.68},{x:w*0.44,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1})
        gsap.to(".box-data",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
    }
}
  const MdrToIO={
    value:"",
    target:".box-data",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1/(  useSpeedStore.getState().speed)*1})
  gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.182,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}
  const IOToMdr={
    value:"",
    target:".box-data",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.182,opacity:"0"},{opacity:"1",duration:1/(  useSpeedStore.getState().speed)*1})
  gsap.fromTo(".box-data",{x:w*0.182},{x:w*0.497,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}
  const MdrToRual1={
    value:"",
    target:".box-data",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1/(  useSpeedStore.getState().speed)*1})
  gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.106,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}

  const RegToRual1={
    value:"",
    target:".box-data",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.44,opacity:"0"},{opacity:"1",duration:1/(  useSpeedStore.getState().speed)*1})
    gsap.fromTo(".box-data",{x:w*0.44},{x:w*0.106,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1})
    gsap.to(".box-data",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
    },}

const MdrToRual2={
    value:"",
    target:".box-data",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1/(  useSpeedStore.getState().speed)*1})
    gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.262,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1})
    gsap.to(".box-data",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
    },}

  const RegToRual2={
    value:"",
    target:".box-data",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.44,opacity:"0"},{opacity:"1",duration:1/(  useSpeedStore.getState().speed)*1})
  gsap.fromTo(".box-data",{x:w*0.44},{x:w*0.262,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}

  const AccToMDR={
    value:"",
    target:".box-data",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.321,opacity:"0"},{opacity:"1",duration:1/(  useSpeedStore.getState().speed)*1})
  gsap.fromTo(".box-data",{x:w*0.321},{x:w*0.497,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}
  const MDRToAcc={
    value:"",
    target:".box-data",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1/(  useSpeedStore.getState().speed)*1})
  gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.321,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}

  const AccToReg={
    value:"",
    target:".box-data",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.321,opacity:"0"},{opacity:"1",duration:1/(  useSpeedStore.getState().speed)*1})
  gsap.fromTo(".box-data",{x:w*0.321},{x:w*0.44,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}

  const RegToAcc={
    value:"",
    target:".box-data",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.44,opacity:"0"},{opacity:"1",duration:1/(  useSpeedStore.getState().speed)*1})
  gsap.fromTo(".box-data",{x:w*0.44},{x:w*0.321,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}
  
  const MdrToADR={
    value:"",
    target:".box-data",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1/(  useSpeedStore.getState().speed)*1})
  gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.705,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}

  const AccToADR={
    value:"",
    target:".box-data",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.321,opacity:"0"},{opacity:"1",duration:1/(  useSpeedStore.getState().speed)*1})
  gsap.fromTo(".box-data",{x:w*0.321},{x:w*0.705,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}


  const Rual1ToADR={
    value:"",
    target:".box-data",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.44,opacity:"0"},{opacity:"1",duration:1/(  useSpeedStore.getState().speed)*1})
  gsap.fromTo(".box-data",{x:w*0.44},{x:w*0.705,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1})
  gsap.to(".box-data",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}

  const BusToIr={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*4000,
    anim:(val,h,w)=>{
    ///depart: ( 79.1% , 53.6% )  W:1.4% ,H:2.812
    gsap.fromTo(".ball",{x:w*0.931,y:h*0.56,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    gsap.fromTo(".ball",{x:w*0.931,y:h*0.56},{y:h*0.6638 ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1});
    gsap.to(".ball",{x:w*0.711 ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
    gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*3});
  },}

  //////////////// Adresse bus animations ///////////////////////////////
  const IPToMAR={
    value:"",
    target:".box-ADR",
    time:1/useSpeedStore.getState().speed*1800,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-ADR",{x:w*0.753,opacity:"0"},{opacity:"1",duration:1/useSpeedStore.getState().speed*0.5})
          gsap.fromTo(".box-ADR",{x:w*0.753},{x:w*0.648,duration:1/useSpeedStore.getState().speed*0.8,delay:1/useSpeedStore.getState().speed*0.5})
          gsap.to(".box-ADR",{opacity:"0" ,duration:1/useSpeedStore.getState().speed*0.5,delay:1/useSpeedStore.getState().speed*1.3});
  },}

const ADRToMAR={
    value:"",
    target:".box-ADR",
  time:1/  useSpeedStore.getState().speed*3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-ADR",{x:w*0.712,opacity:"0"},{opacity:"1",duration:1/(  useSpeedStore.getState().speed)*1})
    gsap.fromTo(".box-ADR",{x:w*0.712},{x:w*0.648,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1})
    gsap.to(".box-ADR",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*2});
  },}
  
  ////////////////////////fitting animations//////////////////////
  const fitToRual1={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"20px",width:w*0.067,height:h*0.05,x:w*0.12,y:h*0.658,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"20px",width:w*0.067,height:h*0.05,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:3});
  },}
  const infitToRual1={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.12,y:h*0.658,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        // gsap.fromTo(".ball",{x:w*0.12,y:h*0.658,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1});
    },}
  const fitToRual2={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"20px",width:w*0.067,height:h*0.05,x:w*0.275,y:h*0.658,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"20px",width:w*0.067,height:h*0.05,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:3});
  },}
  const fitToR2={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.666,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:3});
  },}
  const infitToR2={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.666,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.666,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1});
    },}

  const fitToR1={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
      gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.6105,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    //   gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
    //   gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:3});
    },}
    const infitToR1={
        value:"",
        target:".ball",
      time:1/  useSpeedStore.getState().speed*1000,
        anim:(val,h,w)=>{
            // gsap.fromTo(".ball",{x:w*0.442,y:h*0.6105,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
            // gsap.fromTo(".ball",{x:w*0.442,y:h*0.6105,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
            // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
            gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1});
        },}

  const fitToR3={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.7205,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:3});
  },}

  const infitToR3={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.7205,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.7205,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1});
    },}

  const fitToR4={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.7735,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:3});
  },}

  const infitToR4={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.7735,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.7735,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1});
    },}

  const fitToIdr={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.8277,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:3});
  },}
  const infitToIdr={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.8277,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.8277,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1});
    },}
  const fitToBr={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.8815,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:3});
  },}
  const infitToBr={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.8815,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.8815,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1});
    },}
  const fitToSr={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.9347,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:3});
  },}
  const infitToSR={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.9347,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.9347,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1});
    },}
  const fitToIr={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.055,x:w*0.6,y:h*0.6495,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.055,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:3});
  },}
  const fitToDecode={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.055,x:w*0.6,y:h*0.753,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.055,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:3});
  },}
  const fitToSequencer={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.055,x:w*0.6,y:h*0.858,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.055,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:3});
  },}
  const fitToAcc={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.07,height:h*0.055,x:w*0.1995,y:h*0.91,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.07,height:h*0.055,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:3});
  },}
  const infitToAcc={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.1995,y:h*0.91,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        // gsap.fromTo(".ball",{x:w*0.1995,y:h*0.91,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1});
    },}
  const fitToMdr={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.11,height:h*0.06,x:w*0.49,y:h*0.38,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.11,height:h*0.06,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:3});
  },}
  const infitToMdr={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.49,y:h*0.38,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        // gsap.fromTo(".ball",{x:w*0.49,y:h*0.38,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
        gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1});
    },}
  const fitToMar={
    value:"",
    target:".ball",
  time:1/  useSpeedStore.getState().speed*1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.032,height:h*0.14,x:w*0.623,y:h*0.165,opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.032,height:h*0.14,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*:3});
  },}

  const addanim={
    value:"",
    target:".ALU",
  time:1/  useSpeedStore.getState().speed*2000,
    anim:(val,h,w)=>{
        gsap.fromTo(".ALU",{opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
        gsap.fromTo(".ALU",{opacity:"1"},{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1});
    },}

    const MCanim={
        value:"",
        target:".MC",
      time:1/  useSpeedStore.getState().speed*2000,
        anim:(val,h,w)=>{
            gsap.fromTo(".MC",{opacity:"0"},{opacity:"1" ,duration:1/(  useSpeedStore.getState().speed)*1});
            gsap.fromTo(".MC",{opacity:"1"},{opacity:"0" ,duration:1/(  useSpeedStore.getState().speed)*1,delay:1/(  useSpeedStore.getState().speed)*1});
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
              time:1/  useSpeedStore.getState().speed*addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
              time:1/  useSpeedStore.getState().speed*AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
              time:1/  useSpeedStore.getState().speed*fitToAcc.time,
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
            if (this.taille == 1) {
              Registers[this.register1].setvalue(TwosComplement(this.value2,16));  
            }else{
              if(this.register1==0){
                Registers[0].setright(TwosComplement(this.value2,8));
                console.log("redoune");
            }else if(this.register1==4){
                Registers[0].setleft(TwosComplement(this.value2,8));
                console.log("redoune");
            }
            else if(this.register1==1){
                Registers[1].setright(TwosComplement(this.value2,8));
            }else if(this.register1==5){
                Registers[1].setleft(TwosComplement(this.value2,8));
            }
            else if(this.register1==2){
                Registers[2].setright(TwosComplement(this.value2,8));
            }else if(this.register1==6){
                Registers[2].setleft(TwosComplement(this.value2,8));
            }
            else if(this.register1==3){
                Registers[4].setright(TwosComplement(this.value2,8));
            }else if(this.register1==7){
                Registers[4].setleft(TwosComplement(this.value2,8));
            }
        }
            }
        ];
        this.buildanim=function(){
            if(((this.register1=="000") || (this.register1=4 && this.taille==0))){
              if(((this.register2=="000") || (this.register2=4 && this.taille==0))){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                      time:1/  useSpeedStore.getState().speed*infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                      time:1/  useSpeedStore.getState().speed*fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else if ((this.register2=="001" ||( this.taille==0 && this.register2==5))) {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                      time:1/  useSpeedStore.getState().speed*infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                      time:1/  useSpeedStore.getState().speed*fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                    
                }else if ((this.register2==2 ||( this.taille==0 && this.register2==6))) {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                      time:1/  useSpeedStore.getState().speed*infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                      time:1/  useSpeedStore.getState().speed*fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                      time:1/  useSpeedStore.getState().speed*infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:infitToR1.target,
                      time:1/  useSpeedStore.getState().speed*infitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else if ((this.register2=="4" && this.taille==1) || ((this.register2==3 || this.register2==7)  && this.taille==0) ) {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                      time:1/  useSpeedStore.getState().speed*infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                      time:1/  useSpeedStore.getState().speed*AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                      time:1/  useSpeedStore.getState().speed*AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                      time:1/  useSpeedStore.getState().speed*fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                      time:1/  useSpeedStore.getState().speed*infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                      time:1/  useSpeedStore.getState().speed*fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                      time:1/  useSpeedStore.getState().speed*infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                      time:1/  useSpeedStore.getState().speed*fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                      time:1/  useSpeedStore.getState().speed*infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                      time:1/  useSpeedStore.getState().speed*fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }
            }else if ((this.register1=="001" ||( this.taille==0 && this.register1==5))) {
              if(((this.register2=="000") || (this.register2=4 && this.taille==0))){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                      time:1/  useSpeedStore.getState().speed*infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        target:fitToR2.target,
                      time:1/  useSpeedStore.getState().speed*fitToR2.time,
                        value:"value2",
                        anim:fitToR2.anim,
                    },
                ];
                }else if ((this.register2=="001" ||( this.taille==0 && this.register2==5))) {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                      time:1/  useSpeedStore.getState().speed*infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                      time:1/  useSpeedStore.getState().speed*fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                    
                }else if ((this.register2==2 ||( this.taille==0 && this.register2==6))) {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                      time:1/  useSpeedStore.getState().speed*infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                      time:1/  useSpeedStore.getState().speed*fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                      time:1/  useSpeedStore.getState().speed*infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                      time:1/  useSpeedStore.getState().speed*fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                }else if ((this.register2=="4" && this.taille==1) || ((this.register2==3 || this.register2==7)  && this.taille==0) ) {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                      time:1/  useSpeedStore.getState().speed*infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                      time:1/  useSpeedStore.getState().speed*AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                      time:1/  useSpeedStore.getState().speed*AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                      time:1/  useSpeedStore.getState().speed*fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                      time:1/  useSpeedStore.getState().speed*infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                      time:1/  useSpeedStore.getState().speed*fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                      time:1/  useSpeedStore.getState().speed*infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                      time:1/  useSpeedStore.getState().speed*fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                      time:1/  useSpeedStore.getState().speed*infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                      time:1/  useSpeedStore.getState().speed*fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                }
            }else if ((this.register1==2 ||( this.taille==0 && this.register1==6))) {
              if(((this.register2=="000") || (this.register2=4 && this.taille==0))){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                      time:1/  useSpeedStore.getState().speed*infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                      time:1/  useSpeedStore.getState().speed*fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }else if ((this.register2=="001" ||( this.taille==0 && this.register2==5))) {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                      time:1/  useSpeedStore.getState().speed*infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                      time:1/  useSpeedStore.getState().speed*fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                    
                }else if ((this.register2==2 ||( this.taille==0 && this.register2==6))) {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                      time:1/  useSpeedStore.getState().speed*infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                      time:1/  useSpeedStore.getState().speed*fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                      time:1/  useSpeedStore.getState().speed*infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                      time:1/  useSpeedStore.getState().speed*fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }else if ((this.register2=="4" && this.taille==1) || ((this.register2==3 || this.register2==7)  && this.taille==0) ) {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                      time:1/  useSpeedStore.getState().speed*infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                      time:1/  useSpeedStore.getState().speed*AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                      time:1/  useSpeedStore.getState().speed*AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                      time:1/  useSpeedStore.getState().speed*fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                      time:1/  useSpeedStore.getState().speed*infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                      time:1/  useSpeedStore.getState().speed*fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                      time:1/  useSpeedStore.getState().speed*infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                      time:1/  useSpeedStore.getState().speed*fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                      time:1/  useSpeedStore.getState().speed*infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                      time:1/  useSpeedStore.getState().speed*fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }
            }else if (this.register1=="3") {
                if(this.register2=="000"){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                      time:1/  useSpeedStore.getState().speed*infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                      time:1/  useSpeedStore.getState().speed*fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }else if (this.register2=="001") {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                      time:1/  useSpeedStore.getState().speed*infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                      time:1/  useSpeedStore.getState().speed*fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                    
                }else if (this.register2=="2") {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                      time:1/  useSpeedStore.getState().speed*infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                      time:1/  useSpeedStore.getState().speed*fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                      time:1/  useSpeedStore.getState().speed*infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                      time:1/  useSpeedStore.getState().speed*fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }else if (this.register2=="4") {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                      time:1/  useSpeedStore.getState().speed*infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                      time:1/  useSpeedStore.getState().speed*AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                      time:1/  useSpeedStore.getState().speed*AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                      time:1/  useSpeedStore.getState().speed*fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                      time:1/  useSpeedStore.getState().speed*infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                      time:1/  useSpeedStore.getState().speed*fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                      time:1/  useSpeedStore.getState().speed*infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                      time:1/  useSpeedStore.getState().speed*fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                      time:1/  useSpeedStore.getState().speed*infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                      time:1/  useSpeedStore.getState().speed*fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }
            }else if ((this.register1=="4" && this.taille==1) || ((this.register1==3 || this.register1==7)  && this.taille==0) ) {
              if(((this.register2=="000") || (this.register2=4 && this.taille==0))){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                      time:1/  useSpeedStore.getState().speed*infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                      time:1/  useSpeedStore.getState().speed*RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                      time:1/  useSpeedStore.getState().speed*BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                      time:1/  useSpeedStore.getState().speed*fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }else if ((this.register2=="001" ||( this.taille==0 && this.register2==5))){
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                      time:1/  useSpeedStore.getState().speed*infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                      time:1/  useSpeedStore.getState().speed*RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                      time:1/  useSpeedStore.getState().speed*BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                      time:1/  useSpeedStore.getState().speed*fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                    
                }else if ((this.register2==2 ||( this.taille==0 && this.register2==6))) {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                      time:1/  useSpeedStore.getState().speed*infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                      time:1/  useSpeedStore.getState().speed*RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                      time:1/  useSpeedStore.getState().speed*BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                      time:1/  useSpeedStore.getState().speed*fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                      time:1/  useSpeedStore.getState().speed*infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                      time:1/  useSpeedStore.getState().speed*RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                      time:1/  useSpeedStore.getState().speed*BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                      time:1/  useSpeedStore.getState().speed*fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }else if ((this.register2=="4" && this.taille==1) || ((this.register2==3 || this.register2==7)  && this.taille==0) ){
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                      time:1/  useSpeedStore.getState().speed*infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                      time:1/  useSpeedStore.getState().speed*fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                      time:1/  useSpeedStore.getState().speed*infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                      time:1/  useSpeedStore.getState().speed*RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                      time:1/  useSpeedStore.getState().speed*BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                      time:1/  useSpeedStore.getState().speed*fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                      time:1/  useSpeedStore.getState().speed*infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                      time:1/  useSpeedStore.getState().speed*RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                      time:1/  useSpeedStore.getState().speed*BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                      time:1/  useSpeedStore.getState().speed*fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                      time:1/  useSpeedStore.getState().speed*infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                      time:1/  useSpeedStore.getState().speed*RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                      time:1/  useSpeedStore.getState().speed*BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                      time:1/  useSpeedStore.getState().speed*fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }
            }else if (this.register1=="5") {
                if(this.register2=="000"){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                      time:1/  useSpeedStore.getState().speed*infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                      time:1/  useSpeedStore.getState().speed*fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }else if (this.register2=="001") {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                      time:1/  useSpeedStore.getState().speed*infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                      time:1/  useSpeedStore.getState().speed*fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                    
                }else if (this.register2=="2") {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                      time:1/  useSpeedStore.getState().speed*infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                      time:1/  useSpeedStore.getState().speed*fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                      time:1/  useSpeedStore.getState().speed*infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                      time:1/  useSpeedStore.getState().speed*fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }else if (this.register2=="4") {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                      time:1/  useSpeedStore.getState().speed*infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                      time:1/  useSpeedStore.getState().speed*AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                      time:1/  useSpeedStore.getState().speed*AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                      time:1/  useSpeedStore.getState().speed*fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                      time:1/  useSpeedStore.getState().speed*infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                      time:1/  useSpeedStore.getState().speed*fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                      time:1/  useSpeedStore.getState().speed*infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                      time:1/  useSpeedStore.getState().speed*fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                      time:1/  useSpeedStore.getState().speed*infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                      time:1/  useSpeedStore.getState().speed*fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }
            }else if (this.register1=="6") {
                if(this.register2=="000"){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                      time:1/  useSpeedStore.getState().speed*infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                      time:1/  useSpeedStore.getState().speed*fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }else if (this.register2=="001") {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                      time:1/  useSpeedStore.getState().speed*infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                      time:1/  useSpeedStore.getState().speed*fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                    
                }else if (this.register2=="2") {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                      time:1/  useSpeedStore.getState().speed*infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                      time:1/  useSpeedStore.getState().speed*fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                      time:1/  useSpeedStore.getState().speed*infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                      time:1/  useSpeedStore.getState().speed*fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }else if (this.register2=="4") {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                      time:1/  useSpeedStore.getState().speed*infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                      time:1/  useSpeedStore.getState().speed*AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                      time:1/  useSpeedStore.getState().speed*AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                      time:1/  useSpeedStore.getState().speed*fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                      time:1/  useSpeedStore.getState().speed*infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                      time:1/  useSpeedStore.getState().speed*fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                      time:1/  useSpeedStore.getState().speed*infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                      time:1/  useSpeedStore.getState().speed*fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                      time:1/  useSpeedStore.getState().speed*infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                      time:1/  useSpeedStore.getState().speed*fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }
            }else if (this.register1=="7") {
                if(this.register2=="000"){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                      time:1/  useSpeedStore.getState().speed*infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                      time:1/  useSpeedStore.getState().speed*fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }else if (this.register2=="001") {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                      time:1/  useSpeedStore.getState().speed*infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                      time:1/  useSpeedStore.getState().speed*fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                    
                }else if (this.register2=="2") {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                      time:1/  useSpeedStore.getState().speed*infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                      time:1/  useSpeedStore.getState().speed*fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                      time:1/  useSpeedStore.getState().speed*infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                      time:1/  useSpeedStore.getState().speed*fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }else if (this.register2=="4") {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                      time:1/  useSpeedStore.getState().speed*infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                      time:1/  useSpeedStore.getState().speed*AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                      time:1/  useSpeedStore.getState().speed*AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                      time:1/  useSpeedStore.getState().speed*fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                      time:1/  useSpeedStore.getState().speed*infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                      time:1/  useSpeedStore.getState().speed*fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                      time:1/  useSpeedStore.getState().speed*infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                      time:1/  useSpeedStore.getState().speed*fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                      time:1/  useSpeedStore.getState().speed*infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                      time:1/  useSpeedStore.getState().speed*fitToSr.time,
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
          if (this.taille == 1) {
            Registers[this.register1].setvalue(TwosComplement(this.value2,16));  
         }else if (this.taille== 0){
            if(this.register1==0){
              Registers[0].setright(TwosComplement(this.value2,8));
              console.log("redoune");
          }else if(this.register1==4){
              Registers[0].setleft(TwosComplement(this.value2,8));
              console.log("redoune");
          }
          else if(this.register1==1){
              Registers[1].setright(TwosComplement(this.value2,8));
          }else if(this.register1==5){
              Registers[1].setleft(TwosComplement(this.value2,8));
          }
          else if(this.register1==2){
              Registers[2].setright(TwosComplement(this.value2,8));
          }else if(this.register1==6){
              Registers[2].setleft(TwosComplement(this.value2,8));
          }
          else if(this.register1==3){
              Registers[4].setright(TwosComplement(this.value2,8));
          }else if(this.register1==7){
              Registers[4].setleft(TwosComplement(this.value2,8));
          }
      }
        }
        ];
        this.buildanim=function(){
          if(((this.register1=="000") || (this.register1=4 && this.taille==0))){
                if(this.isimmed===1){
                    return[
                    {
                        value:"value2",
                        target:fitToR1.target,
                      time:1/  useSpeedStore.getState().speed*fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else{
                  console.log(`${this.addresse2}`);
                  if(memory.cache.checkCache(this.addresse2, 0).hit){
  
                  return[{
              
                    value:"",
                    target:CacheToBus.target,
                  time:1/  useSpeedStore.getState().speed*CacheToBus.time,
                    anim:CacheToBus.anim,
                },
                {
              
                  value:"value2",
                  target:CacheToReg.target,
                time:1/  useSpeedStore.getState().speed*infitToMdr.time,
                  anim:CacheToReg.anim,
              },
              {
          
                value:"",
                target:BusToRegisters.target,
              time:1/  useSpeedStore.getState().speed*BusToRegisters.time,
                anim:BusToRegisters.anim,
            },
              {
                value:"value2",
                target:fitToR1.target,
              time:1/  useSpeedStore.getState().speed*fitToR1.time,
                anim:fitToR1.anim,
            },

              ]
                  }else {

                  
                return[
                  {
                    value:"value2",
                    target:infitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*infitToMdr.time,
                    anim:infitToMdr.anim,
                },
             
              {
                  value:"",
                  target:MdrToBus.target,
                time:1/  useSpeedStore.getState().speed*MdrToBus.time,
                  anim:MdrToBus.anim,
              },
              {
                  value:"value2",
                  target:MdrToReg.target,
                time:1/  useSpeedStore.getState().speed*MdrToReg.time,
                  anim:MdrToReg.anim,
              },
              {
          
                value:"",
                target:BusToRegisters.target,
              time:1/  useSpeedStore.getState().speed*BusToRegisters.time,
                anim:BusToRegisters.anim,
            },
              {
                  value:"value2",
                  target:fitToR1.target,
                time:1/  useSpeedStore.getState().speed*fitToR1.time,
                  anim:fitToR1.anim,
              },
              
            ];}
          }
        } else if ((this.register1=="001" || ( this.taille==0 && this.register1==5))) {
          if (this.isimmed === 1) {
              return [{
                  value: "value2",
                  target: fitToR2.target,
                  time: 1 / useSpeedStore.getState().speed * fitToR2.time,
                  anim: fitToR2.anim
              }];
          } else {
            if(memory.cache.checkCache(this.addresse2, 0).hit){
  
              return[{
          
                value:"",
                target:CacheToBus.target,
              time:1/  useSpeedStore.getState().speed*CacheToBus.time,
                anim:CacheToBus.anim,
            },
            {
          
              value:"value2",
              target:CacheToReg.target,
            time:1/  useSpeedStore.getState().speed*infitToMdr.time,
              anim:CacheToReg.anim,
          },
          {
          
            value:"",
            target:BusToRegisters.target,
          time:1/  useSpeedStore.getState().speed*BusToRegisters.time,
            anim:BusToRegisters.anim,
        },
          {
            value:"value2",
            target:fitToR2.target,
          time:1/  useSpeedStore.getState().speed*fitToR2.time,
            anim:fitToR2.anim,
        },

          ]
              }else {

              
            return[
              {
                value:"value2",
                target:infitToMdr.target,
              time:1/  useSpeedStore.getState().speed*infitToMdr.time,
                anim:infitToMdr.anim,
            },
         
          {
              value:"",
              target:MdrToBus.target,
            time:1/  useSpeedStore.getState().speed*MdrToBus.time,
              anim:MdrToBus.anim,
          },
          {
              value:"value2",
              target:MdrToReg.target,
            time:1/  useSpeedStore.getState().speed*MdrToReg.time,
              anim:MdrToReg.anim,
          },
          {
          
            value:"",
            target:BusToRegisters.target,
          time:1/  useSpeedStore.getState().speed*BusToRegisters.time,
            anim:BusToRegisters.anim,
        },
          {
              value:"value2",
              target:fitToR2.target,
            time:1/  useSpeedStore.getState().speed*fitToR2.time,
              anim:fitToR2.anim,
          },
          
        ];}
          }
      } else if ((this.register1==2 ||( this.taille==0 && this.register1==6))){
          if (this.isimmed === 1) {
              return [{
                  value: "value2",
                  target: fitToR3.target,
                  time: 1 / useSpeedStore.getState().speed * fitToR3.time,
                  anim: fitToR3.anim
              }];
          } else {
              if (memory.cache.checkCache(this.addresse2, 0).hit) {
                  return [{
                      value: "",
                      target: CacheToBus.target,
                      time: 1 / useSpeedStore.getState().speed * CacheToBus.time,
                      anim: CacheToBus.anim
                  }, {
                      value: "value2",
                      target: CacheToReg.target,
                      time: 1 / useSpeedStore.getState().speed * infitToMdr.time,
                      anim: CacheToReg.anim
                  }, 
                  {
          
                    value:"",
                    target:BusToRegisters.target,
                  time:1/  useSpeedStore.getState().speed*BusToRegisters.time,
                    anim:BusToRegisters.anim,
                },
                  {
                      value: "value2",
                      target: fitToR3.target,
                      time: 1 / useSpeedStore.getState().speed * fitToR3.time,
                      anim: fitToR3.anim
                  }];
              } else {
                  return [{
                      value: "value2",
                      target: infitToMdr.target,
                      time: 1 / useSpeedStore.getState().speed * infitToMdr.time,
                      anim: infitToMdr.anim
                  }, {
                      value: "",
                      target: MdrToBus.target,
                      time: 1 / useSpeedStore.getState().speed * MdrToBus.time,
                      anim: MdrToBus.anim
                  }, {
                      value: "value2",
                      target: MdrToReg.target,
                      time: 1 / useSpeedStore.getState().speed * MdrToReg.time,
                      anim: MdrToReg.anim
                  }, {
          
                    value:"",
                    target:BusToRegisters.target,
                  time:1/  useSpeedStore.getState().speed*BusToRegisters.time,
                    anim:BusToRegisters.anim,
                },
                  {
                      value: "value2",
                      target: fitToR3.target,
                      time: 1 / useSpeedStore.getState().speed * fitToR3.time,
                      anim: fitToR3.anim
                  }];
              }
          }
      } else if (this.register1 == "3") {
          if (this.isimmed === 1) {
              return [{
                  value: "value2",
                  target: fitToR4.target,
                  time: 1 / useSpeedStore.getState().speed * fitToR4.time,
                  anim: fitToR4.anim
              }];
          } else {
              if (memory.cache.checkCache(this.addresse2, 0).hit) {
                  return [{
                      value: "",
                      target: CacheToBus.target,
                      time: 1 / useSpeedStore.getState().speed * CacheToBus.time,
                      anim: CacheToBus.anim
                  }, {
                      value: "value2",
                      target: CacheToReg.target,
                      time: 1 / useSpeedStore.getState().speed * infitToMdr.time,
                      anim: CacheToReg.anim
                  }, {
          
                    value:"",
                    target:BusToRegisters.target,
                  time:1/  useSpeedStore.getState().speed*BusToRegisters.time,
                    anim:BusToRegisters.anim,
                },
                   {
                      value: "value2",
                      target: fitToR4.target,
                      time: 1 / useSpeedStore.getState().speed * fitToR4.time,
                      anim: fitToR4.anim
                  }];
              } else {
                  return [{
                      value: "value2",
                      target: infitToMdr.target,
                      time: 1 / useSpeedStore.getState().speed * infitToMdr.time,
                      anim: infitToMdr.anim
                  }, {
                      value: "",
                      target: MdrToBus.target,
                      time: 1 / useSpeedStore.getState().speed * MdrToBus.time,
                      anim: MdrToBus.anim
                  }, {
                      value: "value2",
                      target: MdrToReg.target,
                      time: 1 / useSpeedStore.getState().speed * MdrToReg.time,
                      anim: MdrToReg.anim
                  }, {
          
                    value:"",
                    target:BusToRegisters.target,
                  time:1/  useSpeedStore.getState().speed*BusToRegisters.time,
                    anim:BusToRegisters.anim,
                },
                  {
                      value: "value2",
                      target: fitToR4.target,
                      time: 1 / useSpeedStore.getState().speed * fitToR4.time,
                      anim: fitToR4.anim
                  }];
              }
          }
      
      
    
        }else if ((this.register1=="4" && this.taille==1) || ((this.register1==3 || this.register1==7)  && this.taille==0) ){
          if (this.isimmed === 1) {
              return [
                  {
                      value: "value2",
                      target: BusToAcc.target,
                      time: 1 / useSpeedStore.getState().speed * BusToAcc.time,
                      anim: BusToAcc.anim,
                  },
                  {
                      value: "value2",
                      target: fitToAcc.target,
                      time: 1 / useSpeedStore.getState().speed * fitToAcc.time,
                      anim: fitToAcc.anim,
                  },
              ];
          } else if (memory.cache.checkCache(this.addresse2, 0).hit) {
              return [
                  {
                      value: "",
                      target: CacheToBus.target,
                      time: 1 / useSpeedStore.getState().speed * CacheToBus.time,
                      anim: CacheToBus.anim,
                  },
                  {
                      value: "value2",
                      target: AccToCache.target,
                      time: 1 / useSpeedStore.getState().speed * AccToCache.time,
                      anim: AccToCache.anim,
                  },
                  {
                    value: "",
                    target: BusToAcc.target,
                    time: 1 / useSpeedStore.getState().speed * BusToAcc.time,
                    anim: BusToAcc.anim,
                },
                  {
                      value: "value2",
                      target: fitToAcc.target,
                      time: 1 / useSpeedStore.getState().speed * fitToAcc.time,
                      anim: fitToAcc.anim,
                  },
              ];
          } else {
              return [
                  {
                      value: "value2",
                      target: infitToMdr.target,
                      time: 1 / useSpeedStore.getState().speed * infitToMdr.time,
                      anim: infitToMdr.anim,
                  },
                  {
                      value: "",
                      target: MdrToBus.target,
                      time: 1 / useSpeedStore.getState().speed * MdrToBus.time,
                      anim: MdrToBus.anim,
                  },
                  {
                      value: "value2",
                      target: MDRToAcc.target,
                      time: 1 / useSpeedStore.getState().speed * MDRToAcc.time,
                      anim: MDRToAcc.anim,
                  },
                  {
                      value: "",
                      target: BusToAcc.target,
                      time: 1 / useSpeedStore.getState().speed * BusToAcc.time,
                      anim: BusToAcc.anim,
                  },
                  {
                      value: "value2",
                      target: fitToAcc.target,
                      time: 1 / useSpeedStore.getState().speed * fitToAcc.time,
                      anim: fitToAcc.anim,
                  },
              ];
          }
      }
      
    else if (this.register1 == "5") {
      if (this.isimmed === 1) {
          return [
              {
                  value: "value2",
                  target: fitToBr.target,
                  time: 1 / useSpeedStore.getState().speed * fitToBr.time,
                  anim: fitToBr.anim,
              },
          ];
      } else if (memory.cache.checkCache(this.addresse2, 0).hit) {
          return [
              {
                  value: "",
                  target: CacheToBus.target,
                  time: 1 / useSpeedStore.getState().speed * CacheToBus.time,
                  anim: CacheToBus.anim,
              },
              {
                  value: "value2",
                  target: CacheToReg.target,
                  time: 1 / useSpeedStore.getState().speed * CacheToReg.time,
                  anim: CacheToReg.anim,
              },
              {
          
                value:"",
                target:BusToRegisters.target,
              time:1/  useSpeedStore.getState().speed*BusToRegisters.time,
                anim:BusToRegisters.anim,
            },
              {
                  value: "value2",
                  target: fitToBr.target,
                  time: 1 / useSpeedStore.getState().speed * fitToBr.time,
                  anim: fitToBr.anim,
              },
          ];
      } else {
          return [
              {
                  value: "value2",
                  target: infitToMdr.target,
                  time: 1 / useSpeedStore.getState().speed * infitToMdr.time,
                  anim: infitToMdr.anim,
              },
              {
                  value: "",
                  target: MdrToBus.target,
                  time: 1 / useSpeedStore.getState().speed * MdrToBus.time,
                  anim: MdrToBus.anim,
              },
              {
                  value: "value2",
                  target: MdrToReg.target,
                  time: 1 / useSpeedStore.getState().speed * MdrToReg.time,
                  anim: MdrToReg.anim,
              },
              {
          
                value:"",
                target:BusToRegisters.target,
              time:1/  useSpeedStore.getState().speed*BusToRegisters.time,
                anim:BusToRegisters.anim,
            },
              {
                  value: "value2",
                  target: fitToBr.target,
                  time: 1 / useSpeedStore.getState().speed * fitToBr.time,
                  anim: fitToBr.anim,
              },
          ];
      }
  }
else if (this.register1 == "6") {
  if (this.isimmed === 1) {
      return [
          {
              value: "value2",
              target: fitToIdr.target,
              time: 1 / useSpeedStore.getState().speed * fitToIdr.time,
              anim: fitToIdr.anim,
          },
      ];
  } else if (memory.cache.checkCache(this.addresse2, 0).hit) {
      return [
          {
              value: "",
              target: CacheToBus.target,
              time: 1 / useSpeedStore.getState().speed * CacheToBus.time,
              anim: CacheToBus.anim,
          },
          {
              value: "value2",
              target: CacheToReg.target,
              time: 1 / useSpeedStore.getState().speed * CacheToReg.time,
              anim: CacheToReg.anim,
          },
          {
          
            value:"",
            target:BusToRegisters.target,
          time:1/  useSpeedStore.getState().speed*BusToRegisters.time,
            anim:BusToRegisters.anim,
          },
          {
              value: "value2",
              target: fitToIdr.target,
              time: 1 / useSpeedStore.getState().speed * fitToIdr.time,
              anim: fitToIdr.anim,
          },
      ];
  } else {
      return [
          {
              value: "value2",
              target: infitToMdr.target,
              time: 1 / useSpeedStore.getState().speed * infitToMdr.time,
              anim: infitToMdr.anim,
          },
          {
              value: "",
              target: MdrToBus.target,
              time: 1 / useSpeedStore.getState().speed * MdrToBus.time,
              anim: MdrToBus.anim,
          },
          {
              value: "value2",
              target: MdrToReg.target,
              time: 1 / useSpeedStore.getState().speed * MdrToReg.time,
              anim: MdrToReg.anim,
          },
          {
          
            value:"",
            target:BusToRegisters.target,
          time:1/  useSpeedStore.getState().speed*BusToRegisters.time,
            anim:BusToRegisters.anim,
        },
          {
              value: "value2",
              target: fitToIdr.target,
              time: 1 / useSpeedStore.getState().speed * fitToIdr.time,
              anim: fitToIdr.anim,
          },
      ];
  }


}else if (this.register1 == "7") {
  if (this.isimmed === 1) {
      return [
          {
              value: "value2",
              target: fitToSr.target,
              time: 1 / useSpeedStore.getState().speed * fitToSr.time,
              anim: fitToSr.anim,
          },
      ];
  } else if (memory.cache.checkCache(this.addresse2, 0).hit) {
    return [
        {
            value: "",
            target: CacheToBus.target,
            time: 1 / useSpeedStore.getState().speed * CacheToBus.time,
            anim: CacheToBus.anim,
        },
        {
            value: "value2",
            target: CacheToReg.target,
            time: 1 / useSpeedStore.getState().speed * CacheToReg.time,
            anim: CacheToReg.anim,
        },
        {
          
          value:"",
          target:BusToRegisters.target,
        time:1/  useSpeedStore.getState().speed*BusToRegisters.time,
          anim:BusToRegisters.anim,
      },
        {
            value: "value2",
            target: fitToSr.target,
            time: 1 / useSpeedStore.getState().speed * fitToSr.time,
            anim: fitToSr.anim,
        },
    ];
} else {
    return [
        {
            value: "value2",
            target: infitToMdr.target,
            time: 1 / useSpeedStore.getState().speed * infitToMdr.time,
            anim: infitToMdr.anim,
        },
        {
            value: "",
            target: MdrToBus.target,
            time: 1 / useSpeedStore.getState().speed * MdrToBus.time,
            anim: MdrToBus.anim,
        },
        {
            value: "value2",
            target: MdrToReg.target,
            time: 1 / useSpeedStore.getState().speed * MdrToReg.time,
            anim: MdrToReg.anim,
        },
        {
          
          value:"",
          target:BusToRegisters.target,
        time:1/  useSpeedStore.getState().speed*BusToRegisters.time,
          anim:BusToRegisters.anim,
        },
        {
            value: "value2",
            target: fitToSr.target,
            time: 1 / useSpeedStore.getState().speed * fitToSr.time,
            anim: fitToSr.anim,
        },
    ];
}
}
        }
      }}

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
            if(this.register2=="000"){
                return[{
                  value:"value2",
                  target:fitToR1.target,
                time:1/  useSpeedStore.getState().speed*fitToR1.time,
                  anim:fitToR1.anim,
              },{
                    value:"value2",
                    target:infitToR1.target,
                  time:1/  useSpeedStore.getState().speed*infitToR1.time,
                    anim:infitToR1.anim,
                },

                {
                    value:"",
                    target:RegistersToBus.target,
                  time:1/  useSpeedStore.getState().speed*RegistersToBus.time,
                    anim:RegistersToBus.anim,
                },
                {
                    value:"value2",
                    target:RegToCache.target,
                  time:1/  useSpeedStore.getState().speed*RegToCache.time,
                    anim:RegToCache.anim,
                },
                {
                    value:"",
                    target:BusToCache.target,
                  time:1/  useSpeedStore.getState().speed*BusToCache.time,
                    anim:BusToCache.anim,
                },
                {
                    value:"value2",
                    target:fitToCache.target,
                  time:1/  useSpeedStore.getState().speed*fitToCache.time,
                    anim:fitToCache.anim,
                },
                {
                    value:"WRITE",
                    target:Cacheanim.target,
                  time:1/  useSpeedStore.getState().speed*Cacheanim.time,
                    anim:Cacheanim.anim,
                },
                {
                  value: "",
                  target: CacheToBus.target,
                  time: 1/  useSpeedStore.getState().speed* CacheToBus.time,
                  anim: CacheToBus.anim,
                },
                {
                  value: this.addresse1,
                  target: CacheToADR.target,
                  time: 1/  useSpeedStore.getState().speed* CacheToADR.time,
                  anim: CacheToADR.anim,
                },
                {
                  value: "",
                  target: ADRbusToDATABus.target,
                  time: 1/  useSpeedStore.getState().speed* ADRbusToDATABus.time,
                  anim: ADRbusToDATABus.anim,
                },
                {
                  value: this.addresse1,
                  target: ADRToMAR.target,
                  time: 1/  useSpeedStore.getState().speed* ADRToMAR.time,
                  anim: ADRToMAR.anim,
                },
                {
                  value: this.addresse1,
                  target: fitToMar.target,
                  time: 1/  useSpeedStore.getState().speed* fitToMar.time,
                  anim: fitToMar.anim,
                },
                {
                  value:"",
                  target:CacheToBus.target,
                time:1/  useSpeedStore.getState().speed*CacheToBus.time,
                  anim:CacheToBus.anim,
              },
            {
              value:"value2",
              target:CacheToMDR.target,
            time:1/  useSpeedStore.getState().speed*CacheToMDR.time,
              anim:CacheToMDR.anim,
          },
          {
            value:"",
            target:BusToMdr.target,
          time:1/  useSpeedStore.getState().speed*BusToMdr.time,
            anim:BusToMdr.anim,
        },
        {
          value:"value2",
          target:fitToMdr.target,
          time:1/  useSpeedStore.getState().speed*fitToMdr.time,
          anim:fitToMdr.anim,
        },
        {
          value:"WRITE-THROUGH",
          target:MCanim.target,
          time:1/  useSpeedStore.getState().speed*MCanim.time,
          anim:MCanim.anim,
        },

                
            ];
            }else if (this.register2=="001") {
              return[{
                value:"value2",
                target:fitToR2.target,
              time:1/  useSpeedStore.getState().speed*fitToR2.time,
                anim:fitToR2.anim,
            },{
                  value:"value2",
                  target:infitToR2.target,
                time:1/  useSpeedStore.getState().speed*infitToR2.time,
                  anim:infitToR2.anim,
              },

              {
                  value:"",
                  target:RegistersToBus.target,
                time:1/  useSpeedStore.getState().speed*RegistersToBus.time,
                  anim:RegistersToBus.anim,
              },
              {
                  value:"value2",
                  target:RegToCache.target,
                time:1/  useSpeedStore.getState().speed*RegToCache.time,
                  anim:RegToCache.anim,
              },
              {
                  value:"",
                  target:BusToCache.target,
                time:1/  useSpeedStore.getState().speed*BusToCache.time,
                  anim:BusToCache.anim,
              },
              {
                  value:"value2",
                  target:fitToCache.target,
                time:1/  useSpeedStore.getState().speed*fitToCache.time,
                  anim:fitToCache.anim,
              },
              {
                  value:"WRITE",
                  target:Cacheanim.target,
                time:1/  useSpeedStore.getState().speed*Cacheanim.time,
                  anim:Cacheanim.anim,
              },
              {
                value: "",
                target: CacheToBus.target,
                time: 1/  useSpeedStore.getState().speed* CacheToBus.time,
                anim: CacheToBus.anim,
              },
              {
                value: this.addresse1,
                target: CacheToADR.target,
                time: 1/  useSpeedStore.getState().speed* CacheToADR.time,
                anim: CacheToADR.anim,
              },
              {
                value: "",
                target: ADRbusToDATABus.target,
                time: 1/  useSpeedStore.getState().speed* ADRbusToDATABus.time,
                anim: ADRbusToDATABus.anim,
              },
              {
                value: this.addresse1,
                target: ADRToMAR.target,
                time: 1/  useSpeedStore.getState().speed* ADRToMAR.time,
                anim: ADRToMAR.anim,
              },
              {
                value: this.addresse1,
                target: fitToMar.target,
                time: 1/  useSpeedStore.getState().speed* fitToMar.time,
                anim: fitToMar.anim,
              },
              {
                value:"",
                target:CacheToBus.target,
              time:1/  useSpeedStore.getState().speed*CacheToBus.time,
                anim:CacheToBus.anim,
            },
          {
            value:"value2",
            target:CacheToMDR.target,
          time:1/  useSpeedStore.getState().speed*CacheToMDR.time,
            anim:CacheToMDR.anim,
        },
        {
          value:"",
          target:BusToMdr.target,
        time:1/  useSpeedStore.getState().speed*BusToMdr.time,
          anim:BusToMdr.anim,
      },
      {
        value:"value2",
        target:fitToMdr.target,
        time:1/  useSpeedStore.getState().speed*fitToMdr.time,
        anim:fitToMdr.anim,
      },
      {
        value:"WRITE-THROUGH",
        target:MCanim.target,
        time:1/  useSpeedStore.getState().speed*MCanim.time,
        anim:MCanim.anim,
      },

              
          ];
          }else if (this.register2=="2") {
            return[{
              value:"value2",
              target:fitToR3.target,
            time:1/  useSpeedStore.getState().speed*fitToR3.time,
              anim:fitToR3.anim,
          },{
                value:"value2",
                target:infitToR3.target,
              time:1/  useSpeedStore.getState().speed*infitToR3.time,
                anim:infitToR3.anim,
            },

            {
                value:"",
                target:RegistersToBus.target,
              time:1/  useSpeedStore.getState().speed*RegistersToBus.time,
                anim:RegistersToBus.anim,
            },
            {
                value:"value2",
                target:RegToCache.target,
              time:1/  useSpeedStore.getState().speed*RegToCache.time,
                anim:RegToCache.anim,
            },
            {
                value:"",
                target:BusToCache.target,
              time:1/  useSpeedStore.getState().speed*BusToCache.time,
                anim:BusToCache.anim,
            },
            {
                value:"value2",
                target:fitToCache.target,
              time:1/  useSpeedStore.getState().speed*fitToCache.time,
                anim:fitToCache.anim,
            },
            {
                value:"WRITE",
                target:Cacheanim.target,
              time:1/  useSpeedStore.getState().speed*Cacheanim.time,
                anim:Cacheanim.anim,
            },
            {
              value: "",
              target: CacheToBus.target,
              time: 1/  useSpeedStore.getState().speed* CacheToBus.time,
              anim: CacheToBus.anim,
            },
            {
              value: this.addresse1,
              target: CacheToADR.target,
              time: 1/  useSpeedStore.getState().speed* CacheToADR.time,
              anim: CacheToADR.anim,
            },
            {
              value: "",
              target: ADRbusToDATABus.target,
              time: 1/  useSpeedStore.getState().speed* ADRbusToDATABus.time,
              anim: ADRbusToDATABus.anim,
            },
            {
              value: this.addresse1,
              target: ADRToMAR.target,
              time: 1/  useSpeedStore.getState().speed* ADRToMAR.time,
              anim: ADRToMAR.anim,
            },
            {
              value: this.addresse1,
              target: fitToMar.target,
              time: 1/  useSpeedStore.getState().speed* fitToMar.time,
              anim: fitToMar.anim,
            },
            {
              value:"",
              target:CacheToBus.target,
            time:1/  useSpeedStore.getState().speed*CacheToBus.time,
              anim:CacheToBus.anim,
          },
        {
          value:"value2",
          target:CacheToMDR.target,
        time:1/  useSpeedStore.getState().speed*CacheToMDR.time,
          anim:CacheToMDR.anim,
      },
      {
        value:"",
        target:BusToMdr.target,
      time:1/  useSpeedStore.getState().speed*BusToMdr.time,
        anim:BusToMdr.anim,
    },
    {
      value:"value2",
      target:fitToMdr.target,
      time:1/  useSpeedStore.getState().speed*fitToMdr.time,
      anim:fitToMdr.anim,
    },
    {
      value:"WRITE-THROUGH",
      target:MCanim.target,
      time:1/  useSpeedStore.getState().speed*MCanim.time,
      anim:MCanim.anim,
    },

            
        ];
        }else if (this.register2=="3") {
          return[{
            value:"value2",
            target:fitToR4.target,
          time:1/  useSpeedStore.getState().speed*fitToR4.time,
            anim:fitToR4.anim,
        },{
              value:"value2",
              target:infitToR4.target,
            time:1/  useSpeedStore.getState().speed*infitToR4.time,
              anim:infitToR4.anim,
          },

          {
              value:"",
              target:RegistersToBus.target,
            time:1/  useSpeedStore.getState().speed*RegistersToBus.time,
              anim:RegistersToBus.anim,
          },
          {
              value:"value2",
              target:RegToCache.target,
            time:1/  useSpeedStore.getState().speed*RegToCache.time,
              anim:RegToCache.anim,
          },
          {
              value:"",
              target:BusToCache.target,
            time:1/  useSpeedStore.getState().speed*BusToCache.time,
              anim:BusToCache.anim,
          },
          {
              value:"value2",
              target:fitToCache.target,
            time:1/  useSpeedStore.getState().speed*fitToCache.time,
              anim:fitToCache.anim,
          },
          {
              value:"WRITE",
              target:Cacheanim.target,
            time:1/  useSpeedStore.getState().speed*Cacheanim.time,
              anim:Cacheanim.anim,
          },
          {
            value: "",
            target: CacheToBus.target,
            time: 1/  useSpeedStore.getState().speed* CacheToBus.time,
            anim: CacheToBus.anim,
          },
          {
            value: this.addresse1,
            target: CacheToADR.target,
            time: 1/  useSpeedStore.getState().speed* CacheToADR.time,
            anim: CacheToADR.anim,
          },
          {
            value: "",
            target: ADRbusToDATABus.target,
            time: 1/  useSpeedStore.getState().speed* ADRbusToDATABus.time,
            anim: ADRbusToDATABus.anim,
          },
          {
            value: this.addresse1,
            target: ADRToMAR.target,
            time: 1/  useSpeedStore.getState().speed* ADRToMAR.time,
            anim: ADRToMAR.anim,
          },
          {
            value: this.addresse1,
            target: fitToMar.target,
            time: 1/  useSpeedStore.getState().speed* fitToMar.time,
            anim: fitToMar.anim,
          },
          {
            value:"",
            target:CacheToBus.target,
          time:1/  useSpeedStore.getState().speed*CacheToBus.time,
            anim:CacheToBus.anim,
        },
      {
        value:"value2",
        target:CacheToMDR.target,
      time:1/  useSpeedStore.getState().speed*CacheToMDR.time,
        anim:CacheToMDR.anim,
    },
    {
      value:"",
      target:BusToMdr.target,
    time:1/  useSpeedStore.getState().speed*BusToMdr.time,
      anim:BusToMdr.anim,
  },
  {
    value:"value2",
    target:fitToMdr.target,
    time:1/  useSpeedStore.getState().speed*fitToMdr.time,
    anim:fitToMdr.anim,
  },
  {
    value:"WRITE-THROUGH",
    target:MCanim.target,
    time:1/  useSpeedStore.getState().speed*MCanim.time,
    anim:MCanim.anim,
  },

          
      ];
      }else if (this.register2=="4") {
        return[{
          value:"value2",
          target:fitToAcc.target,
        time:1/  useSpeedStore.getState().speed*fitToAcc.time,
          anim:fitToAcc.anim,
      },{
            value:"value2",
            target:infitToAcc.target,
          time:1/  useSpeedStore.getState().speed*infitToAcc.time,
            anim:infitToAcc.anim,
        },

        {
            value:"",
            target:AccToBus.target,
          time:1/  useSpeedStore.getState().speed*AccToBus.time,
            anim:AccToBus.anim,
        },
        {
            value:"value2",
            target:AccToCache.target,
          time:1/  useSpeedStore.getState().speed*AccToCache.time,
            anim:AccToCache.anim,
        },
        {
            value:"",
            target:BusToCache.target,
          time:1/  useSpeedStore.getState().speed*BusToCache.time,
            anim:BusToCache.anim,
        },
        {
            value:"value2",
            target:fitToCache.target,
          time:1/  useSpeedStore.getState().speed*fitToCache.time,
            anim:fitToCache.anim,
        },
        {
            value:"WRITE",
            target:Cacheanim.target,
          time:1/  useSpeedStore.getState().speed*Cacheanim.time,
            anim:Cacheanim.anim,
        },
        {
          value: "",
          target: CacheToBus.target,
          time: 1/  useSpeedStore.getState().speed* CacheToBus.time,
          anim: CacheToBus.anim,
        },
        {
          value: this.addresse1,
          target: CacheToADR.target,
          time: 1/  useSpeedStore.getState().speed* CacheToADR.time,
          anim: CacheToADR.anim,
        },
        {
          value: "",
          target: ADRbusToDATABus.target,
          time: 1/  useSpeedStore.getState().speed* ADRbusToDATABus.time,
          anim: ADRbusToDATABus.anim,
        },
        {
          value: this.addresse1,
          target: ADRToMAR.target,
          time: 1/  useSpeedStore.getState().speed* ADRToMAR.time,
          anim: ADRToMAR.anim,
        },
        {
          value: this.addresse1,
          target: fitToMar.target,
          time: 1/  useSpeedStore.getState().speed* fitToMar.time,
          anim: fitToMar.anim,
        },
        {
          value:"",
          target:CacheToBus.target,
        time:1/  useSpeedStore.getState().speed*CacheToBus.time,
          anim:CacheToBus.anim,
      },
    {
      value:"value2",
      target:CacheToMDR.target,
    time:1/  useSpeedStore.getState().speed*CacheToMDR.time,
      anim:CacheToMDR.anim,
  },
  {
    value:"",
    target:BusToMdr.target,
  time:1/  useSpeedStore.getState().speed*BusToMdr.time,
    anim:BusToMdr.anim,
},
{
  value:"value2",
  target:fitToMdr.target,
  time:1/  useSpeedStore.getState().speed*fitToMdr.time,
  anim:fitToMdr.anim,
},
{
  value:"WRITE-THROUGH",
  target:MCanim.target,
  time:1/  useSpeedStore.getState().speed*MCanim.time,
  anim:MCanim.anim,
},

        
    ];
    }else if (this.register2=="5"){
      return[{
        value:"value2",
        target:fitToBr.target,
      time:1/  useSpeedStore.getState().speed*fitToBr.time,
        anim:fitToBr.anim,
    },{
          value:"value2",
          target:infitToBr.target,
        time:1/  useSpeedStore.getState().speed*infitToBr.time,
          anim:infitToBr.anim,
      },

      {
          value:"",
          target:RegistersToBus.target,
        time:1/  useSpeedStore.getState().speed*RegistersToBus.time,
          anim:RegistersToBus.anim,
      },
      {
          value:"value2",
          target:RegToCache.target,
        time:1/  useSpeedStore.getState().speed*RegToCache.time,
          anim:RegToCache.anim,
      },
      {
          value:"",
          target:BusToCache.target,
        time:1/  useSpeedStore.getState().speed*BusToCache.time,
          anim:BusToCache.anim,
      },
      {
          value:"value2",
          target:fitToCache.target,
        time:1/  useSpeedStore.getState().speed*fitToCache.time,
          anim:fitToCache.anim,
      },
      {
          value:"WRITE",
          target:Cacheanim.target,
        time:1/  useSpeedStore.getState().speed*Cacheanim.time,
          anim:Cacheanim.anim,
      },
      {
        value: "",
        target: CacheToBus.target,
        time: 1/  useSpeedStore.getState().speed* CacheToBus.time,
        anim: CacheToBus.anim,
      },
      {
        value: this.addresse1,
        target: CacheToADR.target,
        time: 1/  useSpeedStore.getState().speed* CacheToADR.time,
        anim: CacheToADR.anim,
      },
      {
        value: "",
        target: ADRbusToDATABus.target,
        time: 1/  useSpeedStore.getState().speed* ADRbusToDATABus.time,
        anim: ADRbusToDATABus.anim,
      },
      {
        value: this.addresse1,
        target: ADRToMAR.target,
        time: 1/  useSpeedStore.getState().speed* ADRToMAR.time,
        anim: ADRToMAR.anim,
      },
      {
        value: this.addresse1,
        target: fitToMar.target,
        time: 1/  useSpeedStore.getState().speed* fitToMar.time,
        anim: fitToMar.anim,
      },
      {
        value:"",
        target:CacheToBus.target,
      time:1/  useSpeedStore.getState().speed*CacheToBus.time,
        anim:CacheToBus.anim,
    },
  {
    value:"value2",
    target:CacheToMDR.target,
  time:1/  useSpeedStore.getState().speed*CacheToMDR.time,
    anim:CacheToMDR.anim,
},
{
  value:"",
  target:BusToMdr.target,
time:1/  useSpeedStore.getState().speed*BusToMdr.time,
  anim:BusToMdr.anim,
},
{
value:"value2",
target:fitToMdr.target,
time:1/  useSpeedStore.getState().speed*fitToMdr.time,
anim:fitToMdr.anim,
},
{
value:"WRITE-THROUGH",
target:MCanim.target,
time:1/  useSpeedStore.getState().speed*MCanim.time,
anim:MCanim.anim,
},

      
  ];
  }else if (this.register2=="6") {
    return[{
      value:"value2",
      target:fitToIdr.target,
    time:1/  useSpeedStore.getState().speed*fitToIdr.time,
      anim:fitToIdr.anim,
  },{
        value:"value2",
        target:infitToIdr.target,
      time:1/  useSpeedStore.getState().speed*infitToIdr.time,
        anim:infitToIdr.anim,
    },

    {
        value:"",
        target:RegistersToBus.target,
      time:1/  useSpeedStore.getState().speed*RegistersToBus.time,
        anim:RegistersToBus.anim,
    },
    {
        value:"value2",
        target:RegToCache.target,
      time:1/  useSpeedStore.getState().speed*RegToCache.time,
        anim:RegToCache.anim,
    },
    {
        value:"",
        target:BusToCache.target,
      time:1/  useSpeedStore.getState().speed*BusToCache.time,
        anim:BusToCache.anim,
    },
    {
        value:"value2",
        target:fitToCache.target,
      time:1/  useSpeedStore.getState().speed*fitToCache.time,
        anim:fitToCache.anim,
    },
    {
        value:"WRITE",
        target:Cacheanim.target,
      time:1/  useSpeedStore.getState().speed*Cacheanim.time,
        anim:Cacheanim.anim,
    },
    {
      value: "",
      target: CacheToBus.target,
      time: 1/  useSpeedStore.getState().speed* CacheToBus.time,
      anim: CacheToBus.anim,
    },
    {
      value: this.addresse1,
      target: CacheToADR.target,
      time: 1/  useSpeedStore.getState().speed* CacheToADR.time,
      anim: CacheToADR.anim,
    },
    {
      value: "",
      target: ADRbusToDATABus.target,
      time: 1/  useSpeedStore.getState().speed* ADRbusToDATABus.time,
      anim: ADRbusToDATABus.anim,
    },
    {
      value: this.addresse1,
      target: ADRToMAR.target,
      time: 1/  useSpeedStore.getState().speed* ADRToMAR.time,
      anim: ADRToMAR.anim,
    },
    {
      value: this.addresse1,
      target: fitToMar.target,
      time: 1/  useSpeedStore.getState().speed* fitToMar.time,
      anim: fitToMar.anim,
    },
    {
      value:"",
      target:CacheToBus.target,
    time:1/  useSpeedStore.getState().speed*CacheToBus.time,
      anim:CacheToBus.anim,
  },
{
  value:"value2",
  target:CacheToMDR.target,
time:1/  useSpeedStore.getState().speed*CacheToMDR.time,
  anim:CacheToMDR.anim,
},
{
value:"",
target:BusToMdr.target,
time:1/  useSpeedStore.getState().speed*BusToMdr.time,
anim:BusToMdr.anim,
},
{
value:"value2",
target:fitToMdr.target,
time:1/  useSpeedStore.getState().speed*fitToMdr.time,
anim:fitToMdr.anim,
},
{
value:"WRITE-THROUGH",
target:MCanim.target,
time:1/  useSpeedStore.getState().speed*MCanim.time,
anim:MCanim.anim,
},

    
];
}else if (this.register2=="7") {
  return[{
    value:"value2",
    target:fitToSr.target,
  time:1/  useSpeedStore.getState().speed*fitToSr.time,
    anim:fitToSr.anim,
    },
    {
      value:"value2",
      target:infitToSR.target,
    time:1/  useSpeedStore.getState().speed*infitToSR.time,
      anim:infitToSR.anim,
  },

  {
      value:"",
      target:RegistersToBus.target,
    time:1/  useSpeedStore.getState().speed*RegistersToBus.time,
      anim:RegistersToBus.anim,
  },
  {
      value:"value2",
      target:RegToCache.target,
    time:1/  useSpeedStore.getState().speed*RegToCache.time,
      anim:RegToCache.anim,
  },
  {
      value:"",
      target:BusToCache.target,
    time:1/  useSpeedStore.getState().speed*BusToCache.time,
      anim:BusToCache.anim,
  },
  {
      value:"value2",
      target:fitToCache.target,
    time:1/  useSpeedStore.getState().speed*fitToCache.time,
      anim:fitToCache.anim,
  },
  {
      value:"WRITE",
      target:Cacheanim.target,
    time:1/  useSpeedStore.getState().speed*Cacheanim.time,
      anim:Cacheanim.anim,
  },
  {
    value: "",
    target: CacheToBus.target,
    time: 1/  useSpeedStore.getState().speed* CacheToBus.time,
    anim: CacheToBus.anim,
  },
  {
    value: this.addresse1,
    target: CacheToADR.target,
    time: 1/  useSpeedStore.getState().speed* CacheToADR.time,
    anim: CacheToADR.anim,
  },
  {
    value: "",
    target: ADRbusToDATABus.target,
    time: 1/  useSpeedStore.getState().speed* ADRbusToDATABus.time,
    anim: ADRbusToDATABus.anim,
  },
  {
    value: this.addresse1,
    target: ADRToMAR.target,
    time: 1/  useSpeedStore.getState().speed* ADRToMAR.time,
    anim: ADRToMAR.anim,
  },
  {
    value: this.addresse1,
    target: fitToMar.target,
    time: 1/  useSpeedStore.getState().speed* fitToMar.time,
    anim: fitToMar.anim,
  },
  {
    value:"",
    target:CacheToBus.target,
  time:1/  useSpeedStore.getState().speed*CacheToBus.time,
    anim:CacheToBus.anim,
},
{
value:"value2",
target:CacheToMDR.target,
time:1/  useSpeedStore.getState().speed*CacheToMDR.time,
anim:CacheToMDR.anim,
},
{
value:"",
target:BusToMdr.target,
time:1/  useSpeedStore.getState().speed*BusToMdr.time,
anim:BusToMdr.anim,
},
{
value:"value2",
target:fitToMdr.target,
time:1/  useSpeedStore.getState().speed*fitToMdr.time,
anim:fitToMdr.anim,
},
{
value:"WRITE-THROUGH",
target:MCanim.target,
time:1/  useSpeedStore.getState().speed*MCanim.time,
anim:MCanim.anim,
},

  
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
        this.buildanim = function () {
          const speed = 1 / useSpeedStore.getState().speed;
        
          if (this.isimmed === false) {
            const anims = [];
        
            // Step 1: In-fit to Accumulator
            anims.push({
              value: "addresse1",
              target: infitToAcc.target,
              time: speed * infitToAcc.time,
              anim: infitToAcc.anim,
            });
        
            // Step 2: Acc to Bus
            anims.push({
              value: "",
              target: AccToBus.target,
              time: speed * AccToBus.time,
              anim: AccToBus.anim,
            });
        
            // Step 3: Cache hit check
            const cacheResult = memory.cache.checkCache(this.addresse1, 0);
        
            if (cacheResult.hit) {
              console.log("gggggggggggggggggggggggggggg");
              anims.push({
                value: "addresse1",
                target: BusToCache.target,
                time: speed * BusToCache.time,
                anim: BusToCache.anim,
              });
              anims.push({
                value: "WRITE",
                target: MCanim.target,
                time: speed * MCanim.time,
                anim: MCanim.anim,
              }
              
              ,
              {
                value:"value2",
                target:MdrToBus.target,
              time:1/  useSpeedStore.getState().speed*MdrToBus.time,
                anim:MdrToBus.anim,
            },
          
          {
            value:"",
            target:MDRToCache.target,
          time:1/  useSpeedStore.getState().speed*MDRToCache.time,
            anim:MDRToCache.anim,
        },
        {
          value:"value2",
          target:BusToCache.target,
        time:1/  useSpeedStore.getState().speed*BusToCache.time,
          anim:BusToCache.anim,
      })
             
        
            } else {
              // Cache miss path - full memory route
              anims.push({
                value: "addresse1",
                target: AccToADR.target,
                time: speed * AccToADR.time,
                anim: AccToADR.anim,
              });
        
              anims.push({
                value: "addresse1",
                target: ADRToMAR.target,
                time: speed * ADRToMAR.time,
                anim: ADRToMAR.anim,
              });
        
              anims.push({
                value: "addresse1",
                target: fitToMar.target,
                time: speed * fitToMar.time,
                anim: fitToMar.anim,
              });
        
              anims.push({
                value: "WRITE",
                target: MCanim.target,
                time: speed * MCanim.time,
                anim: MCanim.anim,
              }
              
              ,
              {
                value:"value2",
                target:MdrToBus.target,
              time:1/  useSpeedStore.getState().speed*MdrToBus.time,
                anim:MdrToBus.anim,
            },
          
          {
            value:"",
            target:MdrToBus.target,
          time:1/  useSpeedStore.getState().speed*MdrToBus.time,
            anim:MdrToBus.anim,
        },
        {
          value:"value2",
          target:BusToCache.target,
        time:1/  useSpeedStore.getState().speed*BusToCache.time,
          anim:BusToCache.anim,
      });
              
            }
        
            return anims;
        
          } else {
            // Immediate mode (direct value animation)
            return [
              {
                value: "value2",
                target: fitToCache.target,
                time: speed * fitToCache.time,
                anim: fitToCache.anim,
              },
              {
                value: "WRITE",
                target: Cacheanim.target,
                time: speed * Cacheanim.time,
                anim: Cacheanim.anim,
              },
              {
                value: "",
                target: CacheToBus.target,
                time: speed * CacheToBus.time,
                anim: CacheToBus.anim,
              },
              {
                value: this.addresse1,
                target: CacheToADR.target,
                time: speed * CacheToADR.time,
                anim: CacheToADR.anim,
              },
              {
                value: "",
                target: ADRbusToDATABus.target,
                time: speed * ADRbusToDATABus.time,
                anim: ADRbusToDATABus.anim,
              },
              {
                value: this.addresse1,
                target: ADRToMAR.target,
                time: speed * ADRToMAR.time,
                anim: ADRToMAR.anim,
              },
              {
                value: this.addresse1,
                target: fitToMar.target,
                time: speed * fitToMar.time,
                anim: fitToMar.anim,
              },
              {
                value: "",
                target: CacheToBus.target,
                time: speed * CacheToBus.time,
                anim: CacheToBus.anim,
              },
              {
                value: "value2",
                target: CacheToMDR.target,
                time: speed * CacheToMDR.time,
                anim: CacheToMDR.anim,
              },
              {
                value: "",
                target: BusToMdr.target,
                time: speed * BusToMdr.time,
                anim: BusToMdr.anim,
              },
              {
                value: "value2",
                target: fitToMdr.target,
                time: speed * fitToMdr.time,
                anim: fitToMdr.anim,
              },
              {
                value: "value2",
                target: infitToMdr.target,
                time: speed * infitToMdr.time,
                anim: infitToMdr.anim,
              },
              {
                value: "WRITE-THROUGH",
                target: MCanim.target,
                time: speed * MCanim.time,
                anim: MCanim.anim,
              },
            
             /////////////////////////////////////////////////////////////////:aaaaaaaaaaaaaaaaaaaaaaaaaaaa
              
            ];
            
          }
        }
      }}
        ;
        


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
              time:1/  useSpeedStore.getState().speed*addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
              time:1/  useSpeedStore.getState().speed*AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
              time:1/  useSpeedStore.getState().speed*fitToAcc.time,
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
              time:1/  useSpeedStore.getState().speed*addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
              time:1/  useSpeedStore.getState().speed*AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
              time:1/  useSpeedStore.getState().speed*fitToAcc.time,
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
              time:1/  useSpeedStore.getState().speed*addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
              time:1/  useSpeedStore.getState().speed*AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
              time:1/  useSpeedStore.getState().speed*fitToAcc.time,
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
              time:1/  useSpeedStore.getState().speed*addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
              time:1/  useSpeedStore.getState().speed*AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
              time:1/  useSpeedStore.getState().speed*fitToAcc.time,
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
              time:1/  useSpeedStore.getState().speed*addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
              time:1/  useSpeedStore.getState().speed*AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
              time:1/  useSpeedStore.getState().speed*fitToAcc.time,
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
              time:1/  useSpeedStore.getState().speed*addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
              time:1/  useSpeedStore.getState().speed*AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
              time:1/  useSpeedStore.getState().speed*fitToAcc.time,
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
              time:1/  useSpeedStore.getState().speed*addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
              time:1/  useSpeedStore.getState().speed*AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
              time:1/  useSpeedStore.getState().speed*fitToAcc.time,
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
              time:1/  useSpeedStore.getState().speed*addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
              time:1/  useSpeedStore.getState().speed*AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
              time:1/  useSpeedStore.getState().speed*fitToAcc.time,
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
                  time:1/  useSpeedStore.getState().speed*fitToR1.time,
                    anim:fitToR1.anim,
                },
                {
                    value:this.value1,
                    target:infitToR1.target,
                  time:1/  useSpeedStore.getState().speed*infitToR1.time,
                    anim:infitToR1.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                  time:1/  useSpeedStore.getState().speed*RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                  time:1/  useSpeedStore.getState().speed*BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                  time:1/  useSpeedStore.getState().speed*MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="001"){
                return[{
                    value:this.value1,
                    target:fitToR2.target,
                  time:1/  useSpeedStore.getState().speed*fitToR2.time,
                    anim:fitToR2.anim,
                },
                {
                    value:this.value1,
                    target:infitToR2.target,
                  time:1/  useSpeedStore.getState().speed*infitToR2.time,
                    anim:infitToR2.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                  time:1/  useSpeedStore.getState().speed*RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                  time:1/  useSpeedStore.getState().speed*BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                  time:1/  useSpeedStore.getState().speed*MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="010"){
                return[{
                    value:this.value1,
                    target:fitToR3.target,
                  time:1/  useSpeedStore.getState().speed*fitToR3.time,
                    anim:fitToR3.anim,
                },
                {
                    value:this.value1,
                    target:infitToR3.target,
                  time:1/  useSpeedStore.getState().speed*infitToR3.time,
                    anim:infitToR3.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                  time:1/  useSpeedStore.getState().speed*RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                  time:1/  useSpeedStore.getState().speed*BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                  time:1/  useSpeedStore.getState().speed*MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="011"){
                return[{
                    value:this.value1,
                    target:fitToR4.target,
                  time:1/  useSpeedStore.getState().speed*fitToR4.time,
                    anim:fitToR4.anim,
                },
                {
                    value:this.value1,
                    target:infitToR4.target,
                  time:1/  useSpeedStore.getState().speed*infitToR4.time,
                    anim:infitToR4.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                  time:1/  useSpeedStore.getState().speed*RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                  time:1/  useSpeedStore.getState().speed*BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                  time:1/  useSpeedStore.getState().speed*MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="100"){
                return[{
                    value:this.value1,
                    target:fitToAcc.target,
                  time:1/  useSpeedStore.getState().speed*fitToAcc.time,
                    anim:fitToAcc.anim,
                },
                {
                    value:this.value1,
                    target:infitToAcc.target,
                  time:1/  useSpeedStore.getState().speed*infitToAcc.time,
                    anim:infitToAcc.anim,
                },
                {
                    value:this.value1,
                    target:AccToBus.target,
                  time:1/  useSpeedStore.getState().speed*AccToBus.time,
                    anim:AccToBus.anim,
                },
                {
                    value:this.value1,
                    target:AccToMDR.target,
                  time:1/  useSpeedStore.getState().speed*AccToMDR.time,
                    anim:AccToMDR.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                  time:1/  useSpeedStore.getState().speed*BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                  time:1/  useSpeedStore.getState().speed*MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="101"){
                return[{
                    value:this.value1,
                    target:fitToBr.target,
                  time:1/  useSpeedStore.getState().speed*fitToBr.time,
                    anim:fitToBr.anim,
                },
                {
                    value:this.value1,
                    target:infitToBr.target,
                  time:1/  useSpeedStore.getState().speed*infitToBr.time,
                    anim:infitToBr.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                  time:1/  useSpeedStore.getState().speed*RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                  time:1/  useSpeedStore.getState().speed*BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                  time:1/  useSpeedStore.getState().speed*MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="110"){
                return[{
                    value:this.value1,
                    target:fitToIdr.target,
                  time:1/  useSpeedStore.getState().speed*fitToIdr.time,
                    anim:fitToIdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToIdr.target,
                  time:1/  useSpeedStore.getState().speed*infitToIdr.time,
                    anim:infitToIdr.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                  time:1/  useSpeedStore.getState().speed*RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                  time:1/  useSpeedStore.getState().speed*BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                  time:1/  useSpeedStore.getState().speed*MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="111"){
                return[{
                    value:this.value1,
                    target:fitToSr.target,
                  time:1/  useSpeedStore.getState().speed*fitToSr.time,
                    anim:fitToSr.anim,
                },
                {
                    value:this.value1,
                    target:infitToSR.target,
                  time:1/  useSpeedStore.getState().speed*infitToSR.time,
                    anim:infitToSR.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                  time:1/  useSpeedStore.getState().speed*RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                  time:1/  useSpeedStore.getState().speed*BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                  time:1/  useSpeedStore.getState().speed*MCanim.time,
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
                  time:1/  useSpeedStore.getState().speed*MCanim.time,
                    anim:MCanim.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                  time:1/  useSpeedStore.getState().speed*MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                  time:1/  useSpeedStore.getState().speed*MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToR1.target,
                  time:1/  useSpeedStore.getState().speed*fitToR1.time,
                    anim:fitToR1.anim,
                },
                {
                    value:this.value1,
                    target:infitToR1.target,
                  time:1/  useSpeedStore.getState().speed*infitToR1.time,
                    anim:infitToR1.anim,
                },
            ];
            }else if(this.register1=="001"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                  time:1/  useSpeedStore.getState().speed*MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                  time:1/  useSpeedStore.getState().speed*MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                  time:1/  useSpeedStore.getState().speed*MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToR2.target,
                  time:1/  useSpeedStore.getState().speed*fitToR2.time,
                    anim:fitToR2.anim,
                },
                {
                    value:this.value1,
                    target:infitToR2.target,
                  time:1/  useSpeedStore.getState().speed*infitToR2.time,
                    anim:infitToR2.anim,
                },
                ];
            }else if(this.register1=="010"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                  time:1/  useSpeedStore.getState().speed*MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                  time:1/  useSpeedStore.getState().speed*MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                  time:1/  useSpeedStore.getState().speed*MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToR3.target,
                  time:1/  useSpeedStore.getState().speed*fitToR3.time,
                    anim:fitToR3.anim,
                },
                {
                    value:this.value1,
                    target:infitToR3.target,
                  time:1/  useSpeedStore.getState().speed*infitToR3.time,
                    anim:infitToR3.anim,
                },
            ];
            }else if(this.register1=="011"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                  time:1/  useSpeedStore.getState().speed*MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                  time:1/  useSpeedStore.getState().speed*MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                  time:1/  useSpeedStore.getState().speed*MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToR4.target,
                  time:1/  useSpeedStore.getState().speed*fitToR4.time,
                    anim:fitToR4.anim,
                },
                {
                    value:this.value1,
                    target:infitToR4.target,
                  time:1/  useSpeedStore.getState().speed*infitToR4.time,
                    anim:infitToR4.anim,
                },
                //push animation
            ];
            }else if(this.register1=="100"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                  time:1/  useSpeedStore.getState().speed*MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                  time:1/  useSpeedStore.getState().speed*MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MDRToAcc.target,
                  time:1/  useSpeedStore.getState().speed*MDRToAcc.time,
                    anim:MDRToAcc.anim,
                },
                {
                    value:"",
                    target:BusToAcc.target,
                  time:1/  useSpeedStore.getState().speed*BusToAcc.time,
                    anim:BusToAcc.anim,
                },
                {
                    value:this.value1,
                    target:fitToAcc.target,
                  time:1/  useSpeedStore.getState().speed*fitToAcc.time,
                    anim:fitToAcc.anim,
                },
                {
                    value:this.value1,
                    target:infitToAcc.target,
                  time:1/  useSpeedStore.getState().speed*infitToAcc.time,
                    anim:infitToAcc.anim,
                },
                //push animation
            ];
            }else if(this.register1=="101"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                  time:1/  useSpeedStore.getState().speed*MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                  time:1/  useSpeedStore.getState().speed*MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                  time:1/  useSpeedStore.getState().speed*MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToBr.target,
                  time:1/  useSpeedStore.getState().speed*fitToBr.time,
                    anim:fitToBr.anim,
                },
                {
                    value:this.value1,
                    target:infitToBr.target,
                  time:1/  useSpeedStore.getState().speed*infitToBr.time,
                    anim:infitToBr.anim,
                },
                //push animation
            ];
            }else if(this.register1=="110"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                  time:1/  useSpeedStore.getState().speed*MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation of pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                  time:1/  useSpeedStore.getState().speed*MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                  time:1/  useSpeedStore.getState().speed*MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToIdr.target,
                  time:1/  useSpeedStore.getState().speed*fitToIdr.time,
                    anim:fitToIdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToIdr.target,
                  time:1/  useSpeedStore.getState().speed*infitToIdr.time,
                    anim:infitToIdr.anim,
                },
                //push animation
            ];
            }else if(this.register1=="111"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                  time:1/  useSpeedStore.getState().speed*MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                  time:1/  useSpeedStore.getState().speed*infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                  time:1/  useSpeedStore.getState().speed*MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                  time:1/  useSpeedStore.getState().speed*MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToSr.target,
                  time:1/  useSpeedStore.getState().speed*fitToSr.time,
                    anim:fitToSr.anim,
                },
                {
                    value:this.value1,
                    target:infitToSR.target,
                  time:1/  useSpeedStore.getState().speed*infitToSR.time,
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
              time:1/  useSpeedStore.getState().speed*addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
              time:1/  useSpeedStore.getState().speed*AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
              time:1/  useSpeedStore.getState().speed*fitToAcc.time,
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
              time:1/  useSpeedStore.getState().speed*addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
              time:1/  useSpeedStore.getState().speed*AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
              time:1/  useSpeedStore.getState().speed*fitToAcc.time,
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
              time:1/  useSpeedStore.getState().speed*addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
              time:1/  useSpeedStore.getState().speed*AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
              time:1/  useSpeedStore.getState().speed*fitToAcc.time,
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
              time:1/  useSpeedStore.getState().speed*addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
              time:1/  useSpeedStore.getState().speed*AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
              time:1/  useSpeedStore.getState().speed*fitToAcc.time,
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
              time:1/  useSpeedStore.getState().speed*addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
              time:1/  useSpeedStore.getState().speed*AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
              time:1/  useSpeedStore.getState().speed*fitToAcc.time,
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
              time:1/  useSpeedStore.getState().speed*addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
              time:1/  useSpeedStore.getState().speed*AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
              time:1/  useSpeedStore.getState().speed*fitToAcc.time,
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

export {InstructionADD,InstructionMOV00,InstructionMOV01,InstructionMOV10,InstructionMOV11,InstructionSUB,InstructionMUL,InstructionDIV,InstructionBSE,InstructionBIE,InstructionBI,InstructionBS,InstructionBNE,InstructionBE,InstructionBR,InstructionPOP,InstructionPUSH,InstructionAND,InstructionOR,InstructionNAND,InstructionNOR,InstructionXOR,InstructionNEG,InstructionNOT,InstructionROL,InstructionROR,InstructionSHL,InstructionSHR,InstructionPOPA,InstructionPUSHA}
