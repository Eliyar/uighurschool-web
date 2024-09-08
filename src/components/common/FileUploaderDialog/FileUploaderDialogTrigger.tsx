import { UploadFileOutlined } from '@mui/icons-material'

import { OpenFileUploaderDialog } from '../../../services/eventbus.service'
import { Button } from '../Button'

export const FileUploaderDialogTrigger = () => {
    return (
        <Button
            variant="contained"
            label="Upload"
            size="small"
            startIcon={<UploadFileOutlined />}
            onClick={() => OpenFileUploaderDialog.emit()}
            sx={{ px: 3 }}
        />
    )
}
