import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function ZoomImage({image, close}){
    return(
        <div className="fixed top-0 left-0 w-full h-screen bg-black/40 px-10 z-50 flex justify-center items-center">
            <div className="relative w-full md:w-8/12 lg:w-6/12 h-5/6 flex justify-center items-center">
                <button onClick={close} className="absolute rounded-lg right-2 top-2 text-xl md:text-2xl lg:text-3xl flex justify-center items-center bg-black/20 text-white w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"><FontAwesomeIcon icon={faXmark} /></button>
                <img src={image} alt="" className="w-full h-full object-cover object-center rounded-lg" />
            </div>
        </div>
    )
}