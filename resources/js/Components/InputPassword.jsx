import React, { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputPassword = ({label, handler, placeholder, name, errors, errorMessage}) => {
    const [show, setShow] = useState(false)
    return (
        <label className="block mb-5 text-slate-600">
            <span className="block font-light text-sm mb-3">{label}</span>
            <div className="relative flex items-center">
                <input
                    onChange={handler}
                    type={show?'text':'password'}
                    name={name}
                    placeholder={placeholder}
                    className={`px-4 py-2 border w-full rounded-lg font-light ${errors?'border-rose-500':'border-slate-200'}`}
                    defaultValue=""
                />
                <button
                    type="button"
                    onClick={()=>setShow(!show)}
                    className="absolute right-3"
                >
                    <div className="flex justify-center items-center w-7 h-7">
                        <FontAwesomeIcon icon={show?faEyeSlash:faEye} className="text-sm text-slate-300" />
                    </div>
                </button>
            </div>
            {errors && <div className="text-xs mt-1 font-light text-rose-500">{errorMessage ?? errors}</div>}
        </label>
    )
}

export default InputPassword