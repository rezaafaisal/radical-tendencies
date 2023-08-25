import { Link, usePage } from "@inertiajs/react"
import React, { useState } from "react"
import sully from '../../../public/avatar/sully.jpg'
import { confirmAlert } from "./Alerts"

export default function NavApp(){
    const [show, setShow] = useState(false)
    const {auth} = usePage().props
    function showProfile(){
        setShow(!show)
    }

    return (
        <nav className="bg-cyan-600 h-20 flex items-center">
            <div className="wrapper flex justify-between items-center">
                <Link href="/" className="text-2xl font-semibold text-white">Radikal Tes</Link>
                {
                    auth.user ?
                    <div className="flex gap-5 items-center">
                        <Link href='kalimat' className="bg-white text-cyan-500 font-semibold px-5 py-2 rounded-lg hover:bg-gray-100 duration-150 shadow">Kalimat Saya</Link>
                        <div className="relative group">
                            <div className="py-2">
                                <img src={sully} onClick={showProfile} className="h-10 w-10 rounded-full shadow cursor-pointer ring-2 ring-white"/>
                            </div>
                            <div className="absolute top-15 bg-white p-5 right-0 w-60 shadow w-a border rounded-lg group-hover:visible invisible group-hover:translate-y-0 translate-y-5 group-hover:opacity-100 opacity-0 group-hover:delay-100 delay-300  block ease-in-out duration-150">
                                <h3 className="text-center font-semibold text-gray-600">{auth.user.name}</h3>
                                <ul className="mt-8 divide-y">
                                    <li className="pb-2">
                                        <Link href="/profil" className="text-sm font-light hover:font-normal duration-150">Profil</Link>
                                    </li>
                                    <li className="pt-2">
                                        <span onClick={()=>{
                                            confirmAlert('Yakin Keluar?', 'Anda tidak dapat menyimpan hasil prediksi jika anda keluar', 'keluar', 'Keluar')
                                        }} className="text-sm font-light hover:font-normal duration-150 cursor-pointer">Keluar</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div> 
                    :
                    <div className="flex gap-5 items-center">
                        <Link href='masuk' className="text-white hover:text-gray-200 font-semibold rounded-lg duration-150">Masuk</Link>
                        <Link href='daftar' className="bg-white text-cyan-500 font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 duration-150 shadow">Daftar</Link>
                    </div>

                }
            </div>
        </nav>
    )
}