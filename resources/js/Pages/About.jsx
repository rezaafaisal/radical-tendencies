import React from "react";
import UserLayout from "../Layouts/User";
import { Link } from "@inertiajs/react";

export default function About(){
    return(
        <UserLayout about={true} title="Radikal Tes | Tentang">
            <section className="mt-32 grid grid-cols-2 gap-5 wrapper">
                <div className="">
                    <header className="font-semibold text-3xl leading-relaxed mb-5 text-gray-600">Memprediksi dan Menganalisa Unsur Radikalisme dari Sentimen Teks yang Berasal dari Media Sosial.</header>
                    <p className="leading-relaxed text-gray-600">
                        <strong>RadikalTes</strong>, sebuah website klasifikasi yang mengimplementasikan algoritma Naive Bayes untuk memprediksi sentimen teks dengan output "Cenderung Radikal" dan "Tidak Radikal". Algoritma ini bekerja dengan menghitung probabilitas kemunculan kata-kata tertentu dalam teks yang akan diklasifikasikan. Jika probabilitas kemunculan kata-kata cenderung radikal lebih tinggi, maka teks tersebut akan diklasifikasikan sebagai Cenderung Radikal. Sebaliknya, jika probabilitas kemunculan kata-kata positif lebih tinggi, maka teks tersebut akan diklasifikasikan sebagai Tidak Radikal.
                    </p>
                    <Link href="/" className="btn-primary mt-5 inline-block">Mulai Prediksi</Link>
                </div>
                <div className="p-10 flex items-center">
                    <img className="rounded-lg" src={'/ui/banner_about.jpg'} alt="" />
                </div>
            </section>
        </UserLayout>
    )
}