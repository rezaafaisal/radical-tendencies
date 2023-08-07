import { router } from '@inertiajs/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const infoAlert = (title, text) => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        title: title,
        text: text,
    })
}

const confirmAlert = (title, text, route, confirmText) => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        title: title,
        text: text,
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonText: confirmText
        }).then((e) => {
            if(e.isConfirmed){
                router.get(route)
            }
    })
}

export {confirmAlert, infoAlert}
