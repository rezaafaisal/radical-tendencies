import React from "react";

const Input = ({label, name, type, placeholder, value, errors, errorMessage, handler }) => (
    <label className="block mb-5">
        <span className="block mb-2 text-sm text-slate-600">{label}</span>
        <input
            onChange={handler}
            type={type} name={name}
            defaultValue={value}
            placeholder={placeholder}
            className={`px-4 py-2 border text-slate-600 w-full rounded-lg font-light ${errors?'border-rose-500':'border-slate-200'}`}
        />
        {errors && <div className="text-xs mt-1 font-light text-rose-500">{errorMessage ?? errors}</div>}
    </label>
)

export default Input