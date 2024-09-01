import { DescriptionOutlined } from '@mui/icons-material'
import { Stack, styled, Typography } from '@mui/material'

import Colors from '../../../colors'
import { utilsService } from '../../../services/firebase/utils.service'
import { FileModel } from '../../../services/models/File.model'
import { FileMenu } from './FileMenu'

interface Props {
    file: FileModel
}

const Styles = styled(Stack)`
    padding: 12px;
    border: 1px solid ${Colors.BORDER_COLOR};
    border-radius: 8px;
`

export const FileItem = ({ file }: Props) => {
    return (
        <Styles direction="row" alignItems="flex-start" spacing={2}>
            <Stack
                direction="row"
                alignItems="flex-start"
                spacing={2}
                sx={{ flex: '1 1 100%' }}
            >
                <IconStyles>
                    <DescriptionOutlined />
                </IconStyles>
                <Stack>
                    <Typography
                        className="truncate-row-2"
                        variant="body2"
                        fontWeight={500}
                    >
                        {file.name}
                    </Typography>
                    <Typography variant="caption" color="secondary">
                        {utilsService.formatFileSize(file.size)}
                    </Typography>
                </Stack>
            </Stack>
            <FileMenu file={file} />
        </Styles>
    )
}

const IconStyles = styled(Stack)`
    padding: 8px;
    border-radius: 8px;
    background-color: ${Colors.CONTROLLER_BACKGROUND};
`
