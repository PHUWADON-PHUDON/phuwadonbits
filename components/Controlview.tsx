
interface Controlviewtype {
    clickPreview:() => void;
    clickCode:() => void;
}

export default function Controlview({clickPreview,clickCode}:Controlviewtype) {
    return(
        <div className="mt-[25px]">
            <div onClick={() => clickPreview()} className="text-[#fff] border border-[#9c9c9c] p-[8px_1rem] inline-block rounded-[8px] hover:bg-[#333333] cursor-pointer mr-[10px]">
                <i className="fa-solid fa-eye text-[#fff] mr-[10px]"></i>
                Preview
            </div>
            <div onClick={() => clickCode()} className="text-[#fff] border border-[#9c9c9c] p-[8px_1rem] inline-block rounded-[8px] hover:bg-[#333333] cursor-pointer mr-[10px]">
                <i className="fa-solid fa-code text-[#fff] mr-[10px]"></i>
                Code
            </div>
        </div>
    );
}