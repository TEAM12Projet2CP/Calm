import "./style.css"
import { useState, useRef,useLayoutEffect} from "react";
import Archi2 from "../../assets/images/archi.png";
import gsap from "gsap";
import queuearrow from "../../assets/images/icons/fleche.png"

import {  useSpeedStore } from "../Ide/speedStore.jsx";
//////////////////////////////////////

const Arch = (props)=>{

    
let [dataBusText,setDataBusText]=useState("");
let [AdrBusText,setAdrBusText]=useState("");
let [ballText,setballText]=useState("");
let [ball2Text,setball2Text]=useState(0);
let [IPval,setipval]=useState(0);
let [AluVal,setAluVal]=useState("");
let [MCVal,setMCVal]=useState("");
let [CachVal,setCachVal]=useState("");
const [isPaused, setIsPaused] = useState(false);
const [showControls, setShowControls] = useState(false);

let MC=props.mem.getData();
let cache=props.mem.getCache()
let tablec=[];

let tabcache=[]

const speed1= useSpeedStore((state) => state.speed); 
console.log("fjjjjjjjjjjjjjjjjjjjjj")
console.log(speed1)

const flagData = [
    { short: "Z", full: "Zero Flag" },
    { short: "S", full: "Sign Flag" },
    { short: "C", full: "Carry Flag" },
    { short: "P", full: "Parity Flag" },
    { short: "Pr", full: "Impair/Pair Flag" },
    { short: "O", full: "Overflow Flag" },
    { short: "I", full: "Interrupt Flag" },
    { short: "I/O", full: "Input/Output Flag" },
  ];
MC.forEach((element,index) => {
    tablec.push( <tr>
    <td>
        {index}
    </td>
    <td>
        {element}
    </td>
</tr>)
});
cache.getData().forEach((element,index) => {
    tabcache.push( <tr>
    <td>
        {element.address}
    </td>
    <td>
        {element.data}
    </td>
</tr>)
});
const mainTimeline = useRef(gsap.timeline());
const handlePauseResume = () => {
    setIsPaused(prev => {
        if (!prev) {
            // Pausing
            mainTimeline.current.pause();
            setShowControls(true); // Show controls when paused
        } else {
            // Continuing
            mainTimeline.current.resume();
            setShowControls(false); // Hide controls when continuing
        }
        return !prev;
    });
};
const handleNext = () => {
    if (mainTimeline.current && isPaused) {
        // Get current time and total duration
        const currentTime = mainTimeline.current.time();
        const duration = mainTimeline.current.duration();
        
        // Get all animation timestamps
        const timePoints = mainTimeline.current.getChildren().map(child => child.startTime());
        
        // Find next animation point
        const nextTime = timePoints.find(time => time > currentTime);
        
        if (nextTime !== undefined && currentTime < duration) {
            // Play only the next animation segment
            mainTimeline.current.tweenTo(nextTime, {
                duration: 0.5,
                ease: "none"
            });
        }
    }
};
const handlePrevious = () => {
    if (mainTimeline.current && isPaused) {
        // Get current time
        const currentTime = mainTimeline.current.time();
        
        // Get all animation points from timeline children
        const timePoints = mainTimeline.current.getChildren()
            .map(child => child.startTime())
            .sort((a, b) => b - a); // Sort in descending order
        
        // Find the last two animation points before current time
        const prevPoints = timePoints.filter(time => time < currentTime);
        const targetTime = prevPoints[1] || 0; // Get second-to-last point, or 0 if at start
        
        if (targetTime !== undefined) {
            // Kill any existing tweens to prevent conflicts
            gsap.killTweensOf(mainTimeline.current);
            
            // Reset any stuck animations
            mainTimeline.current.getChildren().forEach(child => {
                if (child.isActive()) {
                    child.progress(1);
                }
            });
            
            // Pause current timeline
            mainTimeline.current.pause();
            
            // Reverse to previous animation point
            mainTimeline.current.tweenTo(targetTime, {
                duration: 0.3,
                ease: "none",
                onComplete: () => {
                    // Kill any remaining tweens before starting next animation
                    gsap.killTweensOf(mainTimeline.current);
                    
                    // After reaching the previous point, continue with next job
                    mainTimeline.current.tweenTo(prevPoints[0], {
                        duration: 0.3,
                        ease: "none",
                        delay: 0.1,
                        onComplete: () => {
                            // Ensure timeline is paused after completing the sequence
                            mainTimeline.current.pause();
                        }
                    });
                }
            });
        }
    }
};
const timelineRef = useRef();

    ///////////////to add delay/////
    let thecontext=[...props.theCTX];
    let tmpctx=0;
    let done=0;
    const animate=(i,animation,h,w,dl,chaine)=>{
        const tl = gsap.timeline();
        mainTimeline.current.add(tl);
        setTimeout(function() {
           if (animation.target === ".ball") {
            const value = animation.value.toString().length > 7 
                ? parseInt(animation.value, 2).toString(16)
                : animation.value.toString();
            tl.add(() => setballText(value));
            tl.add(() => setballText(value))
            .addLabel(`step${i}`);
        } 
        else if (animation.target === ".box-data") {
            const value = animation.value.toString().length > 7 
                ? parseInt(animation.value, 2).toString(16)
                : animation.value.toString();
            tl.add(() => setDataBusText(value));
            tl.add(() => setballText(value))
            .addLabel(`step${i}`);
        } 
        else if (animation.target === ".box-ADR") {
            const value = animation.value.toString().length > 7 
                ? parseInt(animation.value, 2).toString(16)
                : animation.value.toString();
            tl.add(() => setAdrBusText(value));
            tl.add(() => setballText(value))
            .addLabel(`step${i}`);
        }
        else if (animation.target === "IP") {
            const value = animation.value.toString();
            tl.add(() => setipval(prev => prev + 2));
            tl.add(() => setballText(value))
            .addLabel(`step${i}`);
        }
        else if (animation.target === ".ALU") {
            const value = animation.value.toString();
            tl.add(() => setAluVal(animation.value));
            tl.add(() => setballText(value))
            .addLabel(`step${i}`);
        }
        else if (animation.target === ".MC") {
            const value = animation.value.toString();
            tl.add(() => setMCVal(animation.value));
            tl.add(() => setballText(value))
            .addLabel(`step${i}`);
        }else if(animation.target===".Cache"){
               const value = animation.value.toString().length
                setCachVal(animation.value);
                tl.add(() => setballText(value));
                tl.add(() => setballText(value))
                .addLabel(`step${i}`);

            }

            
            
            
            if(animation.nom==="QueueToIr"|animation.nom==="queueExitToBus"){
                //decalage par 1
                
                gsap.fromTo(".queuearrow",{top:"60%",left:"83%",opacity:"0"},{top:"60%",left:"73%",opacity:"1",duration:0.3/  speed1});
                gsap.to(".queuearrow",{opacity:"0",duration:(0.1/  speed1).toString(),delay:(0.3/  speed1).toString()});
                if(animqueuelen()==6){
                    gsap.to(".queue6",{opacity:"0",duration:0.4/  speed1})

                    gsap.to(".queue5",{opacity:"1",duration:0.4/  speed1})
                    gsap.to(".queue4",{opacity:"1",duration:0.4/  speed1})
                    gsap.to(".queue3",{opacity:"1",duration:0.4/  speed1})
                    gsap.to(".queue2",{opacity:"1",duration:0.4/  speed1})
                    gsap.to(".queue1",{opacity:"1",duration:0.4/  speed1})
                }else if(animqueuelen()==5){
                    gsap.to(".queue6",{opacity:"0",duration:0.4/  speed1})
                    gsap.to(".queue5",{opacity:"0",duration:0.4/  speed1})
                    gsap.to(".queue4",{opacity:"1",duration:0.4/  speed1})
                    gsap.to(".queue3",{opacity:"1",duration:0.4/  speed1})
                    gsap.to(".queue2",{opacity:"1",duration:0.4/  speed1})
                    gsap.to(".queue1",{opacity:"1",duration:0.4/  speed1})
                }else if(animqueuelen()==4){
                    gsap.to(".queue6",{opacity:"0",duration:0.4/  speed1})
                    gsap.to(".queue5",{opacity:"0",duration:0.4/  speed1})
                    gsap.to(".queue4",{opacity:"0",duration:0.4/  speed1})
                    gsap.to(".queue3",{opacity:"1",duration:0.4/  speed1})
                    gsap.to(".queue2",{opacity:"1",duration:0.4/  speed1})
                    gsap.to(".queue1",{opacity:"1",duration:0.4/  speed1})
                }else if(animqueuelen()==3){
                    gsap.to(".queue6",{opacity:"0",duration:0.4/  speed1})
                    gsap.to(".queue5",{opacity:"0",duration:0.4/  speed1})
                    gsap.to(".queue4",{opacity:"0",duration:0.4/  speed1})
                    gsap.to(".queue3",{opacity:"0",duration:0.4/  speed1})
                    gsap.to(".queue2",{opacity:"1",duration:0.4/  speed1})
                    gsap.to(".queue1",{opacity:"1",duration:0.4/  speed1})
                }else if(animqueuelen()==2){
                    gsap.to(".queue6",{opacity:"0",duration:0.4/  speed1})
                    gsap.to(".queue5",{opacity:"0",duration:0.4/  speed1})
                    gsap.to(".queue4",{opacity:"0",duration:0.4/  speed1})
                    gsap.to(".queue3",{opacity:"0",duration:0.4/  speed1})
                    gsap.to(".queue2",{opacity:"0",duration:0.4/  speed1})
                    gsap.to(".queue1",{opacity:"1",duration:0.4/  speed1})
                }else if(animqueuelen()==1){
                    gsap.to(".queue6",{opacity:"0",duration:0.4/  speed1})
                    gsap.to(".queue5",{opacity:"0",duration:0.4/  speed1})
                    gsap.to(".queue4",{opacity:"0",duration:0.4/  speed1})
                    gsap.to(".queue3",{opacity:"0",duration:0.4/  speed1})
                    gsap.to(".queue2",{opacity:"0",duration:0.4/  speed1})
                    gsap.to(".queue1",{opacity:"0",duration:0.4/  speed1})
                }
            }
            tl.add(() => animation.anim(animation.value, h, w))
            .addLabel(`step${i}_main`);
            if(animqueuelen()==6){
                done=1;
            }
            if(chaine&done===1){
                if(!isNaN(thecontext[tmpctx]) & !isNaN(thecontext[tmpctx])){
                let tl = gsap.timeline();
                tl.add(() => {
                    setball2Text("");
                })
                .fromTo(".ball2",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.782,y:h*0.14,opacity:"0"},{opacity:"1" ,duration:0.5/speed1})
                .fromTo(".ball2",{x:w*0.782,y:h*0.14},{y:h*0.18 ,duration:0.8/speed1})
                .to(".ball2",{opacity:"0",duration:0.5/speed1})
                .add(() => {
                setAdrBusText(thecontext[tmpctx])
                IPval=IPval+2
                setipval(IPval)
                })
                .fromTo(".box-ADR",{x:w*0.753,opacity:"0"},{opacity:"1",duration:0.5/speed1})
                .fromTo(".box-ADR",{x:w*0.753},{x:w*0.648,duration:0.8/speed1})
                .to(".box-ADR",{opacity:"0" ,duration:0.5/speed1})
                .add(() => {
                setball2Text(thecontext[tmpctx]);
                tmpctx++;})
                .fromTo(".ball2",{borderRadius:"10px",width:w*0.032,height:h*0.14,x:w*0.623,y:h*0.165,opacity:"0"},{opacity:"1" ,duration:0.5/speed1})
                .to(".ball2",{opacity:"0" ,duration:0.5/speed1})
                .add(() => {
                setball2Text(thecontext[tmpctx])})
                .fromTo(".ball2",{borderRadius:"10px",width:w*0.11,height:h*0.06,x:w*0.49,y:h*0.38,opacity:"0"},{opacity:"1" ,duration:0.5/speed1})
                .to(".ball2",{opacity:"0" ,duration:0.5/speed1})
                .fromTo(".ball2",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.539,y:h*0.445,opacity:"0"},{opacity:"1" ,duration:0.5/speed1})
                .fromTo(".ball2",{x:w*0.539,y:h*0.445},{y:h*0.465 ,duration:0.8})
                .to(".ball2",{opacity:"0" ,duration:0.5/speed1})
                .add(() => {
                setDataBusText(thecontext[tmpctx])
                tmpctx++;})
                .fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:0.5/speed1})
                .fromTo(".box-data",{x:w*0.497},{x:w*0.874,duration:0.8/speed1})
                .to(".box-data",{opacity:"0" ,duration:0.5/speed1})
                .fromTo(".ball2",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.931,y:h*0.56,opacity:"0"},{opacity:"1" ,duration:0.5/speed1})
                .fromTo(".ball2",{x:w*0.931,y:h*0.56},{y:h*0.6638 ,duration:0.5/speed1})
                .to(".ball2",{x:w*0.921 ,duration:0.5/speed1})
                .to(".ball2",{opacity:"0" ,duration:0.3/speed1})
                if(animqueuelen()===5){
                    tl.to(".queue6",{opacity:"1",duration:0.4/  speed1})
                    tl.to(".queue5",{opacity:"1",duration:0.4/  speed1})
                    tl.to(".queue4",{opacity:"1",duration:0.4/  speed1})
                    tl.to(".queue3",{opacity:"1",duration:0.4/  speed1})
                    tl.to(".queue2",{opacity:"1",duration:0.4/  speed1})
                    tl.to(".queue1",{opacity:"1",duration:0.4/  speed1})
                }else if(animqueuelen()===4){
                    tl.to(".queue6",{opacity:"1",duration:0.4/  speed1})
                    tl.to(".queue5",{opacity:"1",duration:0.4/  speed1})
                    tl.to(".queue4",{opacity:"1",duration:0.4/  speed1})
                    tl.to(".queue3",{opacity:"1",duration:0.4/  speed1})
                    tl.to(".queue2",{opacity:"1",duration:0.4/  speed1})
                    tl.to(".queue1",{opacity:"1",duration:0.4/  speed1})
                }else if(animqueuelen()===3){
                    tl.to(".queue6",{opacity:"0",duration:0.4/  speed1})
                    tl.to(".queue5",{opacity:"1",duration:0.4/  speed1})
                    tl.to(".queue4",{opacity:"1",duration:0.4/  speed1})
                    tl.to(".queue3",{opacity:"1",duration:0.4/  speed1})
                    tl.to(".queue2",{opacity:"1",duration:0.4/  speed1})
                    tl.to(".queue1",{opacity:"1",duration:0.4/  speed1})
                }else if(animqueuelen()===2){
                    tl.to(".queue6",{opacity:"0",duration:0.4/  speed1})
                    tl.to(".queue5",{opacity:"0",duration:0.4/  speed1})
                    tl.to(".queue4",{opacity:"1",duration:0.4/  speed1})
                    tl.to(".queue3",{opacity:"1",duration:0.4/  speed1})
                    tl.to(".queue2",{opacity:"1",duration:0.4/  speed1})
                    tl.to(".queue1",{opacity:"1",duration:0.4/  speed1})
                }else if(animqueuelen()===1){
                    tl.to(".queue6",{opacity:"0",duration:0.4/  speed1})
                    tl.to(".queue5",{opacity:"0",duration:0.4/  speed1})
                    tl.to(".queue4",{opacity:"0",duration:0.4/  speed1})
                    tl.to(".queue3",{opacity:"1",duration:0.4/  speed1})
                    tl.to(".queue2",{opacity:"1",duration:0.4/  speed1})
                    tl.to(".queue1",{opacity:"1",duration:0.4/  speed1})
                }else if(animqueuelen()===0){
                    tl.to(".queue6",{opacity:"0",duration:0.4/  speed1})
                    tl.to(".queue5",{opacity:"0",duration:0.4/  speed1})
                    tl.to(".queue4",{opacity:"0",duration:0.4/  speed1})
                    tl.to(".queue3",{opacity:"0",duration:0.4/  speed1})
                    tl.to(".queue2",{opacity:"1",duration:0.4/  speed1})
                    tl.to(".queue1",{opacity:"1",duration:0.4/  speed1})
                    
                }}
            };
        }, dl);
        mainTimeline.current.add(tl, dl/1000)
        .addLabel(`anim${i}`, dl/1000);
    }
    const animqueuelen=()=>{
        let len=0
        if(q6.current.style.opacity==1){
            len=len+1;
        }
        if(q5.current.style.opacity==1){
            len=len+1;
        }
        if(q4.current.style.opacity==1){
            len=len+1;
        }
        if(q3.current.style.opacity==1){
            len=len+1;
        }
        if(q2.current.style.opacity==1){
            len=len+1;
        }
        if(q1.current.style.opacity==1){
            len=len+1;
        }
        return len;
    }
    let myref=useRef()
    let q1=useRef();
    let q2=useRef();
    let q3=useRef();
    let q4=useRef();
    let q5=useRef();
    let q6=useRef();
    const simulate=(h,w) => {
        let i=0;
        let dl=0;
        let allow=true;
        let allowtmp=0;
        let j=0
        while(j<props.anim.length){
            let k=0;
            let stop=false;
            let chaine=false;
            allowtmp++;
            if(allowtmp>=10){
                allow=true;
            }
            while(k<10&!stop&!(k+j===props.anim.length)){
                if(props.anim[k+j-4>0?k+j-4:k+j].target!==".box-data"&props.anim[k+j-4>0?k+j-4:k+j].target!==".box-ADR"){
                    k++;
                }else{
                    stop=true;
                }
            }
            if(k===10&animqueuelen()<=4&allow){
                chaine=true;
                allow=false;
                allowtmp=0;
            }
            animate(i,props.anim[j],h,w,dl,chaine);
            dl=dl+props.anim[j].time+1;
            i++;
            // if((props.anim[j+1].nom==="QueueToIr")&(j<props.anim.length-4)&(props.anim[j+2].nom==="fitToIr"|props.anim[j+3].nom==="fitToIr")){//en cas instruction avec 2 general bytes
            // contin=false;
            // }
            j++;
        };
        
        mainTimeline.current.eventCallback("onComplete", () => {
            setIsPaused(false);
        });
    
  
        mainTimeline.current.play();
    }
    
    ///////////////////////////////
    // useEffect(() => {
    // let i=0;
    // for(let animation of props.anim){
    //     animate(i,animation);
    //     i++;
    // }
    // // props.anim[0](myref.current.clientHeight,current.clientWidth);
    // },[]);
