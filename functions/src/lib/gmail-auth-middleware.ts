import { gmail } from './gmail'

export const gmailAuthMiddleware = async (userId: string): Promise<boolean> => {
    try {
        const tokens = await gmail.loadTokens(userId)
        if (!tokens) {
            throw new Error('User not authorized')
        }

        const currentTime = Date.now()
        if (tokens.expiry_date <= currentTime) {
            const newTokens = await gmail.refreshTokens(tokens)
            gmail.saveTokens(userId, newTokens)
            tokens.id_token = newTokens.id_token
        }

        const payload = await gmail.verifyIdToken(tokens.id_token)
        if (!payload) {
            throw new Error('Invalid token payload')
        }

        return true
    } catch (error) {
        console.error('Error verifying Google token:', error)
        throw error
    }
}
