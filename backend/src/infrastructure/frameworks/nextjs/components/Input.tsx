"use client";
import React, { useRef, useState } from 'react';

const Input = (props: {
    ref?: any;
    placeholder: string;
    prefix?: any;
    message?: string;
    label: string;
    name: string;
    type: 'text' | 'date' | 'textarea'; // Ajout de 'textarea' dans les types
    value?: string;
    disabled?: boolean;
    onChange?: (...props: [any]) => void;
}) => {
    const [focused, setFocused] = useState<boolean>(false);
    const inputContainerRef = useRef<HTMLDivElement>(null);
    const input = inputContainerRef?.current?.querySelector('input') || null;

    const inputContainerClass = [
        "flex gap-2 items-center px-2 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm max-w-[300px]",
        focused ? "border-2 border-blue-500" : "",
        props.disabled ? "bg-gray-200 cursor-not-allowed" : ""
    ].join(" ");

    function handleFocus() {
        if (props.disabled) return;
        setFocused(true);
        if (!input) return;
        input.focus();
    }

    function handleBlur() {
        setFocused(false);
    }

    return (
        <div className="flex flex-col mb-4" ref={inputContainerRef} onClick={handleFocus}>
            <label className="mb-2 text-sm font-semibold text-gray-700" htmlFor={props.name}>
                {props.label}
            </label>
            <div className={inputContainerClass}>
                {props.prefix}
                {props.type === 'textarea' ? (
                    <textarea
                        onBlur={handleBlur}
                        className="w-full outline-none bg-transparent"
                        name={props.name}
                        id={props.name}
                        defaultValue={props.value}
                        onChange={props.onChange}
                        placeholder={props.placeholder || 'Enter text'}
                        disabled={props.disabled ?? false}
                    />
                ) : (
                    <input
                        onBlur={handleBlur}
                        className="w-full outline-none bg-transparent"
                        ref={props.ref}
                        name={props.name}
                        id={props.name}
                        type={props.type || 'text'}
                        defaultValue={props.value}
                        onChange={props.onChange}
                        placeholder={props.placeholder || 'Enter text'}
                        disabled={props.disabled ?? false}
                    />
                )}
            </div>
            {props.message && <small className="text-sm mt-2">{props.message}</small>}
        </div>
    );
};

export default Input;