export class NavItem {
    id: string
    name: string
    navFuncRef: () => void

    constructor(id: string, name: string, navFuncRef: () => void) {
        this.id = id
        this.name = name
        this.navFuncRef = navFuncRef
    }
}
