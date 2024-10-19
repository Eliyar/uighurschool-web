import 'react-toastify/dist/ReactToastify.min.css'

import {
    Slide,
    toast,
    ToastContainer as ToastContainerLib,
} from 'react-toastify'

export const ToastContainer = () => (
    <ToastContainerLib
        position="bottom-right"
        limit={3}
        hideProgressBar
        closeOnClick
        draggable
        icon={false}
        transition={Slide}
    />
)

export const Toast = (() => {
    return {
        success: toast.success,
        warning: toast.warning,
        info: toast.info,
        error: toast.error,
    }
})()
