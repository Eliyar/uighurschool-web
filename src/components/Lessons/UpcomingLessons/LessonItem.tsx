import {
    Box,
    ButtonBase,
    Chip,
    Divider,
    ListItem,
    ListItemIcon,
    Stack,
    styled,
    Typography,
} from '@mui/material'
import moment from 'moment'
import { useMemo } from 'react'

import Colors from '../../../colors'
import { DATE_FORMAT } from '../../../constants'
import { useClasses } from '../../../hooks/useClasses'
import { useFiles } from '../../../hooks/useFiles'
import { FileModel } from '../../../services/models/File.model'
import { Lesson } from '../../../services/models/Lesson.model'

interface Props {
    lesson: Lesson
    onView?: (lesson: Lesson, files: FileModel[]) => void
}

const Styles = styled(Stack)`
    padding: 12px;
    border: 1px solid ${Colors.BORDER_COLOR};
    border-radius: 8px;
`

export const LessonItem = ({ lesson, onView }: Props) => {
    const { getClass } = useClasses()
    const { getById } = useFiles()

    const classObj = useMemo(
        () => (lesson.classId ? getClass(lesson.classId) : undefined),
        [lesson.classId, getClass]
    )

    const files = useMemo(() => {
        let _files = lesson.fileIds?.reduce((acc, fileId) => {
            const file = getById(fileId)
            if (file) acc.push(file)
            return acc
        }, [] as FileModel[])

        _files = FileModel.sort(_files)

        return _files
    }, [lesson.fileIds, getById])

    return (
        <ButtonBase
            component={Box}
            sx={{ display: 'block', borderRadius: '6px' }}
        >
            <Styles
                spacing={1.5}
                onClick={() => {
                    onView?.(lesson, files)
                }}
            >
                <Stack
                    direction="row"
                    alignItems="flex-start"
                    spacing={2}
                    sx={{ flex: '1 1 100%' }}
                >
                    <Stack spacing={0.5} sx={{ flex: '1 1 100%' }}>
                        <Stack
                            direction="row"
                            alignItems="flex-start"
                            justifyContent="space-between"
                            sx={{ flex: '1 1 100%' }}
                        >
                            <Typography
                                className="truncate-row-2"
                                variant="h6"
                                fontWeight={500}
                            >
                                {lesson.name}
                            </Typography>
                            {classObj && (
                                <Chip
                                    label={classObj.name}
                                    variant="outlined"
                                    color="success"
                                    size="small"
                                    sx={{
                                        textTransform: 'capitalize',
                                        fontWeight: 500,
                                    }}
                                />
                            )}
                        </Stack>

                        <Typography variant="body2" color="text.secondary">
                            {moment(lesson.createdAt).format(DATE_FORMAT)}
                        </Typography>
                    </Stack>
                </Stack>

                <Divider />

                <Stack>
                    {files.map((file) => (
                        <FileItem key={file.id} file={file} />
                    ))}
                </Stack>
            </Styles>
        </ButtonBase>
    )
}

const FileItem = ({ file }: { file: FileModel }) => {
    return (
        <ListItem sx={{ px: 0, py: 0.5 }}>
            <Stack direction="row" alignItems="center" gap={2}>
                {file.tag && (
                    <ListItemIcon>
                        <Chip
                            label={file.tag}
                            variant="outlined"
                            color={
                                file.tag === 'lesson' ? 'primary' : 'warning'
                            }
                            size="small"
                            sx={{
                                textTransform: 'capitalize',
                                fontWeight: 500,
                            }}
                        />
                    </ListItemIcon>
                )}
                <Stack>
                    <Typography
                        className="truncate-row-1"
                        variant="body2"
                        fontWeight={500}
                    >
                        {file.name}
                    </Typography>
                </Stack>
            </Stack>
        </ListItem>
    )
}
