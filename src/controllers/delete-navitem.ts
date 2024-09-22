import { NavItem } from '../services/models/NavItem.model'
import { RemoveAllNavItems, RemoveNavItem } from '../services/store/actions'

export const deleteNavItem = (navItem: NavItem) => {
    RemoveNavItem.dispatch(navItem)
}

export const deleteAllNavItems = () => {
    RemoveAllNavItems.dispatch()
}
