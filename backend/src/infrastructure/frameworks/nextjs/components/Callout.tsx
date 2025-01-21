export function Callout(props: { children: any; color: string, icon?: string }) {

    return <div className={`p-4 border-${props.color}-500 border-[1px] text-${props.color}-500 rounded-md flex gap-4`}>
        <div className={`p-1 w-12 h-12  rounded-lg text-4xl text-center bg-${props.color}-100 text-${props.color}-600`}>{props.icon}</div>
        <div>
            {props.children}
        </div>
    </div>
}