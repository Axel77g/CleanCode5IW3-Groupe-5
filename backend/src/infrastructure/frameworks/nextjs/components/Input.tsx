"use client";
import React from 'react';

const Input = ({ label, name, placeholder, type, value, disabled=false, onChange = null }) => {
    return (
        <div className="flex flex-col mb-4">
            <label className="mb-2 text-sm font-semibold text-gray-700" htmlFor={name}>{label}</label>
            <input
                name={name}
                id={name}
                type={type || 'text'}
                defaultValue={value}
                onChange={onChange}
                placeholder={placeholder || 'Enter text'}
                disabled={disabled}
                className="px-4 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
    );
};

export default Input;
