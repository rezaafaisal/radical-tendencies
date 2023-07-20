import React, { useEffect } from "react";
import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import CountdownTimer from "../../Components/Countdown";
export default function Verify(props){
    const {errors} = usePage().props
    
    const [code, setCode] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        router.post('verifikasi-email', {
            verification_code: code
        })
    }

    const {countdownMinutes, countdownSeconds} = CountdownTimer(props.expired)
    const time = countdownMinutes+':'+countdownSeconds

    return (
        <div className="bg-cyan-500 h-screen w-full flex items-center justify-center">
            <div className="p-10 rounded-lg shadow border bg-white w-10/12 md:w-6/12 lg:w-4/12">
                <h3 className="text-2xl mb-7 font-semibold text-gray-500">Verifikasi Email</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block">
                            <span className="block font-light text-gray-500 mb-5 text-sm text-center">Kode Verifikasi telah dikirim di email {props.email}</span>
                            <input onChange={(e)=>setCode(e.target.value)} autoFocus type="text" className="px-4 py-2 appearance-none rounded-lg border w-full" name="verification_code" placeholder="6 Digit Kode" />
                            {errors.verification_code && <div className="text-xs mt-1 font-light text-pink-500">{errors.verification_code}</div>}
                        </label>
                    </div>
                    <button className="btn-primary w-full mb-3">Verifikasi</button>
                    <span className="block text-center text-sm font-semibold text-gray-500">
                        {
                            (countdownMinutes == '0' && countdownSeconds == '0') ?
                                <span onClick={()=>{
                                    router.post('kirim-ulang-verifikasi-email')
                                }} className="underline underline-offset-4 text-sm cursor-pointer">Kirim ulang kode</span>
                                :
                                <span className="block px-2 text-sm">{countdownMinutes}:{countdownSeconds}</span>
                        }
                    </span>
                    
                </form>
            </div>
        </div>
    )
}
