import { EmailOutlined } from '@mui/icons-material'

import { OpenSendLessonsDialog } from '../../../services/eventbus.service'
import { Button } from '../Button'

export const SendLessonsDialogTrigger = () => {
    return (
        <Button
            variant="contained"
            label="Send Lessons"
            size="small"
            startIcon={<EmailOutlined />}
            onClick={() => OpenSendLessonsDialog.emit()}
        />
    )
}
