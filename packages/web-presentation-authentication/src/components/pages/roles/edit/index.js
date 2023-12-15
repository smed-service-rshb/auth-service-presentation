import permissions from '../../../../permissions'
import {ROLES_EDIT_PAGE_KEY} from '../../page-keys'

import RoleEdit from './RolesEdit'


export const RolesEditPage = {
    key: ROLES_EDIT_PAGE_KEY,
    path: '/roles/:id',
    component: RoleEdit,

    availability: permissions.GET_ROLE,
};
