import { Link } from "@inertiajs/react"
import React, { useState } from "react"
import sully from '../../../public/avatar/sully.jpg'

export default function NavApp(){
    const [show, setShow] = useState(false)
    function showProfile(){
        setShow(!show)
    }

    return (
        <nav className="bg-pink-500 h-20 flex items-center">
            <div className="wrapper flex justify-between items-center">
                <Link href="/" className="text-2xl font-semibold text-white">MyApp.id</Link>
                <div className="flex gap-5 items-center">
                    <Link href='sentences' className="bg-white text-sky-500 font-semibold px-5 py-2 rounded-lg hover:bg-gray-100 duration-150 shadow">My Sentences</Link>
                    <div className="relative">
                        <img src={sully} onClick={showProfile} className="h-10 w-10 rounded-full shadow cursor-pointer"/>
                        {
                            show &&
                            <div className="absolute top-16 bg-white p-5 right-0 w-60 shadow w-a border rounded-lg ">
                                <h3 className="text-center font-semibold text-gray-600">james P. Sullivan</h3>
                                <ul className="mt-8 divide-y">
                                    <li className="pb-2">
                                        <Link href="/profile" className="text-sm font-light hover:font-normal duration-150">Setting</Link>
                                    </li>
                                    <li className="pt-2">
                                        <Link href="/logout" className="text-sm font-light hover:font-normal duration-150">Sign out</Link>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}