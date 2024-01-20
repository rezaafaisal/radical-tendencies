import React, { useEffect, useState } from "react"
import UserLayout from "../Layouts/User"
import axios from "axios"
import { router, usePage } from "@inertiajs/react"
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

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

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

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
            <section id="carousel" className="wrapper mb-20">
                <h2 className="mb-5 text-2xl text-start ml-5 text-slate-700">
                    Tahap Dibalik Pembuatan Aplikasi
                </h2>
                {/* <div className="grid grid-cols-5 gap-4"> */}
                <Carousel 
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={false}
                    autoPlaySpeed={2000}
                    keyBoardControl={true}
                    transitionDuration={1000}
                    itemClass="carousel-item-padding-40-px"
                    className="flex items-stretch"
                >
                    <div className="rounded-lg h-[300px] lg:h-[530px] mx-5 bg-white shadow p-5">
                        <div className="flex justify-center items-center">
                            <div className="h-8 w-8 bg-cyan-600 text-white text-lg rounded-full flex justify-center items-center">
                                <span>1</span>
                            </div>
                        </div>
                        <img src="ui/crawling.svg" />
                        <span className="text-lg text-cyan-500 font-semibold block text-center">Crawling Data</span>
                        <p className="text-xs lg:text-sm font-light mt-2">
                            Crawling Dataset, adalah proses pengambilan data secara otomatis dari berbagai sumber, seperti situ web, database atau dokumen.
                        </p>
                    </div>
                    <div className="rounded-lg h-[300px] lg:h-[530px] mx-5 bg-white shadow p-5">
                        <div className="flex justify-center items-center">
                            <div className="h-8 w-8 bg-cyan-600 text-white text-lg rounded-full flex justify-center items-center">
                                <span>2</span>
                            </div>
                        </div>
                        <img src="ui/remove_tag.svg" />
                        <span className="text-lg text-cyan-500 font-semibold block text-center">Removing Tags and Links</span>
                        <p className="text-xs lg:text-sm font-light mt-2">
                           Removing Tags and Links, adalah proses menghilangkan tag dan tautan dari data yang telah diambil.
                        </p>
                    </div>
                    <div className="rounded-lg h-[300px] lg:h-[530px] mx-5 bg-white shadow p-5">
                        <div className="flex justify-center items-center">
                            <div className="h-8 w-8 bg-cyan-600 text-white text-lg rounded-full flex justify-center items-center">
                                <span>3</span>
                            </div>
                        </div>
                        <img src="ui/labelling.svg" />
                        <span className="text-lg text-cyan-500 font-semibold block text-center">Data Labelling</span>
                        <p className="text-xs lg:text-sm font-light mt-2">
                           Data Labelling, adalah proses yang dilakukan  untuk melabeli seluruh dataset oleh pakar/ahli.
                        </p>
                    </div>
                    <div className="rounded-lg h-[300px] lg:h-[530px] mx-5 bg-white shadow p-5">
                        <div className="flex justify-center items-center">
                            <div className="h-8 w-8 bg-cyan-600 text-white text-lg rounded-full flex justify-center items-center">
                                <span>4</span>
                            </div>
                        </div>
                        <img src="ui/text_preprocessing.svg" />
                        <span className="text-lg text-cyan-500 font-semibold block text-center">Text Preprocessing</span>
                        <p className="text-xs lg:text-sm font-light mt-2">
                           Text Preprocessing, adalah serangkaian tahap pemrosesan teks pada data, seperti mengubah huruf besar menjadi kecil, menghapus tanda baca, menghapus kata-kata umum, mereduksi kata-kata ke bentuk dasarnya dan memisahkan teks menjadi kata-kata.
                        </p>
                    </div>
                    <div className="rounded-lg h-[300px] lg:h-[530px] mx-5 bg-white shadow p-5">
                        <div className="flex justify-center items-center">
                            <div className="h-8 w-8 bg-cyan-600 text-white text-lg rounded-full flex justify-center items-center">
                                <span>5</span>
                            </div>
                        </div>
                        <img src="ui/modelling.svg" />
                        <span className="text-lg text-cyan-500 font-semibold block text-center">Modelling</span>
                        <p className="text-xs lg:text-sm font-light mt-2">
                           Modelling, adalah proses untuk membuat model dari suatu objek, sistem, atau konsep. Model yang dibuat adalah model yang menggunakan algoritma Naive Bayes.
                        </p>
                        <div className="flex justify-start mt-5">
                            <a href="https://colab.research.google.com/drive/1wDNoNJ_BcqIwjzQYwhVFP4doImdCk9uB?usp=sharing" target="_blank" className="bg-white px-4 text-xs py-2 border border-cyan-600 text-cyan-600 inline-block rounded-lg hover:bg-cyan-600 hover:text-white duration-150">Lihat Proses Modelling</a>

                        </div>
                    </div>
                </Carousel>
                {/* </div> */}
            </section>
            <section>
                <div className="wrapper">
                    <h2 className="mb-5 text-2xl text-start text-slate-700">
                        Prediksi Sentimen Sekarang
                    </h2>
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