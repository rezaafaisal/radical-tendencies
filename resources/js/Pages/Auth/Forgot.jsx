import React from "react";
import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import InputPassword from "../../Components/InputPassword";
import Input from "../../Components/Input";
import { SpinnerCircular } from "spinners-react";

export default function Forgot(){
    const {errors, flash} = usePage().props
    const [loading, setLoading] = useState(false)
    const [cred, setCred] = useState({
        email: ''
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
        router.post('/lupa-kata-sandi', cred)
    }

    return (
        <div className="bg-cyan-500 h-screen w-full flex items-center justify-center">
            <div className="p-10 rounded-lg shadow border bg-white w-10/12 md:w-6/12 lg:w-4/12">
                <h3 className="text-xl mb-7 font-semibold text-slate-600">
                    Setel Ulang Kata Sandi
                    <Link href="/" className="text-cyan-500 ml-2">Radikal Tes</Link>
                </h3>
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email Aktif"
                        handler={handleChange}
                        name="email"
                        errors={errors.email}
                    />
                    <button className="btn-primary w-full">Setel Kata Sandi</button>
                </form>
                <span className="block mt-5 pt-5 border-t text-slate-600 text-sm text-center">Belum punya akun? <Link href="daftar" className="text-cyan-500 font-semibold">Daftar Sekarang!</Link></span>
            </div>
        </div>
    )
}
