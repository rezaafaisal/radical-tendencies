import React, { useEffect } from "react";
import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";

export default function Login(){
    const {errors} = usePage().props
    
    const [cred, setCred] = useState({
        fullname: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setCred({
            ...cred,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        router.post('daftar', cred)
    }

    return (
        <div className="bg-cyan-500 h-screen w-full flex items-center justify-center">
            <div className="p-10 rounded-lg shadow border bg-white w-10/12 md:w-6/12 lg:w-4/12">
                <h3 className="text-2xl mb-7 font-semibold text-gray-500">Daftar Akun Baru</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block">
                            <span className="block font-light text-gray-500 mb-2 text-sm">Nama Lengkap</span>
                            <input onChange={handleChange} type="text" className="px-4 py-2 rounded-lg border w-full" name="fullname" />
                            {errors.fullname && <div className="text-xs mt-1 font-light text-pink-500">{errors.fullname}</div>}
                        </label>
                    </div>
                    <div className="mb-3">
                        <label className="block">
                            <span className="block font-light text-gray-500 mb-2 text-sm">Email</span>
                            <input onChange={handleChange} type="text" className="px-4 py-2 rounded-lg border w-full" name="email" />
                            {errors.email && <div className="text-xs mt-1 font-light text-pink-500">{errors.email}</div>}
                        </label>
                    </div>
                    <div className="mb-3">
                        <label className="block">
                            <span className="block font-light text-gray-500 mb-2 text-sm">kata Sandi</span>
                            <input onChange={handleChange} type="password" className="px-4 py-2 rounded-lg border w-full" name="password" />
                            {errors.password && <div className="text-xs mt-1 font-light text-pink-500">{errors.password}</div>}
                        </label>
                    </div>
                    <div className="mb-3">
                        <label className="block">
                            <span className="block font-light text-gray-500 mb-2 text-sm">Konfirmasi kata Sandi</span>
                            <input onChange={handleChange} type="password" className="px-4 py-2 rounded-lg border w-full" name="password_confirmation" />
                            {errors.password_confirmation && <div className="text-xs mt-1 font-light text-pink-500">{errors.password_confirmation}</div>}
                        </label>
                    </div>
                    <button className="btn-primary text-sm">Daftar</button>
                </form>
                <span className="block mt-5 pt-5 border-t text-gray-500 text-sm text-center">Sudah punya akun? <Link href="masuk" className="text-cyan-500 font-semibold">Masuk Sekarang!</Link></span>
            </div>
        </div>
    )
}
