import { ax } from './axios'

const API = process.env.REACT_APP_API

const sendEmail = async (payload: {
    to: string
    subject: string
    body: string
    attachments: File[]
}) => {
    const formData = new FormData()
    formData.append('to', payload.to)
    formData.append('subject', payload.subject)
    formData.append('body', payload.body)
    payload.attachments.forEach((attachment) => {
        formData.append('attachments', attachment)
    })

    const url = `${API}/gmail/send`
    return ax.post(url, formData)
}

export const httpService = {
    sendEmail,
}
