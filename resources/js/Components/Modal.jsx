import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, usePage, useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function Modal({title, close}){
    const [filename, setFilename] = useState('');

    const {setData, post} = useForm({
        file: null
    })
    
    const {errors} = usePage().props
    const handleChange = (e) => {
        setFilename(e.target.files[0].name)
        setData('file', e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/impor')
    }
    
    return (
        <div className="fixed top-0 bottom-0 right-0 left-0 bg-black/50 z-20 overflow-hidden flex justify-center items-center">
            <div className="wrapper flex justify-center items-center">
                <div className="w-full md:w-8/12 lg:w-6/12 bg-white rounded-xl overflow-hidden">
                    <div className="p-5 bg-cyan-500 flex items-center justify-between text-white">
                        <span className="block text-xl">{title}</span>
                        <button onClick={close}>
                            <FontAwesomeIcon className="text-xl" icon={faXmark} />
                        </button>
                    </div>
                    <div className="p-5">
                        <form onSubmit={handleSubmit} className="mt-5">
                            {errors.file && <div className="text-xs mt-1 font-light text-pink-500">{errors.file}</div>}
                            <label htmlFor="" className="block">
                                <input type="text" className="px-4 py-2 border border-slate-200 w-full rounded-lg font-light" placeholder="Masukkan nama file" />
                            </label>
                            <div className="py-3 flex justify-end">
                                <button className="btn-primary text-sm">Unduh</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}