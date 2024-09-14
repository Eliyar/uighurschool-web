import { utilsService } from '../firebase/utils.service'

export class Student {
    id!: string
    name!: string
    uighurName?: string
    email!: string

    constructor(name: string, uighurName: string, email: string) {
        this.id = utilsService.uuid()
        this.name = name
        this.uighurName = uighurName
        this.email = email
    }

    static sortByName(a: Student, b: Student) {
        return a.name.localeCompare(b.name)
    }
}
