import React, { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePage, router } from "@inertiajs/react";

export default function ExportModal({close}){
    const [filename, setFilename] = useState('');
    
    const {errors} = usePage().props

    const handleChange = (e) => {
        setFilename(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        close
        window.open(`/export?filename=${filename}`, '_blank')
    }

    return(
         <div className="fixed top-0 bottom-0 right-0 left-0 bg-black/50 z-20 overflow-hidden flex justify-center items-center">
            <div className="wrapper flex justify-center items-center">
                <div className="w-full md:w-8/12 lg:w-6/12 bg-white rounded-xl overflow-hidden">
                    <div className="p-5 bg-cyan-500 flex items-center justify-between text-white">
                        <span className="block text-xl">Unduh Kalimat</span>
                        <button onClick={close}>
                            <FontAwesomeIcon className="text-xl" icon={faXmark} />
                        </button>
                    </div>
                    <div className="p-5">
                        <form onSubmit={handleSubmit} className="mt-5">
                            <label className="block mb-5">
                                <input onChange={handleChange} className="rounded-lg px-5 py-2 w-full border" type="text" placeholder="Nama File" />
                                {errors.file && <div className="text-xs mt-1 font-light text-pink-500">{errors.file}</div>}
                            </label>
                            <div className="flex justify-end">
                                <button className="btn-primary text-sm">Unduh</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}