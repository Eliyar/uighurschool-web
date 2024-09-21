import 'map.prototype.tojson'

import { enableMapSet } from 'immer'

import { Class } from '../models/Class.model'
import { FileModel } from '../models/File.model'
import { NavItem } from '../models/NavItem.model'
import { Student } from '../models/Student.model'

enableMapSet()

export interface State {
    files: FileModel[]
    classes: Class[]
    studentsMap: Map<string, Student[]> // classId -> students
    navItems: NavItem[]
}

export const initialState: State = {
    files: [],
    classes: [],
    studentsMap: new Map(),
    navItems: [],
}
