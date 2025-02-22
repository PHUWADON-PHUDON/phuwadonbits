import Link from "next/link";

export default function Nav() {
    const links:any = [
        {href:"/split-text",name:"Split Text"},
        {href:"/blur-text",name:"Blur Text"},
        {href:"/circular-text",name:"Circular Text"},
        {href:"",name:"Shiny Text"},
        {href:"",name:"Text Pressure"}
    ]

    return(
        <div className="w-[240px] pt-[50px]">
            <h2 className="text-[#fff] mb-[10px] text-[15px] font-bold">Text Animations</h2>
           {links.map((e:any,i:number) => (
                <Link key={i} href={e.href} className="text-[1rem] text-[#a1a1aa] block mb-[10px] hover:text-[#fff] duration-300">{e.name}</Link>
            ))}
        </div>
    );
}