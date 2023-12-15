import Login from './Login'
import {LOGIN_PAGE_KEY} from '../page-keys'

export const LoginPage = {
    key: LOGIN_PAGE_KEY,
    path: '/login',
    component: Login,
    availability: ({authenticated}) => !authenticated,
};