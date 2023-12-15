import RolesList from './RolesList'
import permissions from '../../../../permissions'
import {ROLES_LIST_PAGE_KEY} from '../../page-keys'

export const RolesListPage = {
    key: ROLES_LIST_PAGE_KEY,
    path: '/roles',
    component: RolesList,

    availability: authContext => authContext.checkPermission(permissions.GET_ROLES)
};