import { router } from '@inertiajs/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const confirmAlert = (title, text) => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        title: title,
        text: text,
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonText: 'Masuk'
        }).then((e) => {
            if(e.isConfirmed){
                router.get('masuk')
            }
    })
}

export {confirmAlert}
