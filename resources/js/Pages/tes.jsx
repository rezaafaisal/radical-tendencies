import axios from "axios";
import React, { useEffect } from "react";

export default function tes(){

    async function tess(){
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user');
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(()=>{
        tess()
    }, [])
    return(
        <div>
            {console.log('selamat')}
        </div>
    )
}