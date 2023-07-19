import { Link, usePage } from "@inertiajs/react"
import React, { useState } from "react"
import sully from '../../../public/avatar/sully.jpg'

export default function NavApp(){
    const [show, setShow] = useState(false)
    const {auth} = usePage().props
    function showProfile(){
        setShow(!show)
    }

    return (
        <nav className="bg-cyan-600 h-20 flex items-center">
            <div className="wrapper flex justify-between items-center">
                <Link href="/" className="text-2xl font-semibold text-white">MyApp.id</Link>
                {
                    auth.user &&
                    <div className="flex gap-5 items-center">
                        <Link href='sentences' className="bg-white text-cyan-500 font-semibold px-5 py-2 rounded-lg hover:bg-gray-100 duration-150 shadow">Kalimat Saya</Link>
                        <div className="relative">
                            <img src={sully} onClick={showProfile} className="h-10 w-10 rounded-full shadow cursor-pointer"/>
                            {
                                show &&
                                <div className="absolute top-16 bg-white p-5 right-0 w-60 shadow w-a border rounded-lg ">
                                    <h3 className="text-center font-semibold text-gray-600">{auth.user.name}</h3>
                                    <ul className="mt-8 divide-y">
                                        <li className="pb-2">
                                            <Link href="/profile" className="text-sm font-light hover:font-normal duration-150">Pengaturan</Link>
                                        </li>
                                        <li className="pt-2">
                                            <Link href="/keluar" className="text-sm font-light hover:font-normal duration-150">Keluar</Link>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        </nav>
    )
}