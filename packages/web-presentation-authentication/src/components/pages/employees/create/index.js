import permissions from '../../../../permissions'
import {EMPLOYEES_CREATE_PAGE_KEY} from '../../page-keys'

import EmployeesCreate from '../edit/EmployeesEdit'

export const EmployeesCreatePage = {
    key: EMPLOYEES_CREATE_PAGE_KEY,
    path: '/employees/create',
    component: EmployeesCreate,

    availability: permissions.EDIT_USERS,
};
