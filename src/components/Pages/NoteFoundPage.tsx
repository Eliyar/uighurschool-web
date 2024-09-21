import { Paper, Stack, Typography } from '@mui/material'

interface Props {
    message?: string
}

export const NotFoundPage = ({ message = 'Not Found' }: Props) => {
    return (
        <Paper sx={{ p: 3, m: 3 }} elevation={0}>
            <Stack alignItems="center" spacing={1}>
                <Typography variant="h4" color="primary">
                    404
                </Typography>
                <Typography variant="body1" color="secondary">
                    {message}
                </Typography>
            </Stack>
        </Paper>
    )
}
