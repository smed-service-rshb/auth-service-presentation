import EmployeesList from './EmployeesList'
import permissions from '../../../../permissions'
import {EMPLOYEES_LIST_PAGE_KEY} from '../../page-keys'

export const EmployeesListPage = {
    key: EMPLOYEES_LIST_PAGE_KEY,
    path: '/employees',
    component: EmployeesList,

    availability: authContext => authContext.checkPermission(permissions.EDIT_USERS)
};