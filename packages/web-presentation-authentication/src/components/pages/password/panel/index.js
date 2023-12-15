import PasswordPanel from './PasswordPanel'
import permissions from '../../../../permissions'
import {PASSWORD_SETTINGS_PAGE_KEY} from '../../page-keys'

export const PasswordPanelPage = {
    key: PASSWORD_SETTINGS_PAGE_KEY,
    path: '/password-settings',
    component: PasswordPanel,

    availability: authContext => authContext.checkPermission(permissions.EDIT_USERS)
};