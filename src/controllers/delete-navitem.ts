import { NavItem } from '../services/models/NavItem.model'
import { RemoveNavItem } from '../services/store/actions'

export const deleteNavItem = (navItem: NavItem) => {
    RemoveNavItem.dispatch(navItem)
}
