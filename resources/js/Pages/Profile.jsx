import React, { useEffect, useState } from "react";
import UserLayout from "../Layouts/User";
import { Link, router, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import ProfileImage from "../../../public/avatar/sully.jpg"
import { errorAlert, successAlert } from "../Components/Alerts";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export default function Profile({user, isAccount}){
    const {errors, flash} = usePage().props
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
    const [data, setData] = useState({
        name: user.name,
        image: null,
        password: '',
        password_confirmation: '',
        is_account: isAccount
    })


    const inputHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setData({
            ...data,
            [name]: value
        })
    }
    const updateData = (e) => {
        e.preventDefault()

        if(isAccount){
            delete data.name
            delete data.image
        }
        else{
            delete data.password
            delete data.password_confirmation
        }

        router.post('/profil', data)
    }

    useEffect(()=>{
        flash.message && successAlert('Berhasil', flash.message)
        errors.name && errorAlert('Gagal', errors.name)
        errors.password && errorAlert('Gagal', errors.password)
    }, [errors, flash])
    
    return(
        <UserLayout>
            <section className="wrapper mt-20 text-slate-600">
                <div className="flex gap-5">
                    <div className="w-3/12">
                        <span className="block text-2xl">Profil Pengguna</span>
                        <ul className="mt-5">
                            <li className="">
                                <Link href="/profil" className={`p-5 border-slate-500 hover:bg-slate-200 block ${!isAccount ? 'border-l-2' : ''}`}>
                                    <FontAwesomeIcon icon={faUser} className="mr-2" /> Data Pribadi
                                </Link>
                            </li>
                            <li className="">
                                <Link href="/profil/akun" className={`p-5 border-slate-500 hover:bg-slate-200 block ${isAccount ? 'border-l-2' : ''}`}>
                                    <FontAwesomeIcon icon={faGear} className="mr-2" /> Akun
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {
                        !isAccount ? 
                        <div className="w-9/12 p-10 border rounded-lg bg-white">
                            <span className="block text-lg pb-3 border-b border-slate-200">Data Pribadi</span>
                            <div className="mt-5 lg:w-8/12">
                                <label className="block mb-8">
                                    <span className="block font-semibold text-sm mb-3">Foto Diri</span>
                                    <div className="flex gap-5">
                                        <img src={ProfileImage} alt="profile picture" className="h-28 w-28 rounded-lg border border-slate-200" />
                                        <div>
                                            <button type="button" className="text-sm btn-primary">Pilih Foto</button>
                                            <span className="block text-xs font-light mt-3">
                                                Gambar Profile Anda sebaiknya memiliki rasio 1:1 dan berukuran tidak lebih dari 2MB.
                                            </span>
                                        </div>
                                    </div>
                                </label>
                                <label className="block mb-8">
                                    <span className="block font-semibold text-sm mb-3">Nama Lengkap</span>
                                    <input onChange={inputHandler} type="text" name="name" id="" className="px-4 py-2 border border-slate-200 w-full rounded-lg font-light" value={data.name} />
                                    {
                                        errors.name && <span className="mt-2 text-xs font-light block text-pink-500">{errors.name}</span>
                                    }
                                </label>
                                <button onClick={updateData} className="btn-primary mt-5">Simpan Perubahan</button>
                            </div>
                        </div>
                        :
                        <div className="w-9/12 p-10 border rounded-lg bg-white">
                            <span className="block text-lg pb-3 border-b border-slate-200">Akun</span>
                            <div className="mt-5 lg:w-8/12">
                                <label className="block mb-8">
                                    <span className="block font-semibold text-sm mb-3">Email</span>
                                    <input type="text" name="email" id="" className="px-4 py-2 border border-slate-200 w-full rounded-lg font-light" value={user.email} readOnly disabled/>
                                </label>
                                <label className="block mb-8">
                                    <span className="block font-semibold text-sm mb-3">Kata Sandi Baru</span>
                                    <div className="relative flex items-center">
                                        <input onChange={inputHandler} type={showPassword?'text':'password'} name="password" id="" className="px-4 py-2 border border-slate-200 w-full rounded-lg font-light relative"/>
                                        <button onClick={()=>setShowPassword(!showPassword)} className="absolute right-3"><FontAwesomeIcon icon={showPassword?faEyeSlash:faEye} /></button>
                                    </div>
                                    {
                                        errors.password ? 
                                        <span className="block text-xs mt-2 font-light text-pink-500">{errors.password}</span>
                                        :
                                        <span className="block text-xs mt-2 font-light">Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.</span>
                                    }
                                </label>
                                <label className="block mb-8">
                                    <span className="block font-semibold text-sm mb-3">Konfirmasi Kata Sandi Baru</span>
                                    <div className="relative flex items-center">
                                        <input onChange={inputHandler} type={showPasswordConfirm?'text':'password'} name="password_confirmation" id="" className="px-4 py-2 border border-slate-200 w-full rounded-lg font-light"/>
                                        <button onClick={()=>setShowPasswordConfirm(!showPasswordConfirm)} className="absolute right-3"><FontAwesomeIcon icon={showPasswordConfirm?faEyeSlash:faEye} /></button>
                                    </div>
                                </label>
                                <button onClick={updateData} className="btn-primary mt-5">Simpan Perubahan</button>
                            </div>
                        </div>
                    }
                </div>
            </section>
        </UserLayout>
    )
}