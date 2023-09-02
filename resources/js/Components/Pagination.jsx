import React from "react";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";

export default function Pagination({data}){
    return(
        <div className="flex justify-end mt-10 px-5">
            <div className="flex gap-2">
                {
                    data.links.map((el, i) => {
                        if (el.label.includes('Next')) {
                            return(
                                <Link key={i} href={data.next_page_url} preserveScroll className={`w-8 h-8 rounded duration-150 flex items-center justify-center border ${data.next_page_url == null ? 'bg-slate-300 text-slate-50 cursor-default' : 'border-slate-200 text-slate-500'}`}>
                                    <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                                </Link>
                            )
                        }
                        else if(el.label.includes('Prev')){
                            return(
                                <Link key={i} href={data.prev_page_url} preserveScroll className={`w-8 h-8 rounded duration-150 flex items-center justify-center border ${data.prev_page_url == null ? 'bg-slate-300 text-slate-50 cursor-default' : 'border-slate-200 text-slate-500'}`}>
                                    <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
                                </Link>
                            )
                        }
                        else{
                            return(
                                <Link key={i} href={el.url} preserveScroll className={`w-8 h-8 rounded duration-150 flex items-center justify-center text-sm border font-semibold ${(el.active) ? 'border-cyan-500 text-cyan-500' : 'border-slate-200 text-slate-500'}`}>
                                    {el.label}
                                </Link>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}