//////////////////////////
    return <>
    <div className="arch-contain">{/*///*/}
    {/* <img src={Archi} alt="" className="archi" ref={myref} onLoad={()=>{simulate(myref.current.clientHeight,myref.current.clientWidth)}}/> */}
    <img src={Archi2} alt="" className="archi" ref={myref} onLoad={()=>{simulate(myref.current.clientHeight,myref.current.clientWidth)}}/>
    <div className="IP" style={{
        height:"4.2%",
        width:"6%",
        position:"absolute",
        borderRadius:"25%",
        border:"solid #1BE988",
        backgroundColor: "#1BE985",
        top:"5%",
        left:"75%"
        // left:"23%",
        // display:"none",
    }}>{IPval}</div>
    <div className="box-data" style={{
        height:"5%",
        width:"7.5%",
        position:"absolute",
        borderRadius:"25%",
        border:"solid #1BE988",
        backgroundColor: "#1BE985",
        top:"45.89999%",
        // left:"23%",
        // display:"none",
        opacity:"0"
    }}>{dataBusText}</div>
    <div className="ball" style={{
        height:"2.812%",
        width:"1.4%",
        borderRadius:"50%",
        position:"fixed",
        backgroundColor: "#1BE985",
        top:`0%`,
        left:'0%',
    }}>{ballText}</div> 
    <div className="ball2" style={{
        height:"2.812%",
        width:"1.4%",
        borderRadius:"50%",
        position:"fixed",
        backgroundColor: "#1BE985",
        top:`0%`,
        left:'0%',
        opacity:"0",
    }}>{ball2Text}</div> 
    <div className="box-ADR"style={{
        height:"4.2%",
        width:"6%",
        position:"absolute",
        borderRadius:"25%",
        border:"solid #1BE988",
        backgroundColor: "#1BE985",
        top:"17.9%",
        opacity:"0",
    }}>{AdrBusText}
    </div>
    <div className="queue1" ref={q1} style={{
        width:"2%",
        height:"9%",
        position:"absolute",
        backgroundColor: "#1BE985",
        top:"59%",
        left:"74.4%",
        borderRadius:"10px",
        opacity:"0",
    }}></div>
    <div className="queue2" ref={q2} style={{
        width:"2%",
        height:"9%",
        position:"absolute",
        backgroundColor: "#1BE985",
        top:"59%",
        left:"77.1%",
        borderRadius:"10px",
        opacity:"0",
    }}></div>
    <div className="queue3" ref={q3}  style={{
        width:"2%",
        height:"9%",
        position:"absolute",
        backgroundColor: "#1BE985",
        top:"59%",
        left:"79.8%",
        borderRadius:"10px",
        opacity:"0",
    }}></div>
    <div className="queue4" ref={q4} style={{
        width:"2%",
        height:"9%",
        position:"absolute",
        backgroundColor: "#1BE985",
        top:"59%",
        left:"82.6%",
        borderRadius:"10px",
        opacity:"0",
    }}></div>
    <div className="queue5" ref={q5} style={{
        width:"2%",
        height:"9%",
        position:"absolute",
        backgroundColor: "#1BE985",
        top:"59%",
        left:"85.3%",
        borderRadius:"10px",
        opacity:"0",
    }}></div>
    <div className="queue6" ref={q6} style={{
        width:"2%",
        height:"9%",
        position:"absolute",
        backgroundColor: "#1BE985",
        top:"59%",
        left:"88%",
        borderRadius:"10px",
        opacity:"0",
    }}></div>
    <div className="ALU" style={{
        height:"5%",
        width:"10%",
        position:"absolute",
        top:"75%",
        left:"17%",
        opacity:"0",
        color:"#1BE988",
        fontSize:"32px",
        fontWeight:"800"
    }}>{AluVal}</div>
    <div className="Cache" style={{
        height:"5%",
        width:"10%",
        position:"absolute",
        top:"21%",
        left:"30.7%",
        opacity:"0",
        color:"#1BE988",
        fontSize:"25px",
        fontWeight:"800"
    }}>{CachVal}</div>
    <div className="MC" style={{
        height:"5%",
        width:"10%",
        position:"absolute",
        top:"16%",
        left:"48.7%",
        opacity:"0",
        color:"#1BE988",
        fontSize:"25px",
        fontWeight:"800"
    }}>{MCVal}</div>
    <img src={queuearrow} className="queuearrow" alt="" style={{
        width:"60px",
        height:"40px",
        position:"absolute",
        top:"60%",
        left:"73%",
        opacity:"0",
       
    }
    } />
    
    </div>{}
    <div  className="ide"style={{
        height:"90%",
        width:"25%",
        backgroundColor:"#1C2025",
        position:"fixed",
        right:"1%",
        top:"8%",
        borderRadius:"20px",
        textAlign:"center",
        border:"1px solid #1BE985",
        overflow: "scroll"
        
    }} 

   
    
