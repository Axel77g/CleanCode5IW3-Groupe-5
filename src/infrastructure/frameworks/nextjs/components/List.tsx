import ListItem from "../components/ListItem";

export default function List(props : {children : any}){
    return (
        <div className="divide-y divide-dashed">
            {props.children.length ? props.children :

                <ListItem link={""}>
                    Aucun élément
                </ListItem>
            }
        </div>
    )
}