"use client";

import {useState} from "react";

export default function Select<T>(props : {name: string, onChange ?: (e : T) => void, options: {title: string, value: T}[]}){
    //const [value, setValue] = useState<T | null>(null)
    // function handleChange(event:  any){
    //     const value = Number(event.target.value);
    //     if(value === -1 || value >= props.options.length) return setValue(null)
    //     setValue(props.options[Number(event.target.value)] as T)
    // }
    return <select name={props.name} id={props.name} >
        <option value={-1}>Selectionner un élément</option>
        {
            props.options.map((o,i) => (
                <option value={o.value}>{o.title}</option>
            ))
        }
    </select>
}