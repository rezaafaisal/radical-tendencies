import React from "react";
import AdminLayout from "../../Layouts/Admin";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faPen, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function User(){
    return(
        <AdminLayout active="user" title="Pengguna">
            <div className="rounded-lg border p-10 bg-white overflow-hidden">
                <div className="mb-5 pb-5 flex justify-between items-center">
                    <div>
                        <span className="inline-block">Tampilkan</span>
                        <select name="" id="" className="ml-2 p-2 text-sm rounded-lg bg-white border">
                            <option value="">10</option>
                            <option value="">25</option>
                            <option value="">50</option>
                        </select>
                    </div>
                    <div className="w-48">
                        <input type="search" placeholder="Pencarian" className="px-4 py-2 border text-slate-600 w-full rounded-lg font-light" />
                    </div>
                </div>
                <table className="table-fixed w-full">
                    <thead>
                        <tr className="text-slate-500">
                            <th className="text-sm font-medium py-3 px-4 w-1/12 bg-slate-200">No</th>
                            <th className="text-sm font-medium py-3 px-4 w-2/12 bg-slate-200">Foto</th>
                            <th className="text-sm font-medium py-3 px-4 w-3/12 bg-slate-200">Nama Lengkap</th>
                            <th className="text-sm font-medium py-3 px-4 w-3/12 bg-slate-200">Email</th>
                            <th className="text-sm font-medium py-3 px-4 w-3/12 bg-slate-200"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        <tr className="hover:bg-slate-100 duration-100">
                            <td className="text-sm font-light py-3 px-4 text-center">
                                1
                            </td>
                            <td className="text-sm font-light py-3 px-4">
                                <div className="flex justify-center">
                                    <img src="https://api.slingacademy.com/public/sample-photos/1.jpeg" alt="" className="w-10 h-10 object-cover object-center rounded block" />

                                </div>
                            </td>
                            <td className="text-sm font-light py-3 px-4 text-center">
                                <span className="font-light">Tuan. Burung Hantu</span>
                            </td>
                            <td className="text-sm font-light py-3 px-4 text-center">
                                <span className="font-light ">burunghantu@gmail.com</span>
                            </td>
                            <td className="text-sm font-light py-3 px-4">
                                <div className="flex gap-2 justify-center">
                                    <button className="text-xs py-2 px-3 rounded border-amber-400 border hover:bg-amber-400 hover:text-white text-amber-400 duration-150"><FontAwesomeIcon icon={faKey} /></button>
                                    <button className="text-xs py-2 px-3 rounded border-teal-400 border hover:bg-teal-400 hover:text-white text-teal-400 duration-150"><FontAwesomeIcon icon={faPen} /></button>
                                    <button className="text-xs py-2 px-3 rounded border-rose-400 border hover:bg-rose-400 hover:text-white text-rose-400 duration-150"><FontAwesomeIcon icon={faTrash} /></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}