"use client";
import { useState,useEffect } from "react";
import { usePathname } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import axios from "axios";
import Controlview from "@/components/Controlview";
import CircularText from "@/components/Circulartext";

export default function Circulartext() {
    const [code,setcode] = useState<string>("");
    const [select,setselect] = useState<boolean>(true);
    const [resetanimation,setresetanimation] = useState<boolean>(true);
    const converttitle:any = usePathname().split("/")[1].split("-");

    //!load data

    useEffect(() => {
        const abortcontroller:any = new AbortController();

        
        const loadtext = async () => {
            try{
                const response = await axios.get("/api/circulartext",{signal:abortcontroller.signal});
                if (response.status === 200) {
                    setcode(response.data.content);
                }
            }
            catch(err) {
                console.log(err);
            }
        }

        loadtext();

        return () => abortcontroller.abort();
    },[]);

    //!

    //!reset animation

    const resetAnimation = () => {
        setresetanimation(!resetanimation);
    }

    //!

    //!click preview and click code

    const clickPreview = () => {
        setselect(prev => true);
    }

    const clickCode = () => {
        setselect(prev => false);
    }

    //!

    return(
        <div>
            <h1 className="text-[#fff] text-[4rem] font-bold">{converttitle.map((e:any,i:number) => (<p key={i} className="capitalize inline-block mr-[18px]">{e}</p>))}</h1>
            <Controlview clickPreview={clickPreview} clickCode={clickCode}/>
            {select ? 
                //preview
                <div className="border border-[#9c9c9c] mt-[20px] h-[400px] flex justify-center items-center rounded-[8px] relative">
                    <i onClick={() => resetAnimation()} className="fa-solid fa-arrows-rotate text-[#fff] absolute top-[15px] right-[15px] cursor-pointer"></i>
                    <CircularText key={resetanimation ? "active" : "inactive"} text="PHU*WA*DON*BITS*" clasName="text-white font-bold" radius={80}/>
                </div>
                :
                //code
                <div className="overflow-hidden mt-[10px]">
                    <SyntaxHighlighter language="typescript" style={coldarkDark} className="code w-[80dvw]">
                        {code}
                    </SyntaxHighlighter>
                </div>
            }
        </div>
    );
}