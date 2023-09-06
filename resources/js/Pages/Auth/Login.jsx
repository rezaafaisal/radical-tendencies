import React from "react";
import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import InputPassword from "../../Components/InputPassword";
import Input from "../../Components/Input";

export default function Login(){
    const {errors, flash} = usePage().props
    
    const [cred, setCred] = useState({
        email: '',
        password: ''
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
        router.post('masuk', cred)
    }

    return (
        <div className="bg-cyan-500 h-screen w-full flex items-center justify-center">
            <div className="p-10 rounded-lg shadow border bg-white w-10/12 md:w-7/12 lg:w-5/12 xl:w-4/12">
                <h3 className="text-xl mb-7 font-semibold text-slate-600">
                    Masuk
                    <Link href="/" className="text-cyan-500 ml-2">Radikal Tes</Link>
                </h3>
                {
                    flash.message && 
                    <span className="block px-5 py-2 bg-cyan-100 mb-7 text-center text-cyan-500 rounded-lg text-xs font-light">
                        {flash.message}
                    </span>
                }
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email Aktif"
                        handler={handleChange}
                        name="email"
                        errors={errors.email}
                    />
                    <InputPassword
                        label="Kata Sandi"
                        handler={handleChange}
                        name="password"
                        errors={errors.password}
                    />
                    <Link href="/lupa-kata-sandi" className="block text-sm mb-5 font-semibold text-slate-600">Lupa kata sandi?</Link>
                    <button className="btn-primary">Masuk</button>
                </form>
                <span className="block mt-5 pt-5 border-t text-slate-600 text-sm text-center">Belum punya akun? <Link href="daftar" className="text-cyan-500 font-semibold">Daftar Sekarang!</Link></span>
            </div>
        </div>
    )
}
