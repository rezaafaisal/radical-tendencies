import React from "react";
import NavApp from "../Components/Header";
import { Head } from "@inertiajs/react";
function UserLayout({children, title}){
    return (
        <div className="bg-gray-100 pb-20">
            <Head title={title} />
            <NavApp />
            {children}
        </div>
    )
}

export default UserLayout