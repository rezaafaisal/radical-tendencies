import React, { useState } from "react";
import AdminLayout from "../../Layouts/Admin";
import { Link } from "@inertiajs/react";
import ZoomImage from "../../Components/ZoomImage";

export default function UserDetail({user}){
    const [zoom, setZoom] = useState(false);
    return(
        <AdminLayout active={"user"} title={"Pengguna"}>
            {
                zoom && <ZoomImage image={"/avatar/"+user.avatar} close={()=>setZoom(false)} />
            }
            <div className="rounded-lg border p-10 bg-white overflow-hidden">
                <div className="mb-5 pb-5 flex justify-end border-b">
                    <Link href='/admin/pengguna' className='btn-primary'>Kembali</Link>
                </div>
                <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                    <div>
                        <div className="flex justify-center mb-5">
                            <div className="w-40 h-40 rounded-full group relative overflow-hidden">
                                <img src={"/avatar/"+user.avatar} className="w-40 h-40 object-cover object-center rounded-full" alt="" />
                                <div onClick={()=>setZoom(true)} className="w-40 h-40 invisible group-hover:visible translate-y-20 group-hover:translate-y-0 duration-200 bg-black absolute top-0 left-0 group-hover:bg-black/30 bg-black/0 flex items-center justify-center cursor-pointer">
                                    <span className="block text-xs opacity-0 group-hover:opacity-100 font-semibold text-white">Klik untuk perbesar</span>
                                </div>
                            </div>
                        </div>
                        <Input label={"Nama Lengkap"} value={user.name} />
                        <Input label={"Email"} value={user.email} />
                    </div>
                    <div>
                        <Input label="Tanggal Registrasi" value={user.registered} />
                        <Input label="Login Terakhir" value={user.login} />
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
                            <Input label="Total Kalimat" value={user.sentences} />
                            <Input label="Kalimat Terprediksi" value={user.predicts} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
                            <Input label="Cenderung Radikal" value={user.radical+" Kalimat"} />
                            <Input label="Tidak Radikal" value={user.unradical+" Kalimat"} />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

function Input({label, value}){
    return(
        <label htmlFor="" className="block mb-5">
            <span className="block mb-2 text-sm font-light text-slate-500">{label}</span>
            <input type="text" className="px-4 text-sm text-slate-600 py-2 border rounded-lg w-full" disabled defaultValue={value}  />
        </label>
    )
}