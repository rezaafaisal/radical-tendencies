import React from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Modal({children, title, close, onSubmit, submitText}){

    return (
        <div className="fixed top-0 bottom-0 right-0 left-0 bg-black/50 z-20 overflow-hidden flex justify-center items-center">
            <div className="wrapper flex justify-center items-center">
                <div className="w-full md:w-8/12 lg:w-6/12 bg-white rounded-xl overflow-hidden">
                    <div className="p-5 bg-cyan-500 flex items-center justify-between text-white">
                        <span className="block text-xl">{title}</span>
                        <button onClick={close}>
                            <FontAwesomeIcon className="text-xl" icon={faXmark} />
                        </button>
                    </div>
                    <div className="p-5">
                        <form onSubmit={onSubmit} className="mt-5">
                            {children}
                            <div className="py-3 flex justify-end">
                                <button className="btn-primary text-sm">{submitText}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}