import React from "react";
import NavApp from "../Components/Header";
import { Head } from "@inertiajs/react";
function UserLayout({children, title}){
    return (
        <div className="pb-20">
            <Head title={title} />
            <NavApp />
            {children}
        </div>
    )
}

export default UserLayout