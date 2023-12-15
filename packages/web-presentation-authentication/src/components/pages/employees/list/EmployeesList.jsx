import React from 'react';

import '../styles.css'

import {
    compose,
    withActions,
    withAuthContext,
    withModals,
    withPageRouter,
} from '@efr/medservice-web-presentation-core';
import {Button, Panel} from '@efr/medservice-web-presentation-ui'
import Grid from "../../../grid";
import {EMPLOYEES_CREATE_PAGE_KEY, EMPLOYEES_EDIT_PAGE_KEY} from '../../page-keys'
import {PopupKeys} from '../../../modal/index'
import {
    CreateEmployeeAction,
    DeleteEmployeeAction,
    GetEmployeeAction,
    GetEmployeesListAction,
    GetRolesListAction,
    LockEmployeeAction,
    SyncEmployeesAction,
    UnlockEmployeeAction
} from "../../../../actions/index";
import permissions from '../../../../permissions'
import Search from './SearchPanel'

const NO_ROLES = '(нет назначений)';

const employeesComparator = (first, second) => {
    if (first.desc < second.desc) {
        return -1;
    }
    if (first.desc > second.desc) {
        return 1;
    }
    return 0;
};

const GRID_NAME = 'EMPLOYEE';

class EmployeesList extends React.Component {

    state = {
        employees: []
    };

    constructor(props) {
        super(props);
        this.fetchEmployees = this.fetchEmployees.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.dataSource = Grid.createDataSource({
            getData: this.getData,
            gridName: GRID_NAME
        });
    }

    getData = (...params) => {
        return this.props.actions.getEmployeesList(...params)
            .then(data => {
                this.setState({employeesLoaded: true});
                data.content.filter(item => item.lockStatus === true ? item.locked = 'Заблокирован' : item.locked = 'Разблокирован');
                return ({
                    rows: data.content.map((employee) => {
                        return {
                            ...employee,
                            rolesDesc: employee.roles.reduce(
                                (acc, cur) => acc === NO_ROLES ? cur : acc + ", " + cur, NO_ROLES)
                        }
                    }),
                    hasMore: !data.last,
                    totalElements: data.totalElements,
                    totalPages: data.totalPages,
                    last: data.last,
                    size: data.size,
                    page: data.number,
                    sort: data.sort,
                    first: data.first,
                    numberOfElements: data.numberOfElements,
                })
            })
    };

    fetchEmployees() {
        return this.props.actions.getEmployeesList()
            .then(data => data.content.sort(employeesComparator))
            .then(employees => this.setState({...this.state, employees}));
    };

    prepareData = data => {
        return (
            <div>
                <div className="float-right">
                    {
                        data
                    }
                </div>
            </div>
        );
    };

    prepareArrayDara = data => {
        let dataResult = [];
        data && data.forEach(item => dataResult.indexOf(item) === -1 && dataResult.push(item));
        return (
            <div>
                <div className="float-right">
                    {
                        dataResult.map((item, index) => (index === (dataResult.length - 1)) ? item : (item + ", "))
                    }
                </div>
            </div>
        );
    };

    columns = [
        {
            key: 'fullName',
            name: 'ФИО',
            data: this.prepareData,
        },
        {
            key: 'login',
            name: 'Логин',
            data: this.prepareData,
        },
        {
            key: 'email',
            name: 'E-mail',
            data: this.prepareData,
        },
        {
            key: 'mobilePhone',
            name: 'Телефон',
            data: this.prepareData,
        },
        {
            key: 'personnelNumber',
            name: 'Табельный номер',
            data: this.prepareData,
        },
        {
            key: 'position',
            name: 'Должность',
            data: this.prepareData,
        },
        {
            key: 'rolesDesc',
            name: 'Роль',
            data: this.prepareData,
        },
        {
            key: 'branches',
            name: 'РФ',
            data: this.prepareArrayDara,
        },
        {
            key: 'offices',
            name: 'ВСП',
            data: this.prepareArrayDara,
        },
        {
            key: 'segment',
            name: 'Сегмент',
            data: this.prepareData,
        }
        ,
        {
            key: 'locked',
            name: 'Статус пользователя'
        }
    ];

    handleCreate = () => {
        this.props.pageRouter.open(EMPLOYEES_CREATE_PAGE_KEY);
    };

    handleDelete = () => {
        if (this.grid.getSelectedRows().length < 1) {
            this.props.modals.alert({message: "Вы должны выбрать хотя бы одну запись"});
            return;
        }
        this.props.modals.confirm({
            title: 'Удаление сотрудника',
            message: 'Вы действительно хотите удалить сотрудника?',
        }).on('success', this.deleteEmployee);
    };

    handleLock = () => {
        if (this.grid.getSelectedRows().length < 1) {
            this.props.modals.alert({message: "Вы должны выбрать хотя бы одну запись"});
            return;
        }
        this.props.modals.confirm({
            title: 'Блокировка сотрудника',
            message: 'Вы действительно хотите заблокировать сотрудника?',
        }).on('success', this.lockEmployee);
    };

    handleUnlock = () => {
        if (this.grid.getSelectedRows().length < 1) {
            this.props.modals.alert({message: "Вы должны выбрать хотя бы одну запись"});
            return;
        }
        this.props.modals.confirm({
            title: 'Разблокировка сотрудника',
            message: 'Вы действительно хотите разблокировать сотрудника?',
        }).on('success', this.unlockEmployee);
    };

