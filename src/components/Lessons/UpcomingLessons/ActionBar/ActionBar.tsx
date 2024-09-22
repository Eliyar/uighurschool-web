import { EmailOutlined } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'

import { useRoute } from '../../../../hooks/useRoute'
import { Button } from '../../../common/Button'
import { SendLessonsDialogTrigger } from '../../../common/SendLessonsDialog/SendLessonsDialogTrigger'

export const ActionBar = () => {
    const { navClasses } = useRoute()

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="h6">Lessons</Typography>
            </Stack>

            <Stack direction="row" spacing={2}>
                <Button
                    variant="outlined"
                    label="Manage Classes"
                    size="small"
                    startIcon={<EmailOutlined />}
                    onClick={() => navClasses()}
                    sx={{ px: 3 }}
                />
                <SendLessonsDialogTrigger />
            </Stack>
        </Stack>
    )
}
