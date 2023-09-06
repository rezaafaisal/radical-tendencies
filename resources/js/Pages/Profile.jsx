import React, { useEffect, useRef, useState } from "react";
import UserLayout from "../Layouts/User";
import { Link, router, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { errorAlert, successAlert } from "../Components/Alerts";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export default function Profile({user, isAccount, profileUrl, accountUrl}){
    const {errors, flash} = usePage().props
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
    const [showPreview, setShowPreview] = useState(false)
    const [applyImage, setApplyImage] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const [data, setData] = useState({
        name: user.name,
        image: null,
        password: '',
        password_confirmation: '',
        is_account: isAccount
    })

    const [newImage, setNewImage] = useState('')

    const hiddenFile = useRef(null)


    const setImage = () => {
        setData({
            ...data,
            image: newImage
        })
        setApplyImage(true)
        setShowPreview(false)
    }
    const fileHandler = (e) => {
        setShowPreview(true)
        const file = e.target.files[0]
        setNewImage(file)
    }

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

        router.post('/profil', data, {
            forceFormData: true,
        })
    }

    useEffect(()=>{
        flash.message && successAlert('Berhasil', flash.message)
        errors.name && errorAlert('Gagal', errors.name)
        errors.password && errorAlert('Gagal', errors.password)
    }, [errors, flash])
    
    return(
        <UserLayout>
            {
                showPreview &&
                <div className="fixed flex z-50 top-0 justify-center items-center bg-black bg-opacity-50 h-screen w-full overflow-hidden">
                    <div className="w-full m-10 md:w-8/12 lg:w-4/12 bg-white rounded-lg">
                        <div className="p-4 border-b border-slate-300 flex justify-between">
                            <span>Sesuaikan Gambar</span>
                            <button id="close_crop"><i className="fas fa-xmark"></i></button>
                        </div>
                        <div className="p-4 flex justify-center">
                            <img src={URL.createObjectURL(newImage)} alt="" id="newImg" className="w-60 h-60 object-cover object-center" />
                        </div>
                        <div className="p-4 border-t border-slate-300 flex justify-end">
                            <div className="flex gap-3 text-sm font-light">
                                <button onClick={()=>setShowPreview(false)} className="btn-secondary">Batal</button>
                                <button onClick={setImage} id="crop_image" className="btn-primary">Terapkan</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            

            <section className="wrapper mt-40 text-slate-600">
                <div className="flex gap-5 relative">
                    <button onClick={()=>setShowSidebar(true)} className="fixed md:hidden left-0 -mt-10 bg-white p-4 rounded-tr-lg rounded-br-lg shadow">
                        <FontAwesomeIcon className="text-sm" icon={faChevronRight} />
                    </button>
                    <div className={`w-full fixed h-screen px-1 z-10 bg-slate-100 duration-150 ${showSidebar?'-translate-x-0':'-translate-x-full'} md:-translate-x-0 md:bg-transparent top-20 left-0 right-0 bottom-0 md:h-auto md:static md:block md:w-3/12`}>
                        <button onClick={()=>setShowSidebar(false)} className="absolute md:hidden right-10 top-5"><FontAwesomeIcon icon={faXmark} /></button>
                        <span className="mt-5 md:mt-0 block text-2xl">Profil Pengguna</span>
                        <ul className="mt-5">
                            <li className="">
                                <Link href={profileUrl} className={`p-5 border-slate-500 hover:bg-slate-200 block ${!isAccount ? 'border-l-2' : ''}`}>
                                    <FontAwesomeIcon icon={faUser} className="mr-2" /> Data Pribadi
                                </Link>
                            </li>
                            <li className="">
                                <Link href={accountUrl} className={`p-5 border-slate-500 hover:bg-slate-200 block ${isAccount ? 'border-l-2' : ''}`}>
                                    <FontAwesomeIcon icon={faGear} className="mr-2" /> Akun
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {
                        !isAccount ? 
                        <div className="w-full md:w-9/12 p-10 border rounded-lg bg-white">
                            <span className="block text-lg pb-3 border-b border-slate-200">Data Pribadi</span>
                            <div className="mt-5 lg:w-8/12">
                                <label className="block mb-8">
                                    <span className="block font-semibold text-sm mb-3">Foto Diri</span>
                                    <div className="flex gap-5 items-start">
                                        <img src={applyImage ? URL.createObjectURL(newImage) : '/avatar/'+user.avatar} alt="profile picture" className="block shrink-0 h-28 w-28 object-cover object-center rounded-lg border border-slate-200" />
                                        <div>
                                            <input type="file" ref={hiddenFile} onChange={fileHandler} accept="image/png, image/gif, image/jpeg" name="file" id="" className="hidden" />
                                            <button onClick={()=> hiddenFile.current.click()} type="button" className="text-sm btn-primary">Pilih Foto</button>
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
                        <div className="w-full md:w-9/12 p-10 border rounded-lg bg-white">
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