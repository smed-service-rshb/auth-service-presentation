import devDefinition from './src';
import './style.css'
import {PageKeys} from '@efr/medservice-web-presentation-authentication';

const navigation = menuItem => ([
    menuItem('Безопасность', 'security').withChildren([
        menuItem('Роли пользователей', 'roles').toPage({
            key: PageKeys.ROLES_LIST_PAGE_KEY,
            related: [
                PageKeys.ROLES_EDIT_PAGE_KEY,
            ],
        }),
        menuItem('Сотрудники', 'employees').toPage({
            key: PageKeys.EMPLOYEES_LIST_PAGE_KEY,
            related: [
                PageKeys.EMPLOYEES_EDIT_PAGE_KEY,
            ],
        }),
        menuItem('Настройка сложности пароля', 'password').toPage({
            key: PageKeys.PASSWORD_SETTINGS_PAGE_KEY,
            related: [
                PageKeys.PASSWORD_SETTINGS_PAGE_KEY,
            ],
        }),
        menuItem('Мотивация', 'motivation').withChildren([
            menuItem('Программа мотивации', 'motivation').toPage({
                key: PageKeys.MOTIVATION_PAGE,
                related: [
                    PageKeys.MOTIVATION_PAGE,
                ],
            })
        ]),
        menuItem('Отчеты', 'motivation').withChildren([
            menuItem('Отчет по мотивации', 'motivation-report').toPage({
                key: PageKeys.MOTIVATION_REPORT_PAGE,
                related: [
                    PageKeys.MOTIVATION_REPORT_PAGE,
                ],
            })
        ])
    ]),
]);

const modules = [devDefinition];

export default {
    navigation,
    modules,
}
