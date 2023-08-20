import React, { useEffect, useState } from "react"
import UserLayout from "../Layouts/User"
import { router, Link, usePage } from "@inertiajs/react"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload, faTrash, faInfo, faInfoCircle, faMagnifyingGlass, faDownload } from "@fortawesome/free-solid-svg-icons"
import FileUploadModal from "../Components/FileUploadModal"

export default function Sentence(props){
    const {flash} = usePage().props
    const [sentences, setSentences] = useState(props.sentences)
    const [isPredicted, setIsPredicted] = useState(false)
    const [modalUpload, setModalUpload] = useState(false)
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

    function deleteSentence(id){
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: 'Yakin hapus?',
            text: 'Kalimat akan dihapus permanen',
            confirmButtonText: 'Hapus',
            showCancelButton: true,
            cancelButtonText: 'Batal',
            confirmButtonColor: '#EC4899'
        }).then((e)=>{
            if(e.isConfirmed){
                router.delete(`kalimat/${id}`)
                const newData = sentences.filter(el => el.id != id)
                setSentences(newData)
            }
        })
    }

    function detailSentence(el){
        const MySwal = withReactContent(Swal)
        const elemen = (
            <div className="">
                <p>{el.text}</p>
                <table className="table-auto text-start mt-5 text-sm">
                    <tr>
                        <th className="text-start mr-5 block">Positif</th>
                        <td>: {el.positive}</td>
                    </tr>
                    <tr>
                        <th className="text-start mr-5 block">Netral</th>
                        <td>: {el.neutral}</td>
                    </tr>
                    <tr>
                        <th className="text-start block mr-5">Negatif</th>
                        <td>: {el.negative}</td>
                    </tr>
                </table>
            </div>
        )
        MySwal.fire({
            title: 'Detail Kalimat',
            html: elemen
        })
    }

    return(
        <UserLayout>
            {
                modalUpload && <FileUploadModal close={()=>setModalUpload(false)} />
            }
            <div className="wrapper h-screen">
                <section className="py-5">
                    <Link href="/" className="btn-primary">Kembali</Link>
                </section>
                <section className="py-5 mt-10">
                    {
                        flash.message && 
                        <span className="block px-5 py-3  bg-teal-100 mb-7 text-center text-teal-700 rounded-lg shadow" role="alert">
                            {flash.message}
                        </span>
                    }

                    <header className="mb-5 flex justify-between text-sm">
                        <div className="flex w-max border-2 rounded-lg text-sm border-cyan-500 overflow-hidden">
                            <button onClick={()=>setIsPredicted(true)} className={`px-5 py-2 duration-300 ${isPredicted ? 'bg-cyan-500 text-white' : 'bg-white'}`}>Sudah Diprediksi</button>
                            <button onClick={()=>setIsPredicted(false)} className={`px-5 py-2 duration-300 ${!isPredicted ? 'bg-cyan-500 text-white' : 'bg-white'}`}>Belum Diprediksi</button>
                        </div>
                        {
                            isPredicted ?
                                <button className="btn-primary text-sm"><FontAwesomeIcon icon={faDownload} className="mr-2" /> Export Kalimat</button>
                            :
                                <button onClick={()=>setModalUpload(true)} className="btn-primary text-sm"><FontAwesomeIcon icon={faUpload} className="mr-2" /> Import Kalimat</button>
                        }
                    </header>
                    {
                        isPredicted ? 
                        <div className="border border-slate-300 overflow-hidden rounded-lg bg-white py-5">
                            <table className="table-auto divide-y divide-slate-300 ">
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
                                                    <td className="px-6">
                                                        <div className="flex gap-3 justify-center">
                                                            <button onClick={()=>{detailSentence(el)}} className="text-sm py-2 px-3 rounded bg-cyan-500 text-white hover:bg-cyan-600 duration-150"><FontAwesomeIcon icon={faInfoCircle} /></button>
                                                            <button onClick={() => { deleteSentence(el.id) }} className="text-sm py-2 px-3 rounded bg-pink-500 text-white hover:bg-pink-600 duration-150"><FontAwesomeIcon icon={faTrash} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        :
                        <div className="border border-slate-300 overflow-hidden rounded-lg bg-white py-5">
                            <table className="table-fixed divide-y w-full divide-slate-300 ">
                                <thead className="text-gray-600">
                                    <tr>
                                        <th className="px-3 pb-5 w-1/12">No.</th>
                                        <th className="px-3 pb-5 w-8/12">Kalimat</th>
                                        <th className="px-3 pb-5 w-3/12"></th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {
                                        sentences.map((el, i) => {
                                            return (
                                                <tr key={el.id} className="font-light text-sm">
                                                    <td>
                                                        <span className="block text-center">{i + 1}</span>
                                                    </td>
                                                    <td className="px-6 py-2">
                                                        {el.text}
                                                    </td>
                                                    <td className="px-6 py-2">
                                                        <div className="flex gap-3 justify-center">
                                                            <button onClick={()=>{detailSentence(el)}} className="text-xs py-2 px-3 rounded border-cyan-500 border hover:bg-cyan-500 hover:text-white text-cyan-500 duration-150"><FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" /> Prediksi</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </section>
            </div>
        </UserLayout>
    )
}