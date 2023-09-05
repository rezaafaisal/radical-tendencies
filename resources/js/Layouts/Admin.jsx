import { faAnglesLeft, faArrowRightFromBracket, faBars, faChartPie, faQuoteLeft, faTrash, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { confirmAlert } from "../Components/Alerts";

export default function AdminLayout({children, active, title}){

    const [expanded, setExpanded] = useState(false)
    return(
        <div>
            <nav className="bg-white z-20 shadow fixed w-full top-0 h-20 flex items-center">
                <div className="w-full flex justify-between px-8">
                    <div className="flex items-center ">
                        <button onClick={()=>setExpanded(!expanded)} className="lg:hidden text-slate-600 h-10 w-10 flex justify-center items-center rounded-lg mr-3 duration-150 hover:bg-slate-200">
                            <FontAwesomeIcon icon={faBars} className="text-xl" />
                        </button>
                        <span className="text-2xl block font-semibold text-cyan-500">Radikal Tes</span>
                    </div>
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
                                        confirmAlert('Yakin Keluar?', 'Anda tidak dapat mengakses halaman ini lagi jika keluar', '/keluar', 'Keluar')
                                    }} className="text-sm p-4 block text-rose-500 hover:bg-slate-100 duration-150 cursor-pointer">
                                        <FontAwesomeIcon icon={faTrash} className="mr-3" /> Keluar
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <aside className={`fixed z-10 top-0 mt-20 left-0 h-screen bg-white border duration-150 w-72 px-5 lg:translate-x-0 ${expanded ? 'sm:translate-x-0' : '-translate-x-full'}`}>
                <div className="mt-10">
                    <ul className="font-light flex  text-slate-600 flex-col gap-3">
                        <li>
                            <Link
                                href="/admin"
                                className={`p-3 duration-100 rounded-lg block ${active == 'dashboard' ? 'bg-cyan-500 text-white' : 'hover:bg-slate-200'}`}>
                                <FontAwesomeIcon icon={faChartPie} className="mr-2 w-6" /> Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/kalimat" className={`p-3 duration-100 rounded-lg block ${active == 'sentence' ? 'bg-cyan-500 text-white' : 'hover:bg-slate-200'}`}>
                                <FontAwesomeIcon icon={faQuoteLeft} className="mr-2 w-6" /> Kalimat
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/pengguna" className={`p-3 duration-100 rounded-lg block ${active == 'user' ? 'bg-cyan-500 text-white' : 'hover:bg-slate-200'}`}>
                                <FontAwesomeIcon icon={faUsers} className="mr-2 w-6" /> Pengguna
                            </Link>
                        </li>
                        <li>
                            <button onClick={()=>confirmAlert('Yakin Keluar?', 'Anda tidak dapat mengakses halaman ini lagi jika keluar', '/keluar', 'Keluar')} className="p-3 duration-100 rounded-lg block w-full text-start hover:bg-slate-200">
                                <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2 w-6" /> Keluar
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
            <main className={`mt-20 z-50 lg:ml-72 p-8 text-slate-600`}>
                <h1 className="font-semibold text-xl mb-10">{title}</h1>
                {children}
            </main>
        </div>
    )
}