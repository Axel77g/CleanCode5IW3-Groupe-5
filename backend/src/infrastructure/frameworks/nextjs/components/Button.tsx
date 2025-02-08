import React from 'react';
import { Pencil } from 'lucide-react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: (...args: [any]) => void;
    disabled?: boolean;
    variant?: 'default' | 'danger' | 'submit' | 'add';
}

export function Button({ children, onClick, disabled, variant = 'default' }: ButtonProps) {
    const baseClasses =
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-9 px-4 py-2 shadow-sm';

    const variantClasses = {
        default: 'border-blue-200 bg-background text-blue-700 hover:bg-blue-500 hover:text-white',
        danger: 'border-red-200 bg-red-100 text-red-700 hover:bg-red-500 hover:text-white',
        submit: 'border-green-200 bg-green-100 text-green-700 hover:bg-green-500 hover:text-white',
        add: 'border-purple-200 bg-purple-100 text-purple-700 hover:bg-purple-500 hover:text-white',
    }[variant];

    return (
        <button
            disabled={disabled}
            className={`${baseClasses} ${variantClasses}`}
            onClick={onClick}
        >
            {variant === 'add' && <Pencil />}
            {children}
        </button>
    );
}