>
        <div> 
            <h2 className="contentTableText">Registers</h2>
            <div className="contentTableDiv">
                <div className="aregister">
                    <p className="aregP">R1 :</p>
                    <div className="aregC"><p style={{margin:"6px"}}>{props.reg[0].getvalue()}</p></div>
                </div>
                <div className="aregister">
                    <p className="aregP">R2  :</p>
                    <div className="aregC"><p style={{margin:"6px"}}>{props.reg[1].getvalue()}</p></div>
                </div>
                <div className="aregister">
                    <p className="aregP">R3  :</p>
                    <div className="aregC"><p style={{margin:"6px"}}>{props.reg[2].getvalue()}</p></div>
                </div>
                <div className="aregister">
                    <p className="aregP">R4  :</p>
                    <div className="aregC"><p style={{margin:"6px"}}>{props.reg[3].getvalue()}</p></div>
                </div>
                <div className="aregister">
                    <p className="aregP">RI  :</p>
                    <div className="aregC"><p style={{margin:"6px"}}>{props.reg[6].getvalue()}</p></div>
                </div>
                <div className="aregister">
                    <p className="aregP">RB  :</p>
                    <div className="aregC"><p style={{margin:"6px"}}>{props.reg[5].getvalue()}</p></div>
                </div>
                <div className="aregister">
                    <p className="aregP">RS  :</p>
                    <div className="aregC"><p style={{margin:"6px"}}>{props.reg[7].getvalue()}</p></div>
                </div>
                <div className="aregister">
                    <p className="aregP">Acc :</p>
                    <div className="aregC"><p style={{margin:"6px"}}>{props.reg[4].getvalue()}</p></div>
                </div>
            </div>
        </div>
        <div>
            <h2 className="contentTableText">Flags</h2>
            <div className="contentTableDivFlags">
  <div className="contentFlags">
    <div className="flag-row">
    {flagData.map((flag, idx) => (
        <div key={idx} className="flag-block" title={flag.full}>
          <div className="flag-label">{flag.short}</div>
          <div className="flag-value">{props.flags[idx]}</div>
        </div>
      ))}
    </div>
  </div>
