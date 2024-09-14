import { utilsService } from '../firebase/utils.service'

export class Class {
    id!: string
    name!: string

    constructor(name: string) {
        this.id = utilsService.uuid()
        this.name = name
    }

    static sortByName(a: Class, b: Class) {
        return a.name.localeCompare(b.name)
    }
}
