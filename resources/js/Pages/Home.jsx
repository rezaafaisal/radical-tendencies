import React, { useEffect, useState } from "react"
import UserLayout from "../Layouts/User"
import Textarea from "../Components/Forms/Textarea"

export default function Home(props){
    const [text, setText] = useState('')

    function predict(){

    }
    return(
        <UserLayout title="MyApp | Home">
            <section className="flex justify-center items-center h-60">
                <header className="text-3xl text-gray-700 font-light text-center">
                    <span className="font-normal">MyApp.id</span>  is an website to predict tendencies<br />of radical of your sentences
                </header>
            </section>
            <section>
                <div className="wrapper">
                    <div className="rounded-lg grid grid-cols-1 md:grid-cols-2 divide-y md:divide-x bg-white shadow">
                        <div className="p-8">
                            <header className="text-lg mb-5">Test with your own text</header>
                            <textarea onChange={(e) => setText(e.target.value)} className="bg-white border w-full rounded-lg p-3 h-52" placeholder="Masukkan kalimat" ></textarea>
                            <button onClick={predict} className="btn-primary mt-5">Predict</button>
                        </div>
                        <div className="p-8 divide-y">
                            <header className="text-lg mb-5">Results</header>
                            <div className="pt-2">
                                <div className="text-sm mb-2">
                                    <span className="font-semibold">Radical Tendencies : </span><span className="font-bold text-sky-500">67%</span>
                                </div>
                                <span className="block text-sm mb-2 font-semibold">Description : </span>
                                <p className="text-sm text-justify font-light">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio illo sit magni voluptas, natus incidunt expedita et voluptatem eum! Quia obcaecati quos, consequuntur eaque vero doloribus eveniet modi labore voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia doloribus fugiat laboriosam sunt provident, nam itaque perspiciatis, corrupti facilis qui deleniti. In minima ratione ad reiciendis provident obcaecati asperiores tempora.
                                </p>
                            </div>
                            <button className="btn-primary mt-5">Save Result</button>
                        </div>
                    </div>
                </div>
            </section>
        </UserLayout>
    )
}