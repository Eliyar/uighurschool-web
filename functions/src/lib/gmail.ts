import * as admin from 'firebase-admin'
import { google } from 'googleapis'

admin.initializeApp()

const db = admin.database()
const gmailCredentialsRef = db.ref('credentials/gmail')

const SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
]

const getGmailCredentials = async () => {
    const snapshot = await gmailCredentialsRef.once('value')
    return snapshot.val()
}

const getOauth2Client = (() => {
    let client: any

    return async () => {
        if (client) {
            return client
        }

        const credentials = await getGmailCredentials()
        const { client_id, client_secret, redirect_uris } = credentials

        client = new google.auth.OAuth2(client_id, client_secret, redirect_uris)
        return client
    }
})()

const getAuthUrl = async (userId: string): Promise<string> => {
    const oauth2Client = await getOauth2Client()
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent',
        state: userId,
    })
}

const getTokens = async (code: string) => {
    const oauth2Client = await getOauth2Client()
    const { tokens } = await oauth2Client.getToken(code)
    return tokens
}

const loadTokens = async (userId: string) => {
    const ref = db.ref(`credentials/users/${userId}`)
    const snapshot = await ref.once('value')
    return snapshot.val()
}

const saveTokens = (userId: string, tokens: any) => {
    const userCredentialsDir = db.ref(`credentials/users/${userId}`)
    userCredentialsDir.set(tokens)
}

const refreshTokens = async (tokens: any) => {
    const oauth2Client = await getOauth2Client()
    oauth2Client.setCredentials(tokens)
    const { credentials } = await oauth2Client.refreshAccessToken()
    return credentials
}

const verifyIdToken = async (idToken: string) => {
    const credentials = await getGmailCredentials()
    const { client_id } = credentials

    const oauth2Client = await getOauth2Client()
    const ticket = await oauth2Client.verifyIdToken({
        idToken,
        audience: client_id,
    })
    return ticket.getPayload()
}

const getGoogleAuthClient = async (userId: string) => {
    const tokens = await loadTokens(userId)
    if (!tokens) {
        throw new Error('User not authorized')
    }
    const oauth2Client = await getOauth2Client()
    oauth2Client.setCredentials(tokens)
    return oauth2Client
}

export const gmail = {
    getAuthUrl,
    getTokens,
    loadTokens,
    saveTokens,
    refreshTokens,
    verifyIdToken,
    getGoogleAuthClient,
}
