import React from "react";
import NavApp from "../Components/Header";
import { Head } from "@inertiajs/react";
function UserLayout({children, title}){
    return (
        <>
            <Head title={title} />
            <NavApp />
            {children}
        </>
    )
}

export default UserLayout