import React from "react";
import NavApp from "../Components/Header";
import { Head } from "@inertiajs/react";
function UserLayout({children, title, about}){
    return (
        <div className="pb-20">
            <Head title={title} />
            <NavApp active={about} />
            {children}
        </div>
    )
}

export default UserLayout