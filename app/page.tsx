import dynamic from "next/dynamic";
const SplitText = dynamic(() => import('@/components/Splittext'), {
    loading: () => <h1 className="text-white text-[50px]">Loading...</h1>
});

export default function Home() {
    return(
        <div className="h-[100%] flex justify-center items-center">
            <SplitText text="WELCOME" className="text-[#fff] text-[10dvw] font-bold"/>
        </div>
    );
}