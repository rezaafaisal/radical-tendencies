import React, { useEffect } from "react";
import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import Input from "../../Components/Input";
import InputPassword from "../../Components/InputPassword";

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
                <h3 className="text-xl mb-7 font-semibold text-gray-500">
                    Daftar Akun Baru
                    <Link href="/" className="text-cyan-500 ml-2">Radikal Tes</Link>
                </h3>
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Nama Lengkap"
                        type="text"
                        name="fullname"
                        handler={handleChange}
                        errors={errors.fullname}
                    />
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        handler={handleChange}
                        errors={errors.email}
                    />
                    <InputPassword
                        label="Kata Sandi"
                        name="password"
                        errors={errors.password}
                        handler={handleChange}
                    />
                    <InputPassword
                        label="Konfirmasi Kata Sandi"
                        name="password_confirmation"
                        errors={errors.password_confirmation}
                        handler={handleChange}
                    />
                    <button className="btn-primary">Daftar</button>
                </form>
                <span className="block mt-5 pt-5 border-t text-gray-500 text-sm text-center">
                    Sudah punya akun? <Link href="masuk" className="text-cyan-500 font-semibold">Masuk Sekarang!</Link>
                </span>
            </div>
        </div>
    )
}
