import React, { useEffect, useState } from 'react'
import AdminLayout from '../../Layouts/Admin'
import { Link } from '@inertiajs/react'
import axios from 'axios'
import { url } from '../../env'
import ApiPagination from '../../Components/ApiPagination'

export default function Sentence(){

    const [sentences, setSentences] = useState()
    const [sentenceUrl, setSentenceUrl] = useState(url+'/api/sentence')
    const [params, setParams] = useState({
        show:25,
        keyword:''
    })
    async function getSentences(){
        try {
            const response = await axios.get(sentenceUrl, {params: params})
            const data = response.data
            setSentences(data);
            
        } catch (error) {
            console.log(error)
        }
    }

    function urlHandler(url){
        setSentenceUrl(url)
    }

    function inputHandler(e){
        const {name, value} = e.target
        setParams({
            ...params,
            [name]:value
        })
    }

    useEffect(()=>{
        getSentences()
    }, [params, sentenceUrl])
    
    return (
        <AdminLayout active="sentence" title="Kalimat">
            <div className="rounded-lg border p-10 bg-white overflow-hidden">
                <div className="mb-5 pb-5 flex justify-between items-center">
                    <div>
                        <span className="inline-block">Tampilkan</span>
                        <select onChange={inputHandler} defaultValue={25} name="show" className="ml-2 py-2 px-4 appearance-none text-sm rounded-lg bg-white border">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <div className="w-28 md:w-48">
                        <input onChange={inputHandler} type="search" name="keyword" placeholder="Pencarian" className="px-4 py-2 border text-slate-600 w-full rounded-lg font-light" />
                    </div>
                </div>
                <div className="rounded-lg border pb-3 overflow-scroll">
                    <table className="w-full">
                        <thead className='text-slate-500 bg-slate-200'>
                            <tr>
                                <th className="text-sm font-medium py-3 px-4 w-1/12">No</th>
                                <th className="text-sm font-medium py-3 px-4 w-3/12">Pengguna</th>
                                <th className="text-sm font-medium py-3 px-4 w-2/12">Total Kalimat</th>
                                <th className="text-sm font-medium py-3 px-4 w-2/12">Cenderung Radikal</th>
                                <th className="text-sm font-medium py-3 px-4 w-2/12">Tidak Radikal</th>
                                <th className="text-sm font-medium py-3 px-4 w-3/12 min-w-max"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {
                                sentences && sentences.data.map((sentence, i) => {
                                    const start = sentences.from
                                    return(
                                        <tr key={i} className="hover:bg-slate-100 duration-100">
                                            <td className="text-sm font-light py-3 px-4 text-center">
                                                {start+i}
                                            </td>
                                            <td className="text-sm font-light py-3 px-4">
                                                <div className='text-start min-w-max'>
                                                    <span className="block font-semibold">{sentence.name}</span>
                                                    <span className="text-xs font-light">{sentence.email}</span>
                                                </div>
                                            </td>
                                            <td className="text-sm font-light py-3 px-4 text-center">
                                                <span className='font-semibold text-xs inline-block bg-slate-400 py-2 px-3 text-white rounded-lg'>{sentence.count}</span>
                                            </td>
                                            <td className="text-sm font-light py-3 px-4 text-center">
                                                <span className='font-semibold text-xs inline-block bg-rose-400 py-2 px-3 text-white rounded-lg'>{sentence.radical}</span>
                                            </td>
                                            <td className="text-sm font-light py-3 px-4 text-center">
                                                <span className='font-semibold text-xs inline-block bg-teal-400 py-2 px-3 text-white rounded-lg'>{sentence.unradical}</span>
                                            </td>
                                            <td className="text-sm font-light py-3 px-4 text-center">
                                                <Link href={`/admin/kalimat/${sentence.id}`} className="btn-primary-outline inline-block text-sm min-w-max md:w-auto">Detail Kalimat</Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                {
                    sentences && <ApiPagination data={sentences} handler={urlHandler} />
                }
                
            </div>
        </AdminLayout>
    )
}