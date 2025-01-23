"use client";

export function Dialog(props: {isOpen: boolean, onClose : (...args : [any]) => any, children: any}){
    if(!props.isOpen) return <div></div>
    return <div className={"fixed inset-0 flex items-center justify-center z-50"}>
        <div className={"dialog-overlay w-full h-full"} onClick={(e)=>{
            e.stopPropagation()
            props.onClose(e)
        }}/>
        <div className={"dialog-container bg-white rounded relative z-10 p-4 max-w-[600px] min-h-[200px] max-h-[70vh] overflow-y-auto"}>
            {props.children}
        </div>
    </div>
}