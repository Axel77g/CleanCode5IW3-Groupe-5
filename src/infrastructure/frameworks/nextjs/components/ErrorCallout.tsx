import {Callout} from "@/components/Callout";

export function ErrorCallout(props : {children: any}){
    return (<Callout color={"red"} icon={"!"}>
        <div className="font-bold text-sm">
            An error occurred
        </div>
        {props.children}
        </Callout>)
}