    deleteEmployee = () => {
        if (this.grid.getSelectedRows().length > 1) {
            this.props.modals.alert({message: "Вы должны выбрать только одну запись"});
            return;
        }
        // пока будет возможность удалить только одного сотрудника
        let id = this.grid.getSelectedRows()[0].id;
        this.props.actions.deleteEmployee(id)
            .then(() => {
                // employees => this.setState({...this.state, employees})
            })
            .catch(error => {
                this.props.modals.alert({message: "Ошибка удаления сотрудника"});
                console.log(error);
            })
    };

    lockEmployee = () => {
        if (this.grid.getSelectedRows().length > 1) {
            this.props.modals.alert({message: "Вы должны выбрать только одну запись"});
            return;
        }
        let id = this.grid.getSelectedRows()[0].id;
        this.props.actions.lockEmployee(id)
            .then(() => {
                // employees => this.setState({...this.state, employees})
            })
            .catch(error => {
                this.props.modals.alert({message: "Ошибка блокировки сотрудника"})
            })
    };

    unlockEmployee = () => {
        if (this.grid.getSelectedRows().length > 1) {
            this.props.modals.alert({message: "Вы должны выбрать только одну запись"});
            return;
        }
        let id = this.grid.getSelectedRows()[0].id;
        this.props.actions.unlockEmployee(id)
            .then(() => {
                // employees => this.setState({...this.state, employees})
            })
            .catch(error => {
                this.props.modals.alert({message: "Ошибка блокировки сотрудника"})
            })
    };

    createEmployee = employeeId => () => {
        const {getEmployee, createEmployee} = this.props.actions;
        getEmployee(employeeId)
            .then(employee => {
                const name = `${employee.name}_копия ${Math.random().toString(36).substring(7)}`;
                return createEmployee({...employee, name, desc: name});
            })
            .then(this.fetchEmployees);
    };

    handleEdit = rowData => {
        this.props.pageRouter.open(EMPLOYEES_EDIT_PAGE_KEY, {id: rowData.id});
    };

    onSearch = (searchData) => {
        this.dataSource.setFilter(searchData);
    };

    handleSync = () => {
        this.props.actions.syncEmployees()
            .then(data => {
                this.props.modals.alert({message: "Задача импорта пользователей запущена"});
            })
            .catch(() => {
                this.props.modals.alert({message: 'При выполнении запуска задачи импорта произошла ошибка'});
            });
    };

    render = () => {
        const {employees} = this.state;
        if (employees) {
            return (
                <Panel labelSecondary="Список пользователей" dataId="employees-list-panel">
                    {
                        <div>
                            <div className="float-right grid-buttons employees-list-button">
                                {
                                    this.props.authContext.checkPermission(permissions.EDIT_USERS) &&
                                    <Button onClick={this.handleCreate} type={Button.buttonTypes.specialOrange}
                                            name="Создать"
                                            dataId="create-employee-button"/>
                                }
                                {
                                    this.props.authContext.checkPermission(permissions.EDIT_USERS) &&
                                    <Button onClick={this.handleDelete} type={Button.buttonTypes.specialOrange}
                                            name="Удалить"
                                            dataId="delete-employee-button"/>
                                }
                                {
                                    this.props.authContext.checkPermission(permissions.EDIT_USERS) &&
                                    <Button onClick={this.handleLock} type={Button.buttonTypes.specialOrange}
                                            name="Заблокировать"
                                            dataId="lock-employee-button"/>
                                }
                                {
                                    this.props.authContext.checkPermission(permissions.EDIT_USERS) &&
                                    <Button onClick={this.handleUnlock} type={Button.buttonTypes.specialOrange}
                                            name="Разблокировать"
                                            dataId="lock-employee-button"/>
                                }
                                {
                                    this.props.authContext.checkPermission(permissions.EDIT_USERS) &&
                                    <Button onClick={this.handleSync} type={Button.buttonTypes.specialOrange}
                                            name="Импортировать пользователей"
                                            dataId="delete-employee-button"/>
                                }
                            </div>
                            <Search onSearch={this.onSearch}/>
                        </div>
                    }
                    <div>
                        <div className="employees-list">
                            <Grid columns={this.columns}
                                  dataSource={this.dataSource}
                                  dataId="employees-list"
                                  onCellClick={this.handleEdit}
                                  ref={(element) => {
                                      this.grid = element;
                                  }}/>
                        </div>
                    </div>
                </Panel>
            )
        } else {
            return (<h1>Загрузка данных ...</h1>)
        }
    }
}

export default compose(
    withPageRouter,
    withActions({
        createEmployee: CreateEmployeeAction.name,
        getEmployeesList: GetEmployeesListAction.name,
        getRolesList: GetRolesListAction.name,
        getEmployee: GetEmployeeAction.name,
        deleteEmployee: DeleteEmployeeAction.name,
        lockEmployee: LockEmployeeAction.name,
        unlockEmployee: UnlockEmployeeAction.name,
        syncEmployees: SyncEmployeesAction.name
    }),
    withModals({
        startCreate: PopupKeys.EMPLOYEE_CREATE_POPUP_KEY,
    }),
    withAuthContext
)(EmployeesList)