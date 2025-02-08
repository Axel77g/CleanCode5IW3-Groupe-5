import Link from "next/link";

export default function ListItem(props : {link: string, className ?: string, children : any}){
    return <Link href={props.link} className={"flex gap-3 p-3 items-center hover:bg-slate-50 " + (props?.className || '')}>
        {props.children}
    </Link>
}