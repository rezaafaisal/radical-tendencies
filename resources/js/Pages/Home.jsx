import React, { useEffect, useState } from "react"
import UserLayout from "../Layouts/User"
export default function Home(props){
    const [number, setNumber] = useState(0)

    const inrement = () => setNumber(number + 1)
    const decrement = () => setNumber(number - 1)

    return(
        <UserLayout title="Home">
            <div className="text-lg font-bold">{number}</div>
            <button onClick={decrement} className="px-5 py-2 bg-teal-500 rounded text-white">Decrement</button>
            <button onClick={inrement} className="px-5 py-2 bg-teal-500 rounded text-white">Increment</button>
        </UserLayout>
    )
}