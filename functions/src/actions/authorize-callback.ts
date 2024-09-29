import * as functions from 'firebase-functions'

import { gmail } from '../lib/gmail'

export const authorizeCallback = functions.https.onCall(async (data) => {
    const { code, state } = data

    functions.logger.info(
        `Authorize callback with code ${code} and state ${state}`,
        {
            structuredData: true,
        }
    )

    const tokens = await gmail.getTokens(code as string)
    gmail.saveTokens(state as string, tokens)
})
