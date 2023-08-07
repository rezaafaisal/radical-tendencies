import React, { useEffect, useState } from "react"
import UserLayout from "../Layouts/User"
import axios from "axios"
import { router, usePage, Link } from "@inertiajs/react"

export default function Sentence(props){
    const [sentences, setSentences] = useState(props.sentences)

    function label(predict){
        if(predict.toLowerCase() === 'negatif'){
            return(
                <span className="text-center px-2 py-1 font-medium rounded bg-rose-200 text-rose-700">{predict}</span>
            )
        }

        else if(predict.toLowerCase() === 'positif'){
            return(
                <span className="text-center px-2 py-1 font-medium rounded bg-teal-200 text-teal-700">{predict}</span>
            )
        }

        else if(predict.toLowerCase() === 'netral'){
            return(
                <span className="text-center px-2 py-1 font-medium rounded bg-gray-200 text-gray-700">{predict}</span>
            )
        }
    }

    return(
        <UserLayout>
            <div className="wrapper h-screen">
                <section className="py-5">
                    <Link href="/" className="btn-primary">Kembali</Link>
                </section>
                <section className="py-5">
                    <div className="border border-slate-300 overflow-hidden rounded-lg bg-white py-5">
                        <table className="table-auto divide-y divide-slate-300">
                            <thead>
                                <tr>
                                    <th className="px-3 pb-5 w-1/12">No.</th>
                                    <th className="px-3 pb-5 w-7/12">Kalimat</th>
                                    <th className="px-3 pb-5 w-2/12">Hasil Prediksi</th>
                                    <th className="px-3 w-2/12"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sentences.map((el, i) => {
                                        return (
                                            <tr key={el.id} className="font-light text-sm">
                                                <td>
                                                    <span className="block text-center">{i + 1}</span>
                                                </td>
                                                <td className="px-6 py-3">
                                                    {el.text}
                                                </td>
                                                <td>
                                                    <div className="text-center">
                                                        {label(el.predict)}
                                                    </div>
                                                </td>
                                                <td className="">
                                                    <div className="flex gap-3 justify-center">
                                                        <button className="text-sm py-1 px-3 rounded bg-cyan-500 text-white hover:bg-cyan-600 duration-150">Detail</button>
                                                        <button className="text-sm py-1 px-3 rounded bg-pink-500 text-white hover:bg-pink-600 duration-150">Hapus</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </UserLayout>
    )
}