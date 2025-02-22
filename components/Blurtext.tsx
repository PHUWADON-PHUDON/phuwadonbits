"use client";
import { useRef } from "react";
import {gsap} from "gsap";
import { useGSAP } from "@gsap/react";

export default function Blurtext({
  text = "",
  className = ""
}) {
  const arr:any = text.split(" ");
  const arrref:any = useRef([]);
  
  useGSAP(() => {
    const tl:any = gsap.timeline();

    tl.from(arrref.current,{
      y:-80,
      opacity:0,
      duration:1,
      ease: "back.out(0.5)",
      yoyo:true,
      stagger:{each:0.3}
    })
    .to(arrref.current,{
      duration:1,
      filter:"blur(0px)",
      stagger:{each:0.1}
    });
  });

  return(
    <div>
      {arr.map((e:any,i:number) => (
        <p key={i} ref={(e:any) => arrref.current[i] = e} className={" blur-[2px] inline-block mr-[10px] " + className}>{e}</p>
      ))}
    </div>
  );
}
