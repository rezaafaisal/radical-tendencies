import React from "react";

export default function Textarea({placeholder, value}){
    return(
        <textarea className="bg-white border w-full rounded-lg p-3 h-52" placeholder={placeholder}>{value}</textarea>
    )
}