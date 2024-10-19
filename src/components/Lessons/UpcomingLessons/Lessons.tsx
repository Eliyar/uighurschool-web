import { InfoOutlined } from '@mui/icons-material'
import { Alert, Button, Grid2, Stack, Typography } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'

import { openLesson } from '../../../controllers/open-lesson'
import { useLessons } from '../../../hooks/useLessons'
import { FileModel } from '../../../services/models/File.model'
import { LessonItem } from './LessonItem'

export const Lessons = () => {
    const { lessonsGrouped } = useLessons()
    const [visibleGroups, setVisibleGroups] = useState(1)

    const groupedLessonsEntries = useMemo(
        () => Object.entries(lessonsGrouped),
        [lessonsGrouped]
    )

    const onView = useCallback((files: FileModel[]) => {
        openLesson(files)
    }, [])

    if (!Object.keys(lessonsGrouped).length) {
        return (
            <Alert color="warning" icon={<InfoOutlined />}>
                No lessons exist
            </Alert>
        )
    }

    return (
        <Stack spacing={6}>
            {groupedLessonsEntries
                .slice(0, visibleGroups)
                .map(([date, lessons]) => (
                    <Stack key={date} spacing={1}>
                        <Typography variant="body1" color="text.secondary">
                            {date}
                        </Typography>
                        <Grid2 container spacing={2} sx={{ width: '100%' }}>
                            {lessons.map((lesson) => (
                                <Grid2
                                    key={lesson.id}
                                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                >
                                    <LessonItem
                                        lesson={lesson}
                                        onView={onView}
                                    />
                                </Grid2>
                            ))}
                        </Grid2>
                    </Stack>
                ))}

            {visibleGroups < groupedLessonsEntries.length && (
                <Button
                    color="secondary"
                    onClick={() => setVisibleGroups((prev) => prev + 1)}
                    sx={{ marginTop: 2 }}
                >
                    Show More
                </Button>
            )}
        </Stack>
    )
}
