"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Splitetext({
    text = "",
    className = ""
}) {
    const textsref:any = useRef([]);
    const testref = useRef(null);
    const splittext:any = text.split("");
    
    useGSAP(() => {
        const tl:any = gsap.timeline();

        tl.from(textsref.current,{
            duration:0.2,
            y:20,
            opacity:0,
            each:"none",
            stagger:0.1
        })
    });

    return(
        <div>
            {splittext.map((e:any,i:number) => (
                <p ref={(e:any) => textsref.current[i] = e} key={i} className={"inline-block " + className}>{e}</p>
            ))}
        </div>
    );
}