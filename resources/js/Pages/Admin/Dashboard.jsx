import React from "react";
import AdminLayout from "../../Layouts/Admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faFaceAngry, faFaceSmile } from "@fortawesome/free-regular-svg-icons";

export default function Dashboard({user, counts, sentences}){
    return (
        <AdminLayout active="dashboard" title="Dashboard">
            {console.log(user)}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <div className="p-5 bg-white rounded-lg border flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full text-blue-500 flex items-center justify-center">
                        <FontAwesomeIcon icon={faUsers} />
                    </div>
                    <div>
                        <span className="block text-sm font-light mb-2">Total Pengguna</span>
                        <span className="block font-semibold text-lg">{counts.user}</span>
                    </div>
                </div>
                <div className="p-5 bg-white rounded-lg border flex items-center gap-3">
                    <div className="h-10 w-10 bg-amber-100 rounded-full text-amber-500 flex items-center justify-center">
                        <FontAwesomeIcon icon={faCommentDots} />
                    </div>
                    <div>
                        <span className="block text-sm font-light mb-2">Total Kalimat</span>
                        <span className="block font-semibold text-lg">{counts.sentence}</span>
                    </div>
                </div>
                <div className="p-5 bg-white rounded-lg border flex items-center gap-3">
                    <div className="h-10 w-10 bg-teal-100 rounded-full text-teal-500 flex items-center justify-center">
                        <FontAwesomeIcon icon={faFaceSmile} />
                    </div>
                    <div>
                        <span className="block text-sm font-light mb-2">Tidak Radikal</span>
                        <span className="block font-semibold text-lg">{counts.unradical}</span>
                    </div>
                </div>
                <div className="p-5 bg-white rounded-lg border flex items-center gap-3">
                    <div className="h-10 w-10 bg-rose-100 rounded-full text-rose-500 flex items-center justify-center">
                        <FontAwesomeIcon icon={faFaceAngry} />
                    </div>
                    <div>
                        <span className="block text-sm font-light mb-2">Cenderung Radikal</span>
                        <span className="block font-semibold text-lg">{counts.radical}</span>
                    </div>
                </div>
            </div>
            <div className="rounded-lg border bg-white overflow-auto">
                <table className="w-auto md:w-full">
                    <thead className="bg-slate-200 text-slate-500 uppercase">
                        <tr>
                            <th scope="col" className="text-xs text-start font-medium py-3 px-6 w-3/12">Pengguna</th>
                            <th scope="col" className="text-xs text-start font-medium py-3 px-6 w-5/12">Kalimat</th>
                            <th scope="col" className="text-xs text-start font-medium py-3 px-6 w-2/12">Prediksi</th>
                            <th scope="col" className="text-xs text-start font-medium py-3 px-6 w-2/12">Tanggal</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-600">
                        {
                            sentences.map((sentence, key) => {
                                return(
                                    <tr key={key} className="hover:bg-slate-100 duration-100">
                                        <td className="text-sm font-light py-3 px-6">
                                            <div className="flex items-center gap-2 min-w-max">
                                                <img src={sentence.avatar} alt="" className="w-10 h-10 object-cover object-center rounded-full" />
                                                <div>
                                                    <span className="block font-semibold">{sentence.name}</span>
                                                    <span className="text-xs font-light">{sentence.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-sm font-light py-3 px-6 w-64">
                                            <p className="text-xs text-justify w-64 md:w-96">{sentence.text}</p>
                                        </td>
                                        <td className="text-sm font-light py-3 px-6">
                                            {
                                                (sentence.predict == 'radical') ?
                                                <span className="block font-semibold text-xs bg-rose-100 text-rose-500 text-center p-2 rounded-full min-w-max">Cenderung Radikal</span>
                                                :
                                                <span className="block font-semibold text-xs bg-teal-100 text-teal-500 text-center p-2 rounded-full min-w-max">Tidak Radikal</span>
                                            }
                                        </td>
                                        <td className="py-3 px-6">
                                            <span className="block min-w-max text-xs font-light">{sentence.date}</span>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {
                    sentences.length == 0 &&
                    <div className="px-5 pt-5">
                        <span className="block px-5 py-3 text-sm bg-rose-100 mb-7 text-center text-rose-400 rounded-lg shadow">Tidak ada data</span>
                    </div>
                }
            </div>
        </AdminLayout>
    )
}