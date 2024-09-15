import { CreateNewFolderOutlined } from '@mui/icons-material'

import { OpenClassFormDialog } from '../../../services/eventbus.service'
import { Button } from '../Button'

export const ClassformDialogTrigger = () => {
    return (
        <Button
            variant="contained"
            label="Create Class"
            size="small"
            startIcon={<CreateNewFolderOutlined />}
            onClick={() => OpenClassFormDialog.emit()}
            sx={{ px: 3 }}
        />
    )
}
