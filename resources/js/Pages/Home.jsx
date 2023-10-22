import React, { useEffect, useState } from "react"
import UserLayout from "../Layouts/User"
import axios from "axios"
import { router, usePage } from "@inertiajs/react"

import { confirmAlert, infoAlert, successAlert } from "../Components/Alerts"

export default function Home(props){
    const {auth, errors, flash} = usePage().props
    const [text, setText] = useState('')
    const [showPredict, setShowPredict] = useState(false)
    const [result, setResult] = useState('')
    const [predict, setPredict] = useState({
        predict: '',
        unradical : 0,
        radical: 0,
    })

    async function predictData() {
        const min = 3;
        const max = 500;
        const wordsLenght = text.split(' ').length
        if(wordsLenght >= min && wordsLenght <= max){
            try {
                const response = await axios.postForm('http://127.0.0.1:5000/predict', {
                    sentences: text.toLowerCase()
                });
                console.log(response.response)
                if(response.status == 200){
                    setPredict({
                        ...predict,
                        predict: response.data.predict,
                        radical: response.data.prob.radical,
                        unradical: response.data.prob.unradical,
                    })
                    setShowPredict(true)
                }
                
            } catch (error) {
                setShowPredict(false)
                console.error(error);
                infoAlert('Gagal', error.response.data)
            }
        }
        else{
            setShowPredict(false)
            infoAlert('Gagal', 'Minimal 3 kata dan Maksimal 500 kata')
        }
    }

    function savePredict(){
        router.post('simpan', {
            text: text,
            predict: predict.predict,
            radical: predict.radical,
            unradical: predict.unradical
        })
    }

    function label(predict){
        if(predict === 'radical'){
            return (
                <span className="font-semibold text-rose-500">Kalimat Cenderung Radikal!</span>
            )
        }
        else if(predict === 'unradical'){
            return(
                <span className="font-semibold text-teal-500">Kalimat Tidak Radikal</span>
            )
        }
        
    }

    useEffect(()=>{
        // if fails
        errors.text && infoAlert('Gagal', errors.text)      
        // if success
        flash.message && successAlert('Berhasil', flash.message)
    }, [errors, flash])


    return(
        <UserLayout title="MyApp | Home">
            <section className="flex mt-20 justify-center items-center h-60">
                <header className="text-xl md:text-3xl text-slate-700 font-light text-center leading-10">
                    Sistem Informasi Klasifikasi Kecenderungan <br /> Pemahaman Radikal di Media Sosial
                </header>
            </section>
            <section>
                <div className="wrapper">
                    <div className="rounded-lg grid grid-cols-1 md:grid-cols-2 divide-y md:divide-x bg-white shadow">
                        <div className="p-8">
                            <header className="text-lg mb-5">Kalimat</header>
                            <textarea onChange={(e) => setText(e.target.value)} className="bg-white border w-full rounded-lg p-3 h-52 mb-5" placeholder="Masukkan kalimat" value={text} ></textarea>
                            <div className="flex gap-2 justify-start">
                                <button onClick={() => {setResult(text), predictData()}} className="btn-primary mt-5">Prediksi</button>
                            </div>
                        </div>
                        <div className="p-8 divide-y">
                            <header className="text-lg mb-5">Hasil</header>
                            <div className="pt-2">
                            {
                                showPredict && 
                                <div className="">
                                        <div className="mb-5">
                                            <p className="font-light mb-3">
                                                {result}
                                            </p>
                                            <div className="text-base">
                                                <span className="">Prediksi : </span>
                                                {label(predict.predict)}
                                            </div>
                                        </div>
                                        <hr className="my-6" />
                                        <div className="mb-5 text-xs">
                                            <table className="table-fixed w-full border-collapse border">
                                                <caption className="mb-3 text-left text-base">
                                                    Tabel Skor Naive Bayes
                                                </caption>
                                                <thead>
                                                    <tr className="border border-slate-200">
                                                        <th className="p-2 border">Label</th>
                                                        <th className="p-2 border">Skor</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border border-s-amber-200">
                                                        <td className="p-2 border">Cenderung Radikal</td>
                                                        <td className="p-2 border">{predict.radical}%</td>
                                                    </tr>
                                                    <tr className="border border-slate-200">
                                                        <td className="p-2 border">Tidak Radikal</td>
                                                        <td className="p-2 border">{predict.unradical}%</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <button onClick={
                                            () => {
                                                if(!auth.user) {
                                                    confirmAlert('Masuk Sekarang', 'Untuk bisa menyimpan riwayat prediksi, silahkan masuk terlebih dahulu', 'masuk', 'Masuk')
                                                }
                                                
                                            else{
                                                    savePredict()
                                                }
                                            }
                                        } className="btn-primary mt-5">Simpan Hasil</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </UserLayout>
    )
}