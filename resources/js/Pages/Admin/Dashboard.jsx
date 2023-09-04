import React from "react";
import AdminLayout from "../../Layouts/Admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faFaceAngry, faFaceSmile } from "@fortawesome/free-regular-svg-icons";

export default function Dashboard(){
    return (
        <AdminLayout active="dashboard" title="Dashboard" >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <div className="p-5 bg-white rounded-lg border flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full text-blue-500 flex items-center justify-center">
                        <FontAwesomeIcon icon={faUsers} />
                    </div>
                    <div>
                        <span className="block text-sm font-light mb-2">Total Pengguna</span>
                        <span className="block font-semibold text-lg">400</span>
                    </div>
                </div>
                <div className="p-5 bg-white rounded-lg border flex items-center gap-3">
                    <div className="h-10 w-10 bg-amber-100 rounded-full text-amber-500 flex items-center justify-center">
                        <FontAwesomeIcon icon={faCommentDots} />
                    </div>
                    <div>
                        <span className="block text-sm font-light mb-2">Total Kalimat</span>
                        <span className="block font-semibold text-lg">400</span>
                    </div>
                </div>
                <div className="p-5 bg-white rounded-lg border flex items-center gap-3">
                    <div className="h-10 w-10 bg-green-100 rounded-full text-green-500 flex items-center justify-center">
                        <FontAwesomeIcon icon={faFaceSmile} />
                    </div>
                    <div>
                        <span className="block text-sm font-light mb-2">Total Tidak Radikal</span>
                        <span className="block font-semibold text-lg">400</span>
                    </div>
                </div>
                <div className="p-5 bg-white rounded-lg border flex items-center gap-3">
                    <div className="h-10 w-10 bg-rose-100 rounded-full text-rose-500 flex items-center justify-center">
                        <FontAwesomeIcon icon={faFaceAngry} />
                    </div>
                    <div>
                        <span className="block text-sm font-light mb-2">Total Cenderung Radikal</span>
                        <span className="block font-semibold text-lg">400</span>
                    </div>
                </div>
            </div>
            <div className="rounded-lg border bg-white overflow-hidden">
                <table className="table-fixed divide-y w-full">
                    <thead>
                        <tr className="bg-slate-200">
                            <th className="text-sm text-start font-light py-3 px-6 w-3/12">Pengguna</th>
                            <th className="text-sm text-start font-light py-3 px-6 w-5/12">Kalimat</th>
                            <th className="text-sm text-start font-light py-3 px-6 w-2/12">Prediksi</th>
                            <th className="text-sm text-start font-light py-3 px-6 w-2/12">Tanggal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-slate-100 duration-100">
                            <td className="text-sm font-light py-3 px-6">
                                <div className="flex items-center gap-2">
                                    <img src="https://api.slingacademy.com/public/sample-photos/1.jpeg" alt="" className="w-10 h-10 object-cover object-center rounded-full" />
                                    <div>
                                        <span className="block font-semibold">Burung Hantu</span>
                                        <span className="text-xs font-light">burung****@gmail.com</span>
                                    </div>
                                </div>
                            </td>
                            <td className="text-sm font-light py-3 px-6">
                                <p className="text-xs text-justify">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis nam aperiam nostrum. Voluptatem possimus repudiandae cupiditate optio iusto! Reiciendis velit harum ratione ex ad id quisquam? A corporis in eveniet?</p>
                            </td>
                            <td className="text-sm font-light py-3 px-6">
                                <span className="block text-xs bg-teal-100 text-teal-500 text-center p-2 rounded-full">Tidak Radikal</span>
                            </td>
                            <td className="text-sm font-light py-3 px-6">
                                02/12/2023 24:00
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-100 duration-100">
                            <td className="text-sm font-light py-3 px-6">
                                <div className="flex items-center gap-2">
                                    <img src="https://api.slingacademy.com/public/sample-photos/1.jpeg" alt="" className="w-10 h-10 object-cover object-center rounded-full" />
                                    <div>
                                        <span className="block font-semibold">Burung Hantu</span>
                                        <span className="text-xs font-light">burung****@gmail.com</span>
                                    </div>
                                </div>
                            </td>
                            <td className="text-sm font-light py-3 px-6">
                                <p className="text-xs text-justify">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis nam aperiam nostrum. Voluptatem possimus repudiandae cupiditate optio iusto! Reiciendis velit harum ratione ex ad id quisquam? A corporis in eveniet?</p>
                            </td>
                            <td className="text-sm font-light py-3 px-6">
                                <span className="block text-xs bg-rose-100 text-rose-500 text-center p-2 rounded-full">Cenderung Radikal</span>
                            </td>
                            <td className="text-sm font-light py-3 px-6">
                                02/12/2023 24:00
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}