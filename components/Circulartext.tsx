"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function CircularText({
    text = "",
    clasName = "",
    radius = 80,
}) {
    const circularref = useRef(null);
    const texts = text.split("");

    useGSAP(() => {
        const tl:any = gsap.timeline();

        tl.to(circularref.current,{
            rotation:360,
            duration:15,
            ease: "none",
            repeat:-1,
            
        })
    },[]);
  
    return (
      <div>
        <div ref={circularref} className="flex justify-center items-center">
            {texts.map((e:any,i:number) => (
                <p key={i} className={"block absolute origin-center flex justify-center " + clasName} style={{transform:`rotate(${(360 / texts.length) * i}deg) translateX(${radius}px)`}}>
                    <span className="rotate-[90deg]">{e}</span>
                </p>
            ))}
        </div>
      </div>
    );
  }