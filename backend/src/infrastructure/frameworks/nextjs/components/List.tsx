export default function List(props : {children : any}){
    return (
        <div className="divide-y divide-dashed">
            {props.children}
        </div>
    )
}