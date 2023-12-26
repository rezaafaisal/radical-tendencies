import { Link, router, usePage } from "@inertiajs/react"
import React, { useState } from "react"
import { confirmAlert, confirmAlertDanger } from "./Alerts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons"

export default function NavApp({active}){
    const [show, setShow] = useState(false)
    const {auth} = usePage().props
    function showProfile(){
        setShow(!show)
    }
    

    return (
        <nav className="bg-cyan-500 h-20 flex items-center fixed top-0 left-0 right-0 z-20">
            <div className="wrapper flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/" className="text-2xl font-semibold text-white">Radikal Tes</Link>
                    <Link href="/tentang" className={`relative
                        cursor-pointer
                        ml-10
                        font-semibold
                        transition-all
                        duration-500
                        before:content-['']
                        before:absolute
                        before:-bottom-1
                        before:left-1/2
                        before:-translate-x-1/2
                        before:w-0
                        before:h-0.5
                        before:rounded-full
                        before:opacity-0
                        before:transition-all
                        before:duration-150
                        before:bg-white
                        text-white
                        ${active ? 'before:w-full before:opacity-100': 'hover:before:w-full hover:before:opacity-100'}`}>
                        Tentang
                    </Link>
                </div>
                {
                    auth.user ?
                    <div className="flex gap-5 items-center">
                        <Link href='/kalimat' className="bg-white text-cyan-500 font-semibold px-5 py-2 rounded-lg hover:bg-slate-100 duration-150 shadow">Kalimat Saya</Link>
                        <div className="relative group">
                            <div className="py-2">
                                <img src={'/avatar/'+auth.user.avatar} onClick={showProfile} className="h-10 w-10 object-cover object-center rounded-full shadow cursor-pointer ring-2 ring-white"/>
                            </div>
                            <div className="absolute top-15 bg-white right-0 w-60 shadow w-a border rounded-lg group-hover:visible invisible group-hover:translate-y-0 translate-y-5 group-hover:opacity-100 opacity-0 group-hover:delay-100 delay-300  block ease-in-out duration-150 text-slate-600">
                                <h3 className="text-center py-5 font-semibold">{auth.user.name}</h3>
                                <ul className="divide-y">
                                    <li className="">
                                        <Link href="/profil" className="text-sm p-4 block hover:bg-slate-100 duration-150">
                                            <FontAwesomeIcon icon={faUser} className="mr-3" /> Profil
                                        </Link>
                                    </li>
                                    <li className="">
                                        <span onClick={()=>{
                                            confirmAlertDanger({
                                                title: 'Yakin Keluar?',
                                                text: 'Anda tidak dapat mengakses halaman ini lagi jika keluar',
                                                confirmText: 'Keluar',
                                                cancelText: 'Batal',
                                                handler: () => {
                                                    router.get('/keluar')
                                                }
                                            })
                                        }} className="text-sm p-4 block text-rose-500 hover:bg-slate-100 duration-150 cursor-pointer">
                                            <FontAwesomeIcon icon={faTrash} className="mr-3" /> Keluar
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div> 
                    :
                    <div className="flex gap-5 items-center">
                        <Link href='masuk' className="text-white hover:text-slate-200 font-semibold rounded-lg duration-150">Masuk</Link>
                        <Link href='daftar' className="bg-white text-cyan-500 font-semibold px-5 py-2 rounded-lg hover:bg-slate-200 duration-150 shadow">Daftar</Link>
                    </div>

                }
            </div>
        </nav>
    )
}