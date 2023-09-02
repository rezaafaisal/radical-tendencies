import React, { useEffect, useState } from "react"
import UserLayout from "../Layouts/User"
import { router, Link, usePage } from "@inertiajs/react"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload, faTrash, faInfoCircle, faMagnifyingGlass, faDownload } from "@fortawesome/free-solid-svg-icons"
import FileUploadModal from "../Components/FileUploadModal"
import axios from "axios"
import { successAlert } from "../Components/Alerts"

export default function Sentence(props){
    const {flash, errors} = usePage().props
    const [sentences, setSentences] = useState(props.sentences)
    // const [unpredict, setUnpredict] = useState(props.unpredict)
    const [isPredicted, setIsPredicted] = useState(props.is_predicted)
    const [modalUpload, setModalUpload] = useState(false)

    const [predict, setPredict] = useState({
        id: '',
        predict: '',
        radical : 0,
        unradical: 0
    })

    async function predictSentence(data){
        const min = 3;
        const max = 500;
        const wordsLenght = data.text.split(' ').length
        if(wordsLenght >= min && wordsLenght <= max){
            try {
                const response = await axios.postForm('http://127.0.0.1:5000/predict', {
                    sentences: data.text
                });
                setPredict({
                    ...predict,
                    id: data.id,
                    predict: response.data.predict,
                    radical: response.data.prob.radical,
                    unradical: response.data.prob.unradical,
                })
                
                confirmSave(predictLabel(response.data.predict), data, response.data)
    
            } catch (error) {
                console.error(error);
            }
        }
        else{
            infoAlert('Gagal', 'Minimal 3 kata dan Maksimal 500 kata')
        }
    }
    
    function confirmSave(title, sentence, response){
        console.log(response)
        const data = {
            id: sentence.id,
            user_id: sentence.user_id,
            text: sentence.text,
            predict: response.predict,
            radical: response.prob.radical,
            unradical: response.prob.unradical,
            created_at: sentence.created_at, 
            updated_at: sentence.updated_at, 
        }
        const MySwal = withReactContent(Swal)
        const elemen = (
            <div className="">
                <p>{data.text}</p>
                <table className="table-auto text-start mt-5 text-sm">
                    <tbody>
                        <tr>
                            <th className="text-start mr-5 block">Cenderung Radikal</th>
                            <td>: {data.radical}%</td>
                        </tr>
                        <tr>
                            <th className="text-start mr-5 block">Tidak Radikal</th>
                            <td>: {data.unradical}%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
        MySwal.fire({
            title: title,
            html: elemen,
            showCancelButton: true,
            cancelButtonText: 'Batal',
            confirmButtonText: 'Simpan'
            }).then((e) => {
                if(e.isConfirmed){
                    router.put('/perbarui', {
                        id: data.id,
                        predict: data.predict,
                        radical: data.radical,
                        unradical: data.unradical,
                    })
                    // remove from list
                    setSentences(sentences.filter(el => el.id != data.id))
                }
        })
    }

    function predictLabel(predict){
        let label = ''
        if(predict === 'radical') label = 'Terindikasi Cenderung Radikal'
        else if(predict === 'unradical') label = 'Terindikasi Tidak Radikal'
        return label
    }
    
    function labelData(predict){
        if(predict.toLowerCase() === 'radical'){
            return(
                <span className="text-center px-2 py-1 font-medium rounded bg-rose-200 text-rose-700">{predictLabel(predict)}</span>
            )
        }

        else if(predict.toLowerCase() === 'unradical'){
            return(
                <span className="text-center px-2 py-1 font-medium rounded bg-teal-200 text-teal-700">{predictLabel(predict)}</span>
            )
        }
    }

    function deleteSentence(id){
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            icon: 'warning',
            title: 'Yakin hapus?',
            text: 'Kalimat akan dihapus permanen',
            confirmButtonText: 'Hapus',
            showCancelButton: true,
            cancelButtonText: 'Batal',
            confirmButtonColor: '#EC4899'
        }).then((e)=>{
            if(e.isConfirmed){
                router.delete(`kalimat/${id}`)
                setSentences(sentences.filter(el => el.id != id))
                setUnpredict(unpredict.filter(el=> el.id != id))
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
                        <th className="text-start mr-5 block">{predictLabel('radical')}</th>
                        <td>: {el.radical}%</td>
                    </tr>
                    <tr>
                        <th className="text-start mr-5 block">{predictLabel('unradical')}</th>
                        <td>: {el.unradical}%</td>
                    </tr>
                </table>
            </div>
        )
        MySwal.fire({
            title: 'Detail Kalimat',
            html: elemen
        })
    }

    useEffect(()=>{
        setModalUpload(false)
        flash.message && successAlert('Berhasil', flash.message)
    }, [flash, errors])

    return(
        <UserLayout>
            {
                modalUpload && <FileUploadModal close={()=>setModalUpload(false)} />
            }
            <div className="wrapper mt-20">
                <section className="py-5">
                    <Link href="/" className="btn-primary">Kembali</Link>
                </section>
                <section className="py-5 mt-10">
                    <header className="mb-5 flex justify-between text-sm">
                        <div className="flex w-max border-2 rounded-lg text-sm border-cyan-500 overflow-hidden">
                            <Link href="/kalimat" className={`px-5 py-2 duration-300 ${isPredicted ? 'bg-cyan-500 text-white' : 'bg-white'}`}>Sudah Diprediksi</Link>
                            <Link href="/kalimat/belum-terprediksi" className={`px-5 py-2 duration-300 ${!isPredicted ? 'bg-cyan-500 text-white' : 'bg-white'}`}>Belum Diprediksi</Link>
                        </div>
                        
                        {
                            isPredicted ?
                                <button className="btn-primary text-sm"><FontAwesomeIcon icon={faDownload} className="mr-2" /> Export Kalimat</button>
                            :
                                <button onClick={()=>setModalUpload(true)} className="btn-primary text-sm"><FontAwesomeIcon icon={faUpload} className="mr-2" /> Import Kalimat</button>
                        }
                    </header>
                    <p>Disclaimer : Aplikasi ini tidak serta merta memastikan, Akan tetapi masih bersifat penelitian rintisan!</p>
                        <br />
                    {
                        isPredicted ? 
                        <div className="border border-slate-300 overflow-hidden rounded-lg bg-white py-5">
                            <table className="table-fixed divide-y w-full">
                                <thead className="text-gray-600">
                                    <tr>
                                        <th className="px-3 pb-5 w-1/12">No.</th>
                                        <th className="px-3 pb-5 w-7/12">Kalimat</th>
                                        <th className="px-3 pb-5 w-2/12">Hasil Prediksi</th>
                                        <th className="px-3 pb-5 w-2/12"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {
                                        sentences.map((el, i) => {
                                            return (
                                                <tr key={el.id} className="font-light text-sm hover:bg-slate-100 duration-150">
                                                    <td>
                                                        <span className="block text-center">{i + 1}</span>
                                                    </td>
                                                    <td className="px-6 py-2">
                                                        {el.text}
                                                    </td>
                                                    <td>
                                                        <div className="text-center">
                                                            {labelData(el.predict)}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-2">
                                                        <div className="flex gap-3 justify-center">
                                                            <button onClick={()=>{detailSentence(el)}} className="text-xs py-2 px-3 rounded border-cyan-500 border hover:bg-cyan-500 hover:text-white text-cyan-500 duration-150"><FontAwesomeIcon icon={faInfoCircle} /></button>
                                                            <button onClick={() => { deleteSentence(el.id) }} className="text-xs py-2 px-3 rounded border-pink-500 border hover:bg-pink-500 hover:text-white text-pink-500 duration-150"><FontAwesomeIcon icon={faTrash} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            {
                                (sentences.length === 0) &&
                                <div className="px-5 pt-5">
                                    <span className="block px-5 py-3  bg-amber-100 mb-7 text-center text-amber-700 rounded-lg shadow">Tidak ada data</span>
                                </div>
                            }
                        </div>
                        :
                        <div className="border border-slate-300 overflow-hidden rounded-lg bg-white py-5">
                            <table className="table-fixed divide-y w-full divide-slate-30 ">
                                <thead className="text-gray-600">
                                    <tr>
                                        <th className="px-3 pb-5 w-1/12">No.</th>
                                        <th className="px-3 pb-5 w-8/12">Kalimat</th>
                                        <th className="px-3 pb-5 w-3/12"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {
                                        sentences.map((el, i) => {
                                            return (
                                                <tr key={el.id} className="font-light text-sm hover:bg-slate-100 duration-150">
                                                    <td>
                                                        <span className="block text-center">{i + 1}</span>
                                                    </td>
                                                    <td className="px-6 py-2">
                                                        {el.text}
                                                    </td>
                                                    <td className="px-6 py-2">
                                                        <div className="flex gap-3 justify-center">
                                                            <button onClick={()=>{predictSentence(el)}} className="text-xs py-2 px-3 rounded border-cyan-500 border hover:bg-cyan-500 hover:text-white text-cyan-500 duration-150"><FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" /> Prediksi</button>
                                                            <button onClick={()=>{deleteSentence(el.id)}} className="text-xs py-2 px-3 rounded border-pink-500 border hover:bg-pink-500 hover:text-white text-pink-500 duration-150"><FontAwesomeIcon icon={faTrash} className="mr-2" /> Hapus</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            {
                                (sentences.length === 0) &&
                                <div className="px-5 pt-5">
                                    <span className="block px-5 py-3  bg-amber-100 mb-7 text-center text-amber-700 rounded-lg shadow">Tidak ada data</span>
                                </div>
                            }
                        </div>
                    }
                </section>
            </div>
        </UserLayout>
    )
}