import * as functions from 'firebase-functions'

import { gmail } from '../lib/gmail'

export const authorize = functions.https.onCall(async (data) => {
    const userId = data.userId

    functions.logger.info(`Authorizing user with userId ${userId}`, {
        structuredData: true,
    })

    const url = await gmail.getAuthUrl(userId)
    return {
        url,
    }
})
