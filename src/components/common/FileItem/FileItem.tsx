import { DescriptionOutlined } from '@mui/icons-material'
import { Chip, Stack, styled, Typography } from '@mui/material'
import moment from 'moment'

import Colors from '../../../colors'
import { DATE_FORMAT } from '../../../constants'
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
                <Stack spacing={0.5} sx={{ flex: '1 1 100%' }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ flex: '1 1 100%' }}
                    >
                        <Typography
                            className="truncate-row-2"
                            variant="body2"
                            fontWeight={500}
                        >
                            {file.name}
                        </Typography>
                        {file.tag && (
                            <Chip
                                label={file.tag}
                                variant="outlined"
                                color={
                                    file.tag === 'lesson'
                                        ? 'primary'
                                        : 'warning'
                                }
                                size="small"
                            />
                        )}
                    </Stack>
                    <Typography
                        className="truncate-row-2"
                        variant="body2"
                        color="secondary"
                    >
                        {moment(file.createdAt).format(DATE_FORMAT)}
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
