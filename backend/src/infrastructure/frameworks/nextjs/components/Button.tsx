import React from 'react';

export function Button(props: { children: React.ReactNode;  onClick?: (...args : [any]) => void,disabled?:boolean }) {
    return (
        <button
            disabled={props.disabled}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input border-blue-200 bg-background hover:bg-blue-500 hover:text-white shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 disabled:opacity-50 "
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}