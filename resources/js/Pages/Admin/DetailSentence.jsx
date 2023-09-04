import React from 'react'
import AdminLayout from '../../Layouts/Admin'
import { Link } from '@inertiajs/react'

export default function DetailSentence(){
  return (
    <AdminLayout active="sentence" title="Kalimat">
        <div className="rounded-lg border p-10 bg-white overflow-hidden">
            <div className="mb-5 pb-5 flex justify-between items-center border-b">
                <div className='flex gap-2 items-center'>
                    <img src="https://api.slingacademy.com/public/sample-photos/1.jpeg" alt="" className="w-20 h-20 object-cover object-center rounded block" />
                    <div>
                        <span className='font-semibold block'>Yahiko</span>
                        <span className='text-sm font-light'>burunghantu@gmail.com</span>
                    </div>
                </div>
                <Link preserveScroll href='/admin/kalimat' className='btn-primary'>Kembali</Link>
            </div>
            <table className="table-fixed w-full border">
                <thead>
                    <tr className='text-slate-500'>
                        <th className="text-sm font-medium py-3 px-4 bg-slate-200 w-3/6">Kalimat</th>
                        <th className="text-sm font-medium py-3 px-4 bg-slate-200 w-1/6">Prediksi</th>
                        <th className="text-sm font-medium py-3 px-4 bg-slate-200 w-1/6">Cenderung Radikal</th>
                        <th className="text-sm font-medium py-3 px-4 bg-slate-200  w-1/6">Tidak Radikal</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    <tr className="hover:bg-slate-100 duration-100">
                        <td className="text-sm font-light py-3 px-4">
                            <p className='text-xs text-justify'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt modi laborum doloremque alias minus molestiae molestias dolorem dolor corrupti. Exercitationem illo neque provident ullam quo hic laborum quidem iusto doloremque!</p>
                        </td>
                        <td className="text-sm font-light py-3 px-4 text-center">
                            <span className="block text-xs font-semibold bg-teal-100 text-teal-500 text-center p-2 rounded-lg">Tidak Radikal</span>
                        </td>
                        <td className="text-sm font-light py-3 px-4 text-center">
                            <span className='font-semibold text-xs inline-block bg-slate-500 py-2 px-3 text-white rounded-lg'>34%</span>
                        </td>
                        <td className="text-sm font-light py-3 px-4 text-center">
                            <span className='font-semibold text-xs inline-block bg-slate-500 py-2 px-3 text-white rounded-lg'>66%</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </AdminLayout>
  )
}