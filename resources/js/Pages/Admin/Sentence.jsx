import React from 'react'
import AdminLayout from '../../Layouts/Admin'
import { Link } from '@inertiajs/react'

export default function Sentence(){
  return (
    <AdminLayout active="sentence" title="Kalimat">
        <div className="rounded-lg border p-10 bg-white overflow-hidden">
            <div className="mb-5 pb-5 flex justify-between items-center">
                <div>
                    <span className="inline-block">Tampilkan</span>
                    <select name="" id="" className="ml-2 py-2 px-4 appearance-none text-sm rounded-lg bg-white border">
                        <option value="">10</option>
                        <option value="">25</option>
                        <option value="">50</option>
                    </select>
                </div>
                <div className="w-28 md:w-48">
                    <input type="search" placeholder="Pencarian" className="px-4 py-2 border text-slate-600 w-full rounded-lg font-light" />
                </div>
            </div>
            <div className="rounded-lg border pb-3 overflow-scroll">
                <table className="w-full">
                    <thead className='text-slate-500 bg-slate-200'>
                        <tr>
                            <th className="text-sm font-medium py-3 px-4 w-1/12">No</th>
                            <th className="text-sm font-medium py-3 px-4 w-6/12">Pengguna</th>
                            <th className="text-sm font-medium py-3 px-4 w-3/12">Jumlah Kalimat</th>
                            <th className="text-sm font-medium py-3 px-4 w-3/12 min-w-max"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        <tr className="hover:bg-slate-100 duration-100">
                            <td className="text-sm font-light py-3 px-4 text-center">
                                1
                            </td>
                            <td className="text-sm font-light py-3 px-4 flex justify-center">
                                <div className='text-start min-w-max'>
                                    <span className="block font-semibold">Burung Hantu</span>
                                    <span className="text-xs font-light">burung****@gmail.com</span>
                                </div>
                            </td>
                            <td className="text-sm font-light py-3 px-4 text-center">
                                <span className='font-semibold text-xs inline-block bg-slate-500 py-2 px-3 text-white rounded-lg'>10</span>
                            </td>
                            <td className="text-sm font-light py-3 px-4 text-center">
                                <Link preserveScroll href="/admin/kalimat/1" className="btn-primary-outline inline-block text-sm min-w-max md:w-auto">Detail Kalimat</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </AdminLayout>
  )
}