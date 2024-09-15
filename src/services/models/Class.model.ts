import Fuse from 'fuse.js'

import { utilsService } from '../firebase/utils.service'

export class Class {
    id!: string
    name!: string

    constructor(name: string) {
        this.id = utilsService.uuid()
        this.name = name
    }

    static getBySimilarName = (classes: Class[], name: string): Class[] => {
        const fuse = new Fuse(classes, {
            keys: ['name'],
            isCaseSensitive: false,
            threshold: 0,
        })
        return fuse.search(name).map((item) => item.item)
    }

    static sortByName(a: Class, b: Class) {
        return a.name.localeCompare(b.name)
    }
}
