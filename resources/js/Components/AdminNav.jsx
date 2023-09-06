import { faBars, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, router, usePage } from "@inertiajs/react";
import React from "react";
import { confirmAlertDanger } from "./Alerts";

export default function Nav({expanded}){
    const {auth} = usePage().props

    return(
        <nav className="bg-white z-20 shadow fixed w-full top-0 h-20 flex items-center">
            <div className="w-full flex justify-between px-8">
                <div className="flex items-center ">
                    {
                        expanded &&
                        <button onClick={expanded} className="lg:hidden text-slate-600 h-10 w-10 flex justify-center items-center rounded-lg mr-3 duration-150 hover:bg-slate-200">
                            <FontAwesomeIcon icon={faBars} className="text-xl" />
                        </button>
                    }
                    <Link href="/admin" className="text-2xl block font-semibold text-cyan-500">Radikal Tes</Link>
                </div>
                <div className="relative group">
                    <div className="py-2">
                        <img src={'/avatar/'+auth.user.avatar} className="h-10 w-10 object-cover object-center rounded-full shadow cursor-pointer ring-offset-2 ring-2 ring-cyan-500"/>
                    </div>
                    <div className="absolute top-15 bg-white right-0 w-60 shadow w-a border rounded-lg group-hover:visible invisible group-hover:translate-y-0 translate-y-5 group-hover:opacity-100 opacity-0 group-hover:delay-100 delay-300  block ease-in-out duration-150 text-slate-600">
                        <h3 className="text-center py-5 font-semibold">{auth.user.name}</h3>
                        <ul className="divide-y">
                            <li className="">
                                <Link href="/admin/profil" className="text-sm p-4 block hover:bg-slate-100 duration-150">
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
        </nav>
    )
}