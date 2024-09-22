import { InfoOutlined } from '@mui/icons-material'
import { Alert, Grid } from '@mui/material'

import { useLessons } from '../../../hooks/useLessons'
import { LessonItem } from './LessonItem'

export const Lessons = () => {
    const { lessonsGrouped } = useLessons()

    // const onView = useCallback((file: FileModel) => {
    //     openFile(file)
    // }, [])

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
                            <LessonItem lesson={lesson} />
                        </Grid>
                    ))}
                </Grid>
            ))}
        </>
    )
}
