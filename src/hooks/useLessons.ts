import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { State } from '../services/store/state'

export const useLessons = () => {
    const lessons = useSelector((state: State) => state.lessons)

    const getLesson = useCallback(
        (lessonId: string) => {
            return lessons.find((lesson) => lesson.id === lessonId)
        },
        [lessons]
    )

    return {
        lessons,
        getLesson,
    }
}
