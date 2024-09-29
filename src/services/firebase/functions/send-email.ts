import { httpsCallable } from 'firebase/functions'

import { firebaseFunctions, firebaseService } from '../firebase.service'

export const sendEmail = async (payload: {
    to: string
    subject: string
    body: string
    attachments: File[]
}) => {
    const user = await firebaseService.auth.getAsyncSignedInUser()
    const userId = user?.uid
    if (!userId) {
        throw new Error('User not authenticated')
    }

    try {
        const functionRef = httpsCallable(
            firebaseFunctions,
            'actions-sendEmail'
        )

        const { to, subject, body } = payload
        const attachmentsData = await Promise.all(
            payload.attachments.map(async (file) => {
                const arrayBuffer = await file.arrayBuffer()
                return {
                    name: file.name,
                    type: file.type,
                    data: Array.from(new Uint8Array(arrayBuffer)),
                }
            })
        )

        return functionRef({
            userId,
            to,
            subject,
            body,
            attachments: attachmentsData,
        })
    } catch (error) {
        console.error(error)
        throw error
    }
}
