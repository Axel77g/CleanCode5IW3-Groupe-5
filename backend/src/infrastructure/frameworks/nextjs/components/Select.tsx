"use client";

import React from "react";

export default function Select(props : {name: string, value ?: string, label:string, onChange ?: (e : string) => void, options: {title: string, value: string}[]}) {
    return <div className="flex flex-col mb-4">
        <label className="mb-2 text-sm font-semibold text-gray-700" htmlFor={props.name}>{props.label}</label>
        <select
            className={"px-4 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"}
            name={props.name} id={props.name} defaultValue={props.value}>
            <option value={-1}>Sélectionner un élément</option>
            {
                props.options.map((o, i) => (
                    <option key={i} value={o.value}>{o.title}</option>
                ))
            }
        </select>
    </div>
}