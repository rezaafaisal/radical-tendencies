import React, { useState } from 'react'
import AdminLayout from '../../Layouts/Admin'
import { Link } from '@inertiajs/react'
import Pagination from '../../Components/Pagination'

export default function DetailSentence({user, sentences}){
  return (
    <AdminLayout active="sentence" title="Kalimat">
        <div className="rounded-lg border p-10 bg-white overflow-hidden">
            <div className="mb-5 pb-5 flex justify-between items-start border-b">
                <div className='flex gap-2 items-center'>
                    <img src={'/avatar/'+user.avatar} alt="" className="w-20 h-20 object-cover object-center rounded block" />
                    <div>
                        <span className='font-semibold block'>{user.name}</span>
                        <span className='text-sm font-light'>{user.email}</span>
                    </div>
                </div>
                <Link href='/admin/kalimat' className='btn-primary'>Kembali</Link>
            </div>
            <div className='rounded-lg border pb-3 overflow-scroll'>
                <table className="w-full">
                    <thead>
                        <tr className='text-slate-500'>
                            <th className="text-sm font-medium py-3 px-4 bg-slate-200 w-3/6">Kalimat</th>
                            <th className="text-sm font-medium py-3 px-4 bg-slate-200 w-1/6">Prediksi</th>
                            <th className="text-sm font-medium py-3 px-4 bg-slate-200 w-1/6">Cenderung Radikal</th>
                            <th className="text-sm font-medium py-3 px-4 bg-slate-200  w-1/6">Tidak Radikal</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {
                            sentences.data.map((sentence, index) => {
                                return(
                                    <tr key={index} className="hover:bg-slate-100 duration-100">
                                        <td className="text-sm font-light py-3 px-4">
                                            <p className='text-xs text-justify w-64 md:w-96'>
                                                {sentence.text}
                                            </p>
                                        </td>
                                        <td className="text-sm font-light py-3 px-4 text-center">
                                            {
                                                (sentence.predict == 'radical') ?
                                                <span className="block min-w-max text-xxs md:text-xs font-semibold bg-rose-100 text-rose-500 text-center p-2 rounded-lg">Cenderung Radikal</span>
                                                :
                                                <span className="block text-xxs md:text-xs font-semibold bg-teal-100 text-teal-500 text-center p-2 rounded-lg">Tidak Radikal</span>
                                            }
                                        </td>
                                        <td className="text-sm font-light py-3 px-4 text-center">
                                            <span className='font-semibold text-xs inline-block bg-slate-400 py-2 px-3 text-white rounded-lg'>{sentence.radical+'%'}</span>
                                        </td>
                                        <td className="text-sm font-light py-3 px-4 text-center">
                                            <span className='font-semibold text-xs inline-block bg-slate-400 py-2 px-3 text-white rounded-lg'>{sentence.unradical+'%'}</span>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {
                    (sentences.data.length == 0) &&
                    <div className="px-5 pt-5">
                        <span className="block px-5 py-3 text-sm bg-rose-100 mb-7 text-center text-rose-400 rounded-lg shadow">Tidak ada data</span>
                    </div>
                }
            </div>
            {
                sentences.data.length > 0 &&
                <Pagination data={sentences} />
            }
        </div>
    </AdminLayout>
  )
}