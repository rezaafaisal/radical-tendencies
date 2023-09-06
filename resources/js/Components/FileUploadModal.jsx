import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, usePage, useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function FileUploadModal({close}){
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
                        <span className="block text-xl">Upload Filemu sendiri!</span>
                        <button onClick={close}>
                            <FontAwesomeIcon className="text-xl" icon={faXmark} />
                        </button>
                    </div>
                    <div className="p-5">
                        <span className="block text-sm">Contoh file template unduh <a target="_blank" href="/etc/template-kalimat.xlsx" download className="text-cyan-500 font-semibold">disini</a></span>
                        <form onSubmit={handleSubmit} className="mt-5">
                            {errors.file && <div className="text-xs mt-1 font-light text-pink-500">{errors.file}</div>}
                            <span className="block pb-3 text-sm">{filename}</span>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">XLS, XLSX & CSV (MAX. 1Mb)</p>
                                    </div>
                                    <input onChange={handleChange} id="dropzone-file" type="file" className="hidden" name="file" />
                                </label>
                            </div>
                            <div className="py-3 flex justify-end">
                                <button className="btn-primary text-sm">Unggah</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}