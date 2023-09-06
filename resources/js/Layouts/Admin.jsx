import { faAnglesLeft, faArrowRightFromBracket, faBars, faChartPie, faQuoteLeft, faTrash, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { confirmAlert, confirmAlertDanger } from "../Components/Alerts";
import Nav from "../Components/AdminNav";

export default function AdminLayout({children, active, title}){
    const {auth} = usePage().props
    const [expanded, setExpanded] = useState(false)
    return(
        <div>
            <Nav expanded={()=>setExpanded(!expanded)}  />
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
                            <button onClick={()=>{
                                confirmAlertDanger({
                                    title: 'Yakin Keluar?',
                                    text: 'Anda tidak dapat mengakses halaman ini lagi jika keluar',
                                    confirmText: 'Keluar',
                                    cancelText: 'Batal',
                                    handler: () => {
                                        router.get('/keluar')
                                    }
                                })
                            }} className="p-3 duration-100 rounded-lg block w-full text-start hover:bg-slate-200">
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