</div>

        </div>
        <div>
            <h2 className="contentTableText">MC</h2>
            <div className="contentTableDivMC">
                <div className="MChead">
                    <p >adresse</p>
                    <p >content</p>
                </div>
            <table className="contentTableMC">
                <tbody>
                <tr>
                    <td>
                        adresse
                    </td>
                    <td>
                        content
                    </td>
                </tr>
                <br></br>
                    {tablec}
                </tbody>
            </table>
            </div>
            
        </div>
        <div>
            <h2 className="contentTableText">Cache</h2>
            <div className="contentTableDivMC">
                <div className="MChead">
                    <p >adresse</p>
                    <p >content</p>
                </div>
            <table className="contentTableMC">
                <tbody>
                <tr>
                    <td>
                        adresse
                    </td>
                    <td>
                        content
                    </td>
                </tr>
                <br></br>
                    {tabcache}
                </tbody>
            </table>
            </div>
            
        </div>
        <br /> 
       
        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
    {showControls && (
        <button className="returnBtn"onClick={handlePrevious}>previous</button>
    )}
    <button onClick={handlePauseResume} className="returnBtn">
        {isPaused ? "Continue" : "Pause"}
    </button>
    {showControls && (
        <button className="returnBtn" onClick={handleNext}>
          next  
        </button>
    )}
       <button className="returnBtn" onClick={()=>{
                window.location.reload(false);
        }}>return</button>
</div>

     
  
       
    
    </div>

    </>
}
export default Arch;