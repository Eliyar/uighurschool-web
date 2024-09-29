import * as functions from 'firebase-functions'
import { google } from 'googleapis'
import * as mime from 'mime-types'

import { gmail } from '../lib/gmail'
import { gmailAuthMiddleware } from '../lib/gmail-auth-middleware'

export const sendEmail = functions.https.onCall(async (data) => {
    const { userId, to, subject, body, attachments } = data

    // Gmail auth middleware
    try {
        await gmailAuthMiddleware(userId)
    } catch (error) {
        functions.logger.error('Error authorizing Gmail', {
            structuredData: true,
        })
        throw error
    }

    functions.logger.info('Sending email', {
        to,
        subject,
    })

    // Create the email
    const boundary = 'foo_bar_baz'
    const emailLines = [
        `To: ${to}`,
        'From: Uighur School',
        `Subject: ${subject}`,
        'MIME-Version: 1.0',
        `Content-Type: multipart/mixed; boundary="${boundary}"`,
        '',
        `--${boundary}`,
        'Content-Type: text/html; charset=utf-8',
        'MIME-Version: 1.0',
        '',
        body,
        '',
    ]

    // Add attachments
    if (attachments?.length > 0) {
        for (const attachment of attachments) {
            const { name, type, data } = attachment
            const buffer = Buffer.from(data)
            const mimeType =
                type || mime.lookup(name) || 'application/octet-stream'

            emailLines.push(`--${boundary}`)
            emailLines.push(`Content-Type: ${mimeType}`)
            emailLines.push('MIME-Version: 1.0')
            emailLines.push(
                `Content-Disposition: attachment; filename="${name}"`
            )
            emailLines.push('Content-Transfer-Encoding: base64')
            emailLines.push('')
            emailLines.push(buffer.toString('base64'))
            emailLines.push('')
        }
    }

    emailLines.push(`--${boundary}--`)

    const email = emailLines.join('\r\n').trim()

    // Encode the email
    const encodedEmail = Buffer.from(email)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')

    // Send the email
    const oauth2Client = await gmail.getGoogleAuthClient(userId)
    const client = google.gmail({ version: 'v1', auth: oauth2Client })
    const clientRes = await client.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: encodedEmail,
        },
    })

    const id = clientRes.data.id

    functions.logger.info(
        `Email successfully sent with gmail callback id ${id}`,
        {
            to,
            subject,
            body,
        }
    )

    return {
        id,
    }
})
