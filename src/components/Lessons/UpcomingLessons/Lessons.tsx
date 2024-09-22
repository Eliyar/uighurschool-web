import { InfoOutlined } from '@mui/icons-material'
import { Alert, Grid } from '@mui/material'
import { useCallback } from 'react'

import { openLesson } from '../../../controllers/open-lesson'
import { useLessons } from '../../../hooks/useLessons'
import { FileModel } from '../../../services/models/File.model'
import { Lesson } from '../../../services/models/Lesson.model'
import { LessonItem } from './LessonItem'

export const Lessons = () => {
    const { lessonsGrouped } = useLessons()

    const onView = useCallback((lesson: Lesson, files: FileModel[]) => {
        openLesson(lesson, files)
    }, [])

    if (!Object.keys(lessonsGrouped).length) {
        return (
            <Alert color="warning" icon={<InfoOutlined />}>
                No lessons exist
            </Alert>
        )
    }

    return (
        <>
            {Object.entries(lessonsGrouped).map(([date, lessons]) => (
                <Grid key={date} container spacing={2} sx={{ width: '100%' }}>
                    {lessons.map((lesson) => (
                        <Grid item xs={3} key={lesson.id}>
                            <LessonItem lesson={lesson} onView={onView} />
                        </Grid>
                    ))}
                </Grid>
            ))}
        </>
    )
}
