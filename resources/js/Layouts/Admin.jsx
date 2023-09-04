import { faAnglesLeft, faBars, faChartPie, faQuoteLeft, faTrash, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";

export default function AdminLayout({children}){

    const [expanded, setExpanded] = useState(true)
    return(
        <div>
            <header className="bg-white shadow fixed w-full top-0 h-20 flex items-center">
                <div className="container mx-auto flex justify-between">
                    <button onClick={()=>setExpanded(true)}>
                        <FontAwesomeIcon icon={faBars} className="text-xl" />
                    </button>
                    <div className="relative group">
                        <div className="py-2">
                            <img src={'/avatar/user.jpg'} className="h-10 w-10 object-cover object-center rounded-full shadow cursor-pointer ring-offset-2 ring-2 ring-cyan-500"/>
                        </div>
                        <div className="absolute top-15 bg-white right-0 w-60 shadow w-a border rounded-lg group-hover:visible invisible group-hover:translate-y-0 translate-y-5 group-hover:opacity-100 opacity-0 group-hover:delay-100 delay-300  block ease-in-out duration-150 text-slate-600">
                            <h3 className="text-center py-5 font-semibold">Admin</h3>
                            <ul className="divide-y">
                                <li className="">
                                    <Link href="/profil" className="text-sm p-4 block hover:bg-slate-100 duration-150">
                                        <FontAwesomeIcon icon={faUser} className="mr-3" /> Profil
                                    </Link>
                                </li>
                                <li className="">
                                    <span onClick={()=>{
                                        confirmAlert('Yakin Keluar?', 'Anda tidak dapat menyimpan hasil prediksi jika anda keluar', '/keluar', 'Keluar')
                                    }} className="text-sm p-4 block text-rose-500 hover:bg-slate-100 duration-150 cursor-pointer">
                                        <FontAwesomeIcon icon={faTrash} className="mr-3" /> Keluar
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            {/* sidebar */}
            <div className="flex justify-between">
                <aside
                    className={` top-0 left-0 h-screen bg-cyan-500 text-white duration-150 w-72 px-5 ${expanded?'translate-x-0':'-translate-x-full'}`}
                >
                    <div className="h-20 flex justify-between px-3 items-center">
                        <Link className="text-2xl font-semibold">Radikal Tes</Link>
                        <button onClick={()=>setExpanded(false)}>
                            <FontAwesomeIcon
                                icon={faAnglesLeft}
                                className={`text-xl text-white/70 hover:text-white duration-150`}
                            />
                        </button>
                    </div>
                    <div className="mt-5 ">
                        <div className="mb-5">
                            <span className="text-xs text-white/70 font-semibold block p-3">BERANDA</span>
                            <ul className="font-light">
                                <li>
                                    <Link className="p-3 hover:bg-cyan-300 hover:text-slate-600 duration-100 rounded-lg block">
                                        <FontAwesomeIcon icon={faChartPie} className="mr-2 w-6" /> Dashboard
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="mb-5">
                            <span className="text-xs text-white/70 font-semibold block p-3">PENGGUNA</span>
                            <ul className="font-light">
                                <li>
                                    <Link className="p-3 hover:bg-cyan-300 hover:text-slate-600 duration-100 rounded-lg block">
                                        <FontAwesomeIcon icon={faQuoteLeft} className="mr-2 w-6" /> Kalimat
                                    </Link>
                                </li>
                                <li>
                                    <Link className="p-3 hover:bg-cyan-300 hover:text-slate-600 duration-100 rounded-lg block">
                                        <FontAwesomeIcon icon={faUsers} className="mr-2 w-6" /> Pengguna
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </aside>
                <main className="mt-20 w-max z-50 container mx-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}