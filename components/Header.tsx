import Link from "next/link";

export default function Header() {
    return(
        <div className=" h-[70px] flex items-center">
            <Link href={"/"} className="text-[#fff] text-[20px] font-bold">PhuwadonBits</Link>
        </div>
    );
}