import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Lesson } from '../services/models/Lesson.model'
import { State } from '../services/store/state'

export const useLessons = () => {
    const lessons = useSelector((state: State) => state.lessons)

    const lessonsGrouped = useMemo(() => Lesson.groupByDate(lessons), [lessons])

    const getLesson = useCallback(
        (lessonId: string) => {
            return lessons.find((lesson) => lesson.id === lessonId)
        },
        [lessons]
    )

    const getLastLessonForClassId = useCallback(
        (classId: string): Lesson | undefined => {
            const lessonsSorted = Lesson.sort(lessons)
            return lessonsSorted.find((lesson) => lesson.classId === classId)
        },
        [lessons]
    )

    return {
        lessons,
        lessonsGrouped,
        getLesson,
        getLastLessonForClassId,
    }
}
