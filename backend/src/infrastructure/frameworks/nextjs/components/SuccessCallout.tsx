import {Callout} from "@/components/Callout";

export function SuccessCallout(props: { children: any; }) {
    return <Callout color={"green"} icon={"✓"}>
        <div className="font-bold text-sm">
            Success
        </div>
        {props.children}
    </Callout>
}