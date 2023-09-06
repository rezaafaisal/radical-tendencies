import React, { useEffect, useState } from "react";
import AdminLayout from "../../Layouts/Admin";
import { Link, router, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faKey, faTrash } from "@fortawesome/free-solid-svg-icons";
import { url } from "../../env";
import axios from "axios";
import ApiPagination from "../../Components/ApiPagination";
import Modal from "../../Components/Modal";
import InputPassword from "../../Components/InputPassword";
import { confirmAlertDanger, successAlert } from "../../Components/Alerts";

export default function User(){
    const {flash, errors} = usePage().props
    const [users, setUsers] = useState()
    const [userUrl, setUserUrl] = useState(url+'/api/user')
    const [currentUser, setCurrentUser] = useState()
    const [credential, setCredential] = useState({
        id:'',
        password:'',
        password_confirmation:''
    })
    const [showModal, setShowModal] = useState(false)
    const [params, setParams] = useState({
        show:25,
        keyword:''
    })
    async function getUsers(){
        try {
            const response = await axios.get(userUrl, {params: params})
            const data = response.data
            setUsers(data);
            
        } catch (error) {
            console.log(error)
        }
    }

    function urlHandler(url){
        setUserUrl(url)
    }

    function inputHandler(e){
        const {name, value} = e.target
        setParams({
            ...params,
            [name]:value
        })
    }

    function passwordHandler(e){
        const {name, value} = e.target
        setCredential({
            ...credential,
            id: currentUser.id,
            [name]: value
        })
    }

    function updatePassword(e){
        e.preventDefault()
        router.post('/admin/pengguna/setel-kata-sandi', credential)
    }

    function setUser(user){
        setCurrentUser(user)
        setShowModal(true)
    }

    function deleteUser(user){
        confirmAlertDanger({
            title: 'Hapus '+user.name+'?',
            text: 'Data '+user.name+' akan dihapus permanen',
            confirmText: 'Hapus',
            cancelText: 'Batal',
            handler: () => {
                router.delete('/admin/pengguna/'+user.id)
            }
        })
    }

    useEffect(()=>{
        getUsers()
        flash.message && successAlert('Berhasil', flash.message)
        !errors.password && setShowModal(false)
    }, [params, userUrl, flash, errors])
    
    return(
        <AdminLayout active="user" title="Pengguna">
            {
                showModal &&
                <Modal title={"Ganti Kata Sandi "+currentUser.name} close={()=>setShowModal(false)} onSubmit={updatePassword} submitText="Setel Ulang">
                    <InputPassword label="Kata sandi baru" name="password" handler={passwordHandler} placeholder="Min 8 karakter" errors={errors.password} />
                    <InputPassword label="Konfirmasi Kata sandi baru" name="password_confirmation" handler={passwordHandler} placeholder="Min 8 karakter" />
                </Modal>
            }
            <div className="rounded-lg border p-10 bg-white overflow-hidden">
                <div className="mb-5 flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="mb-3 md:mb-0">
                        <span className="inline-block">Tampilkan</span>
                        <select onChange={inputHandler} defaultValue={25} name="show" className="ml-2 py-2 px-4 appearance-none text-sm rounded-lg bg-white border">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <div className="w-full md:w-48">
                        <input onChange={inputHandler} type="search" name="keyword" placeholder="Pencarian" className="px-4 py-2 border text-slate-600 w-full rounded-lg font-light" />
                    </div>
                </div>
                <div className="rounded-lg border pb-3 overflow-scroll">
                    <table className="w-full">
                        <thead>
                            <tr className="text-slate-500">
                                <th className="text-sm font-medium py-3 px-4 w-1/12 bg-slate-200">No</th>
                                <th className="text-sm font-medium py-3 px-4 w-2/12 bg-slate-200">Foto</th>
                                <th className="text-sm font-medium py-3 px-4 w-3/12 bg-slate-200">Nama Lengkap</th>
                                <th className="text-sm font-medium py-3 px-4 w-3/12 bg-slate-200">Email</th>
                                <th className="text-sm font-medium py-3 px-4 w-3/12 bg-slate-200"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {
                                users && users.data.map((user, index) => {
                                    return(
                                        <tr key={index} className="hover:bg-slate-100 duration-100">
                                            <td className="text-sm font-light py-3 px-4 text-center">
                                                {users.from + index}
                                            </td>
                                            <td className="text-sm font-light py-3 px-4">
                                                <div className="flex justify-center min-w-max">
                                                    <img src={'/avatar/'+user.avatar} alt="profil picture" className="w-10 h-10 object-cover object-center rounded-lg block" />
                                                </div>
                                            </td>
                                            <td className="text-sm font-light py-3 px-4 text-center">
                                                <span className="font-light">{user.name}</span>
                                            </td>
                                            <td className="text-sm font-light py-3 px-4 text-center">
                                                <span className="font-light ">{user.email}</span>
                                            </td>
                                            <td className="text-sm font-light py-3 px-4">
                                                <div className="flex gap-2 justify-center min-w-max">
                                                    <button onClick={()=>setUser(user)} className="text-xs py-2 px-3 rounded-lg border-amber-400 border hover:bg-amber-400 hover:text-white text-amber-400 duration-150"><FontAwesomeIcon icon={faKey} /></button>
                                                    <Link href={"/admin/pengguna/"+user.id} className="text-xs py-2 px-3 rounded-lg border-teal-400 border hover:bg-teal-400 hover:text-white text-teal-400 duration-150"><FontAwesomeIcon icon={faEye} /></Link>
                                                    <button onClick={()=>deleteUser(user)} className="text-xs py-2 px-3 rounded-lg border-rose-400 border hover:bg-rose-400 hover:text-white text-rose-400 duration-150"><FontAwesomeIcon icon={faTrash} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    {
                        users && (users.data.length == 0) &&
                        <div className="px-5 pt-5">
                            <span className="block px-5 py-3 text-sm bg-rose-100 mb-7 text-center text-rose-400 rounded-lg shadow">Tidak ada data</span>
                        </div>
                    }
                </div>
                {
                    users && users.data.length > 0 &&
                    <ApiPagination data={users} handler={urlHandler} />
                }
            </div>
        </AdminLayout>
    )
}