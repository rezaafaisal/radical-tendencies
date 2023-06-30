import React, { useEffect, useState } from "react"

export default function Home(props){
    const [number, setNumber] = useState(0)

    const inrement = () => setNumber(number + 1)
    const decrement = () => setNumber(number - 1)

    return(
        <div>
            <div className="text-lg font-bold">{props.name} : {number}</div>
            <button onClick={inrement} className="px-5 py-2 bg-teal-500 rounded text-white">Increment</button>
            <button onClick={decrement} className="px-5 py-2 bg-teal-500 rounded text-white">Decrement</button>
        </div>
    )
}