import React, { useEffect, useState } from "react"
import UserLayout from "../Layouts/User"
import Textarea from "../Components/Forms/Textarea"

export default function Home(props){
    const [text, setText] = useState('')
    const [showPredict, setShowPredict] = useState(false)

    const [result, setResult] = useState('')


    // useEffect(() => {
    //     setResult(text)
    // }, [text])
    return(
        <UserLayout title="MyApp | Home">
            <section className="flex justify-center items-center h-60">
                <header className="text-3xl text-gray-700 font-light text-center leading-10">
                    Sistem Informasi Klasifikasi Kecenderungan <br /> Pemahaman Radikal di Media Sosial
                </header>
            </section>
            <section>
                <div className="wrapper">
                    <div className="rounded-lg grid grid-cols-1 md:grid-cols-2 divide-y md:divide-x bg-white shadow">
                        <div className="p-8">
                            <header className="text-lg mb-5">Masukkan Teks</header>
                            <textarea onChange={(e) => setText(e.target.value)} className="bg-white border w-full rounded-lg p-3 h-52" placeholder="Masukkan kalimat" ></textarea>
                            <button onClick={() => {setShowPredict(true), setResult(text)}} className="btn-primary mt-5">Prediksi</button>
                        </div>
                        <div className="p-8 divide-y">
                            <header className="text-lg mb-5">Hasil</header>
                            <div className="pt-2">
                            {
                                showPredict && 
                                    <div className="">
                                        <div className="mb-5">
                                            <p className="font-light text-lg mb-3">
                                                {result}
                                            </p>
                                            <div className="text-base">
                                                <span className="font-semibold">Akurasi : </span>
                                                <span className="font-bold ">67% Negatif</span>
                                                <span className="text-pink-600 font-semibold"> (Kalimat Cenderung Radikal !)</span>
                                            </div>
                                        </div>
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
                                                        <td className="p-2 border">0.143</td>
                                                    </tr>
                                                    <tr className="border border-slate-200">
                                                        <td className="p-2 border">Negatif</td>
                                                        <td className="p-2 border">0.143</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <button className="btn-primary mt-5">Simpan Hasil</button>
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