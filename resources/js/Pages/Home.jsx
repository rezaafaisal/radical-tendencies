import React, { useEffect, useState } from "react"
import UserLayout from "../Layouts/User"
import axios from "axios"
import { router, usePage } from "@inertiajs/react"

import { confirmAlert, infoAlert, successAlert } from "../Components/Alerts"

export default function Home(props){
    const {auth, errors, flash} = usePage().props
    const [text, setText] = useState('')
    const [label, setLabel] =useState('')
    const [showPredict, setShowPredict] = useState(false)
    const [result, setResult] = useState('')
    const [predict, setPredict] = useState({
        prediksi: '',
        akurasi: 0,
        positif : 0,
        negatif: 0,
        netral: 0
    })

    async function predictData() {
        const min = 3;
        const max = 500;
        const wordsLenght = text.split(' ').length
        if(wordsLenght >= min && wordsLenght <= max){
            try {
                const response = await axios.postForm('http://127.0.0.1:5000/predict', {
                    sentences: text
                });
                setPredict({
                    ...predict,
                    prediksi: response.data.prediksi,
                    positif: response.data.probabilitas.positif,
                    radikal: response.data.probabilitas.radikal,
                    netral: response.data.probabilitas.netral,
                })
                setShowPredict(true)
    
            } catch (error) {
                console.error(error);
            }
        }
        else{
            infoAlert('Gagal', 'Minimal 3 kata dan Maksimal 500 kata')
        }
    }

    function savePredict(){
        router.post('simpan', {
            text: text,
            predict: predict.prediksi,
            positive: predict.positif,
            radical: predict.radikal,
            neutral: predict.netral 
        })
    }

    function predictLabel(predict){
        if(predict === 'netral') setLabel('Kalimat Netral')
        else if(predict === 'positif') setLabel('Kalimat Positif')
        else if(predict === 'radikal') setLabel('Kalimat Cenderung Radikal')
    }

    useEffect(()=>{
        // if fails
        errors.text && infoAlert('Gagal', errors.text)      
        // if success
        flash.message && successAlert('Berhasil', flash.message)

        // predict label
        predictLabel(predict.prediksi)
    }, [errors, flash, predict.prediksi])


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
                            <header className="text-lg mb-5">Masukkan Teks</header>
                            <textarea onChange={(e) => setText(e.target.value)} className="bg-white border w-full rounded-lg p-3 h-52 mb-5" placeholder="Masukkan kalimat" ></textarea>
                            <button onClick={() => {setResult(text), predictData()}} className="btn-primary mt-5}">Prediksi</button>
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
                                                <span className=" font-semibold"> {label}!</span>
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
                                                        <td className="p-2 border">Positif</td>
                                                        <td className="p-2 border">{predict.positif}</td>
                                                    </tr>
                                                    <tr className="border border-slate-200">
                                                        <td className="p-2 border">Netral</td>
                                                        <td className="p-2 border">{predict.netral}</td>
                                                    </tr>
                                                    <tr className="border border-slate-200">
                                                        <td className="p-2 border">Cenderung Radikal</td>
                                                        <td className="p-2 border">{predict.negatif}</td>
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