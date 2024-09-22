import { InfoOutlined } from '@mui/icons-material'
import { Alert, Button, Grid, Stack } from '@mui/material'
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

    const onView = useCallback((files: FileModel[], wheelsUrl?: string) => {
        openLesson(files, wheelsUrl)
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
                    <Grid
                        key={date}
                        container
                        spacing={2}
                        sx={{ width: '100%' }}
                    >
                        {lessons.map((lesson) => (
                            <Grid item xs={3} key={lesson.id}>
                                <LessonItem lesson={lesson} onView={onView} />
                            </Grid>
                        ))}
                    </Grid>
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
