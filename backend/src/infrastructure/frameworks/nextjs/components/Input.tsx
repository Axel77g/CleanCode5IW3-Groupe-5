"use client";
import React from 'react';

const Input = (props : {
    ref ?: any,
    placeholder: string,
    label : string, name : string, type : string, value ?:  string, disabled ?: boolean, onChange ?: (...props : [any])=>void
}) => {
    return (
        <div className="flex flex-col mb-4">
            <label className="mb-2 text-sm font-semibold text-gray-700" htmlFor={props.name}>{props.label}</label>
            <input
                ref={props.ref}
                name={props.name}
                id={props.name}
                type={props.type || 'text'}
                defaultValue={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder || 'Enter text'}
                disabled={props.disabled ?? false}
                className="px-4 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
    );
};

export default Input;
