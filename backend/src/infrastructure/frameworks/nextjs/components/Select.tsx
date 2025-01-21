"use client";

import React, {useState} from "react";

export default function Select(props : {name: string, label:string, onChange ?: (e : string) => void, options: {title: string, value: string}[]}) {
    //const [value, setValue] = useState<T | null>(null)
    // function handleChange(event:  any){
    //     const value = Number(event.target.value);
    //     if(value === -1 || value >= props.options.length) return setValue(null)
    //     setValue(props.options[Number(event.target.value)] as T)
    // }
    return <div className="flex flex-col mb-4">
        <label className="mb-2 text-sm font-semibold text-gray-700" htmlFor={props.name}>{props.label}</label>
        <select
            className={"px-4 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"}
            name={props.name} id={props.name}>
            <option value={-1}>Selectionner un élément</option>
            {
                props.options.map((o, i) => (
                    <option key={i} value={o.value}>{o.title}</option>
                ))
            }
        </select>
    </div>
}