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
async function successAlert(title, text){
    const MySwal = withReactContent(Swal)
    await MySwal.fire({
        icon: 'success',
        title: title,
        text: text,
        showConfirmButton: false,
        timer: 2000,
        position: 'bottom-end',
        toast: true,
    })
}
const errorAlert = (title, text) => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        icon: 'error',
        title: title,
        text: text,
        showConfirmButton: false,
        timer: 2000,
        position: 'bottom-end',
        toast: true,
    })
}

const confirmAlert = (title, text, route, confirmText) => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        icon: 'warning',
        title: title,
        text: text,
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonText: confirmText,
        confirmButtonColor: '#EC4899'
        }).then((e) => {
            if(e.isConfirmed){
                router.get(route)
            }
    })
}

export {confirmAlert, infoAlert, successAlert, errorAlert}
