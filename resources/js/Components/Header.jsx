import { Link } from "@inertiajs/react"
import React from "react"

export default function NavApp(){
    return (
        <nav className="flex gap-2 text-blue-500">
            <Link href="/">Home</Link>
            <Link href='about'>About</Link>
            <Link href='contact'>Contact</Link>
        </nav>
    )
}