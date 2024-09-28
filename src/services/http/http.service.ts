import { ax } from './axios'

const API = process.env.REACT_APP_API

const authorize = async (): Promise<string> => {
    const url = `${API}/auth/authorize`
    return ax.get(url).then((res) => res.data.url)
}

const authorizeCallback = async (
    code: string,
    state: string
): Promise<void> => {
    const url = `${API}/auth/authorize/callback?code=${code}&state=${state}`
    return ax.get(url)
}

const refreshToken = async (): Promise<void> => {
    const url = `${API}/auth/refresh`
    return ax.get(url)
}

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
    authorize,
    authorizeCallback,
    refreshToken,
    sendEmail,
}
