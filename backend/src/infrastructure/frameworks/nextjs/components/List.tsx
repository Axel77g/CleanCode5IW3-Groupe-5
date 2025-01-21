import ListItem from "../components/ListItem";

export default function List(props : {children : any}){
    console.log(props.children)
    return (
        <div className="divide-y divide-dashed">
            {props.children.length ? props.children :

                <ListItem link={""}>
                    No elements found
                </ListItem>
            }
        </div>
    )
}