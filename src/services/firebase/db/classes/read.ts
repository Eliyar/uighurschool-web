import { get, ref } from 'firebase/database'

import { Class } from '../../../models/Class.model'
import { firebaseDb } from '../../firebase.service'

export const getClasses = async () => {
    if (!firebaseDb) {
        throw new Error('Firebase database is not initialized')
    }

    const classesRef = ref(firebaseDb, 'classes')
    const classesSnapshot = await get(classesRef)

    let classes: Class[] = []
    classesSnapshot.forEach((classSnapshot) => {
        const classObj = classSnapshot.val()
        classes.push(classObj)
    })

    // Sort classes by name
    classes = classes.sort(Class.sortByName)

    return classes
}
