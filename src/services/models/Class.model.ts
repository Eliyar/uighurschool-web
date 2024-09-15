import { utilsService } from '../firebase/utils.service'

export class Class {
    id!: string
    name!: string

    constructor(name: string) {
        this.id = utilsService.uuid()
        this.name = name
    }
    static getByName = (classes: Class[], name: string): Class[] => {
        const searchTerm = name.toLowerCase()
        return classes.filter(
            (classObj) => classObj.name.toLowerCase() === searchTerm
        )
    }

    static sortByName(a: Class, b: Class) {
        return a.name.localeCompare(b.name)
    }
}
