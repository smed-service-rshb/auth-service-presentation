import permissions from '../../../../permissions'
import {EMPLOYEES_EDIT_PAGE_KEY} from '../../page-keys'

import EmployeesEdit from './EmployeesEdit'

export const EmployeesEditPage = {
    key: EMPLOYEES_EDIT_PAGE_KEY,
    path: '/employees/:id',
    component: EmployeesEdit,

    availability: permissions.EDIT_USERS,
};
