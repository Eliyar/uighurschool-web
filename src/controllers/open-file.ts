import { FileModel } from '../services/models/File.model'
import { NavItem } from '../services/models/NavItem.model'
import { AddNavItem } from '../services/store/actions'

export const openFile = (file: FileModel) => {
    AddNavItem.dispatch(new NavItem(file.id, file.name, file.downloadUrl))
}
